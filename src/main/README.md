# MFCAuto API Reference
## Classes


### [Client](#markdown-header-client_1)
Creates and maintains a connection to MFC chat servers

Client instances are [NodeJS EventEmitters](https://nodejs.org/api/all.html#events_class_eventemitter)
and will emit an event every time a Packet is received from the server. The
event will be named after the FCType of the Packet. See
[FCTYPE in ./src/main/Constants.ts](./Constants.ts#lines-350)
for the complete list of possible events.

Listening for Client events is an advanced feature and requires some
knowledge of MFC's chat server protocol, which will not be documented here.
Where possible, listen for events on [Model](#markdown-header-model_1) instead.


### [Model](#markdown-header-model_1)
Model represents a single MFC model. The Model constructor also serves as a
static repository of all models.

Both the Model constructor and individual instances are [NodeJS EventEmitters](https://nodejs.org/api/all.html#events_class_eventemitter)
and will emit events when any property of a model changes, including room
topic, camscore, Miss MFC rank, tags, online/offline/free chat/private/group
show status and many other events.

**Listening for these events is the fastest way to know when something changes
for a model on MFC, bar none.** MFCAuto is not polling MFC for this
information, it is registering as a proper client for MFC's chat controller
servers and being told by the server the instant that anything changes.

In most cases, Model event callbacks will be invoked more quickly than you
will see the model's state update in the browser because MFC's browser code
throttles the display of updates from the server. MFCAuto has no such
limitations.


### [Packet](#markdown-header-packet_1)
Packet represents a single, complete message received from the chat server


## Client
Creates and maintains a connection to MFC chat servers

Client instances are [NodeJS EventEmitters](https://nodejs.org/api/all.html#events_class_eventemitter)
and will emit an event every time a Packet is received from the server. The
event will be named after the FCType of the Packet. See
[FCTYPE in ./src/main/Constants.ts](./Constants.ts#lines-350)
for the complete list of possible events.

Listening for Client events is an advanced feature and requires some
knowledge of MFC's chat server protocol, which will not be documented here.
Where possible, listen for events on [Model](#markdown-header-model_1) instead.

**Kind**: global class

* [Client](#markdown-header-client_1)
    * [new Client](#markdown-header-new-clientusername-password-options)([username], [password], [options])
    * _instance_
        * [.banUser(id, user)](#markdown-header-clientbanuserid-user)
        * [.buyShareThing(thing)](#markdown-header-buysharethingthing)
        * [.connect([doLogin])](#markdown-header-clientconnectdologin)
        * [.connectAndWaitForModels()](#markdown-header-clientconnectandwaitformodels)
        * [.disconnect()](#markdown-header-clientdisconnect)
        * [.ensureConnected([timeout])](#markdown-header-clientensureconnectedtimeout)
        * [.getChatLogs(startDate, endDate, [userId])](#markdown-header-clientgetchatlogsstartdate-enddate-userid)
        * [.getHlsUrl(model)](#markdown-header-clientgethlsurlmodel)
        * [.getPassCode()](#markdown-header-clientgetpasscode)
        * [.getShareThings(model)](#markdown-header-clientgetsharethingsmodel)
        * [.getShareThingsFromUrl(thingUrl)](#markdown-header-clientgetsharethingsfromurlthingurl)
        * [.getTokenUsage(startDate, endDate)](#markdown-header-clientgettokenusagestartdate-enddate)
        * [.isShareThingOwned(thing)](#markdown-header-clientissharethingownedthing)
        * [.joinRoom(id)](#markdown-header-clientjoinroomid)
        * [.kickUser(id, user)](#markdown-header-clientkickuserid-user)
        * [.leaveRoom(id)](#markdown-header-clientleaveroomid)
        * [.login()](#markdown-header-clientlogin)
        * [.muteUser(id, user)](#markdown-header-clientmuteuserid-user)
        * [.on()](#markdown-header-clienton)
        * [.once()](#markdown-header-clientonce)
        * [.queryUser(user)](#markdown-header-clientqueryuseruser)
        * [.redeemShareVoucher(voucherUrl)](#markdown-header-clientredeemsharevouchervoucherurl)
        * [.removeListener()](#markdown-header-clientremovelistener)
        * [.sendChat(id, msg)](#markdown-header-clientsendchatid-msg)
        * [.sendPM(id, msg)](#markdown-header-clientsendpmid-msg)
        * [.sendTip(id, amount, options)](#markdown-header-clientsendtipid-amount-options)
        * [.setCountdown(id, total, countdown, [sofar])](#markdown-header-clientsetcountdownid-total-countdown-sofar)
        * [.setTopic(id, topic)](#markdown-header-clientsettopicid-topic)
        * [.state](#markdown-header-clientstate)
        * [.toChannelId(id, [type])](#markdown-header-clienttochannelidid-type)
        * [.TxCmd(nType, nTo, nArg1, nArg2, sMsg)](#markdown-header-clienttxcmdntype-nto-narg1-narg2-smsg)
        * [.TxPacket(packet)](#markdown-header-clienttxpacketpacket)
        * [.unBanUser(id, user)](#markdown-header-clientunbanuserid-user)
        * [.unMuteUser(id, user)](#markdown-header-clientunmuteuserid-user)
        * [.uptime](#markdown-header-clientuptime)
    * _static_
        * [.toRoomId(id, [camYou])](#markdown-header-clienttoroomidid-camyou)
        * [.toUserId(id)](#markdown-header-clienttouseridid)


### new Client([username], [password], [options])
Client constructor


| Param | Default | Description |
| --- | --- | --- |
| [username] | `guest` | Either "guest" or a real MFC member account name, default is "guest" |
| [password] | `guest` | Either "guest" or, to log in with a real account the password should be a hash of your real password and NOT your actual plain text password. You can discover the appropriate string to use by checking your browser cookies after logging in via your browser.  In Firefox, go to Options->Privacy and then "Show Cookies..." and search for "myfreecams".  You will see one cookie named "passcode". Select it and copy the value listed as "Content". It will be a long string of lower case letters that looks like gibberish. *That* is the password to use here. |
| [options] |  | A ClientOptions object detailing several optional Client settings like whether to use WebSockets or traditional TCP sockets and whether to connect to MyFreeCams.com or CamYou.com |


### client.banUser(id, user)
Ban a user from a model's room where Client is Room Helper

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise resolving with success packet or rejecting with error message/packet

| Param | Description |
| --- | --- |
| id | Model ID |
| user | Username or ID of user to ban |


### client.buyShareThing(thing)
Purchase ShareThing using the account credentials specified on Client construction

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves on successful purchase

| Param | Description |
| --- | --- |
| thing | The ShareThing (club, item, album, collection, poll, blog, story) to buy |


### client.connect([doLogin])
Connects to MFC

Logging in is optional because not all queries to the server require you to log in.
For instance, MFC servers will respond to a USERNAMELOOKUP request without
requiring a login. However for most cases you probably do want to log in.

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves when the connection has been established

| Param | Default | Description |
| --- | --- | --- |
| [doLogin] | `true` | If True, log in with the credentials provided at Client construction. If False, do not log in. Default is True |

**Example** *(Most common case is simply to connect, log in, and start processing events)*
```js
const mfc = require("MFCAuto");
const client = new mfc.Client();

// Set up any desired callback hooks here using one or more of:
//   - mfc.Model.on(...) - to handle state changes for all models
//   - mfc.Model.getModel(...).on(...) - to handle state changes for only
//     the specific model retrieved via the .getModel call
//   - client.on(...) - to handle raw MFC server events, this is advanced

// Then connect so that those events start processing.
client.connect();
```
**Example** *(If you need some logic to run after connection, use the promise chain)*
```js
const mfc = require("MFCAuto");
const client = new mfc.Client();
client.connect()
     .then(() => {
         // Do whatever requires a connection here
     })
     .catch((reason) => {
         // Something went wrong
     });
```


### client.connectAndWaitForModels()
Connects to MFC and logs in, just like this.connect(true),
but in this version the returned promise resolves when the initial
list of online models has been fully populated.
If you're logged in as a user with friended models, this will
also wait until your friends list is completely loaded.

This method always logs in, because MFC servers won't send information
for all online models until you've logged as at least a guest.

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves when the model list is complete


### client.disconnect()
Disconnects a connected client instance

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves when the disconnect is complete


### client.ensureConnected([timeout])
Returns a Promise that resolves when we have an active connection to the
server, which may be instantly or may be hours from now.

When Client.connect (or .connectAndWaitForModels) is called, Client
will initiate a connection the MFC's chat servers and then try to
maintain an active connection forever. Of course, network issues happen
and the server connection may be lost temporarily. Client will try to
reconnect. However, many of the advanced features of Client, such as
.joinRoom, .sendChat, or .TxCmd, require an active connection and will
throw if there is not one at the moment.

This is a helper function for those cases.

This function does not *cause* connection or reconnection.

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A Promise that resolves when a connection is present, either
because we were already connected or because we succeeded in our
reconnect attempt, and rejects when either the given timeout is reached
or client.disconnect() is called before we were able to establish a
connection. It also rejects if the user has not called .connect at all
yet.

| Param | Description |
| --- | --- |
| [timeout] | Wait maximally this many milliseconds Leave undefined for infinite, or set to -1 for no waiting. |


### client.getChatLogs(startDate, [endDate], [userId])
Retrieves all chat archives for the logged in Premium account between the given dates.

This method does not require an active connection to a chat server.
It only requires that the client have been initialized with premium credentials.

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves with an array of ChatLog objects

| Param | Description |
| --- | --- |
| startDate | YYYY-MM-DD |
| endDate | Optional, defaults to now |
| userId | Only return logs involving this model or user ID (optional) |


### client.getHlsUrl(model)
Retrieves the HLS url for the given model (free chat only).

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A string containing the HLS url

| Param | Description |
| --- | --- |
| model | Model ID or MFC Auto Model instance |


### client.getPassCode()
Retrieves passcode for client

**Kind**: instance method of [`Client`](#markdown-header-client_1)


### client.getShareThings(model)
Retrieves a model's MFC Share 'things'

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves with an array of ShareThings objects

| Param | Description |
| --- | --- |
| model | Model ID or MFC Auto Model instance |


### client.getShareThingsFromUrl(thingUrl)
Returns all the ShareThings that can be purchased directly on thingUrl

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves with a ShareThing object

| Param | Description |
| --- | --- |
| thingUrl | Url to a MFC Share thing


### client.getTokenUsage(startDate, [endDate])
Retrieves all token usage for the logged in Premium account between the given dates.

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves with an array of TokenSession objects

| Param | Description |
| --- | --- |
| startDate | YYYY-MM-DD |
| endDate | Optional, defaults to now |


### client.isShareThingOwned(thing)
Check if current account owns the given Share thing

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise resolves true or false

| Param | Description |
| --- | --- |
| thing | A ShareThing, or url to the Share page for a single Share thing, or Voucher url |


### client.joinRoom(id)
Joins the public chat room of the given model

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves after successfully
joining the chat room and rejects if the join fails
for any reason (you're banned, region banned, or
you're a guest and the model is not online)

| Param | Description |
| --- | --- |
| id | Model ID or room/channel ID to join |


### client.kickUser(id, user)
Kick a user from a model's room where Client is Room Helper

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise resolving with success packet or rejecting with error message/packet

| Param | Description |
| --- | --- |
| id | Model ID |
| user | Username or ID of user to kick |


### client.leaveRoom(id)
Leaves the public chat room of the given model

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves immediately

| Param | Description |
| --- | --- |
| id | Model ID or room/channel ID to leave |


### client.login()
Logs in to MFC. This should only be called after Client connect(false);
See the comment on Client's constructor for details on the password to use.

**Kind**: instance method of [`Client`](#markdown-header-client_1)


### client.muteUser(id, user)
Mute a user from a model's room where Client is Room Helper

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise resolving with success packet or rejecting with error message/packet

| Param | Description |
| --- | --- |
| id | Model ID |
| user | Username or ID of user to mute |


### client.on()
[EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter) method
See [FCTYPE in ./src/main/Constants.ts](./Constants.ts#lines-350) for all possible event names

**Kind**: instance method of [`Client`](#markdown-header-client_1)


### client.once()
[EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter) method
See [FCTYPE in ./src/main/Constants.ts](./Constants.ts#lines-350) for all possible event names

**Kind**: instance method of [`Client`](#markdown-header-client_1)


### client.queryUser(user)
Queries MFC for the latest state of a model or member

This method does poll the server for the latest model status, which can
be useful in some situations, but it is **not the quickest way to know
when a model's state changes**. Instead, to know the instant a model
enters free chat, keep a Client connected and listen for changes on her
Model instance. For example:

```js
// Register a callback whenever AspenRae's video
// state changes
mfc.Model.getModel(3111899)
  .on("vs", (model, before, after) => {
    // This will literally be invoked faster than
    // you would see her cam on the website.
    // There is no faster way.
    if (after === mfc.STATE.FreeChat) {
      // She's in free chat now!
    }
});
```

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves with a Message
containing the user's current details or undefined
if the given user was not found

| Param | Description |
| --- | --- |
| user | Model or member name or ID |

**Example**
```js
// Query a user, which happens to be a model, by name
client.queryUser("AspenRae").then((msg) => {
    if (msg === undefined) {
        console.log("AspenRae probably temporarily changed her name");
    } else {
        //Get the full Model instance for her
        let AspenRae = mfc.Model.getModel(msg.uid);
        //Do stuff here...
    }
});

// Query a user by ID number
client.queryUser(3111899).then((msg) => {
    console.log(JSON.stringify(msg));
    //Will print something like:
    //  {"sid":0,"uid":3111899,"nm":"AspenRae","lv":4,"vs":127}
});

// Query a member by name and check their status
client.queryUser("MyPremiumMemberFriend").then((msg) => {
    if (msg) {
        if (msg.vs !== mfc.STATE.Offline) {
            console.log("My friend is online!");
        } else {
            console.log("My friend is offline");
        }
    } else {
        console.log("My friend no longer exists by that name");
    }
});

// Force update a model's status, without caring about the result here
// Potentially useful when your logic is in model state change handlers
client.queryUser(3111899);
```


### client.redeemShareVoucher(voucherUrl)
Redeem an MFC Share voucher using the account credentials specified on Client construction

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves on successful redemption

| Param | Description |
| --- | --- |
| voucherUrl | Full url of the share voucher to redeem |


### client.removeListener()
[EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter) method
See [FCTYPE in ./src/main/Constants.ts](./Constants.ts#lines-350) for all possible event names

**Kind**: instance method of [`Client`](#markdown-header-client_1)


### client.sendChat(id, msg)
Send chat to a model's public chat room

If the message is one you intend to send more than once,
and your message contains emotes, you can save some processing
overhead by calling client.encodeRawChat once for the string,
caching the result of that call, and passing that string here.

Note that you must have previously joined the model's chat room
for the message to be sent successfully.

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves after the text has
been sent to the server. There is no check on success and
the message may fail to be sent if you are muted or ignored
by the model

| Param | Description |
| --- | --- |
| id | Model or room/channel ID to send the chat to |
| msg | Text to be sent, can contain emotes |


### client.sendPM(id, msg)
Send a PM to the given model or member

If the message is one you intend to send more than once,
and your message contains emotes, you can save some processing
overhead by calling client.encodeRawChat once for the string,
caching the result of that call, and passing that string here.

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves after the text has
been sent to the server. There is no check on success and
the message may fail to be sent if you are muted or ignored
by the model or member

| Param | Description |
| --- | --- |
| id | Model or member ID to send the PM to |
| msg | Text to be sent, can contain emotes |


### client.sendTip(id, amount, options)
Send a tip to the given model

This method requires that you be logged in on a premium account
with tokens.

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves after the tip has been
successfully sent and rejects if the tip fails (because you
don't have enough tokens, for example).

| Param | Description |
| --- | --- |
| id | Model ID to send the tip to |
| amount | Number of tokens to tip |
| options | Options bag allows specifying the tip comment and whether it is public, anonymous, silent, or has a hidden amount of tokens |


### client.setCountdown(id, total, [countdown], [sofar])
Start/adjust/stop a model's countdown where Client is Room Helper

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves if successful, rejects upon failure

| Param | Default | Description |
| --- | --- | --- |
| id | | Model ID |
| total | | Total number of tokens in countdown |
| countdown | true | (optional) True or false. False to end countdown |
| sofar | `0` | (optional) Number of tokens tipped so far in countdown |


### client.setTopic(id, topic)
Set room topic for a model where Client is Room Helper

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise that resolves if successful, rejects upon failure

| Param | Description |
| --- | --- |
| id | Model ID |
| topic | New topic |


### client.state
Current server connection state:
- IDLE: Not currently connected to MFC and not trying to connect
- PENDING: Actively trying to connect to MFC but not currently connected
- ACTIVE: Currently connected to MFC

If this client is PENDING and you wish to wait for it to enter ACTIVE,
use [client.ensureConnected](#clientensureconnectedtimeout).

**Kind**: instance property of [`Client`](#markdown-header-client_1)


### client.toChannelId(id, [type])
Takes a number that might be a room/channel id or a user id and converts
it to a channel id of the given type (FreeChat by default) if necessary

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: The channel ID corresponding to the given ID

| Param | Default | Description |
| --- | --- | --- |
| id |  | A number that is either a model ID or a room/channel ID |
| [type] | FreeChat | ChannelType: FreeChat, NonFreeChat |


### client.TxCmd(nType, nTo, nArg1, nArg2, sMsg)
Sends a command to the MFC chat server. Don't use this unless
you really know what you're doing.

**Kind**: instance method of [`Client`](#markdown-header-client_1)

| Param | Default | Description |
| --- | --- | --- |
| nType |  | FCTYPE of the message |
| nTo | `0` | Number representing the channel or entity the message is for. This is often left as 0. |
| nArg1 | `0` | First argument of the message. Its meaning varies depending on the FCTYPE of the message. Often left as 0. |
| nArg2 | `0` | Second argument of the message. Its meaning varies depending on the FCTYPE of the message. Often left as 0. |
| sMsg |  | Payload of the message. Its meaning varies depending on the FCTYPE of the message and is sometimes is stringified JSON. Most often this should remain undefined. |


### client.TxPacket(packet)
Sends a command to the MFC chat server. Don't use this unless
you really know what you're doing.

**Kind**: instance method of [`Client`](#markdown-header-client_1)

| Param | Description |
| --- | --- |
| packet | Packet instance encapsulating the command to be sent |


### client.unBanUser(id, user)
Unban a user from a model's room where Client is Room Helper

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise resolving with success packet or rejecting with error message/packet

| Param | Description |
| --- | --- |
| id | Model ID |
| user | Username or ID of user to unban |


### client.unMuteUser(id, user)
Unmute a user from a model's room where Client is Room Helper

**Kind**: instance method of [`Client`](#markdown-header-client_1)
**Returns**: A promise resolving with success packet or rejecting with error message/packet

| Param | Description |
| --- | --- |
| id | Model ID |
| user | Username or ID of user to unmute |


### client.uptime
How long the current client has been connected to a server
in milliseconds. Or 0 if this client is not currently connected

**Kind**: instance property of [`Client`](#markdown-header-client_1)


### Client.toRoomId(id, [camYou])
Takes a number that might be a user id or a room id and converts
it to a room id (if necessary)

**Kind**: static method of [`Client`](#markdown-header-client_1)
**Returns**: The free chat room/channel ID corresponding to the given ID

| Param | Default | Description |
| --- | --- | --- |
| id |  | A number that is either a model ID or a room/channel ID |
| [camYou] | `false` | True if the ID calculation should be done for CamYou.com. False if the ID calculation should be done for MFC. Default is False |


### Client.toUserId(id)
Takes a number that might be a user id or a room id and converts
it to a user id (if necessary). The functionality here maps to
MFC's GetRoomOwnerId() within top.js

**Kind**: static method of [`Client`](#markdown-header-client_1)
**Returns**: The model ID corresponding to the given id

| Param | Description |
| --- | --- |
| id | A number that is either a model ID or room/channel ID |


## Model
Model represents a single MFC model. The Model constructor also serves as a
static repository of all models.

Both the Model constructor and individual instances are [NodeJS EventEmitters](https://nodejs.org/api/all.html#events_class_eventemitter)
and will emit events when any property of a model changes, including room
topic, camscore, Miss MFC rank, tags, online/offline/free chat/private/group
show status and many other events.

Listening for these events is the fastest way to know when something changes
for a model on MFC, bar none. MFCAuto is not polling MFC for this
information, it is registering as a proper client for MFC's chat controller
servers and being told by the server the instant that anything changes.

In most cases, Model event callbacks will be invoked more quickly than you
will see the model's state update in the browser because MFC's browser code
throttles the display of updates from the server. MFCAuto has no such
limitations.

**Kind**: global class

* [Model](#markdown-header-model_1)
    * _instance_
        * [.bestSession](#markdown-header-modelbestsession)
        * [.getSocialMedia()](#markdown-header-modelgetsocialmedia)
        * [.on(event, listener)](#markdown-header-modelonevent-listener)
        * [.once(event, listener)](#markdown-header-modelonceevent-listener)
        * [.removeListener()](#markdown-header-modelremovelistener)
        * [.removeWhen(condition)](#markdown-header-modelremovewhencondition)
        * [.tags](#markdown-header-modeltags)
        * [.when(condition, onTrue, [onFalseAfterTrue])](#markdown-header-modelwhencondition-ontrue-onfalseaftertrue)
    * _static_
        * [.findModels(filter)](#markdown-header-modelfindmodelsfilter)
        * [.getModel(id, [createIfNecessary])](#markdown-header-modelgetmodelid-createifnecessary)
        * [.knownModels](#markdown-header-modelknownmodels)
        * [.on](#markdown-header-modelon)
        * [.once](#markdown-header-modelonce)
        * [.removeListener](#markdown-header-modelremovelistener_1)
        * [.removeWhen(condition)](#markdown-header-modelremovewhencondition_1)
        * [.when(condition, onTrue, [onFalseAfterTrue])](#markdown-header-modelwhencondition-ontrue-onfalseaftertrue_1)


### model.bestSession
The most accurate session for this model

bestSession can potentially contain any or all of these properties and
possibly more as MFC updates its chat protocol

|Property name|Type|Description|
|---|---|---|
|age|number|Model's age, if she specified one
|avatar|number|1 if model has an avatar
|basics_muted|number|0 if basics are not muted in the model's room, 1 if they are
|blurb|string|The model's bio blurb which shows at the top of their profile and directly under their name in the user menu
|camscore|number|The model's current camscore
|camserv|number|What video server is currently hosting her stream
|chat_bg|number|Chat background color
|chat_color|string|Chat color as a hex RGB value
|chat_font|number|Chat font represented as an integer indexing into a set list of fonts
|city|string|User provided city details (often a lie, there's no validation here)
|continent|string|Two letter continent abbreviation such as "EU", "SA", "NA" etc for the model's current IP address based on geo-location data. Note that many models use VPNs so their IP geolocation may not accurately reflect their real world location
|country|string|User provided country details (often a lie, but must one of a standard set of real countries)
|creation|number|Timestamp of the model's account creation
|ethnic|string|Model's user provided ethnicity
|ethnic|string|Model's user provided ethnicity
|fcext_sfw|number| @TODO: unknown (0 for now)
|fcext_sm|string| @TODO: unknown ('' for now)
|guests_muted|number|0 if guests are not muted in the model's room, 1 if they are
|hidecs|boolean|If true, the model is hiding her camscore on the website (.bestSession.camscore will still have her camscore)
|kbit|number|This used to contain the upstream bandwidth of the model, but is now always 0
|lastnews|number|The timestamp of the model's last newsfeed entry
|lv|number|5 = admin, 4 = model, 2 = premium, 1 = basic, 0 = guest
|mg|number| @TODO: unknown (0 for now)
|missmfc|number|A number indicating whether a model has been in the top 3 of Miss MFC before or not
|model_sw|number|1 if the model is logged in via the model software, 0 if they are using the website instead
|new_model|number|1 if this model is considered "new" and 0 if she isn't
|nm|string|The model's current name
|occupation|string|Model's user provided occupation
|phase|string|"a" for models broadcasting via OBS, "z" otherwise
|photos|number|A count of the number of photos on the model's profile
|pid|number|1 if this model is on MFC, 2 if she's on CamYou
|profile|number|1 if this user has a profile or 0 if not
|rank|number|The model's current Miss MFC rank for this month, or 0 if the model is ranked greater than 1000
|rc|number|The number of people in the model's room
|share_albums|number|Count of albums on MFC Share
|share_clubs|number|Count of clubs on MFC Share
|share_collections|number|Count of collections on MFC Share
|share_follows|number|Count of followers on MFC Share
|share_goals|number|Count of goals on MFC Share
|share_polls|number|Count of polls on MFC Share
|share_stores|number|Count of items on MFC Share (things like SnapChat)
|share_things|number|Count of all MFC Share things (albums, collections, clubs, ...)
|share_tm_album|number|Timestamp of most recent MFC Share album
|sid|number|The model's MFC session ID
|status|string| @TODO: unknown ('' for now)
|topic|string|The model's current room topic
|truepvt|number|If a model is in vs STATE.Private and this value is 1, then that private is a true private. There is no unique state for true private, you have to check both vs and truepvt values.
|uid|number|The model's user ID
|vs|A number mapping to [FCVIDEO](./Constants.ts#lines-493) or the more friendly form, [STATE](./Constants.ts#lines-10)|The general status of a model (online, offline, away, freechat, private, or groupshow). There are many other status possibilities, but those are the ones you likely care about.

**Kind**: instance property of [`Model`](#markdown-header-model_1)


### model.getSocialMedia()
Retrieves social media details for this model. This
will include any Twitter or Instagram account she has
listed with MFC as well as some basic MFC Share details

**Kind**: instance method of [`Model`](#markdown-header-model_1)
**Returns**: A promise that resolves with a ModelSocialMedia
object or undefined


### model.on(event, listener)
[EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter)
method that registers a callback for change events on this model

This variant will listen for changes on the current model. To listen for
changes on *all* models use the [model.on instance method](#markdown-header-modelon)

**Kind**: instance method of [`Model`](#markdown-header-model_1)

| Param | Description |
| --- | --- |
| event | "uid", "tags", "nm" or any of the property names of [model.bestSession](#markdown-header-modelbestsession) |
| listener | A callback to be invoked whenever the property indicated by the event name changes for this model. The callback will be given 3 parameters: this model instance, the value of the property before the change, and the value of the property after the change. |

**Example**
```js
// Print to the console whenever AspenRae's video state changes
const mfc = require("MFCAuto");
const client = new mfc.Client();
const AspenRae = mfc.Model.getModel(3111899);

AspenRae.on("vs", (model, before, after) => {
     console.log(`AspenRae's state changed to ${mfc.STATE[after]}`);
});

client.connect();
```


### model.once(event, listener)
[EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter)
method like model.on but the registered callback is only invoked once,
on the first instance of the given event

**Kind**: instance method of [`Model`](#markdown-header-model_1)

| Param | Description |
| --- | --- |
| event | "uid", "tags", "nm" or any of the property names of [model.bestSession](#markdown-header-modelbestsession) |
| listener | A callback to be invoked whenever the property indicated by the event name changes for this model. The callback will be given 3 parameters: this model instance, the value of the property before the change, and the value of the property after the change. |


### model.removeListener()
[EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter)
method that removes a listener callback previously registered with
model.on or model.once

**Kind**: instance method of [`Model`](#markdown-header-model_1)


### model.removeWhen(condition)
Removes a when callback previously registered with model.when

**Kind**: instance method of [`Model`](#markdown-header-model_1)
**Returns**: True if the given function was successfully removed,
false if it was not found as a registered when callback

| Param | Description |
| --- | --- |
| condition | A Function that had previously been registered as a condition filter |


### model.tags
The model's Tags

**Kind**: instance property of [`Model`](#markdown-header-model_1)

### model.when(condition, onTrue, [onFalseAfterTrue])
Registers callback for when this model when starts matching a
specific condition and, optionally, when she then stops matching the
condition

**Kind**: instance method of [`Model`](#markdown-header-model_1)

| Param | Description |
| --- | --- |
| condition | Function that takes a Model instance and returns true if she matches the target condition, false if she doesn't |
| onTrue | Function that will be invoked when this model starts matching the condition. It is given the model instance and the message that caused her to start matching the condition as parameters |
| [onFalseAfterTrue] | If not left undefined, this Function will be invoked when this model was previously matching the condition and has stopped matching the condition. |

**Example**
```js
const AspenRae = mfc.Model.getModel(3111899);
AspenRae.when(
    (m) => m.bestSession.vs !== mfc.STATE.Offline,
    (m) => console.log('AspenRae has logged on!'),
    (m) => console.log('AspenRae has logged off')
)
```


### Model.findModels(filter)
Retrieves a list of models matching the given filter

**Kind**: static method of [`Model`](#markdown-header-model_1)
**Returns**: An array of Model instances matching the filter function

| Param | Description |
| --- | --- |
| filter | A filter function that takes a Model instance and returns a boolean indicating whether the model should be returned, True, or not, False |


### Model.getModel(id, [createIfNecessary])
Retrieves a specific model instance by user id from knownModels, creating
the model instance if it does not already exist.

**Kind**: static method of [`Model`](#markdown-header-model_1)
**Returns**: The Model instance for the given model, or undefined if the model
does not exist and createIfNecessary was False

| Param | Default | Description |
| --- | --- | --- |
| id |  | Model id of the model to retrieve. It should be a valid model ID. The [first example here](../../README.md) has one way to discover a model's ID, using MFCAuto and client.queryUser.  Another, simpler, way is to open a model's chat room as a "Popup" and look at the URL of that room.  In the URL, there will be a portion that says "broadcaster_id=3111899".  That number is that model's ID. |
| [createIfNecessary] | `true` | If the model is not found in Model.knownModels and this value is True, the default, a new model instance will be created for her and returned. If the model is not found and this value is False undefined will be returned. |


### Model.knownModels
Map of all known models that is built up as we receive model
information from the server. This should not usually be accessed
directly. If you wish to access a specific model, use
[Model.getModel](#markdown-header-modelgetmodelid-createifnecessary) instead.

**Kind**: static property of [`Model`](#markdown-header-model_1)


### Model.on
[EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter)
method that registers a callback for model change events.

This variant will listen for changes on *all* models. To listen for
changes on one specific model use the [model.on instance method](#markdown-header-modelonevent-listener)

**Kind**: static property of [`Model`](#markdown-header-model_1)

| Param | Description |
| --- | --- |
| event | "uid", "tags", "nm" or any of the property names of [model.bestSession](#markdown-header-modelbestsession) |
| listener | A callback to be invoked whenever the property indicated by the event name changes for any model. The callback will be given 3 parameters: the model instance that changed, the value of the property before the change, and the value of the property after the change: |

**Example**
```js
// Print to the console whenever any model's video state changes
const mfc = require("MFCAuto");
const client = new mfc.Client();

mfc.Model.on("vs", (model, before, after) => {
     console.log(`${model.nm}'s state changed to ${mfc.STATE[after]}`);
});

client.connect();
```


### Model.once
[EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter)
method like Model.on but the registered callback is only invoked once,
on the first instance of the given event

**Kind**: static property of [`Model`](#markdown-header-model_1)

| Param | Description |
| --- | --- |
| event | "uid", "tags", "nm" or any of the property names of [model.bestSession](#modelbestsession) |
| listener | A callback to be invoked whenever the property indicated by the event name changes for any model. The callback will be given 3 parameters: the model instance that changed, the value of the property before the change, and the value of the property after the change: |


### Model.removeListener
[EventEmitter](https://nodejs.org/api/all.html#events_class_eventemitter)
method that removes a listener callback previously registered with
Model.on or Model.once

**Kind**: static property of [`Model`](#markdown-header-model_1)


### Model.removeWhen(condition)
Removes a when callback previously registered with Model.when

**Kind**: static method of [`Model`](#markdown-header-model_1)
**Returns**: True if the given function was successfully removed,
false if it was not found as a registered when callback

| Param | Description |
| --- | --- |
| condition | A Function that had previously been registered as a condition filter |


### Model.when(condition, onTrue, [onFalseAfterTrue])
Registers callback for when any Model starts matching a specific
condition and, optionally, when they then stop matching the
condition

**Kind**: static method of [`Model`](#markdown-header-model_1)

| Param | Description |
| --- | --- |
| condition | Function that takes a Model instance and returns true if she matches the target condition, false if she doesn't |
| onTrue | Function that will be invoked when a model starts matching the condition. It is given the Model instance and the message that caused her to start matching the condition as parameters |
| [onFalseAfterTrue] | If not left undefined, this Function will be invoked when a model that was previously matching the condition stops matching the condition. |

**Example**
```js
mfc.Model.when(
    (m) => m.bestSession.rc > 2000,
    (m) => console.log(`${m.nm} has over 2000 viewers!`),
    (m) => console.log(`${m.nm} no longer has over 2000 viewers`)
);
```


## Packet
Packet represents a single, complete message received from the chat server

**Kind**: global class

* [Packet](#markdown-header-packet_1)
    * [.aboutModel](#markdown-header-packetaboutmodel)
    * [.chatString](#markdown-header-packetchatstring)
    * [.pMessage](#markdown-header-packetpmessage)


### packet.aboutModel
The model this packet is loosely "about", meaning
who's receiving the tip/chat/status update/etc.
For some packets this can be undefined.

**Kind**: instance property of [`Packet`](#markdown-header-packet_1)


### packet.chatString
For chat, PM, or tip messages, this property returns the text of the
message as it would appear in the MFC chat window with the username
prepended, etc:

  `AspenRae: Thanks guys! :mhappy`

This is useful for logging.

**Kind**: instance property of [`Packet`](#markdown-header-packet_1)


### packet.pMessage
Returns the formatted text of chat, PM, or tip messages.  For instance
the raw sMessage.msg string may be something like:
  `I am happy #~ue,2c9d2da6.gif,mhappy~#`
This returns that in the more human readable format:
  `I am happy :mhappy`

**Kind**: instance property of [`Packet`](#markdown-header-packet_1)