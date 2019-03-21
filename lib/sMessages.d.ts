import { FCTYPE } from "./Constants";
export declare type AnyMessage = FCTypeLoginResponse | FCTypeSlaveVShareResponse | FCTypeTagsResponse | FCTokenIncResponse | RoomDataMessage | ExtDataMessage | ManageListMessage | BookmarksMessage | RoomDataUserCountObjectMessage | RoomDataUserCountArrayMessage | StatusMessage | ZBanMessage | TKXMessage | RoomHelperErrorMessage | ClubShowMessage | Message;
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
        share_post_data: {
            color?: string;
            include_in_countdown: number;
            poll_option_slug?: string;
            poll_option_title?: string;
            poll_title?: string;
            recipient_id: number;
            thing_id: number;
            thing_type: string;
            tip_amount: number;
            transaction_id: number;
            trns_announce: number;
            trns_message: string;
            trns_title: string;
            trns_type: string;
            trns_url: string;
            user_id: number;
        };
        svc_id: number;
        trns_id: number;
        trns_title: string;
        trns_type: "Storeitem" | "Album" | "Club" | "Goal" | "Poll" | string;
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
    fcext: {
        sfw: number;
        sm: string;
    };
    share: MfcShareDetailsMessage;
    [index: string]: UnknownJsonField;
}
export interface MfcShareDetailsMessage {
    albums: number;
    clubs: number;
    collections: number;
    follows: number;
    goals: number;
    polls: number;
    stores: number;
    things: number;
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
    /** Emoji to use for the room's highest cumulative tipper */
    c_emoji: string;
    c_hightipper: {
        /** Total amount tipped by the room's highest cumulative tipper (public tips only) */
        amt: number;
        /** User ID of the room's highest cumulative tipper */
        uid: number;
    };
    /** Channel ID of the room this message is about */
    chan: number;
    /** ??? Room helper emoji maybe? Is that a thing? */
    r_emoji: string;
    /** Emoji to use for the room's highest single tipper */
    s_emoji: string;
    s_hightipper: {
        /** Amount of the room's highest single tip (public tips only) */
        amt: number;
        /** User ID of the room's highest single tipper */
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
/**
 * Logged in accounts receive details about
 * the state of their mail box when they
 * log in
 */
export interface InboxMessage {
    /** An array of emails where the strings are the sender's name and mail subject line */
    recentMail: [[number, string, number, string, number]];
    unreadCount: number;
}
/**
 * ??? MFC Share advertisements? Purchases? Not entirely sure
 */
export interface XMesgMessage {
    data: {
        /** ??? Always an empty string in my observation */
        description: string;
        /** Always share.myfreecams.com */
        domain: string;
        /** Full url to the thumbnail of the share item (minus the leading "https:") */
        image: string;
        /** Name of the MFC Share item */
        title: string;
        /** Token cost of the MFC Share item */
        token_amount: number | null;
        /** Type of the MFC Share thing, "Album" or "Item", etc... */
        type: string;
        /** Full url to the share item (this time including the "https:" part) */
        url: string;
        /** Model's user id */
        user_id: string;
        /** Model's name */
        username: string;
    };
    /** A stringified UserDetailsMessage about a member */
    from: string;
    /** Model's user id */
    to: number;
    /** ??? Always "card"? This is not the type of the MFC Share item */
    type: string;
}
/**
 * Received when room helper command fails
 */
export interface RoomHelperErrorMessage {
    _err: number;
    _msg: string;
    model?: number;
    sofar?: number;
    total?: number;
    type?: number;
    countdown?: boolean;
    topic?: string;
    op?: string;
    sid?: number;
    username?: string;
    chan?: number;
    users?: number[] | string[];
}
/**
 * Sent when you join the public chat
 * channel of a model who is in a club show
 */
export interface ClubShowMessage {
    ckx_auth?: {
        ctx: ["ck", number, number, number, number, number, number, number];
        ctxenc: string;
        tkx: string;
    };
    /** Array of all the clubs that have access to the show */
    clubs: Array<{
        /** ID of the club? */
        cid: number;
        /** Name of the club as it appears on MFC Share */
        name: string;
        /** A different (and more important) club ID */
        slug: string;
    }>;
    /** Unknown */
    gid: number;
    /** This model's user id */
    model: number;
    /**
     * FCCHAN.WELCOME if the show just started
     * or FCCHAN.EXPIRE if the show ended (?)
     */
    op: number;
    /** Unknown. Maybe the timestamp of when the club show started? */
    start: number;
    /**
     * Club session id, if this is defined, we're in an applicable
     * club for this club show
     */
    tksid?: number;
}
