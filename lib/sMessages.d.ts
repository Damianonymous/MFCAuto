import { FCTYPE } from "./Constants";
export declare type AnyMessage = FCTypeLoginResponse | FCTypeSlaveVShareResponse | FCTypeTagsResponse | FCTokenIncResponse | RoomDataMessage | ExtDataMessage | ManageListMessage | BookmarksMessage | RoomDataUserCountObjectMessage | RoomDataUserCountArrayMessage | StatusMessage | ZBanMessage | Message;
export declare type UnknownJsonField = string | number | boolean | object | undefined;
export declare type FCTypeLoginResponse = string;
export declare type FCTypeSlaveVShareResponse = number[];
export interface FCTypeTagsResponse {
    [index: string]: string[];
}
export interface FCTokenIncResponse {
    ch: number;
    flags: number;
    m: [number, number, string];
    sesstype: number;
    stamp: number;
    tokens: number;
    u: [number, number, string];
    msg?: string;
    extdata?: {
        svc_id: number;
        trns_id: number;
        trns_title: string;
        trns_type: "Storeitem" | "Album" | "Club" | "Goal" | string;
        trns_url: string;
    };
}
export interface RoomDataMessage {
    countdown: boolean;
    model: number;
    sofar: number;
    src: string;
    topic: string;
    total: number;
}
export interface RoomDataUserCountObjectMessage {
    [index: string]: number;
}
export declare type RoomDataUserCountArrayMessage = number[];
export interface ExtDataMessage {
    msg: {
        arg1: number;
        arg2: number;
        from: number;
        len: number;
        to: number;
        type: FCTYPE;
    };
    msglen: number;
    opts: number;
    respkey: number;
    serv: number;
    type: FCTYPE;
}
export interface ManageListMessage {
    count: number;
    op: number;
    owner: number;
    rdata: Array<Array<string | number | object>> | FCTypeTagsResponse;
    channel: number;
}
export interface BookmarksMessage {
    bookmarks: BaseMessage[];
}
export interface BaseMessage {
    sid: number;
    uid: number;
    pid?: number;
    lv?: number;
    nm?: string;
    vs?: number;
    msg?: string;
    [index: string]: UnknownJsonField;
}
export interface Message extends BaseMessage {
    u?: UserDetailsMessage;
    m?: ModelDetailsMessage;
    s?: SessionDetailsMessage;
    x?: ExtendedDetailsMessage;
}
export interface ModelDetailsMessage {
    camscore?: number;
    continent?: string;
    flags?: number;
    kbit?: number;
    lastnews?: number;
    mg?: number;
    missmfc?: number;
    new_model?: number;
    rank?: number;
    rc?: number;
    topic?: string;
    hidecs?: boolean;
    sfw?: number;
    [index: string]: UnknownJsonField;
}
export interface UserDetailsMessage {
    age?: number;
    avatar?: number;
    blurb?: string;
    camserv?: number;
    chat_bg?: number;
    chat_color?: string;
    chat_font?: number;
    chat_opt?: number;
    city?: string;
    country?: string;
    creation?: number;
    ethnic?: string;
    occupation?: string;
    phase?: string;
    photos?: number;
    profile?: number;
    [index: string]: UnknownJsonField;
}
export interface SessionDetailsMessage {
    ga2?: string;
    gst?: string;
    ip?: string;
    rp?: number;
    tk?: number;
    [index: string]: UnknownJsonField;
}
export interface ExtendedDetailsMessage {
    share: MfcShareDetailsMessage;
    [index: string]: UnknownJsonField;
}
export interface MfcShareDetailsMessage {
    albums: number;
    follows: number;
    clubs: number;
    collections: number;
    stores: number;
    tm_album: number;
    [index: string]: UnknownJsonField;
}
/**
 * Received as part of FCTYPE.ZBAN messages
 * to indicate that you, or someone else,
 * has been banned, or a subset of other room
 * moderator activities (muting a member,
 * clearing chat from a member, etc)
 */
export interface ZBanMessage {
    /** Channel/room the message is for */
    channel?: number;
    /**
     * Details of the single user being banned
     * Either 'events' or ('sids' and 'uids')
     * will be present on all ZBAN packets.
     * Never both together.
     */
    event?: {
        /** Channel/room the message is for...again */
        channel: number;
        /** FCLEVEL of the user being banned, 2 === Premium user */
        lv: number;
        /** User ID of the model the member is being banned from */
        model: number;
        /** Session ID of the banned user */
        sid: number;
        /** User ID of the banned user */
        uid: number;
        /** User name of the banned user */
        username: string;
    };
    /**
     * Not sure, seems to always be 30 when
     * op is "clearchat"
     */
    min?: number;
    /**
     * Action to take apart from banning the user
     * Specified when ztype is undefined
     */
    op?: "clearchat" | string;
    /**
     * Array of user session IDs this action applies to
     * Either 'events' or ('sids' and 'uids')
     * will be present on all ZBAN packets.
     * Never both together.
     */
    sids?: Array<number>;
    /**
     * Array of user IDs this action applies to
     * Either 'events' or ('sids' and 'uids')
     * will be present on all ZBAN packets.
     * Never both together.
     */
    uids?: Array<number>;
    /**
     * Type of ban. 'c' == room/channel ban, 'm' == muted
     * Specified when op is undefined
     */
    ztype?: "c" | "m";
}
/**
 * Received as part of an FCTYPE.STATUS packet
 * when first joining a model's chat room
 */
export interface StatusMessage {
    c_hightipper: {
        /** Amount of the room's highest tip */
        amt: number;
        /** User ID of the room's highest tipper */
        uid: number;
    };
    /** Channel ID of the room this message is about */
    chan: number;
    s_hightipper: {
        /** Amount of the room's second highest tip */
        amt: number;
        /** User ID of the room's second highest tipper */
        uid: number;
    };
    /** Array of user IDs of the room's most recent tippers */
    tiporder: Array<number>;
}
/**
 * Received as part of an FCTYPE.TKX packet
 * every 5 minutes for any connected client.
 * This contains auth keys for video streams.
 */
export interface TKXMessage {
    _err: number;
    ctx: Array<number>;
    ctxenc: string;
    cxid: number;
    tkx: string;
}
