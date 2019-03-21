import { LogLevel, logWithLevelInternal as logl } from "./Utils";
import { RefinedEventEmitter } from "./RefinedEventEmitter";
import { STATE, FCVIDEO, FCOPT, FCLEVEL } from "./Constants";
import { Message, BaseMessage, ModelDetailsMessage, UserDetailsMessage, SessionDetailsMessage, MfcShareDetailsMessage, UnknownJsonField } from "./sMessages";
import * as assert from "assert";
import * as request from "request-promise-native";

/**
 * Model represents a single MFC model. The Model constructor also serves as a
 * static repository of all models.
 *
 * Both the Model constructor and individual instances are [NodeJS EventEmitters](https://nodejs.org/api/all.html#events_class_eventemitter)
 * and will emit events when any property of a model changes, including room
 * topic, camscore, Miss MFC rank, tags, online/offline/free chat/private/group
 * show status and many other events.
 *
 * Listening for these events is the fastest way to know when something changes
 * for a model on MFC, bar none. MFCAuto is not polling MFC for this
 * information, it is registering as a proper client for MFC's chat controller
 * servers and being told by the server the instant that anything changes.
 *
 * In most cases, Model event callbacks will be invoked more quickly than you
 * will see the model's state update in the browser because MFC's browser code
 * throttles the display of updates from the server. MFCAuto has no such
 * limitations.
 */
export class Model extends RefinedEventEmitter<ModelEventName, ModelEventCallback, UnknownJsonField | string[]> {
    /** The model's user id */
    public uid: number;

    /** The model's name */
    public nm: string | undefined;

    /** The model's Tags */
    public tags: string[] = [];

    /**
     * Map of SessionID->full state for that session, for all known sessions for
     * this model.
     *
     * Use the .bestSessionId or .bestSession properties to find the most correct
     * session for all-up status reporting.
     *
     * Models, and other members, can be logged on more than once. For example, in
     * multiple browsers, etc. In those cases, we'll be getting distinct FCVIDEO
     * state updates from each session. And it's not accurate to report only the
     * most recently seen video state. For example, a model might be in free chat
     * and open another browser window to check her email or current rank. Then
     * she closes the secondary browser window and we get a sessionstate updated
     * saying that second session is now Offline, but she never left cam in her
     * original session. It's incorrect to say she's offline now. So State is not
     * as simple as a single value, and we must track all known sessions for each
     * member.
     * @access private
     */
    public readonly knownSessions: Map<number, ModelSessionDetails> = new Map();

    private static readonly whenMap: Map<whenFilter, whenMapEntry> = new Map();
    private readonly whenMap: Map<whenFilter, whenMapEntry> = new Map();

    // #region Static EventEmitter methods
    // EventEmitter object to be used for events firing for all models
    private static readonly eventsForAllModels = new RefinedEventEmitter<ModelEventName, ModelEventCallback, UnknownJsonField | string[]>();

    // Expose the "all model" events as constructor properies to be accessed
    // like Model.on(...)
    public static addListener = (event: ModelEventName, listener: ModelEventCallback) => Model.eventsForAllModels.addListener(event, listener);
    /**
     * [EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter)
     * method that registers a callback for model change events.
     *
     * This variant will listen for changes on *all* models. To listen for
     * changes on one specific model use the [model.on instance method](#modelon)
     * @param event "uid", "tags", "nm" or any of the property names of
     * [model.bestSession](#modelbestsession)
     * @param listener A callback to be invoked whenever the property indicated
     * by the event name changes for any model. The callback will be given 3
     * parameters: the model instance that changed, the value of the property
     * before the change, and the value of the property after the change:
     * @example
     * // Print to the console whenever any model's video state changes
     * const mfc = require("MFCAuto");
     * const client = new mfc.Client();
     *
     * mfc.Model.on("vs", (model, before, after) => {
     *      console.log(`${model.nm}'s state changed to ${mfc.STATE[after]}`);
     * });
     *
     * client.connect();
     */
    public static on = (event: ModelEventName, listener: ModelEventCallback) => Model.eventsForAllModels.on(event, listener);
    /**
     * [EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter)
     * method like Model.on but the registered callback is only invoked once,
     * on the first instance of the given event
     * @param event "uid", "tags", "nm" or any of the property names of
     * [model.bestSession](#modelbestsession)
     * @param listener A callback to be invoked whenever the property indicated
     * by the event name changes for any model. The callback will be given 3
     * parameters: the model instance that changed, the value of the property
     * before the change, and the value of the property after the change:
     */
    public static once = (event: ModelEventName, listener: ModelEventCallback) => Model.eventsForAllModels.once(event, listener);
    public static prependListener = (event: ModelEventName, listener: ModelEventCallback) => Model.eventsForAllModels.prependListener(event, listener);
    public static prependOnceListener = (event: ModelEventName, listener: ModelEventCallback) => Model.eventsForAllModels.prependOnceListener(event, listener);
    /**
     * [EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter)
     * method that removes a listener callback previously registered with
     * Model.on or Model.once
     */
    public static removeListener = (event: ModelEventName, listener: ModelEventCallback) => Model.eventsForAllModels.removeListener(event, listener);
    public static removeAllListeners = (event: ModelEventName) => Model.eventsForAllModels.removeAllListeners(event);
    public static getMaxListeners = () => Model.eventsForAllModels.getMaxListeners();
    public static setMaxListeners = (n: number) => Model.eventsForAllModels.setMaxListeners(n);
    public static listeners = (event: ModelEventName) => Model.eventsForAllModels.listeners(event);
    public static emit = (event: ModelEventName, ...args: Array<UnknownJsonField | string[]>) => Model.eventsForAllModels.emit(event, ...args);
    public static eventNames = () => Model.eventsForAllModels.eventNames();
    public static listenerCount = (event: ModelEventName) => Model.eventsForAllModels.listenerCount(event);
    public static rawListeners = (event: ModelEventName) => Model.eventsForAllModels.rawListeners(event);
    // #endregion

    /**
     * Map of all known models that is built up as we receive model
     * information from the server. This should not usually be accessed
     * directly. If you wish to access a specific model, use
     * [Model.getModel](#modelgetmodelid-createifnecessary) instead.
     */
    public static readonly knownModels: Map<number, Model> = new Map();

    /* // Intentionally not a JSDoc so that our doc generator tool ignores this
     * Internal MFCAuto use only
     *
     * Don't construct a Model directly, use Model.getModel(uid)
     * instead as that will retrieve the existing Model instance,
     * if it exists, and properly create and hook up a new Model
     * instance to receive callbacks if it doesn't.
     * @param uid User ID of the model
     * @access private
     * @ignore
     */
    constructor(uid: number) {
        super();
        this.uid = uid;
    }

    /**
     * Retrieves a specific model instance by user id from knownModels, creating
     * the model instance if it does not already exist.
     * @param id Model id of the model to retrieve. It should be a valid model
     * ID. Using client.queryUser is one way to discover a model's ID from her
     * model name. Another, simpler, way is to open a model's chat room as a
     * "Popup" and look at the URL of that room.  In the URL, there will be a
     * portion that says "broadcaster_id=3111899".  That number is that model's
     * ID.
     * @param [createIfNecessary] If the model is not found in Model.knownModels
     * and this value is True, the default, a new model instance will be created
     * for her and returned. If the model is not found and this value is False
     * undefined will be returned.
     * @returns The Model instance for the given model, or undefined if the model
     * does not exist and createIfNecessary was False
     */
    public static getModel(id: string | number, createIfNecessary: boolean = true): Model | undefined {
        if (typeof id === "string") { id = parseInt(id); }
        if (Model.knownModels.has(id)) {
            return Model.knownModels.get(id);
        } else if (createIfNecessary) {
            logl(LogLevel.DEBUG, () => `[MODEL] Creating model ${id}`);
            Model.knownModels.set(id, new Model(id));
            return Model.knownModels.get(id);
        }
        return undefined;
    }

    /**
     * Retrieves a list of models matching the given filter
     * @param filter A filter function that takes a Model instance and returns
     * a boolean indicating whether the model should be returned, True, or not,
     * False
     * @returns An array of Model instances matching the filter function
     */
    public static findModels(filter: (model: Model) => boolean): Model[] {
        const models: Model[] = [];

        Model.knownModels.forEach((m) => {
            if (filter(m)) {
                models.push(m);
            }
        });

        return models;
    }

    /**
     * The most accurate session ID for this model
     *
     * Similar to MfcSessionManager.prototype.determineBestSession
     * picks the most 'correct' session id to use for reporting model
     * status. Basically, if model software is being used, pick the
     * session with the highest sessionid among non-offline sessions
     * where model software is being used.  Otherwise, pick the
     * session with the highest sessionid among all non-offline
     * sessions. Otherwise, if all sessions are offline, return 0.
     * @access private
     */
    get bestSessionId(): number {
        let sessionIdToUse: number = 0;
        let foundModelSoftware: boolean = false;
        this.knownSessions.forEach((sessionObj, sessionId) => {
            if (sessionObj.vs === STATE.Offline) {
                return; // Don't consider offline sessions
            }
            let useThis = false;
            if (sessionObj.model_sw) {
                if (foundModelSoftware) {
                    if (sessionId > sessionIdToUse) {
                        useThis = true;
                    }
                } else {
                    foundModelSoftware = true;
                    useThis = true;
                }
            } else if (!foundModelSoftware && sessionId > sessionIdToUse) {
                useThis = true;
            }
            if (useThis) {
                sessionIdToUse = sessionId;
            }
        });
        return sessionIdToUse;
    }

    /**
     * The most accurate session for this model
     *
     * bestSession can potentially contain any or all of these properties and
     * possibly more as MFC updates its chat protocol
     *
     * |Property name|Type|Description|
     * |---|---|---|
     * |age|number|Model's age, if she specified one
     * |avatar|number|1 if model has an avatar?
     * |basics_muted|number|0 if basics are not muted in the model's room, 1 if they are
     * |blurb|string|The model's bio blurb which shows at the top of their profile and directly under their name in the user menu
     * |camscore|number|The model's current camscore
     * |camserv|number|What video server is currently hosting her stream
     * |chat_bg|number|Chat background color
     * |chat_color|string|Chat color as a hex RGB value
     * |chat_font|number|Chat font represented as an integer indexing into a set list of fonts
     * |city|string|User provided city details (often a lie, there's no validation here)
     * |continent|string|Two letter continent abbreviation such as "EU", "SA", "NA" etc for the model's current IP address based on geo-location data. Note that many models use VPNs so their IP geolocation may not accurately reflect their real world location
     * |country|string|User provided country details (often a lie, but must one of a standard set of real countries)
     * |creation|number|Timestamp of the model's account creation
     * |ethnic|string|Model's user provided ethnicity
     * |fcext_sfw|number| @TODO: unknown (0 for now)
     * |fcext_sm|string| @TODO: unknown ('' for now)
     * |guests_muted|number|0 if guests are not muted in the model's room, 1 if they are
     * |hidecs|boolean|If true, the model is hiding her camscore on the website (.bestSession.camscore will still have her camscore)
     * |kbit|number|This used to contain the upstream bandwidth of the model, but is now always 0
     * |lastnews|number|The timestamp of the model's last newsfeed entry
     * |mg|number| @TODO: unknown (0 for now)
     * |missmfc|number|A number indicating whether a model has been in the top 3 of Miss MFC before or not
     * |lv|number|5 = admin, 4 = model, 2 = premium, 1 = basic, 0 = guest
     * |model_sw|number|1 if the model is logged in to the Model Web Broadcaster or Model Software, 0 if logged in to the homepage
     * |new_model|number|1 if this model is considered "new" and 0 if she isn't
     * |nm|string|The model's current name
     * |occupation|string|Model's user provided occupation
     * |phase|string|"a" for models broadcasting via OBS, "z" otherwise
     * |photos|number|A count of the number of photos on the model's profile
     * |pid|number|1 if this model is on MFC, 2 if she's on CamYou
     * |profile|number|1 if this user has a profile or 0 if not
     * |rank|number|The model's current Miss MFC rank for this month, or 0 if the model is ranked greater than 1000
     * |rc|number|The number of people in the model's room
     * |share_albums|number|Count of albums on MFC Share
     * |share_clubs|number|Count of clubs on MFC Share
     * |share_collections|number|Count of collections on MFC Share
     * |share_follows|number|Count of followers on MFC Share
     * |share_goals|number|Count of goals on MFC Share
     * |share_polls|number|Count of polls on MFC Share
     * |share_stores|number|Count of items on MFC Share (things like SnapChat)
     * |share_things|number|Count of all MFC Share things (albums, collections, clubs, ...)
     * |share_tm_album|number|Timestamp of most recent MFC Share album
     * |sid|number|The model's MFC session ID
     * |status|string| @TODO: unknown ('' for now)
     * |topic|string|The model's current room topic
     * |truepvt|number|If a model is in vs STATE.Private and this value is 1, then that private is a true private. There is no unique state for true private, you have to check both vs and truepvt values.
     * |uid|number|The model's user ID
     * |vs|A number mapping to FCVIDEO (see Contants.ts) or the more friendly form, STATE (see Contants.ts)|The general status of a model (online, offline, away, freechat, private, or groupshow). There are many other status possibilities, but those are the ones you likely care about.
     */
    get bestSession(): ModelSessionDetails {
        let session = this.knownSessions.get(this.bestSessionId);
        if (session === undefined) {
            session = { sid: 0, uid: this.uid, vs: STATE.Offline };
        }
        return session;
    }

    /**
     * Internal MFCAuto use only
     *
     * Merges a new set of tags into this model instance
     * @param newTags Tags to be merged
     * @access private
     */
    public mergeTags(newTags: string[]) {
        logl(LogLevel.TRACE, () => `[MODEL] mergeTags begin: ${JSON.stringify(this.toCore())}`);
        if (Array.isArray(newTags)) {
            const oldTags = this.tags.slice();
            this.tags = Array.from(new Set(this.tags.concat(newTags))).sort();
            this.emit("tags", this, oldTags, this.tags);
            Model.emit("tags", this, oldTags, this.tags);
            this.emit("ANY", this, oldTags, this.tags);
            Model.emit("ANY", this, oldTags, this.tags);
            this.processWhens(newTags);
        }
        logl(LogLevel.TRACE, () => `[MODEL] mergeTags end: ${JSON.stringify(this.toCore())}`);
    }

    /**
     * Internal MFCAuto use only
     *
     * Merges a raw MFC Message into this model's state
     *
     * Also, there are a few bitmasks that are sent as part of the chat messages.
     * Just like StoreUserHash, we will decode thos bitmasks here for convenience
     * as they contain useful information like if a private is a true private or
     * if guests or basics are muted or if the model software is being used.
     * @param msg Message object to be merged
     * @access private
     */
    public merge(msg: Message): void {
        if (typeof msg !== "object") {
            logl(LogLevel.DEBUG, () => `[MODEL] merge received an invalid message ${this.uid}`);
            return;
        } else {
            msg = Object.assign({}, msg);
        }
        logl(LogLevel.TRACE, () => `[MODEL] merge begin: ${JSON.stringify(this.toCore())}`);

        // Find the session being updated by this message
        const previousSession = this.bestSession;
        const currentSessionId = msg.sid !== undefined ? msg.sid : 0;
        if (!this.knownSessions.has(currentSessionId)) {
            this.knownSessions.set(currentSessionId, { sid: currentSessionId, uid: this.uid, vs: STATE.Offline });
        }
        const currentSession = this.knownSessions.get(currentSessionId) as ModelSessionDetails;

        const callbackStack: mergeCallbackPayload[] = [];

        // Merge the updates into the correct session
        assert.notStrictEqual(msg, undefined);
        assert.ok(msg.uid === undefined || this.uid === msg.uid, "Merging a message meant for a different model!: " + JSON.stringify(msg));

        // If we got a level update
        if (msg.lv !== undefined) {
            // from a non-model
            if (msg.lv !== FCLEVEL.MODEL) {
                assert.notStrictEqual(previousSession.lv, FCLEVEL.MODEL, `A model changed from FCLEVEL.MODEL to ${FCLEVEL[msg.lv]} (${msg.lv})? Should not be possible and indicates a serious bug!`);
                logl(LogLevel.DEBUG, () => `[MODEL] merge found that ${this.uid} was a level ${previousSession.lv} and not a model, unlinking`);

                // Clear any registered callbacks and remove this member from
                // the global registry.
                this.removeAllListeners();
                this.whenMap.clear();
                Model.knownModels.delete(this.uid);
                return;
            }
        }

        for (const key in msg) {
            // Rip out the sMessage.u|m|s properties and put them on the session at
            // the top level.  This allows for listening on simple event
            // names like 'rank' or 'camscore'.
            if (key === "u" || key === "m" || key === "s") {
                const details = msg[key];
                if (typeof details === "object") {
                    for (const key2 in details) {
                        if (!details.hasOwnProperty(key2)) {
                            continue;
                        }
                        callbackStack.push({ prop: key2, oldstate: previousSession[key2], newstate: details[key2] });
                        currentSession[key2] = details[key2];
                        if (key === "m" && key2 === "flags") {
                            const rawFlags = (details as ModelDetailsMessage).flags;
                            if (rawFlags !== undefined) {
                                currentSession.truepvt = ((rawFlags & FCOPT.TRUEPVT) !== 0) ? 1 : 0;
                                currentSession.guests_muted = ((rawFlags & FCOPT.GUESTMUTE) !== 0) ? 1 : 0;
                                currentSession.basics_muted = ((rawFlags & FCOPT.BASICMUTE) !== 0) ? 1 : 0;
                                currentSession.model_sw = ((rawFlags & FCOPT.MODELSW) !== 0) ? 1 : 0;
                                // @TODO - @BUGBUG - We should be firing change events for these fields too
                            }
                        }
                    }
                } else {
                    assert.strictEqual(typeof details, "object", "Malformed Message? " + JSON.stringify(msg));
                }
            } else if (key === "x") {
                const sites = msg[key];
                if (typeof sites === "object") {
                    for (const key2 in sites) {
                        if (!sites.hasOwnProperty(key2)) {
                            continue;
                        }
                        if (typeof sites[key2] === "object") {
                            const siteObject = sites[key2] as MfcShareDetailsMessage;
                            for (const key3 in siteObject) {
                                if (!siteObject.hasOwnProperty(key3)) {
                                    continue;
                                }
                                // This code will result in bestSession properties like
                                // share_albums or share_clubs for MFCShare and equivalent
                                // properties for any other sites MFC starts reporting on
                                // via model sessions states.
                                const newProp = key2 + "_" + key3;
                                callbackStack.push({ prop: newProp, oldstate: previousSession[newProp], newstate: siteObject[key3] });
                                currentSession[newProp] = siteObject[key3];
                            }
                        } else {
                            assert.strictEqual(typeof sites[key2], "object", "Malformed Message? " + JSON.stringify(msg));
                        }
                    }
                } else {
                    assert.strictEqual(typeof sites, "object", "Malformed Message? " + JSON.stringify(msg));
                }
            } else {
                callbackStack.push({ prop: key, oldstate: previousSession[key], newstate: msg[key] });
                currentSession[key] = msg[key];
            }
        }

        // If our "best" session has changed to a new session, the above
        // will capture any changed or added properties, but not the removed
        // properties, so we'll add callbacks for removed properties here...
        if (currentSession.sid !== previousSession.sid) {
            Object.getOwnPropertyNames(previousSession).forEach((name) => {
                if (!currentSession.hasOwnProperty(name)) {
                    callbackStack.push({ prop: name, oldstate: previousSession[name], newstate: undefined });
                }
            });
        }

        // If, after all the changes have been applied, this new session is our "best" session,
        // fire our change events.
        //
        // Otherwise, if this isn't the "best" session and one we should use for all-up reporting,
        // and the changes are not part of the "last" session (meaning after merging this msg from a real
        // session, if .bestSession is the fake sid===0 session, then this current session was the last
        // online session) then the changes aren't relevant and shouldn't be sent as notifications.
        if (this.bestSessionId === currentSession.sid || (this.bestSessionId === 0 && currentSession.sid !== 0)) {
            if (this.bestSession.nm !== this.nm && this.bestSession.nm !== undefined) {
                // Promote any name changes to a top level property on this
                // This is a mild concession to my .bestSession refactoring in
                // MFCAuto 2.0.0, which fixes the primary break in most of my
                // scripts.
                this.nm = this.bestSession.nm;
            }
            callbackStack.forEach((item: mergeCallbackPayload) => {
                // But only if the state has changed. Otherwise the event is not really
                // very useful, and, worse, it's very noisy in situations where you have
                // multiple connected Client objects all updating the one true model
                // registry with duplicated SESSIONSTATE events
                if (item.oldstate !== item.newstate) {
                    this.emit(item.prop as ModelEventName, this, item.oldstate, item.newstate);
                    Model.emit(item.prop as ModelEventName, this, item.oldstate, item.newstate);
                }
            });

            // Also fire a generic ANY event signifying an generic update. This
            // event has different callback arguments than the other Model events,
            // it receives this model instance and the Message that changed the
            // instance.
            this.emit("ANY", this, msg);
            Model.emit("ANY", this, msg);

            // And also process any registered .when callbacks
            this.processWhens(msg);
        }

        this.purgeOldSessions();
        logl(LogLevel.TRACE, () => `[MODEL] merge end: ${JSON.stringify(this.toCore())}`);
    }

    /**
     * Internal MFCAuto use only
     *
     * Removes old sessions that have gone offline
     * @access private
     */
    private purgeOldSessions(): void {
        // Session IDs will be in insertion order, first seen to latest (if the implementation follows the ECMAScript spec)
        const sids: Array<number> = Array.from(this.knownSessions.keys());
        const that = this;
        sids.forEach((sid) => {
            const session = that.knownSessions.get(sid);
            if (session !== undefined && (session.vs === undefined || session.vs === FCVIDEO.OFFLINE)) {
                that.knownSessions.delete(sid);
            }
        });
    }

    /**
     * Resets this model's state to the offline default
     *
     * This is primarily used when the connection to MFC's servers
     * is lost and we can no longer guarantee the state of any model
     * we had previously marked as being online.
     * @access private
     */
    public reset(): void {
        // Set all online sessions that are not the bestSession to offline
        this.knownSessions.forEach((details) => {
            if (details.sid !== this.bestSessionId && details.vs !== FCVIDEO.OFFLINE) {
                details.vs = FCVIDEO.OFFLINE;
            }
        });

        // Merge an empty offline message into bestSession so that all the registered
        // event handlers for .bestSession property changes will be fired and user
        // scripts will have a chance to know they need to re-join rooms, etc, when
        // the connection is restored.
        this.merge({ sid: this.bestSessionId, uid: this.uid, vs: FCVIDEO.OFFLINE });
    }

    /**
     * Resets all models to offline
     * @access private
     */
    public static reset(): void {
        Model.knownModels.forEach((m) => {
            m.reset();
        });
    }

    /**
     * Registers callback for when any Model starts matching a specific
     * condition and, optionally, when they then stop matching the
     * condition
     * @param condition Function that takes a Model instance and returns
     * true if she matches the target condition, false if she doesn't
     * @param onTrue Function that will be invoked when a model starts
     * matching the condition. It is given the Model instance and the
     * message that caused her to start matching the condition as
     * parameters
     * @param [onFalseAfterTrue] If not left undefined, this Function will
     * be invoked when a model that was previously matching the condition
     * stops matching the condition.
     * @example
     * mfc.Model.when(
     *     (m) => m.bestSession.rc > 2000,
     *     (m) => console.log(`${m.nm} has over 2000 viewers!`),
     *     (m) => console.log(`${m.nm} no longer has over 2000 viewers`)
     * );
     */
    public static when(condition: whenFilter, onTrue: whenCallback, onFalseAfterTrue?: whenCallback): void {
        Model.whenMap.set(condition, { onTrue: onTrue, onFalseAfterTrue: onFalseAfterTrue, matchedSet: new Set() });
    }

    /**
     * Removes a when callback previously registered with Model.when
     * @param condition A Function that had previously been registered
     * as a condition filter
     * @returns True if the given function was successfully removed,
     * false if it was not found as a registered when callback
     */
    public static removeWhen(condition: whenFilter): boolean {
        return Model.whenMap.delete(condition);
    }

    /**
     * Registers callback for when this model when starts matching a
     * specific condition and, optionally, when she then stops matching the
     * condition
     * @param condition Function that takes a Model instance and returns
     * true if she matches the target condition, false if she doesn't
     * @param onTrue Function that will be invoked when this model starts
     * matching the condition. It is given the model instance and the
     * message that caused her to start matching the condition as
     * parameters
     * @param [onFalseAfterTrue] If not left undefined, this Function will
     * be invoked when this model was previously matching the condition
     * and has stopped matching the condition.
     * @example
     * const AspenRae = mfc.Model.getModel(3111899);
     * AspenRae.when(
     *     (m) => m.bestSession.vs !== mfc.STATE.Offline,
     *     (m) => console.log('AspenRae has logged on!'),
     *     (m) => console.log('AspenRae has logged off')
     * )
     */
    public when(condition: whenFilter, onTrue: whenCallback, onFalseAfterTrue?: whenCallback): void {
        this.whenMap.set(condition, { onTrue: onTrue, onFalseAfterTrue: onFalseAfterTrue, matchedSet: new Set() });
        this.processWhens();
    }

    /**
     * Removes a when callback previously registered with model.when
     * @param condition A Function that had previously been registered
     * as a condition filter
     * @returns True if the given function was successfully removed,
     * false if it was not found as a registered when callback
     */
    public removeWhen(condition: whenFilter): boolean {
        return this.whenMap.delete(condition);
    }

    /**
     * Internal MFCAuto use only
     *
     * Handles all the .when callbacks after merging
     * any changes into this model instance
     * @param payload The Message or tag array that was
     * just merged into this model instance
     * @access private
     */
    private processWhens(payload?: Message | string[]): void {
        const processor = (actions: whenMapEntry, condition: whenFilter) => {
            if (condition(this)) {
                // Only if we weren't previously matching this condition
                if (!actions.matchedSet.has(this.uid)) {
                    actions.matchedSet.add(this.uid);
                    actions.onTrue(this, payload);
                }
            } else {
                // Only if we were previously matching this condition
                // and we have an onFalseAfterTrue callback
                if (actions.matchedSet.delete(this.uid) && actions.onFalseAfterTrue !== undefined) {
                    actions.onFalseAfterTrue(this, payload);
                }
            }
        };
        this.whenMap.forEach(processor);
        Model.whenMap.forEach(processor);
    }

    /**
     * Retrieves social media details for this model. This
     * will include any Twitter or Instagram account she has
     * listed with MFC as well as some basic MFC Share details
     * @returns A promise that resolves with a ModelSocialMedia
     * object or undefined
     */
    public async getSocialMedia(): Promise<ModelSocialMedia | undefined> {
        let rawContents: string = "";
        const url = `https://api.myfreecams.com/social_media/${this.uid}?&no_cache=${Math.random()}`;
        try {
            rawContents = await request(url).promise() as string;
            // tslint:disable-next-line:no-unsafe-any
            let result: ModelSocialMedia | undefined = JSON.parse(rawContents).result;
            // tslint:disable-next-line:no-null-keyword
            if (result === null) {
                result = undefined;
            }
            return result;
        } catch (e) {
            const contentsLogLimit = 80;
            logl(LogLevel.WARNING, () => `getSocialMedia error: ${e} - '${url}'\n\t${rawContents.slice(0, contentsLogLimit)}...`);
            return undefined;
        }
    }

    private toCore(): object {
        return {
            uid: this.uid,
            nm: this.nm,
            bestSessionId: this.bestSessionId,
            bestSession: this.bestSession,
            tags: this.tags,
        };
    }

    public toString(): string {
        // tslint:disable-next-line:no-null-keyword
        return JSON.stringify(this.toCore(), null, 4);
    }
}

export type ModelEventCallback = (model: Model, before: UnknownJsonField | string[] | boolean, after: UnknownJsonField | string[] | boolean) => void;
export type whenFilter = (m: Model) => boolean;
export type whenCallback = (m: Model, p?: Message | string[]) => void;
interface whenMapEntry {
    onTrue: whenCallback;
    onFalseAfterTrue?: whenCallback;
    matchedSet: Set<number>;
}
interface mergeCallbackPayload { prop: string; oldstate: UnknownJsonField | string[]; newstate: UnknownJsonField | string[]; }
export interface ModelSessionDetails extends BaseMessage, ModelDetailsMessage, UserDetailsMessage, SessionDetailsMessage {
    model_sw?: number;
    truepvt?: number;
    guests_muted?: number;
    basics_muted?: number;
    share_albums?: number;
    share_follows?: number;
    share_clubs?: number;
    share_collections?: number;
    share_stores?: number;
    share_tm_album?: number;
    [index: string]: UnknownJsonField;
}

/**
 * Known model events
 *
 * This may not be a complete set, and serves only as a general
 * guide to prevent common mistakes like typos and to ease
 * development through better intellisense. If MFC starts sending
 * new, previously unknown, properties as part of the model
 * session details, those properties will automatically be merged
 * into sessions and events will be fired for them.
 *
 * For TypeScript compilation purposes, if you're sure an event
 * is present, use a type assertion to avoid compile errors.
 */
export type ModelEventName = "sid" | "uid" | "pid" | "lv" | "nm" | "vs" | "msg" | "age" | "avatar" | "blurb" | "camserv" | "chat_bg" | "chat_color" | "chat_font" | "chat_opt" | "city" | "country" | "creation" | "ethnic" | "occupation" | "photos" | "profile" | "camscore" | "continent" | "flags" | "kbit" | "lastnews" | "mg" | "missmfc" | "new_model" | "rank" | "rc" | "topic" | "hidecs" | "sfw" | "model_sw" | "truepvt" | "guests_muted" | "basics_muted" | "share_albums" | "share_follows" | "share_clubs" | "share_collections" | "share_stores" | "share_tm_album" | "tags" | "ANY";

/**
 * Social media details for a model
 */
export interface ModelSocialMedia {
    twitter_username?: string;
    instagram_username?: string;
    mfc_share?: {
        user_id: number;
        user_name: string;
        view_count: number;
        follower_count: number;
        follower_count_day: number;
        follower_count_week: number;
        follower_count_month: number;
        album_count: number;
        album_last_created_at: string;
    };
}
