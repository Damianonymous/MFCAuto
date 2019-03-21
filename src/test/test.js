/* globals describe, it, before, beforeEach, after, afterEach */
// These tests can be run via `npm test` and a coverage report
// generated via istanbul with `npm run coverage`

// Tests with {slow} in their descriptions can take up to 20 seconds
// or longer to complete. To skip those and run only the faster subset
// of tests, use "npm run testfast"

"use strict";
const assert = require("chai").assert;
const mfc = require("../../lib/index.js");

// If tests are failing, uncommenting one of
// the more verbose logging levels below can
// make the root causes easier to understand
mfc.setLogLevel(mfc.LogLevel.SILENT);
// mfc.setLogLevel(mfc.LogLevel.ERROR);
// mfc.setLogLevel(mfc.LogLevel.WARNING);
// mfc.setLogLevel(mfc.LogLevel.INFO);
// mfc.setLogLevel(mfc.LogLevel.DEBUG);

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

process.on("unhandledRejection", (ur) => {
    console.log(ur);
});

function disconnectClient(client) {
    if (client !== undefined && client._options !== undefined) {
        if (client._options.useWebSockets === false) {
            client._client.end();
        } else {
            client._client.close();
        }
    }
}

// Test all the different Client configurations
[["websockets-mfc", {}], ["flash-mfc", { useWebSockets: false }], ["websockets-camyou", { camYou: true }], ["flash-camyou", { useWebSockets: false, camYou: true }]].forEach(function ([name, clientOptions]) {
    describe(name, function () {
        describe("Startup Scenarios", function () {
            this.timeout(9000);
            let client;
            afterEach(function (done) {
                if (client !== undefined) {
                    client.disconnect()
                        .then(() => {
                            assert.strictEqual(mfc.Client._connectedClientCount, 0);
                            assert.strictEqual(client.state, mfc.ClientState.IDLE, "Should not be connected");
                            done();
                        })
                        .catch((reason) => {
                            done(reason);
                        });
                }
            });
            it("should be able to dynamically load the server config", function (done) {
                client = new mfc.Client("guest", "guest", clientOptions);
                client._ensureServerConfigIsLoaded()
                    .then(() => {
                        assert.notStrictEqual(client.serverConfig, undefined);
                        assert.notStrictEqual(client.serverConfig.chat_servers, undefined);
                        assert.notStrictEqual(client.serverConfig.chat_servers.length, 0);
                        done();
                    })
                    .catch((reason) => {
                        done(reason);
                    });
            });
            it("should properly handle multiple manual client disconnects", function (done) {
                client = new mfc.Client("guest", "guest", clientOptions);
                assert.strictEqual(mfc.Client._connectedClientCount, 0);
                assert.strictEqual(client.state, mfc.ClientState.IDLE, "Should not be connected");
                client.disconnect()
                    .then(() => {
                        assert.strictEqual(mfc.Client._connectedClientCount, 0);
                        assert.strictEqual(client.state, mfc.ClientState.IDLE, "Should not be connected");
                    })
                    .catch((reason) => {
                        done(reason);
                    });
                client.disconnect()
                    .then(() => {
                        assert.strictEqual(mfc.Client._connectedClientCount, 0);
                        assert.strictEqual(client.state, mfc.ClientState.IDLE, "Should not be connected");
                        done();
                    })
                    .catch((reason) => {
                        done(reason);
                    });
            });
            it("should be able to connect without logging in", function (done) {
                client = new mfc.Client("guest", "guest", clientOptions);
                assert.strictEqual(mfc.Client._connectedClientCount, 0);
                assert.strictEqual(client.state, mfc.ClientState.IDLE, "Should not be connected");
                client.connect(false)
                    .then(() => {
                        assert.strictEqual(mfc.Client._connectedClientCount, 0, "A client that's not logged in shouldn't count as connected");
                        assert.strictEqual(client.state, mfc.ClientState.ACTIVE, "Should be connected");
                        assert.isFalse(client._choseToLogIn);
                        done();
                    })
                    .catch((reason) => {
                        done(reason);
                    });
            });
            // Repeat these tests for legacy and modern logins
            [{ modernLogin: false }, { modernLogin: true }].forEach((loginType) => {
                it(`should be able to log in as a guest, modernLogin: ${loginType.modernLogin}`, function (done) {
                    client = new mfc.Client("guest", "guest", Object.assign({}, clientOptions, loginType));
                    assert.strictEqual(client.username.indexOf("guest"), 0, "We didn't start in the default state?");
                    assert.strictEqual(mfc.Client._connectedClientCount, 0, "Should be 0 connected clients now");
                    assert.strictEqual(client.state, mfc.ClientState.IDLE, "Should not be connected");
                    client.on("LOGIN", (packet) => {
                        assert.instanceOf(packet, mfc.Packet);
                        assert.strictEqual(mfc.Client._connectedClientCount, 1);
                        assert.strictEqual(client.state, mfc.ClientState.ACTIVE, "Should be connected");
                        assert.isTrue(client._choseToLogIn, true);
                        assert.strictEqual(packet.nArg1, 0, "Failed login error code");
                        assert.isString(packet.sMessage);
                        assert.strictEqual(client.username.indexOf("Guest"), 0, "We didn't log in as a guest successfully");
                        done();
                    });
                    client.connect(true)
                        .catch((reason) => {
                            done(reason);
                        });
                });
                it(`should be able to log in as two guests, modernLogin: ${loginType.modernLogin}`, function (done) {
                    client = new mfc.Client("guest", "guest", Object.assign({}, clientOptions, loginType));
                    let client2 = new mfc.Client("guest", "guest", Object.assign({}, clientOptions, loginType));
                    assert.strictEqual(mfc.Client._connectedClientCount, 0);
                    assert.strictEqual(client.state, mfc.ClientState.IDLE, "Should not be connected");
                    client.on("CLIENT_CONNECTED", () => {
                        assert.strictEqual(mfc.Client._connectedClientCount, 1);
                        assert.strictEqual(client.state, mfc.ClientState.ACTIVE, "Should be connected");
                        client2.connect(true);
                    });
                    client2.on("CLIENT_CONNECTED", () => {
                        assert.strictEqual(mfc.Client._connectedClientCount, 2);
                        assert.strictEqual(client.state, mfc.ClientState.ACTIVE, "Should be connected");
                        client2.disconnect()
                            .catch((reason) => {
                                done(reason);
                            });
                    });
                    client2.on("CLIENT_DISCONNECTED", () => {
                        assert.strictEqual(mfc.Client._connectedClientCount, 1);
                        assert.strictEqual(client.state, mfc.ClientState.ACTIVE, "Should be connected");
                        client.disconnect()
                            .catch((reason) => {
                                done(reason);
                            });
                    });
                    client.on("CLIENT_DISCONNECTED", () => {
                        assert.strictEqual(mfc.Client._connectedClientCount, 0);
                        assert.strictEqual(client.state, mfc.ClientState.IDLE, "Should not be connected");
                        done();
                    });
                    client.connect(true)
                        .catch((reason) => {
                            done(reason);
                        });
                });
            });
            it("should handle TxCmd on a disconnected client gracefully", function (done) {
                assert.strictEqual(client.state, mfc.ClientState.IDLE, "Should not be connected");
                client.joinRoom(3111899)
                    .catch(e => {
                        assert.strictEqual(e.toString(), "Error: Client is not connected. Please call 'connect' before attempting this.");
                        done();
                    });
            });
        });

        describe("Connected Scenarios", function () {
            this.timeout(9000);
            let client = new mfc.Client("guest", "guest", clientOptions);
            let popularModels;
            let queen;
            before(function (done) {
                assert.strictEqual(mfc.Client._connectedClientCount, 0, "Should be 0 connected clients now");
                assert.strictEqual(client.state, mfc.ClientState.IDLE, "Should not be connected");
                client.connectAndWaitForModels()
                    .then(() => {
                        assert.strictEqual(client.state, mfc.ClientState.ACTIVE, "Should be connected");
                        //Find the most popular model in free chat right now
                        popularModels = mfc.Model.findModels((m) => m.bestSession.vs === 0);
                        assert.notStrictEqual(popularModels.length, 0, `No models in public chat??? Is ${clientOptions.camYou ? "CamYou" : "MFC"} down?`);
                        popularModels.sort((a, b) => a.bestSession.rc - b.bestSession.rc);
                        queen = popularModels[popularModels.length - 1];
                        done();
                    })
                    .catch((reason) => {
                        done(reason);
                    });
            });
            after(function (done) {
                client.disconnect()
                    .then(() => {
                        assert.strictEqual(mfc.Client._connectedClientCount, 0);
                        assert.strictEqual(client.state, mfc.ClientState.IDLE, "Should not be connected");
                        done();
                    })
                    .catch((reason) => {
                        done(reason);
                    });
            });
            describe("Client", function () {
                if (!clientOptions.camYou) { // CamYou's traffic volume is too low for this kind of work
                    describe("Packet validation", function () {
                        afterEach(function (done) {
                            assert.strictEqual(client.state, mfc.ClientState.ACTIVE, "Should be connected");
                            client.leaveRoom(queen.uid)
                                .then(() => done())
                                .catch(() => done());
                        });
                        it("should understand SESSIONSTATE", function (done) {
                            client.on("SESSIONSTATE", (p) => {
                                if (p.sMessage && p.sMessage.m) {
                                    client.removeAllListeners("SESSIONSTATE");
                                    assert.isObject(p.sMessage);
                                    assert.containsAllKeys(p.sMessage, ["pid", "sid", "uid", "m"]);
                                    assert.hasAnyKeys(p.sMessage.m, [
                                        "camscore",
                                        "continent",
                                        "flags",
                                        "kbit",
                                        "lastnews",
                                        "mg",
                                        "missmfc",
                                        "new_model",
                                        "rank",
                                        "rc",
                                        "topic",
                                        "hidecs",
                                        "sfw",
                                    ]);
                                    done();
                                }
                            });
                        });
                        it("should understand USERNAMELOOKUP", function (done) {
                            client.once("USERNAMELOOKUP", (p) => {
                                assert.isObject(p.sMessage);
                                assert.containsAllKeys(p.sMessage, ["lv", "m", "nm", "pid", "sid", "u", "uid", "vs"]);
                                assert.isObject(p.sMessage.m);
                                assert.isObject(p.sMessage.u);
                                assert.containsAllKeys(p.sMessage.m, [
                                    "camscore",
                                    "continent",
                                    "flags",
                                    "kbit",
                                    "lastnews",
                                    "mg",
                                    "missmfc",
                                    "new_model",
                                    "rank",
                                    "rc",
                                    "sfw",
                                    "topic"
                                ]);
                                assert.containsAllKeys(p.sMessage.u, [
                                    "avatar",
                                    "blurb",
                                    "camserv",
                                    "chat_color",
                                    "chat_opt",
                                    "creation",
                                    "ethnic",
                                    "photos",
                                    "profile",
                                ]);
                                done();
                            });
                            client.queryUser(queen.uid);
                        });
                        it("should understand CMESG", function (done) {
                            client.on("CMESG", (p) => {
                                // Unclear why sometimes there is no payload with
                                // a CMESG message, but it happens. Perhaps those
                                // are messages from muted users? Not sure.
                                if (p.sMessage !== undefined) {
                                    client.removeAllListeners("CMESG");
                                    assert.isObject(p.sMessage);
                                    assert.containsAllKeys(p.sMessage, ["lv", "msg", "nm", "sid", "uid", "vs"]);
                                    assert.isString(p.sMessage.msg);
                                    done();
                                }
                            });
                            client.joinRoom(queen.uid)
                                .catch((reason) => done(reason));
                        });
                    });
                }
                it("should be able to send a USERNAMELOOKUP query and parse a valid response", function (done) {
                    assert.notStrictEqual(queen.bestSession.nm, undefined, "How do we not know the top model's name??");

                    //Register a handler for USERNAMELOOKUP messages
                    function callback(packet) {
                        //Check the contents, looking for known/unknown properties and validating the username
                        assert.instanceOf(packet, mfc.Packet);
                        assert.strictEqual(packet.sMessage.nm, queen.bestSession.nm);
                        assert.strictEqual(queen.nm, queen.bestSession.nm);

                        //Remove this listener and complete the test
                        client.removeListener("USERNAMELOOKUP", callback);
                        done();
                    }

                    client.on("USERNAMELOOKUP", callback);

                    //Query for her username
                    client.TxCmd(mfc.FCTYPE.USERNAMELOOKUP, 0, 20, 0, queen.bestSession.nm);
                });

                it("should be able to join a room and log chat", function (done) {
                    client.on("CMESG", (packet) => {
                        assert.instanceOf(packet, mfc.Packet);
                        assert.strictEqual(packet.aboutModel.uid, queen.uid);
                        if (packet.chatString !== undefined) {
                            //@TODO - Also ensure at least one of these
                            //messages has an emote to cover Packet._parseEmotes
                            //ideally we'd also check tips and tip messages but
                            //there is no guarantee we would see a tip before the timeout
                            client.leaveRoom(packet.aboutModel.uid)
                                .catch((reason) => {
                                    done(reason);
                                });
                            client.removeAllListeners("CMESG");
                            done();
                        }
                    });

                    client.joinRoom(queen.uid)
                        .catch((reason) => {
                            done(reason);
                        });
                });

                it("should reject if joinRoom fails", function (done) {
                    if (clientOptions.camYou) {
                        // CamYou doesn't have the lounge, so skip this test there
                        done();
                    } else {
                        // Try to join lounge20 as a guest
                        client.joinRoom(486121)
                            .catch((packet) => {
                                assert.instanceOf(packet, mfc.Packet, "Should be a Packet");
                                assert.strictEqual(packet.FCType, mfc.FCTYPE.ZBAN);
                                done();
                            });
                    }
                });

                it("should be able to encode chat strings", function (done) {
                    let decodedString = "I am happy :mhappy";
                    client.encodeRawChat(decodedString)
                        .then((parsedString/*, aMsg2*/) => {
                            // assert.strictEqual(aMsg2.length, 2, "Unexpected number of emotes parsed");
                            // assert.strictEqual(aMsg2[0], "I am happy ");
                            // assert.strictEqual(aMsg2[1].txt, ":mhappy");
                            // assert.strictEqual(aMsg2[1].url, "http://www.myfreecams.com/chat_images/u/2c/2c9d2da6.gif");
                            // assert.strictEqual(aMsg2[1].code, "#~ue,2c9d2da6.gif,mhappy~#");
                            assert.strictEqual(parsedString, "I am happy #~ue,2c9d2da6.gif,mhappy~#", `Encoding failed or returned an unexpected format: ${parsedString}`);

                            //And we should be able to decode that string back too
                            let packet = new mfc.Packet();
                            assert.strictEqual(decodedString, packet._parseEmotes(parsedString), "Failed to decode the emote string");
                            done();
                        })
                        .catch((reason) => {
                            done(reason);
                        });
                });

                // it("should be able to send chat", function (done) {
                //     /*
                //     @TODO - Find a room that allows guest chat, join it, send some text
                //     and validate that we receive the text back with a matching username, etc
                //     */
                //     //assert.fail("@TODO");
                //     done();
                // });

                it("should be able to query users by name", function (done) {
                    client.queryUser(queen.nm)
                        .then((response) => {
                            assert.strictEqual(response.uid, queen.uid);
                            done();
                        })
                        .catch((reason) => {
                            done(reason);
                        });
                });

                it("should be able to query users by id", function (done) {
                    client.queryUser(queen.uid)
                        .then((response) => {
                            assert.strictEqual(response.nm, queen.nm);
                            done();
                        })
                        .catch((reason) => {
                            done(reason);
                        });
                });

                it("should gracefully handle a user query for a non-existent user name", function (done) {
                    client.queryUser("RandomNameThatWouldNeverBeReal")
                        .then((response) => {
                            assert.isUndefined(response);
                            done();
                        })
                        .catch((reason) => {
                            done(reason);
                        });
                });

                it("should gracefully handle a user query for a non-existent user id", function (done) {
                    client.queryUser(1)
                        .then((response) => {
                            assert.isUndefined(response);
                            done();
                        })
                        .catch((reason) => {
                            done(reason);
                        });
                });
            });

            describe("Model", function () {
                this.timeout(60000);
                it("should be able to listen for a specific model state change {slow}", function (done) {
                    queen.on("rc", (model/*, oldstate, newstate*/) => {
                        assert.instanceOf(model, mfc.Model);
                        assert.strictEqual(model.uid, queen.uid, "We got a callback for someone who isn't the top model?");
                        queen.removeAllListeners("rc");
                        done();
                    });
                });
                it("should be able to listen for global model state change events {slow}", function (done) {
                    mfc.Model.on("rc", (model, oldstate, newstate) => {
                        assert.instanceOf(model, mfc.Model);
                        assert.isNumber(newstate);
                        mfc.Model.removeAllListeners("rc");
                        done();
                    });
                });
                it("should merge only models", function () {
                    let nonModels = mfc.Model.findModels((m) => m.bestSession.sid !== 0 && m.bestSession.lv !== undefined && m.bestSession.lv !== 4);
                    assert.strictEqual(nonModels.length, 0, `Length: ${nonModels.length}, First element: ${nonModels[0]}`);
                });
                it("should unmerge models that turn out to be members", function () {
                    const fakeModelId = 999999999;
                    let fakeModel = mfc.Model.getModel(fakeModelId, false);
                    assert.isUndefined(fakeModel, `The fake model id existed before the test?? ${fakeModel}`);
                    fakeModel = mfc.Model.getModel(fakeModelId, true);
                    assert.instanceOf(fakeModel, mfc.Model);
                    fakeModel.merge({ lv: mfc.FCLEVEL.PREMIUM, nm: "PremiumMember" });
                    fakeModel = mfc.Model.getModel(fakeModelId, false);
                    assert.isUndefined(fakeModel, `The member should no longer be tracked as a model ${fakeModel}`);
                });
                if (!clientOptions.camYou) { // These are too slow for, or don't apply to CamYou
                    it("should be able to process .when events on one model {slow}", function (done) {
                        let filterMatched = false;
                        const whenCallback = () => {
                            if (!filterMatched) {
                                filterMatched = true;
                                return true;
                            }
                            return false;
                        };
                        queen.when(whenCallback,
                            () => {
                                queen.removeWhen(whenCallback);
                                done();
                            }//, Times out too often to wait for an exit
                            // (m) => {
                            //     mfc.logWithLevel(mfc.LogLevel.DEBUG, `${m.nm} stopped matching the filter`);
                            //     done();
                            // }
                        );
                    });
                    it("should be able to process .when events on all models {slow}", function (done) {
                        let matchedModels = new Set();
                        let isDone = false;
                        const whenCallback = (m) => {
                            assert.instanceOf(m, mfc.Model);
                            return !matchedModels.has(m.uid);
                        };
                        mfc.Model.when(whenCallback,
                            (m) => {
                                assert.instanceOf(m, mfc.Model);
                                matchedModels.add(m.uid);
                            },
                            (m) => {
                                assert.instanceOf(m, mfc.Model);
                                assert.containsAllKeys(matchedModels, m.uid, "We got an onFalseAfterTrue callback for a model that never matched the filter to begin with?");
                                if (!isDone) {
                                    mfc.Model.removeWhen(whenCallback);
                                    done();
                                    isDone = true;
                                }
                            }
                        );
                    });
                    it("should merge MFC share details", function (done) {
                        let isDone = false;
                        mfc.Model.on("share_albums", (model, before, after) => {
                            assert.instanceOf(model, mfc.Model);
                            assert.isNumber(after);
                            if (!isDone) {
                                isDone = true;
                                done();
                            }
                        });
                    });
                }
                it("should be able to retrieve social media details for a model", function (done) {
                    mfc.Model.getModel(3111899).getSocialMedia().then((social) => {
                        assert.isObject(social);
                        assert.containsAllKeys(social, ["twitter_username", "instagram_username", "mfc_share"]);
                        done();
                    });
                });
            });
        });

        describe("Reconnect Scenarios", function () {
            this.timeout(90000);
            let client;
            let inAfterEach = false;
            let timer;
            beforeEach(function () {
                inAfterEach = false;
            });
            afterEach(function (done) {
                inAfterEach = true;
                if (timer) {
                    clearTimeout(timer);
                    timer = undefined;
                }
                if (client !== undefined) {
                    client.disconnect()
                        .then(() => {
                            assert.strictEqual(mfc.Client._connectedClientCount, 0);
                            assert.strictEqual(client.state, mfc.ClientState.IDLE, "Should not be connected");
                            done();
                        })
                        .catch((reason) => {
                            done(reason);
                        });
                }
            });
            it("should recover from a socket disconnect {slow}", function (done) {
                let firstConnect = true;
                client = new mfc.Client("guest", "guest", clientOptions);
                const handler = () => {
                    if (firstConnect) {
                        firstConnect = false;
                        // Force disconnect after a random amount of time
                        timer = setTimeout(() => {
                            disconnectClient(client);
                        }, randInt(50, 7000));
                    } else {
                        // We reconnected after the disconnect, good
                        client.removeListener("LOGIN", handler);
                        done();
                    }
                };
                client.on("LOGIN", handler);
                client.connect()
                    .catch((reason) => {
                        done(reason);
                    });
            });
            it("should stop trying to recover from a socket disconnect if disconnect() is called {slow}", function (done) {
                client = new mfc.Client("guest", "guest", clientOptions);
                client.once("LOGIN", () => {
                    assert.strictEqual(mfc.Client._connectedClientCount, 1, "Should be 1 connected client now");
                    assert.strictEqual(client.state, mfc.ClientState.ACTIVE);
                    timer = setTimeout(() => {
                        disconnectClient(client);
                    }, randInt(50, 7000));
                });
                client.once("CLIENT_DISCONNECTED", () => {
                    assert.strictEqual(mfc.Client._connectedClientCount, 0);
                    assert.strictEqual(client.state, mfc.ClientState.PENDING, "Should not be connected");
                    assert.isObject(client._reconnectTimer, "Should be trying to reconnect now");
                    client.disconnect()
                        .then(() => {
                            assert.isUndefined(client._reconnectTimer, "Should no longer be trying to reconnect");
                            assert.strictEqual(client.state, mfc.ClientState.IDLE, "Should not be connected");
                            assert.strictEqual(mfc.Client._connectedClientCount, 0, "Should be 0 connected clients now");
                            done();
                        })
                        .catch((reason) => {
                            done(reason);
                        });
                });
                assert.isUndefined(client._reconnectTimer, "Should not be any reconnect timer yet");
                client.connect()
                    .catch((reason) => {
                        done(reason);
                    });
            });
            it("should stop the initial connect if disconnect() is called {slow}", function (done) {
                client = new mfc.Client("guest", "guest", clientOptions);
                client._baseUrl = "myfreecamsbutnotreally.com";
                timer = setTimeout(() => client.disconnect(), randInt(1000, 7000));
                client.connect()
                    .catch((reason) => {
                        if (reason.message === "disconnect() requested before connection could be established") {
                            done();
                        } else {
                            done(reason);
                        }
                    });
            });
            it("should succeed on the initial connect once serverConfig DNS recovers {slow}", function (done) {
                client = new mfc.Client("guest", "guest", clientOptions);
                const originalBaseUrl = client._baseUrl;
                client._baseUrl = "myfreecamsbutnotreally.com";
                timer = setTimeout(() => client._baseUrl = originalBaseUrl, randInt(6000, 7000));
                client.connect()
                    .then(() => {
                        done();
                    })
                    .catch((reason) => {
                        done(reason);
                    });
            });
            it("should succeed on the initial connect once chat server DNS recovers {slow}", function (done) {
                client = new mfc.Client("guest", "guest", clientOptions);
                let originalServerConfig;
                client._ensureServerConfigIsLoaded()
                    .then(() => {
                        originalServerConfig = client.serverConfig;
                        if (clientOptions.useWebSockets === false) {
                            client.serverConfig.chat_servers = ["thiswillnotexist"];
                        } else {
                            client.serverConfig.websocket_servers = { "thiswillnotexist": "rfc6455" };
                        }
                    });
                timer = setTimeout(() => client.serverConfig = originalServerConfig, randInt(6000, 7000));
                client.connect()
                    .then(() => {
                        done();
                    })
                    .catch((reason) => {
                        done(reason);
                    });
            });
            it("should succeed on reconnect once serverConfig DNS recovers {slow}", function (done) {
                client = new mfc.Client("guest", "guest", clientOptions);
                const originalBaseUrl = client._baseUrl;
                client.connect()
                    .then(() => {
                        client._baseUrl = "myfreecamsbutnotreally.com";
                        client.once("CLIENT_DISCONNECTED", () => {
                            timer = setTimeout(() => client._baseUrl = originalBaseUrl, randInt(6000, 7000));
                            client.ensureConnected()
                                .then(() => done())
                                .catch((reason) => done(reason));
                        });
                        disconnectClient(client);
                    })
                    .catch((reason) => {
                        done(reason);
                    });
            });
            it("should succeed on reconnect once chat server DNS recovers {slow}", function (done) {
                client = new mfc.Client("guest", "guest", clientOptions);
                client.connect()
                    .then(() => {
                        const originalServerConfig = Object.assign({}, client.serverConfig);
                        if (clientOptions.useWebSockets === false) {
                            client.serverConfig.chat_servers = ["thiswillnotexist"];
                        } else {
                            client.serverConfig.websocket_servers = { "thiswillnotexist": "rfc6455" };
                        }
                        client.once("CLIENT_DISCONNECTED", () => {
                            timer = setTimeout(() => {
                                client.serverConfig = originalServerConfig;
                            }, randInt(6000, 7000));
                            client.ensureConnected()
                                .then(() => {
                                    done();
                                })
                                .catch((reason) => {
                                    if (!inAfterEach) {
                                        done(reason);
                                    }
                                });
                        });
                        disconnectClient(client);
                    })
                    .catch((reason) => {
                        if (!inAfterEach) {
                            done(reason);
                        }
                    });
            });
        });
    });
});
