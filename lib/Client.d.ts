/// <reference types="node" />
import { EventEmitter } from "events";
import * as constants from "./Constants";
import { Model } from "./Model";
import { Packet } from "./Packet";
import * as messages from "./sMessages";
/**
 * Connection state of the client
 * @access private
 */
export declare const ClientState: {
    IDLE: "IDLE";
    PENDING: "PENDING";
    ACTIVE: "ACTIVE";
};
/**
 * Creates and maintains a connection to MFC chat servers
 *
 * Client instances are [NodeJS EventEmitters](https://nodejs.org/api/all.html#events_class_eventemitter)
 * and will emit an event every time a Packet is received from the server. The
 * event will be named after the FCType of the Packet. See
 * [FCTYPE in ./src/main/Constants.ts](https://github.com/Damianonymous/MFCAuto/blob/master/src/main/Constants.ts#L350)
 * for the complete list of possible events.
 *
 * Listening for Client events is an advanced feature and requires some
 * knowledge of MFC's chat server protocol, which will not be documented here.
 * Where possible, listen for events on [Model](#Model) instead.
 */
export declare class Client extends EventEmitter {
    /** Session ID assigned to this client by the server after login */
    sessionId: number;
    /**
     * username used to log in to MFC, or, if the username was
     * left as "guest" then the server will have randomly generated
     * a new name for us like "Guest12345" and this value will
     * be updated to reflect that
     */
    username: string;
    /** hashed password used by this client to log in */
    password: string;
    /** User ID assigned to the currently logged in user */
    uid: number | undefined;
    stream_cxid?: number;
    stream_password?: string;
    stream_vidctx?: string;
    private _state;
    private _choseToLogIn;
    private _completedModels;
    private _completedTags;
    private readonly _options;
    private readonly _baseUrl;
    serverConfig: ServerConfig | undefined;
    private _streamBuffer;
    private _streamWebSocketBuffer;
    private _streamPosition;
    private _emoteParser;
    private _client;
    private _keepAliveTimer;
    private _manualDisconnect;
    private _reconnectTimer?;
    private static _userQueryId;
    private _currentConnectionStartTime?;
    private _lastPacketTime?;
    private _lastStatePacketTime?;
    private static _connectedClientCount;
    private static readonly _initialReconnectSeconds;
    private static readonly _reconnectBackOffMultiplier;
    private static readonly _maximumReconnectSeconds;
    private static _currentReconnectSeconds;
    private static readonly webSocketNoiseFilter;
    /**
     * Client constructor
     * @param [username] Either "guest" or a real MFC member account name, default is "guest"
     * @param [password] Either "guest" or, to log in with a real account the password
     * should be a hash of your real password and NOT your actual plain text
     * password. You can discover the appropriate string to use by checking your browser
     * cookies after logging in via your browser.  In Firefox, go to Options->Privacy
     * and then "Show Cookies..." and search for "myfreecams".  You will see one
     * cookie named "passcode". Select it and copy the value listed as "Content".
     * It will be a long string of lower case letters that looks like gibberish.
     * *That* is the password to use here.
     * @param [options] A ClientOptions object detailing several optional Client settings
     * like whether to use WebSockets or traditional TCP sockets and whether to connect
     * to MyFreeCams.com or CamYou.com
     * @example
     * const mfc = require("MFCAuto");
     * const guestMFCClient = new mfc.Client();
     * const premiumMFCClient = new mfc.Client(premiumUsername, premiumPasswordHash);
     * const guestMFCFlashClient = new mfc.Client("guest", "guest", {useWebSockets: false});
     * const guestCamYouClient = new mfc.Client("guest", "guest", {camYou: true});
     * const guestCamYouFlashClient = new mfc.Client("guest", "guest", {useWebSockets: false, camYou: true});
     */
    constructor(username?: string, password?: string, options?: boolean | ClientOptions);
    addListener(event: ClientEventName, listener: ClientEventCallback): this;
    /**
     * [EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter) method
     * See [FCTYPE in ./src/main/Constants.ts](https://github.com/Damianonymous/MFCAuto/blob/master/src/main/Constants.ts#L350) for all possible event names
     */
    on(event: ClientEventName, listener: ClientEventCallback): this;
    /**
     * [EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter) method
     * See [FCTYPE in ./src/main/Constants.ts](https://github.com/Damianonymous/MFCAuto/blob/master/src/main/Constants.ts#L350) for all possible event names
     */
    once(event: ClientEventName, listener: ClientEventCallback): this;
    prependListener(event: ClientEventName, listener: ClientEventCallback): this;
    prependOnceListener(event: ClientEventName, listener: ClientEventCallback): this;
    /**
     * [EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter) method
     * See [FCTYPE in ./src/main/Constants.ts](https://github.com/Damianonymous/MFCAuto/blob/master/src/main/Constants.ts#L350) for all possible event names
     */
    removeListener(event: ClientEventName, listener: ClientEventCallback): this;
    removeAllListeners(event?: ClientEventName): this;
    getMaxListeners(): number;
    setMaxListeners(n: number): this;
    listeners(event: ClientEventName): ClientEventCallback[];
    emit(event: ClientEventName, ...args: Array<Packet | Boolean>): boolean;
    eventNames(): ClientEventName[];
    listenerCount(type: ClientEventName): number;
    rawListeners(event: ClientEventName): ClientEventCallback[];
    /**
     * Current server connection state:
     * - IDLE: Not currently connected to MFC and not trying to connect
     * - PENDING: Actively trying to connect to MFC but not currently connected
     * - ACTIVE: Currently connected to MFC
     *
     * If this client is PENDING and you wish to wait for it to enter ACTIVE,
     * use [client.ensureConnected](#clientensureconnectedtimeout).
     */
    readonly state: ClientStates;
    /**
     * How long the current client has been connected to a server
     * in milliseconds. Or 0 if this client is not currently connected
     */
    readonly uptime: number;
    /**
     * Internal MFCAuto use only
     *
     * Reads data from the socket as quickly as possible and stores it in an internal buffer
     * readData is invoked by the "on data" event of the net.Socket object currently handling
     * the TCP connection to the MFC servers.
     * @param buf New Buffer to read from
     * @access private
     */
    private _readData(buf);
    /**
     * Internal MFCAuto use only
     *
     * Reads data from the websocket as quickly as possible and stores it in an internal string
     * readWebSocketData is invoked by the "message" event of the WebSocket object currently
     * handling the connection to the MFC servers.
     * @param buf New string to read from
     * @access private
     */
    private _readWebSocketData(buf);
    /**
     * Internal MFCAuto use only
     *
     * Called with a single, complete, packet. This function processes the packet,
     * handling some special packets like FCTYPE_LOGIN, which gives our user name and
     * session ID when first logging in to mfc. It then calls out to any registered
     * event handlers.
     * @param packet Packet to be processed
     * @access private
     */
    private _packetReceived(packet);
    /**
     * Internal MFCAuto use only
     *
     * Parses the incoming MFC stream buffer from a socket connection. For each
     * complete individual packet parsed, it will call packetReceived. Because
     * of the single-threaded async nature of node.js, there will often be partial
     * packets and this needs to handle that gracefully, only calling packetReceived
     * once we've parsed out a complete response.
     * @access private
     */
    private _readPacket();
    /**
     * Internal MFCAuto use only
     *
     * Parses the incoming MFC data string from a WebSocket connection. For each
     * complete individual packet parsed, it will call packetReceived.
     * @access private
     */
    private _readWebSocketPacket();
    /**
     * Internal MFCAuto use only
     *
     * Incoming FCTYPE.EXTDATA messages are signals to request additional
     * data from an external REST API. This helper function handles that task
     * and invokes packetReceived with the results of the REST call
     * @param extData An ExtDataMessage
     * @returns A promise that resolves when data has been retrieves from
     * the web API and packetReceived has completed
     * @access private
     */
    private _handleExtData(extData);
    /**
     * Processes the .rdata component of an FCTYPE.MANAGELIST server packet
     *
     * MANAGELIST packets are used by MFC for bulk dumps of data. For instance,
     * they're used when you first log in to send the initial lists of online
     * models, and when you first join a room to send the initial lists of
     * other members in the room.
     *
     * If an MFCAuto consumer script wants to intercept and interpret details
     * like that, it will need to listen for "MANAGELIST" events emitted from
     * the client instance and process the results using this function.
     *
     * Most of the details are encoded in the .rdata element of the ManageListMessage
     * and its format is cumbersome to deal with. This function handles the insanity.
     * @param rdata rdata property off a received ManageListMessage
     * @returns Either a list of Message elements, most common, or an
     * FCTypeTagsResponse, which is an object containing tag information for
     * one or more models.
     * @access private
     */
    processListData(rdata: Array<Array<string | number | object>> | messages.FCTypeTagsResponse): Array<messages.Message> | messages.FCTypeTagsResponse;
    /**
     * Encodes raw chat text strings into a format the MFC servers understand
     * @param rawMsg A chat string like `I am happy :mhappy`
     * @returns A promise that resolve with the translated text like
     * `I am happy #~ue,2c9d2da6.gif,mhappy~#`
     * @access private
     */
    encodeRawChat(rawMsg: string): Promise<string>;
    /**
     * Internal MFCAuto use only
     *
     * Dynamically loads script code from MFC, massaging it with the given massager
     * function first, and then passes the resulting instantiated object to the
     * given callback.
     *
     * We try to use this sparingly as it opens us up to breaks from site changes.
     * But it is still useful for the more complex or frequently updated parts
     * of MFC.
     * @param url URL from which to load the site script
     * @param massager Post-processor function that takes the raw site script and
     * converts/massages it to a usable form.
     * @returns A promise that resolves with the object loaded from site code
     * @access private
     */
    private _loadFromMFC(url, massager?);
    /**
     * Internal MFCAuto use only
     *
     * Loads the emote parsing code from the MFC web site directly, if it's not
     * already loaded, and then invokes the given callback.  This is useful because
     * most scripts won't actually need the emote parsing capabilities, so lazy
     * loading it can speed up the common case.
     *
     * We're loading this code from the live site instead of re-coding it ourselves
     * here because of the complexity of the code and the fact that it has changed
     * several times in the past.
     * @returns A promise that resolves when this.emoteParser has been initialized
     * @access private
     */
    private _ensureEmoteParserIsLoaded();
    /**
     * Internal MFCAuto use only
     *
     * Loads the lastest server information from MFC, if it's not already loaded
     * @returns A promise that resolves when this.serverConfig has been initialized
     * @access private
     */
    private _ensureServerConfigIsLoaded();
    /**
     * Sends a command to the MFC chat server. Don't use this unless
     * you really know what you're doing.
     * @param nType FCTYPE of the message
     * @param nTo Number representing the channel or entity the
     * message is for. This is often left as 0.
     * @param nArg1 First argument of the message. Its meaning varies
     * depending on the FCTYPE of the message. Often left as 0.
     * @param nArg2 Second argument of the message. Its meaning
     * varies depending on the FCTYPE of the message. Often left as 0.
     * @param sMsg Payload of the message. Its meaning varies depending
     * on the FCTYPE of the message and is sometimes is stringified JSON.
     * Most often this should remain undefined.
     */
    TxCmd(nType: constants.FCTYPE, nTo?: number, nArg1?: number, nArg2?: number, sMsg?: string): void;
    /**
     * Sends a command to the MFC chat server. Don't use this unless
     * you really know what you're doing.
     * @param packet Packet instance encapsulating the command to be sent
     */
    TxPacket(packet: Packet): void;
    /**
     * Takes a number that might be a user id or a room id and converts
     * it to a user id (if necessary). The functionality here maps to
     * MFC's GetRoomOwnerId() within top.js
     * @param id A number that is either a model ID or room/channel ID
     * @returns The model ID corresponding to the given id
     */
    static toUserId(id: number): number;
    /**
     * Takes a number that might be a user id or a room id and converts
     * it to a room id (if necessary)
     * @param id A number that is either a model ID or a room/channel ID
     * @param [camYou] True if the ID calculation should be done for
     * CamYou.com. False if the ID calculation should be done for MFC.
     * Default is False
     * @returns The free chat room/channel ID corresponding to the given ID
     */
    static toRoomId(id: number, camYou?: boolean): number;
    /**
     * Send chat to a model's public chat room
     *
     * If the message is one you intend to send more than once,
     * and your message contains emotes, you can save some processing
     * overhead by calling client.encodeRawChat once for the string,
     * caching the result of that call, and passing that string here.
     *
     * Note that you must have previously joined the model's chat room
     * for the message to be sent successfully.
     * @param id Model or room/channel ID to send the chat to
     * @param msg Text to be sent, can contain emotes
     * @returns A promise that resolves after the text has
     * been sent to the server. There is no check on success and
     * the message may fail to be sent if you are muted or ignored
     * by the model
     */
    sendChat(id: number, msg: string): Promise<void>;
    /**
     * Send a PM to the given model or member
     *
     * If the message is one you intend to send more than once,
     * and your message contains emotes, you can save some processing
     * overhead by calling client.encodeRawChat once for the string,
     * caching the result of that call, and passing that string here.
     * @param id Model or member ID to send the PM to
     * @param msg Text to be sent, can contain emotes
     * @returns A promise that resolves after the text has
     * been sent to the server. There is no check on success and
     * the message may fail to be sent if you are muted or ignored
     * by the model or member
     */
    sendPM(id: number, msg: string): Promise<void>;
    /**
     * Joins the public chat room of the given model
     * @param id Model ID or room/channel ID to join
     * @returns A promise that resolves after successfully
     * joining the chat room and rejects if the join fails
     * for any reason (you're banned, region banned, or
     * you're a guest and the model is not online)
     */
    joinRoom(id: number): Promise<Packet>;
    /**
     * Leaves the public chat room of the given model
     * @param id Model ID or room/channel ID to leave
     * @returns A promise that resolves immediately
     */
    leaveRoom(id: number): Promise<void>;
    /**
     * Queries MFC for the latest state of a model or member
     *
     * This method does poll the server for the latest model status, which can
     * be useful in some situations, but it is **not the quickest way to know
     * when a model's state changes**. Instead, to know the instant a model
     * enters free chat, keep a Client connected and listen for changes on her
     * Model instance. For example:
     *
     *   ```javascript
     *   // Register a callback whenever AspenRae's video
     *   // state changes
     *   mfc.Model.getModel(3111899)
     *     .on("vs", (model, before, after) => {
     *       // This will literally be invoked faster than
     *       // you would see her cam on the website.
     *       // There is no faster way.
     *       if (after === mfc.STATE.FreeChat) {
     *         // She's in free chat now!
     *       }
     *   });
     *   ```
     * @param user Model or member name or ID
     * @returns A promise that resolves with a Message
     * containing the user's current details or undefined
     * if the given user was not found
     * @example
     * // Query a user, which happens to be a model, by name
     * client.queryUser("AspenRae").then((msg) => {
     *     if (msg === undefined) {
     *         console.log("AspenRae probably temporarily changed her name");
     *     } else {
     *         //Get the full Model instance for her
     *         let AspenRae = mfc.Model.getModel(msg.uid);
     *         //Do stuff here...
     *     }
     * });
     *
     * // Query a user by ID number
     * client.queryUser(3111899).then((msg) => {
     *     console.log(JSON.stringify(msg));
     *     //Will print something like:
     *     //  {"sid":0,"uid":3111899,"nm":"AspenRae","lv":4,"vs":127}
     * });
     *
     * // Query a member by name and check their status
     * client.queryUser("MyPremiumMemberFriend").then((msg) => {
     *     if (msg) {
     *         if (msg.vs !== mfc.STATE.Offline) {
     *             console.log("My friend is online!");
     *         } else {
     *             console.log("My friend is offline");
     *         }
     *     } else {
     *         console.log("My friend no longer exists by that name");
     *     }
     * });
     *
     * // Force update a model's status, without caring about the result here
     * // Potentially useful when your logic is in model state change handlers
     * client.queryUser(3111899);
     */
    queryUser(user: string | number): Promise<messages.Message>;
    /**
     * Connects to MFC
     *
     * Logging in is optional because not all queries to the server require you to log in.
     * For instance, MFC servers will respond to a USERNAMELOOKUP request without
     * requiring a login. However for most cases you probably do want to log in.
     * @param [doLogin] If True, log in with the credentials provided at Client construction.
     * If False, do not log in. Default is True
     * @returns A promise that resolves when the connection has been established
     * @example <caption>Most common case is simply to connect, log in, and start processing events</caption>
     * const mfc = require("MFCAuto");
     * const client = new mfc.Client();
     *
     * // Set up any desired callback hooks here using one or more of:
     * //   - mfc.Model.on(...) - to handle state changes for all models
     * //   - mfc.Model.getModel(...).on(...) - to handle state changes for only
     * //     the specific model retrieved via the .getModel call
     * //   - client.on(...) - to handle raw MFC server events, this is advanced
     *
     * // Then connect so that those events start processing.
     * client.connect();
     * @example <caption>If you need some logic to run after connection, use the promise chain</caption>
     * const mfc = require("MFCAuto");
     * const client = new mfc.Client();
     * client.connect()
     *      .then(() => {
     *          // Do whatever requires a connection here
     *      })
     *      .catch((reason) => {
     *          // Something went wrong
     *      });
     */
    connect(doLogin?: boolean): Promise<void>;
    /**
     * Internal MFCAuto use only
     *
     * Keeps the server collection alive by regularly sending NULL 'pings'.
     * Also monitors the connection to ensure traffic is flowing and kills
     * the connection if not. A setInterval loop calling this function is
     * creating when a connection is established and cleared on disconnect
     * @access private
     */
    private _keepAlive();
    /**
     * Internal MFCAuto use only
     *
     * Helper utility that sets up a timer which will disconnect this client
     * after the given amount of time, if at least one instance of the given
     * packet type isn't received before then. Mainly used as a LOGIN timeout
     *
     * If the client disconnects on it own before the timer is up, no action
     * is taken
     * @param fctype
     * @param after
     * @param msg
     * @access private
     */
    private _disconnectIfNo(fctype, after, msg);
    /**
     * Returns a Promise that resolves when we have an active connection to the
     * server, which may be instantly or may be hours from now.
     *
     * When Client.connect (or .connectAndWaitForModels) is called, Client
     * will initiate a connection the MFC's chat servers and then try to
     * maintain an active connection forever. Of course, network issues happen
     * and the server connection may be lost temporarily. Client will try to
     * reconnect. However, many of the advanced features of Client, such as
     * .joinRoom, .sendChat, or .TxCmd, require an active connection and will
     * throw if there is not one at the moment.
     *
     * This is a helper function for those cases.
     *
     * This function does not *cause* connection or reconnection.
     * @param [timeout] Wait maximally this many milliseconds
     * Leave undefined for infinite, or set to -1 for no waiting.
     * @returns A Promise that resolves when a connection is present, either
     * because we were already connected or because we succeeded in our
     * reconnect attempt, and rejects when either the given timeout is reached
     * or client.disconnect() is called before we were able to establish a
     * connection. It also rejects if the user has not called .connect at all
     * yet.
     */
    ensureConnected(timeout?: number): Promise<void>;
    /**
     * Internal MFCAuto use only
     *
     * Called by internal components when it's detected that we've lost our
     * connection to the server. It handles some cleanup tasks and the
     * reconnect logic. Users should definitely not be calling this function.
     * @access private
     */
    private _disconnected(reason);
    /**
     * Logs in to MFC. This should only be called after Client connect(false);
     * See the comment on Client's constructor for details on the password to use.
     */
    login(username?: string, password?: string): void;
    /**
     * Connects to MFC and logs in, just like this.connect(true),
     * but in this version the returned promise resolves when the initial
     * list of online models has been fully populated.
     * If you're logged in as a user with friended models, this will
     * also wait until your friends list is completely loaded.
     *
     * This method always logs in, because MFC servers won't send information
     * for all online models until you've logged as at least a guest.
     * @returns A promise that resolves when the model list is complete
     */
    connectAndWaitForModels(): Promise<void>;
    /**
     * Disconnects a connected client instance
     * @returns A promise that resolves when the disconnect is complete
     */
    disconnect(): Promise<void>;
    /**
     * Pretty much what you think it is...
     * Most everyone already knows this logic, the new thing here is
     * support the high def (1080p) OBS based streams. A new feature
     * on MFC as of 2018/03/23.
     * @param model
     */
    getHlsUrl(model: Model | number): string | undefined;
}
export declare type ClientEventCallback = ((packet: Packet) => void) | (() => void);
/** Possible Client states */
export declare type ClientStates = "IDLE" | "PENDING" | "ACTIVE";
/** Possible Client events */
export declare type ClientEventName = "CLIENT_MANUAL_DISCONNECT" | "CLIENT_DISCONNECTED" | "CLIENT_MODELSLOADED" | "CLIENT_CONNECTED" | "ANY" | "UNKNOWN" | "NULL" | "LOGIN" | "ADDFRIEND" | "PMESG" | "STATUS" | "DETAILS" | "TOKENINC" | "ADDIGNORE" | "PRIVACY" | "ADDFRIENDREQ" | "USERNAMELOOKUP" | "ZBAN" | "BROADCASTNEWS" | "ANNOUNCE" | "MANAGELIST" | "INBOX" | "GWCONNECT" | "RELOADSETTINGS" | "HIDEUSERS" | "RULEVIOLATION" | "SESSIONSTATE" | "REQUESTPVT" | "ACCEPTPVT" | "REJECTPVT" | "ENDSESSION" | "TXPROFILE" | "STARTVOYEUR" | "SERVERREFRESH" | "SETTING" | "BWSTATS" | "TKX" | "SETTEXTOPT" | "SERVERCONFIG" | "MODELGROUP" | "REQUESTGRP" | "STATUSGRP" | "GROUPCHAT" | "CLOSEGRP" | "UCR" | "MYUCR" | "SLAVECON" | "SLAVECMD" | "SLAVEFRIEND" | "SLAVEVSHARE" | "ROOMDATA" | "NEWSITEM" | "GUESTCOUNT" | "PRELOGINQ" | "MODELGROUPSZ" | "ROOMHELPER" | "CMESG" | "JOINCHAN" | "CREATECHAN" | "INVITECHAN" | "KICKCHAN" | "QUIETCHAN" | "BANCHAN" | "PREVIEWCHAN" | "SHUTDOWN" | "LISTBANS" | "UNBAN" | "SETWELCOME" | "CHANOP" | "LISTCHAN" | "TAGS" | "SETPCODE" | "SETMINTIP" | "UEOPT" | "HDVIDEO" | "METRICS" | "OFFERCAM" | "REQUESTCAM" | "MYWEBCAM" | "MYCAMSTATE" | "PMHISTORY" | "CHATFLASH" | "TRUEPVT" | "BOOKMARKS" | "EVENT" | "STATEDUMP" | "RECOMMEND" | "EXTDATA" | "NOTIFY" | "PUBLISH" | "XREQUEST" | "XRESPONSE" | "EDGECON" | "ZGWINVALID" | "CONNECTING" | "CONNECTED" | "DISCONNECTED" | "LOGOUT";
export interface ServerConfig {
    ajax_servers: string[];
    chat_servers: string[];
    h5video_servers: {
        [index: string]: string;
    };
    ngvideo_servers: {
        [index: string]: string;
    };
    release: boolean;
    video_servers: string[];
    websocket_servers: {
        [index: string]: string;
    };
}
export interface ClientOptions {
    useWebSockets?: boolean;
    camYou?: boolean;
    useCachedServerConfig?: boolean;
    silenceTimeout?: number;
    stateSilenceTimeout?: number;
    loginTimeout?: number;
    connectionTimeout?: number;
}
