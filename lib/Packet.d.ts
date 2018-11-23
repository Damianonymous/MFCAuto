import { AnyMessage } from "./sMessages";
import { FCTYPE } from "./Constants";
import { Model } from "./Model";
/** Packet represents a single, complete message received from the chat server */
export declare class Packet {
    /**
     * The Packet type. See FCTYPE in ./src/main/Constants.ts for all possible
     * message types
     */
    readonly FCType: FCTYPE;
    /** Number representing the channel or entity this packet is from */
    readonly nFrom: number;
    /** Number representing the channel or entity this packet is to */
    readonly nTo: number;
    /** Number whose meaning varies depending on the packet's FCType */
    readonly nArg1: number;
    /** Number whose meaning varies depending on the packet's FCType */
    readonly nArg2: number;
    /** Size of any string payload contained in this message */
    readonly sPayload: number;
    /**
     * Payload of the packet, this can be a string, array, object or undefined
     * depending on the FCType of the packet and the whims of the chat server
     */
    readonly sMessage: AnyMessage | undefined;
    private _aboutModel;
    private _pMessage;
    private _chatString;
    constructor(FCType: FCTYPE, nFrom: number, nTo: number, nArg1: number, nArg2: number, sPayload: number, sMessage: AnyMessage | undefined);
    /**
     * The model this packet is loosely "about", meaning
     * who's receiving the tip/chat/status update/etc.
     * For some packets this can be undefined.
     */
    readonly aboutModel: Model | undefined;
    /**
     * This parses MFC's emote encoding and replaces those tokens with the simple
     * emote code like ":wave".  Design intent is not for this function to be
     * called directly, but rather for the decoded string to be accessed through
     * the pMessage property, which has the beneficial side-effect of caching the
     * result for faster repeated access.
     * @access private
     */
    private _parseEmotes(msg);
    /**
     * Returns the formatted text of chat, PM, or tip messages.  For instance
     * the raw sMessage.msg string may be something like:
     *   `I am happy #~ue,2c9d2da6.gif,mhappy~#`
     * This returns that in the more human readable format:
     *   `I am happy :mhappy`
     */
    readonly pMessage: string | undefined;
    /**
     * For chat, PM, or tip messages, this property returns the text of the
     * message as it would appear in the MFC chat window with the username
     * prepended, etc:
     *
     *   `AspenRae: Thanks guys! :mhappy`
     *
     * This is useful for logging.
     */
    readonly chatString: string | undefined;
    toString(): string;
    private static isRoomDataMessage(rdMsg);
    private static hasMsgString(msg);
    private static isTokenInc(msg);
}
