"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = require("./Client");
const Constants_1 = require("./Constants");
const Utils_1 = require("./Utils");
const Model_1 = require("./Model");
/** Packet represents a single, complete message received from the chat server */
class Packet {
    constructor(FCType, nFrom, nTo, nArg1, nArg2, sPayload, sMessage) {
        this.FCType = FCType;
        this.nFrom = nFrom;
        this.nTo = nTo;
        this.nArg1 = nArg1;
        this.nArg2 = nArg2;
        this.sPayload = sPayload;
        // tslint:disable-next-line:no-unsafe-any
        this.sMessage = Utils_1.decodeAny(sMessage);
    }
    /**
     * The model this packet is loosely "about", meaning
     * who's receiving the tip/chat/status update/etc.
     * For some packets this can be undefined.
     */
    get aboutModel() {
        if (this._aboutModel === undefined) {
            let id = -1;
            switch (this.FCType) {
                case Constants_1.FCTYPE.ADDFRIEND:
                case Constants_1.FCTYPE.ADDIGNORE:
                case Constants_1.FCTYPE.JOINCHAN:
                case Constants_1.FCTYPE.STATUS:
                case Constants_1.FCTYPE.CHATFLASH:
                case Constants_1.FCTYPE.ZBAN:
                    id = this.nArg1;
                    break;
                case Constants_1.FCTYPE.SESSIONSTATE:
                case Constants_1.FCTYPE.LISTCHAN:
                    id = this.nArg2;
                    break;
                case Constants_1.FCTYPE.USERNAMELOOKUP:
                case Constants_1.FCTYPE.NEWSITEM:
                case Constants_1.FCTYPE.PMESG:
                    id = this.nFrom;
                    break;
                case Constants_1.FCTYPE.GUESTCOUNT:
                case Constants_1.FCTYPE.TOKENINC:
                case Constants_1.FCTYPE.CMESG:
                case Constants_1.FCTYPE.BANCHAN:
                    id = this.nTo;
                    break;
                case Constants_1.FCTYPE.ROOMDATA:
                    if (Packet.isRoomDataMessage(this.sMessage)) {
                        id = this.sMessage.model;
                    }
                    break;
                case Constants_1.FCTYPE.LOGIN:
                case Constants_1.FCTYPE.MODELGROUP:
                case Constants_1.FCTYPE.PRIVACY:
                case Constants_1.FCTYPE.DETAILS:
                case Constants_1.FCTYPE.METRICS:
                case Constants_1.FCTYPE.UEOPT:
                case Constants_1.FCTYPE.SLAVEVSHARE:
                case Constants_1.FCTYPE.INBOX:
                case Constants_1.FCTYPE.EXTDATA:
                case Constants_1.FCTYPE.MYWEBCAM:
                case Constants_1.FCTYPE.TAGS:
                case Constants_1.FCTYPE.NULL:
                    // These cases don't have a direct mapping between packet and model.
                    // either the mapping doesn't apply or this packet is about many models
                    // potentially (like Tags packets)
                    break;
                default:
            }
            if (id !== -1) {
                id = Client_1.Client.toUserId(id);
                this._aboutModel = Model_1.Model.getModel(id);
            }
        }
        return this._aboutModel;
    }
    /**
     * This parses MFC's emote encoding and replaces those tokens with the simple
     * emote code like ":wave".  Design intent is not for this function to be
     * called directly, but rather for the decoded string to be accessed through
     * the pMessage property, which has the beneficial side-effect of caching the
     * result for faster repeated access.
     * @access private
     */
    _parseEmotes(msg) {
        try {
            msg = unescape(msg);
            //  image parsing
            const maxEmotesToParse = 10;
            const emoteCodeIndex = 5;
            let nParseLimit = 0;
            //  This regex is directly from mfccore.js, ParseEmoteOutput.prototype.Parse, with the same variable name etc
            const oImgRegExPattern = /#~(e|c|u|ue),(\w+)(\.?)(jpeg|jpg|gif|png)?,([\w\-\:\);\(\]\=\$\?\*]{0,48}),?(\d*),?(\d*)~#/;
            let re = [];
            // tslint:disable-next-line:no-conditional-assignment
            while ((re = msg.match(oImgRegExPattern)) !== null && nParseLimit < maxEmotesToParse) {
                const sShortcut = (re[emoteCodeIndex] !== undefined) ? ":" + re[emoteCodeIndex] : "<UNKNOWN EMOTE CODE: " + msg + ">";
                msg = msg.replace(oImgRegExPattern, sShortcut);
                nParseLimit++;
            }
            return msg;
        }
        catch (e) {
            // In practice I've never seen this happen, but if it does, it's not serious enough to tear down the whole client...
            Utils_1.logWithLevelInternal(Utils_1.LogLevel.WARNING, () => `WARNING: Error parsing emotes from '${msg}': ${e}`);
            return undefined;
        }
    }
    /**
     * Returns the formatted text of chat, PM, or tip messages.  For instance
     * the raw sMessage.msg string may be something like:
     *   `I am happy #~ue,2c9d2da6.gif,mhappy~#`
     * This returns that in the more human readable format:
     *   `I am happy :mhappy`
     */
    get pMessage() {
        // Formats the parsed message component of this packet, if one exists, with decoded emotes
        if (this._pMessage === undefined && typeof this.sMessage === "object") {
            if (this.FCType === Constants_1.FCTYPE.CMESG || this.FCType === Constants_1.FCTYPE.PMESG || this.FCType === Constants_1.FCTYPE.TOKENINC) {
                if (Packet.hasMsgString(this.sMessage)) {
                    this._pMessage = this._parseEmotes(this.sMessage.msg);
                }
            }
        }
        return this._pMessage;
    }
    /**
     * For chat, PM, or tip messages, this property returns the text of the
     * message as it would appear in the MFC chat window with the username
     * prepended, etc:
     *
     *   `AspenRae: Thanks guys! :mhappy`
     *
     * This is useful for logging.
     */
    get chatString() {
        if (this._chatString === undefined) {
            if (typeof this.sMessage === "object") {
                switch (this.FCType) {
                    case Constants_1.FCTYPE.CMESG:
                    case Constants_1.FCTYPE.PMESG:
                        if (Packet.hasMsgString(this.sMessage)) {
                            this._chatString = `${this.sMessage.nm}: ${this.pMessage}`;
                        }
                        break;
                    case Constants_1.FCTYPE.TOKENINC:
                        if (Packet.isTokenInc(this.sMessage)) {
                            const nameIndex = 2;
                            this._chatString = `${this.sMessage.u[nameIndex]} has tipped ${this.sMessage.m[nameIndex]} ${this.sMessage.tokens} tokens${this.pMessage !== undefined ? (`: '${this.pMessage}'`) : "."}`;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return this._chatString;
    }
    toString() {
        // tslint:disable-next-line:no-any
        const censor = (key, value) => {
            if (key === "FCType") {
                // Replace the numerical FCType value with it's more readable textual form
                return Constants_1.FCTYPE[this.FCType];
            }
            return value;
        };
        return JSON.stringify(this, censor);
    }
    // Type guards for Packet.ts
    static isRoomDataMessage(rdMsg) {
        return rdMsg !== undefined && typeof rdMsg.model === "number";
    }
    static hasMsgString(msg) {
        return msg !== undefined && typeof msg.msg === "string";
    }
    static isTokenInc(msg) {
        // tslint:disable:no-magic-numbers
        return msg !== undefined
            && typeof msg.tokens === "number"
            && Array.isArray(msg.u)
            && msg.u.length === 3
            && typeof msg.u[2] === "string"
            && msg.m.length === 3
            && typeof msg.m[2] === "string";
        // tslint:enable:no-magic-numbers
    }
}
exports.Packet = Packet;
//# sourceMappingURL=Packet.js.map