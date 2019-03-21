import {AnyMessage, RoomDataMessage, Message, FCTokenIncResponse} from "./sMessages";
import {Client} from "./Client";
import {FCTYPE} from "./Constants";
import {logWithLevelInternal as logl, LogLevel, decodeAny} from "./Utils";
import {Model} from "./Model";

// Forward definitions for the TypeScript compiler
declare var unescape: (text: string) => string;

/** Packet represents a single, complete message received from the chat server */
export class Packet {
    /**
     * The Packet type. See FCTYPE in ./src/main/Constants.ts for all possible
     * message types
     */
    public readonly FCType: FCTYPE;
    /** Number representing the channel or entity this packet is from */
    public readonly nFrom: number;
    /** Number representing the channel or entity this packet is to */
    public readonly nTo: number;
    /** Number whose meaning varies depending on the packet's FCType */
    public readonly nArg1: number;
    /** Number whose meaning varies depending on the packet's FCType */
    public readonly nArg2: number;
    /** Size of any string payload contained in this message */
    public readonly sPayload: number;
    /**
     * Payload of the packet, this can be a string, array, object or undefined
     * depending on the FCType of the packet and the whims of the chat server
     */
    public readonly sMessage: AnyMessage | undefined;

    // Property backing fields
    private _aboutModel: Model | undefined;
    private _pMessage: string | undefined;
    private _chatString: string | undefined;

    constructor(FCType: FCTYPE, nFrom: number, nTo: number, nArg1: number, nArg2: number, sPayload: number, sMessage: AnyMessage | undefined) {
        this.FCType = FCType;
        this.nFrom = nFrom;
        this.nTo = nTo;
        this.nArg1 = nArg1;
        this.nArg2 = nArg2;
        this.sPayload = sPayload;
        // tslint:disable-next-line:no-unsafe-any
        this.sMessage = decodeAny(sMessage);
    }

    /**
     * The model this packet is loosely "about", meaning
     * who's receiving the tip/chat/status update/etc.
     * For some packets this can be undefined.
     */
    get aboutModel(): Model | undefined {
        if (this._aboutModel === undefined) {
            let id = -1;
            switch (this.FCType) {
                case FCTYPE.ADDFRIEND:
                case FCTYPE.ADDIGNORE:
                case FCTYPE.JOINCHAN:
                case FCTYPE.STATUS:
                case FCTYPE.CHATFLASH:
                case FCTYPE.ZBAN:
                    id = this.nArg1;
                    break;
                case FCTYPE.SESSIONSTATE:
                case FCTYPE.LISTCHAN:
                    id = this.nArg2;
                    break;
                case FCTYPE.USERNAMELOOKUP:
                case FCTYPE.NEWSITEM:
                case FCTYPE.PMESG:
                    id = this.nFrom;
                    break;
                case FCTYPE.GUESTCOUNT:
                case FCTYPE.TOKENINC:
                case FCTYPE.CMESG:
                case FCTYPE.BANCHAN:
                    id = this.nTo;
                    break;
                case FCTYPE.ROOMDATA:
                    if (Packet.isRoomDataMessage(this.sMessage)) {
                        id = this.sMessage.model;
                    }
                    break;
                case FCTYPE.LOGIN:
                case FCTYPE.MODELGROUP:
                case FCTYPE.PRIVACY:
                case FCTYPE.DETAILS:
                case FCTYPE.METRICS:
                case FCTYPE.UEOPT:
                case FCTYPE.SLAVEVSHARE:
                case FCTYPE.INBOX:
                case FCTYPE.EXTDATA:
                case FCTYPE.MYWEBCAM:
                case FCTYPE.TAGS:
                case FCTYPE.NULL:
                    // These cases don't have a direct mapping between packet and model.
                    // either the mapping doesn't apply or this packet is about many models
                    // potentially (like Tags packets)
                    break;
                case FCTYPE.CLUBSHOW:
                    id = this.nFrom;
                    break;
                default:
                    // @TODO - Fill in the rest of the cases as necessary
                    // assert.fail(`Tried to retrieve an aboutModel for unknown packet type: ${this.toString()}`);
            }
            if (id !== -1) {
                id = Client.toUserId(id);
                this._aboutModel = Model.getModel(id);
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
    private _parseEmotes(msg: string): string | undefined {
        try {
            msg = unescape(msg);

            //  image parsing
            const maxEmotesToParse = 10;
            const emoteCodeIndex = 5;
            let nParseLimit = 0;

            //  This regex is directly from mfccore.js, ParseEmoteOutput.prototype.Parse, with the same variable name etc
            const oImgRegExPattern = /#~(e|c|u|ue),(\w+)(\.?)(jpeg|jpg|gif|png)?,([\w\-\:\);\(\]\=\$\?\*]{0,48}),?(\d*),?(\d*)~#/;

            let re: RegExpMatchArray | null = [];
            // tslint:disable-next-line:no-conditional-assignment
            while ((re = msg.match(oImgRegExPattern)) !== null && nParseLimit < maxEmotesToParse) {
                const sShortcut = (re[emoteCodeIndex] !== undefined) ? ":" + re[emoteCodeIndex] : "<UNKNOWN EMOTE CODE: " + msg + ">";
                msg = msg.replace(oImgRegExPattern, sShortcut);
                nParseLimit++;
            }

            return msg;
        } catch (e) {
            // In practice I've never seen this happen, but if it does, it's not serious enough to tear down the whole client...
            logl(LogLevel.WARNING, () => `WARNING: Error parsing emotes from '${msg}': ${e}`);
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
    public get pMessage(): string | undefined {
        // Formats the parsed message component of this packet, if one exists, with decoded emotes
        if (this._pMessage === undefined && typeof this.sMessage === "object") {
            if (this.FCType === FCTYPE.CMESG || this.FCType === FCTYPE.PMESG || this.FCType === FCTYPE.TOKENINC) {
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
    public get chatString(): string | undefined {
        if (this._chatString === undefined) {
            if (typeof this.sMessage === "object") {
                switch (this.FCType) {
                    case FCTYPE.CMESG:
                    case FCTYPE.PMESG:
                        if (Packet.hasMsgString(this.sMessage)) {
                            this._chatString = `${this.sMessage.nm}: ${this.pMessage}`;
                        }
                        break;
                    case FCTYPE.TOKENINC:
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

    public toString(): string {
        // tslint:disable-next-line:no-any
        const censor = (key: string, value: any) => {
            if (key === "FCType") {
                // Replace the numerical FCType value with it's more readable textual form
                return FCTYPE[this.FCType];
            }
            return value;
        };
        return JSON.stringify(this, censor);
    }

    // Type guards for Packet.ts
    private static isRoomDataMessage(rdMsg: AnyMessage | undefined): rdMsg is RoomDataMessage {
        return rdMsg !== undefined && typeof (rdMsg as RoomDataMessage).model === "number";
    }
    private static hasMsgString(msg: AnyMessage | undefined): msg is AnyMessage & { msg: string, nm: undefined | string } {
        return msg !== undefined && typeof (msg as Message).msg === "string";
    }
    private static isTokenInc(msg: AnyMessage | undefined): msg is FCTokenIncResponse {
        return msg !== undefined
            && typeof (msg as FCTokenIncResponse).tokens === "number"
            && Array.isArray((msg as FCTokenIncResponse).u)
            && (msg as FCTokenIncResponse).u.length === 3
            && typeof (msg as FCTokenIncResponse).u[2] === "string"
            && (msg as FCTokenIncResponse).m.length === 3
            && typeof (msg as FCTokenIncResponse).m[2] === "string";
    }
}
