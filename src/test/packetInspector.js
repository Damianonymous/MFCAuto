// @ts-check
/*
packetInspector.js

Used for dumping raw packets to the console to learn about the MFC protocol and debug changes in their code
*/

"use strict";

const fs = require("fs");
const mfc = require("../../lib/index.js");
const log = mfc.log;
let user = "guest";
let pass = "guest";

// To examine packet streams for a logged in user, put your
// username and hashed password (read the comment in Client.ts)
// in a file named cred.txt in the test folder. Separate them by
// a single newline. And this script will log in as that user.
// Otherwise it will default to using guest credentials, which
// also work fine but only reveal and subset of the message protocol.
// cred.txt is excluded from git via .gitignore. Please never commit
// your own password hash.
let cred = "cred.txt";
if (fs.existsSync(cred)) {
    let data = fs.readFileSync(cred).toString().split("\r\n");
    if (data.length >= 2) {
        user = data[0];
        pass = data[1];
    }
}
mfc.setLogLevel(mfc.LogLevel.WARNING, "packetLog_errors.txt", null);
let client = new mfc.Client(user, pass, {modernLogin: true});

client.on("ANY", (packet) => {
    log(packet.toString(), "packetLog.txt", null);
});

client.connectAndWaitForModels().then(() => {
    // Stay in this many top rooms
    const topRoomsToJoin = 10;
    const joinedModels = new Set();

    // Whenever any model's room count updates
    mfc.Model.on("rc", () => {
        // Get all the models in free chat
        let freeModels = mfc.Model.findModels((m) => m.bestSession.vs === 0);
        // Sort them from lowest viewer count to highest
        freeModels.sort((a, b) => a.bestSession.rc - b.bestSession.rc);
        const topModels = freeModels.slice(-topRoomsToJoin);

        joinedModels.forEach((uid) => {
            if (!topModels.some((m) => m.uid === uid)) {
                joinedModels.delete(uid);
                client.leaveRoom(uid)
                    .then(() => mfc.log(`Left ${mfc.Model.getModel(uid).nm}'s room`))
                    .catch(reason => mfc.log(`Failed to leave ${mfc.Model.getModel(uid).nm}'s room: ${reason}`));
            }
        });

        topModels.forEach((model) => {
            if (!joinedModels.has(model.uid)) {
                joinedModels.add(model.uid);
                client.joinRoom(model.uid)
                    .then(() => mfc.log(`Joined ${model.nm}'s room`))
                    .catch(reason => mfc.log(`Failed to Join ${model.nm}'s room: ${reason}`));
            }
        });
    });
});
