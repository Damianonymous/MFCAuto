import { Model } from "./Model";
import { Packet } from "./Packet";
import { RefinedEventEmitter } from "./RefinedEventEmitter";
import * as constants from "./Constants";
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
 * event will be named after the FCType of the Packet. See FCTYPE in
 * ./src/main/Constants.ts for the complete list of possible events.
 *
 * Listening for Client events is an advanced feature and requires some
 * knowledge of MFC's chat server protocol, which will not be documented here.
 * Where possible, listen for events on [Model](#Model) instead.
 */
export declare class Client extends RefinedEventEmitter<ClientEventName, ClientEventCallback, Packet | Boolean> {
    /** Session ID assigned to this client by the server after login */
    sessionId: number;
    /**
     * username used to log in to MFC, or, if the username was
     * left as "guest" then the server will have randomly generated
     * a new name for us like "Guest12345" and this value will
     * be updated to reflect that
     */
    username: string;
    /** unhashed password used by this client to log in */
    password: string;
    /** User ID assigned to the currently logged in user */
    uid: number | undefined;
    stream_cxid?: number;
    stream_password?: string;
    stream_vidctx?: string;
    /** MFC generated 32-character hash of password */
    private _passcode?;
    private _passcode_password?;
    private _webApiToken?;
    private _tokens;
    private _state;
    private _choseToLogIn;
    private _completedModels;
    private _completedTags;
    private _shareHasLoggedIn;
    private _shareCookieJar?;
    private readonly _roomHelperStatus;
    private readonly _availableClubShows;
    private readonly _options;
    private readonly _baseUrl;
    private readonly _shareUrl;
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
     * @param [password] Either "guest" or the account's password.
     *
     * This can be either the real password or the password hash as MFCAuto has always taken
     * historically. Client will attempt to auto-detect which type of password you have specified.
     *
     * If your real password looks like a hashed password (exactly 32 alphanumeric characters
     * with no spaces or special characters), it will be incorrectly detected as a hashed
     * password. In which case, you can override the auto-detection of password type and
     * force Client to treat it as the real password by specifying `{ forceUnhashedPassword: true }`
     * as part of the constructor options.
     *
     * If you wish to use the hashed password, you can discover it by checking your browser
     * cookies after logging in via your browser.  In Firefox, go to Options->Privacy
     * and then "Show Cookies..." and search for "myfreecams".  You will see one
     * cookie named "passcode". Select it and copy the value listed as "Content".
     * It will be a long string of lower case letters that looks like gibberish.
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
     * Returns headers required to authenticate an HTTP request to
     * MFC's web servers.
     * @deprecated
     */
    readonly httpHeaders: object;
    /**
     * Returns headers required to authenticate an HTTP request to
     * MFC's web servers.
     */
    getHttpHeaders(): Promise<object>;
    /**
     * Tokens available on this account
     */
    readonly tokens: number;
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
     * Loads the latest server information from MFC, if it's not already loaded
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
     * Takes a number that might be a user id or a room/channel id and converts
     * it to a user id (if necessary)
     * @param id A number that is either a model ID or room/channel ID
     * @returns The model ID corresponding to the given id
     */
    toUserId(id: number): number;
    /**
     * Takes a number that might be a user id or a room/channel id and converts
     * it to a user id (if necessary)
     * @param id A number that is either a model ID or room/channel ID
     * @returns The model ID corresponding to the given id
     */
    static toUserId(id: number): number;
    /**
     * Takes a number that might be a room/channel id or a user id and
     * converts it to a channel id of the given type, FreeChat by default,
     * if necessary
     * @param id A number that is either a room/channel ID or a model ID
     * @param type The type of channel ID to return (FreeChat/Private/Group/Club). Default is FreeChat.
     */
    toChannelId(id: number, type?: constants.ChannelType): number;
    /**
     * Takes a room/channel id and returns its type, or "undefined"
     * if the given id was a user id and not a channel id
     * @param channelId A chat channel id
     */
    getChannelType(channelId: number): constants.ChannelType | undefined;
    /**
     * Internal helper function that checks if the given
     * id is a model id or channel id. If it's a channel
     * id, that channel id is returned unchanged. If it's
     * a model id, her corresponding FreeChat channel id
     * is returned instead.
     * @param id A model or channel id
     */
    private _toFreeIfModel(id);
    /**
     * Internal helper function
     * Finds the right channel to join for a given model
     */
    protected _negotiateChannelForJoining(cid: number, mid: number): number;
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
     * Sends a tip to the given model
     * @param id Model ID to tip
     * @param amount Token value to tip
     * @param options Options bag to specify various options about the tip
     * @returns A promise that resolves after the tip response is received
     */
    sendTip(id: number, amount: number, options: TipOptions): Promise<string>;
    /**
     * Internal MFCAuto use only
     *
     * Logs in to MFCShare with this client's credentials and
     * populates a CookieJar with a variety of auth tokens returned
     * by the server's response.
     */
    private _shareLogin();
    /**
     * Internal MFCAuto use only
     *
     * Returns the prefix and slug given an MFC Share voucher url or Share thing url
     * @param thingUrl MFC Share voucher url or Share thing url
     * @returns A promise that resolves with an Object with two keys: prefix & slug
     */
    private _getSharePrefixSlugFromUrl(thingUrl);
    /**
     * Internal MFCAuto use only
     *
     * Queries for share thing details & purchase status given a prefix & slug
     * @param prefixSlug An Object with two keys: prefix & slug
     * @returns A promise that resolves with a ShareThingExtended object
     */
    private _getShareThingPurchaseStatus(prefixSlug);
    /**
     * Retrieves a model's MFC Share 'things'
     * @param model
     * @returns A promise that resolves with an array of ShareThings objects
     */
    getShareThings(model: Model | number): Promise<ShareThing[]>;
    /**
     * Given the url to an MFC Share item, this will return all the ShareThings
     * that can be purchased directly on that page.
     * @param thingUrl url to a MFC Share thing
     * @returns A promise that resolves with a ShareThingExtended object
     */
    getShareThingsFromUrl(thingUrl: string): Promise<ShareThingExtended[]>;
    /**
     * Given a ShareThing, this function will resolve to true if the current account
     * already owns the thing, or false if not.
     * @param thing A single ShareThing or a url to the Share page for a single Share thing or Voucher url
     * @returns A promise resolving true or false
     */
    isShareThingOwned(thing: ShareThingExtended | string): Promise<boolean>;
    /**
     * buyShareThing will attempt to purchase the given ShareThing
     * using the account credentials specified on Client construction.
     * This *will* spend tokens if you have them. The token amount
     * to be spent can be found on thing.token_amount.
     * @param thing The ShareThing to buy
     * @returns A promise that resolves on successful purchase
     */
    buyShareThing(thing: ShareThingExtended, options?: SharePurchaseOptions): Promise<void>;
    /**
     * redeemShareVoucher will attempt to redeem the given MFC Share
     * voucher url using the account credentials specified on Client
     * construction.
     *
     * The returned promise will reject if you've already redeemed
     * the voucher, or the url was invalid, or you are not logged in.
     * @param voucherUrl Full url of the share voucher to redeem
     * @returns A promise that resolves on successful redemption
     */
    redeemShareVoucher(voucherUrl: string): Promise<void>;
    /**
     * Internal MFCAuto use only
     *
     * Ban/Mute/Unban/Umute/Kick a user from a model's room where Client is Room Helper
     * @param id Model's MFC ID
     * @param action "ban", "mute", "unban", "unmute", "kick"
     * @param userIdOrNm User's MFC ID or username
     * @param clearchat true or false (optional: default is false)
     * @return {Promise} Promise that resolves if successful, rejects upon failure
     */
    private _rhModAction(id, action, userIdOrNm, clearchat?);
    /**
     * Ban a user from a model's room where Client is Room Helper
     * @param id Model's MFC ID
     * @param userIdOrNm User's MFC ID or username
     * @param clearchat true or false (optional: default is false)
     * @return {Promise} Promise resolving with success message or rejecting with error message
     */
    banUser(id: number, userIdOrNm: number | string, clearchat?: boolean): Promise<Packet | string>;
    /**
     * Unban a user from a Model's room where Client is Room Helper
     * @param id Model"s MFC ID
     * @param userIdOrNm User"s MFC ID or username
     * @return {Promise} Promise resolving with success message or rejecting with error message
     */
    unBanUser(id: number, userIdOrNm: number | string): Promise<Packet | string>;
    /**
     * Mute a user from a Model's room where Client is Room Helper
     * @param userIdOrNm User's MFC ID or username
     * @param id Model's MFC ID
     * @param clearchat true or false (optional: default is false)
     * @return {Promise} Promise resolving with success message or rejecting with error message
     */
    muteUser(id: number, userIdOrNm: number | string, clearchat?: boolean): Promise<Packet | string>;
    /**
     * Unmute a user from a Model's room where Client is Room Helper
     * @param userIdOrNm User's MFC ID or username
     * @param id Model's MFC ID
     * @return {Promise} Promise resolving with success message or rejecting with error message
     */
    unMuteUser(id: number, userIdOrNm: number | string): Promise<Packet | string>;
    /**
     * Kick a user from a Model's room where Client is Room Helper
     * @param userIdOrNm User's MFC ID or username
     * @param id Model's MFC ID
     * @return {Promise} Promise resolving with success message or rejecting with error message
     */
    kickUser(id: number, userIdOrNm: number | string): Promise<Packet | string>;
    /**
     * Set room topic for a model where Client is Room Helper
     * @param id Model's MFC ID
     * @param topic New topic
     * @return {Promise} Promise that resolves if successful, rejects upon failure
     */
    setTopic(id: number, topic: string): Promise<Packet | string>;
    /**
     * Start/adjust/stop a model's countdown where Client is Room Helper
     * @param id Model's MFC ID
     * @param total Total number of tokens in countdown
     * @param countdown true if countdown is active, false to end countdown (optional)
     * @param sofar Number of tokens tipped so far in countdown (optional)
     * @return {Promise} Promise that resolves if successful, rejects upon failure
     */
    setCountdown(id: number, total: number, countdown?: boolean, sofar?: number): Promise<Packet | string>;
    /**
     * Retrieves all token sessions for the year and month that the given
     * date is from. The specific day or time doesn't matter. It returns
     * the whole month's data.
     * @param date
     */
    private _getTokenUsageForMonth(date);
    /**
     * When client is a premium member, this method will retrieve all
     * token usage for that member between the given dates.
     *
     * This method does not require an active connection to a chat server.
     * It only requires that the client have been initialized with
     * premium credentials.
     *
     * By default, tip comments will be decoded into chat strings like
     * "I am happy :mhappy" as you would type them in MFC's chat box.
     * However the emote codes are not always available in token stats.
     * Images with no emote codes will be translated to ":unknown_emote".
     * If you'd prefer to keep the full HTML of the tip comment, including
     * any image links, you can set preserveHtml to true when constructing
     * the client. Then each comment will be returned as a raw HTML string.
     *
     * Note: I'm not sure if MFC displays tip times in a user's local time
     * zone or always Pacific US time. So this may have some timezone
     * related bugs if you really care about exactly precise timings.
     * @param startDate
     * @param endDate Optional, defaults to now
     * @returns A promise that resolves with an array of TokenSession objects
     */
    getTokenUsage(startDate: Date, endDate?: Date): Promise<Array<TokenSession>>;
    /**
     * Takes a CheerioElement that represents a single line of chat which may
     * contain emotes, and returns the string representation with the ":mhappy"
     * style emotes included wherever possible.
     */
    private _chatElementToString(element);
    /** Retrieves a listing of all avaiable chat log segments for a given month and year */
    private _getChatLogParamsForMonth(date);
    /** Retrieves a single chat log segment from MFC */
    private _getChatLog(params, page?);
    /**
     * When client is a premium member, this method will retrieve all
     * chat archives for that member between the given dates.
     *
     * This method does not require an active connection to a chat server.
     * It only requires that the client have been initialized with
     * premium credentials.
     *
     * By default, chat will be decoded into strings like "I am happy :mhappy"
     * as you would type them in MFC's chat box. However the emote codes are
     * not always available in chat archives. Images with no emote codes will
     * be translated to ":unknown_emote". If you'd prefer to keep the full
     * HTML of the message, including any image links, you can set preserveHtml
     * to true when constructing the client. Then each chat message will be
     * returned as a raw HTML string.
     *
     * Note: I'm not sure if MFC displays times in a user's local time
     * zone or always Pacific US time. So this may have some timezone
     * related bugs if you really care about exactly precise timings.
     * @param startDate
     * @param endDate Optional, defaults to now
     * @param userId Only return logs involving this model or user ID. If
     * this value is a model ID, it will include all public chat in that
     * model's room. By default, all logs for all users in the given time
     * range will be returned.
     * @returns A promise that resolves with an array of ChatLog objects
     */
    getChatLogs(startDate: Date, endDate?: Date, userId?: number): Promise<Array<ChatLog>>;
    /**
     * Joins the public chat room of the given model
     * or the given channel ID
     * @param id Model ID or room/channel ID to join
     * @returns A promise that resolves after successfully
     * joining the chat room and rejects if the join fails
     * for any reason (you're banned, region banned, or
     * you're a guest and the model is not online)
     */
    joinRoom(id: number): Promise<Packet>;
    /**
     * Leaves the public chat room of the given model
     * or the given chat channel
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
    login(username?: string, password?: string): Promise<void>;
    private _challenge();
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
     * Retrieves the HLS url for the given model (free chat only)
     * @param model
     * @returns A string containing the HLS url for model's free chat broadcast
     */
    getHlsUrl(model: Model | number): string | undefined;
    /**
     * Retrieves passcode for client
     * @returns A promise that resolves with a string containing client's passcode
     */
    getPassCode(): Promise<string>;
}
export declare type ClientEventCallback = ((packet: Packet) => void) | (() => void);
/** Possible Client states */
export declare type ClientStates = "IDLE" | "PENDING" | "ACTIVE";
/** Possible Client events */
export declare type ClientEventName = "CLIENT_MANUAL_DISCONNECT" | "CLIENT_DISCONNECTED" | "CLIENT_MODELSLOADED" | "CLIENT_CONNECTED" | "ANY" | "UNKNOWN" | "NULL" | "LOGIN" | "ADDFRIEND" | "PMESG" | "STATUS" | "DETAILS" | "TOKENINC" | "ADDIGNORE" | "PRIVACY" | "ADDFRIENDREQ" | "USERNAMELOOKUP" | "ZBAN" | "BROADCASTNEWS" | "ANNOUNCE" | "MANAGELIST" | "INBOX" | "GWCONNECT" | "RELOADSETTINGS" | "HIDEUSERS" | "RULEVIOLATION" | "SESSIONSTATE" | "REQUESTPVT" | "ACCEPTPVT" | "REJECTPVT" | "ENDSESSION" | "TXPROFILE" | "STARTVOYEUR" | "SERVERREFRESH" | "SETTING" | "BWSTATS" | "TKX" | "SETTEXTOPT" | "SERVERCONFIG" | "MODELGROUP" | "REQUESTGRP" | "STATUSGRP" | "GROUPCHAT" | "CLOSEGRP" | "UCR" | "MYUCR" | "SLAVECON" | "SLAVECMD" | "SLAVEFRIEND" | "SLAVEVSHARE" | "ROOMDATA" | "NEWSITEM" | "GUESTCOUNT" | "PRELOGINQ" | "MODELGROUPSZ" | "ROOMHELPER" | "CMESG" | "JOINCHAN" | "CREATECHAN" | "INVITECHAN" | "KICKCHAN" | "QUIETCHAN" | "BANCHAN" | "PREVIEWCHAN" | "SHUTDOWN" | "LISTBANS" | "UNBAN" | "SETWELCOME" | "CHANOP" | "LISTCHAN" | "TAGS" | "SETPCODE" | "SETMINTIP" | "UEOPT" | "HDVIDEO" | "METRICS" | "OFFERCAM" | "REQUESTCAM" | "MYWEBCAM" | "MYCAMSTATE" | "PMHISTORY" | "CHATFLASH" | "TRUEPVT" | "BOOKMARKS" | "EVENT" | "STATEDUMP" | "RECOMMEND" | "EXTDATA" | "NOTIFY" | "PUBLISH" | "XREQUEST" | "XRESPONSE" | "EDGECON" | "CLUBSHOW" | "CLUBCMD" | "ZGWINVALID" | "CONNECTING" | "CONNECTED" | "DISCONNECTED" | "LOGOUT";
export interface ServerConfig {
    ajax_servers: string[];
    chat_servers: string[];
    h5video_servers: {
        [index: string]: string;
    };
    ngvideo_servers: {
        [index: string]: string;
    };
    wzobs_servers: {
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
    modernLogin?: boolean;
    preserveHtml?: boolean;
    forceUnhashedPassword?: boolean;
}
export interface TipOptions {
    anonymous?: 0 | 1;
    comment?: string;
    public?: 0 | 1;
    public_comment?: 0 | 1;
    silent?: 0 | 1;
    hide_amount?: 0 | 1;
}
export interface TokenSession {
    date: Date;
    type: "Tip" | "Group" | "Voyeur" | "Private" | "MFC Share" | "Token Transfer (Received)" | "Token Transfer (Sent)" | string;
    recipient: string;
    tokens: number;
    comment?: string;
}
export interface ChatLine {
    time: Date;
    user?: string;
    text?: string;
    type?: string;
}
export interface ChatLog {
    toUserId: number;
    toChannelId?: number;
    sessionType: number;
    logDate: Date;
    videoUrl?: string;
    lines: Array<ChatLine>;
}
export interface TopicOptions {
    model: number;
    type: constants.FCTYPE.SETWELCOME | number;
    topic: string;
}
export interface CountdownOptions {
    model: number;
    type: constants.FCTYPE.ROOMDATA | number;
    total: number;
    sofar: number;
    countdown?: boolean;
    src?: "update" | "notify" | string;
}
export interface BanOptions {
    model: number;
    op: "ban" | "unban" | "mute" | "unmute" | "kick" | string;
    type: constants.FCTYPE.ZBAN | constants.FCTYPE.CHANOP | number;
    username?: string;
    sid?: number;
    clearchat?: 0 | 1;
    ztype?: "m" | string;
    chan?: number;
    users?: string[] | number[];
}
export interface PrefixSlug {
    prefix: "a" | "c" | "s" | "m" | "p" | "t" | string;
    slug: string;
}
export interface ShareThing {
    id: number;
    slug: string;
    title: string;
    thumbnail: string;
    token_amount: null | number;
    type: "Album" | "Collection" | "Item" | "Club" | "Poll" | "Story" | string;
    prefix: "a" | "c" | "s" | "m" | "p" | "t" | string;
    url: string;
    created_at: string;
    count_text?: string;
    duration_text?: string;
    option?: string;
    color?: string;
    color_faded?: string;
}
export interface ShareThingExtended extends ShareThing {
    price_type: "Album" | "Collection" | "Club" | "Clubprice" | "Item" | "Story" | "PollOption" | string;
    bought: false | string;
    description?: string;
    fulfillment_info_enabled?: boolean;
    note_enabled?: boolean;
    cache_buster: string;
    show_username_string: "Club" | "Item" | null | string;
    login_required: boolean;
    cookies_present: boolean;
}
export interface ShareThings {
    things: ShareThing[];
    model: {
        nick: string;
        avatar: string;
        url: string;
    };
}
export interface SharePurchaseOptions {
    /** Message to model */
    tip_message?: string;
    /** If true, "Auto-Renew my Membership". Default false. */
    recurring?: boolean | string;
    /** Allow Club E-Mails from model */
    email?: boolean | string;
    /** If true, "Don't show my username on the page". Default false. */
    hidden_by_user?: boolean | string;
}
