// Various constants and enums used by MFC.  Most of these values can be seen here:
// http://www.myfreecams.com/_js/mfccore.js

export const MAGIC = -2027771214;
export const FLASH_PORT = 8100;
export const WEBSOCKET_PORT = 443;
export const SHARE_URL = "https://share.myfreecams.com";

// STATE is essentially the same as FCVIDEO but has friendly names
// for better log messages and code readability
export enum STATE {
    FreeChat = 0,           // TX_IDLE
    // TX_RESET = 1,        // Unused?
    Away = 2,               // TX_AWAY
    // TX_CONFIRMING = 11,  // Unused?
    Private = 12,           // TX_PVT
    GroupShow = 13,         // TX_GRP
    Club = 14,              // TX_CLUB
    // TX_KILLMODEL = 15,   // Unused?
    // C2C_ON = 20,         // Unused?
    // C2C_OFF = 21,        // Unused?
    Online = 90,            // RX_IDLE
    // RX_PVT = 91,         // Unused?
    // RX_VOY = 92,         // Unused?
    // RX_GRP = 93,         // Unused?
    // RX_CLUB = 94,        // Unused?
    // NULL = 126,          // Unused?
    Offline = 127,          // OFFLINE
}

// Chat channels a model can be in.
// These are distinct from the video
// states as technically all of these
// channels exist all the time for
// every model
export enum ChannelType {
    FreeChat,
    NonFreeChat,
}

// Version number to pass along with our
// FCTYPE_LOGIN login requests
//
// The latest Flash version number is here:
//   https://www.myfreecams.com/js/wsgw.js
// The latest WebSocket version number is here:
//   http://m.myfreecams.com/source.min.js
export enum LOGIN_VERSION {
    FLASH = 20071025,
    WEBSOCKET = 20080910,
}

export enum CAMCHAN {
    "ID_START" = 400000000,
    "ID_END" = 500000000,
}

export enum CHANNEL {
    "ID_START" = 100000000,
    "ID_END" = 400000000,
}

export enum CLIENT {
    "VERSION_REQUIRED" = 20060925,
}

export enum CLUB {
    "ID_START" = 0,
    "ID_END" = 2000000000,
}

export enum CLUBGROUP {
    "ID_START" = 2000000000,
}

export enum DISPLAY {
    "PM_INLINE_WHISPER" = 1,
    "PM_INLINE_ALL" = 2,
}

export enum EVSESSION {
    "NONE" = 0,
    "PRIVATE" = 1,
    "VOYEUR" = 2,
    "GROUP" = 3,
    "FEATURE" = 4,
    "AWAYPVT" = 5,
    "CLUB" = 6,
    "TIP" = 10,
    "PUBLIC" = 100,
    "AWAY" = 101,
    "START" = 102,
    "UPDATE" = 103,
    "STOP" = 104,
    "SPECIAL" = 1000,
}

export enum EVUP {
    "NONE" = 0,
    "DIFF" = 1,
    "FULL" = 2,
}

export enum FCACCEPT {
    "NOBODY" = 0,
    "FRIENDS" = 1,
    "ALL" = 2,
    "V2_NONE" = 8,
    "V2_FRIENDS" = 16,
    "V2_MODELS" = 32,
    "V2_PREMIUMS" = 64,
    "V2_BASICS" = 128,
    "V2_BOOKMARKS" = 256,
    "V2_TOPFRIENDS" = 512,
    "V2_CLUBMEMBERS" = 1024,
}

export enum FCACT {
    "CHAN_TIP" = 1006,
    "CHAN_BAN" = 1011,
    "CHAN_UNBAN" = 1012,
    "CHAN_JOIN" = 1051,
    "CHAN_PART" = 1052,
    "CHAN_TOPIC" = 1061,
    "CHAN_WHITEBOARD_ON" = 1101,
    "CHAN_WHITEBOARD_OFF" = 1102,
    "LOGIN" = 8001,
    "LOGOUT" = 8002,
}

export enum FCAPP {
    "NONE" = 0,
    "MASTER" = 1,
    "CHAT" = 2,
    "WORKER" = 3,
    "AUTH" = 4,
    "LOADTEST" = 5,
    "TRANSCODER" = 6,
    "CLIENT" = 7,
    "FLUX_CLIENT" = 32,
    "FLUX_SERVICE" = 33,
    "FLUX_BROKER" = 34,
    "WWW" = 100,
    "PROFILES" = 101,
    "MOBILE" = 102,
    "IMG" = 103,
    "API" = 104,
    "ADMIN" = 105,
    "ARCHIVE" = 204,
    "DATABASE" = 205,
    "FMS" = 500,
    "WOWZA" = 501,
    "WOWZA_RELAY" = 502,
    "WOWZA_CAM2CAM" = 503,
    "WOWZA_OBS" = 508,
    "NGINX" = 510,
    "FMS_SHARED" = 801,
    "CAM2CAM" = 802,
    "FMS_ORIGIN" = 803,
    "FMS_EDGE" = 804,
}

export enum FCBAN {
    "NONE" = 0,
    "TEMP" = 1,
    "60DAY" = 2,
    "LIFE" = 3,
}

export enum FCCHAN {
    "NOOPT" = 0,
    "EVENT_NONE" = 0,
    "JOIN" = 1,
    "EVENT_CLEARCHAT" = 1,
    "PART" = 2,
    "EVENT_MUTE" = 2,
    "ERR_NOCHANNEL" = 2,
    "EVENT_TOPIC" = 3,
    "ERR_NOTMEMBER" = 3,
    "ERR_GUESTMUTE" = 4,
    "EVENT_COUNTDOWN" = 4,
    "OLDMSG" = 4,
    "EVENT_KICK" = 5,
    "ERR_GROUPMUTE" = 5,
    "EVENT_WHITEBOARD_ON" = 6,
    "ERR_NOTALLOWED" = 6,
    "EVENT_WHITEBOARD_OFF" = 7,
    "EVENT_RESERVED_008" = 8,
    "HISTORY" = 8,
    "EVENT_RESERVED_009" = 9,
    "EVENT_RESERVED_010" = 10,
    "EVENT_RESERVED_011" = 11,
    "EVENT_RESERVED_012" = 12,
    "EVENT_RESERVED_013" = 13,
    "EVENT_RESERVED_014" = 14,
    "EVENT_RESERVED_015" = 15,
    "CAMSTATE" = 16,
    "EVENT_RESERVED_016" = 16,
    "LIST" = 16,
    "EVENT_RESERVED_017" = 17,
    "EVENT_RESERVED_018" = 18,
    "EVENT_RESERVED_019" = 19,
    "WELCOME" = 32,
    "BATCHPART" = 64,
    "EXT_USERNAME" = 128,
    "EXT_USERDATA" = 256,
    "NO_CHANGES" = 512,
    "APPEND" = 1024,
    "REPLACE" = 2048,
    "UPDATE" = 4096,
    "QUERY" = 8192,
    "EXPIRE" = 16384,
    "NOTIFY" = 32768,
    "APPLY" = 65536,
    "IMPORT" = 131072,
    "BATCH" = 262144,
}

export enum FCERRTYPE {
    "INVALIDUSER" = 10,
    "NOACCESS" = 11,
    "NOSPACE" = 12,
}

export enum FCGROUP {
    "NONE" = 0,
    "EXPIRED" = 1,
    "BUSY" = 2,
    "EMPTY" = 3,
    "DECLINED" = 4,
    "UNAVAILABLE" = 5,
    "SESSION" = 9,
}

export enum FCL {
    "NULL" = 0,
    "FRIENDS" = 1,
    "IGNORES" = 2,
    "BOOKMARKS" = 3,
    "HIDDEN" = 4,
    "HPFRIENDS" = 5,
    "TOPFRIENDS" = 6,
    "NEWS_SUBS" = 7,
    "NEWS_HIDDEN" = 8,
    "MYWEBCAM_ALLOW" = 9,
    "MYWEBCAM_DENY" = 10,
    "BLOCKS_STATES" = 11,
    "BLOCKS_COUNTRIES" = 12,
    "ROOMFILTERS" = 13,
    "BANS" = 14,
    "MUTES" = 15,
    "UEOPTS" = 16,
    "RESERVED_16" = 16,
    "RESERVED_17" = 17,
    "RESERVED_18" = 18,
    "RESERVED_19" = 19,
    "TAGS" = 20,
    "CAMS" = 21,
    "ROOMMATES" = 22,
    "SOCIALDATA" = 23,
    "RESERVED_23" = 23,
    "RESERVED_24" = 24,
    "SHARE_CLUBS" = 24,
    "SHARE_CLUBMEMBERSHIPS" = 25,
    "RESERVED_25" = 25,
    "SHARE_CLUBSHOWS" = 26,
    "RESERVED_26" = 26,
    "RESERVED_27" = 27,
    "RESERVED_28" = 28,
    "RESERVED_29" = 29,
}

export enum FCLEVEL {
    "GUEST" = 0,
    "BASIC" = 1,
    "PREMIUM" = 2,
    "MODEL" = 4,
    "ADMIN" = 5,
}

export enum FCMODE {
    "NOPM" = 0,
    "FRIENDPM" = 1,
    "ALLPM" = 2,
}

export enum FCMODEL {
    "NONE" = 0,
    "NOGROUP" = 1,
    "FEATURE1" = 2,
    "FEATURE2" = 4,
    "FEATURE3" = 8,
    "FEATURE4" = 16,
    "FEATURE5" = 32,
}

export enum FCNEWSOPT {
    "NONE" = 0,
    "IN_CHAN" = 1,
    "IN_PM" = 2,
    "AUTOFRIENDS_OFF" = 4,
    "ADDFRIENDS_OFF" = 4,
    "IN_CHAN_NOPVT" = 8,
    "IN_CHAN_NOGRP" = 16,
}

export enum FCNOSESS {
    "NONE" = 0,
    "PVT" = 1,
    "GRP" = 2,
    "TRUEPVT" = 4,
    "TOKEN_MIN" = 8,
    "PLATFORM" = 16,
    "VIDEOSERVER" = 32,
    "INVALID_STATE" = 64,
    "MODEL_SETTINGS" = 128,
    "CLIENT_ERROR" = 256,
}

export enum FCOPT {
    "NONE" = 0,
    "BOLD" = 1,
    "ITALICS" = 2,
    "REMOTEPVT" = 4,
    "TRUEPVT" = 8,
    "CAM2CAM" = 16,
    "RGNBLOCK" = 32,
    "TOKENAPPROX" = 64,
    "TOKENHIDE" = 128,
    "RPAPPROX" = 256,
    "RPHIDE" = 512,
    "HDVIDEO" = 1024,
    "MODELSW" = 2048,
    "GUESTMUTE" = 4096,
    "BASICMUTE" = 8192,
    "SMALLCAPS" = 16384,
    "XMPP" = 32768,
    "WHITEBOARD1" = 65536,
    "WHITEBOARD2" = 131072,
    "ATTACHED" = 262144,
    "WEBRTCV1" = 524288,
}

export enum FCPORT {
    "EDGE_POLICY" = 843,
    "MASTER_EDGE" = 4000,
    "MASTER_AUTH" = 4001,
    "AUTH_DATAGRAM" = 4002,
    "MASTER_WORKER" = 4003,
    "EDGE_WORKER" = 4004,
    "EDGE_CLIENT1" = 5001,
    "EDGE_AJAX" = 8080,
    "EDGE_CLIENT3" = 8100,
    "EDGE_WEBSOCKGW" = 8101,
    "EDGE_CLIENT2" = 8550,
    "WORKER_BASE" = 9000,
}

export enum FCRESPONSE {
    "SUCCESS" = 0,
    "ERROR" = 1,
    "NOTICE" = 2,
    "SUSPEND" = 3,
    "SHUTOFF" = 4,
    "WARNING" = 5,
    "QUEUED" = 6,
    "NO_RESULTS" = 7,
    "CACHED" = 8,
    "JSON" = 9,
    "INVALIDUSER" = 10,
    "NOACCESS" = 11,
    "NOSPACE" = 12,
    "INVALIDREQ" = 13,
    "INVALIDARG" = 14,
    "NOTFOUND" = 15,
    "INSUFFICIENT" = 16,
    "EXPIRED" = 17,
    "BINARY" = 18,
    "UNKNOWN" = 255,
}

export enum FCRPC {
    "NONE" = 0,
    "UPDATEFRIEND" = 1,
    "UPDATEIGNORE" = 2,
    "RESLOADED" = 3,
    "W_READY" = 4,
    "W_OFFLINEQUERY" = 5,
    "W_FRIENDLIST" = 6,
    "W_IGNORELIST" = 7,
    "W_EXT_REQUEST" = 8,
    "W_EXT_RESPONSE" = 9,
    "FCSVAR" = 10,
}

export enum FCS {
    "SUBSCRIBE" = 1,
    "SYNC" = 2,
    "SESSION" = 10,
    "BAN" = 11,
    "MODEL" = 12,
    "EVENT" = 13,
    "EVENT2" = 14,
    "EXTDATA" = 15,
    "GWCONNECT" = 16,
    "MUTE" = 18,
    "AUTHREQ" = 100,
    "BANREQ" = 101,
    "EVENTREQ" = 102,
    "EVENTRESP" = 103,
    "SENDEVENT" = 104,
    "SENDEVENT2" = 105,
}

export enum FCSBAN {
    "NONE" = 0,
    "USER" = 1,
    "IP" = 2,
}

export enum FCTYPE {
    "CLIENT_MANUAL_DISCONNECT" = -6,
    "CLIENT_DISCONNECTED" = -5,
    "CLIENT_MODELSLOADED" = -4,
    "CLIENT_CONNECTED" = -3,
    "ANY" = -2,
    "UNKNOWN" = -1,
    "NULL" = 0,
    "LOGIN" = 1,
    "ADDFRIEND" = 2,
    "PMESG" = 3,
    "STATUS" = 4,
    "DETAILS" = 5,
    "TOKENINC" = 6,
    "ADDIGNORE" = 7,
    "PRIVACY" = 8,
    "ADDFRIENDREQ" = 9,
    "USERNAMELOOKUP" = 10,
    "ZBAN" = 11,
    "BROADCASTNEWS" = 12,
    "ANNOUNCE" = 13,
    "MANAGELIST" = 14,
    "INBOX" = 15,
    "GWCONNECT" = 16,
    "RELOADSETTINGS" = 17,
    "HIDEUSERS" = 18,
    "RULEVIOLATION" = 19,
    "SESSIONSTATE" = 20,
    "REQUESTPVT" = 21,
    "ACCEPTPVT" = 22,
    "REJECTPVT" = 23,
    "ENDSESSION" = 24,
    "TXPROFILE" = 25,
    "STARTVOYEUR" = 26,
    "SERVERREFRESH" = 27,
    "SETTING" = 28,
    "BWSTATS" = 29,
    "TKX" = 30,
    "SETTEXTOPT" = 31,
    "SERVERCONFIG" = 32,
    "MODELGROUP" = 33,
    "REQUESTGRP" = 34,
    "STATUSGRP" = 35,
    "GROUPCHAT" = 36,
    "CLOSEGRP" = 37,
    "UCR" = 38,
    "MYUCR" = 39,
    "SLAVECON" = 40,
    "SLAVECMD" = 41,
    "SLAVEFRIEND" = 42,
    "SLAVEVSHARE" = 43,
    "ROOMDATA" = 44,
    "NEWSITEM" = 45,
    "GUESTCOUNT" = 46,
    "PRELOGINQ" = 47,
    "MODELGROUPSZ" = 48,
    "ROOMHELPER" = 49,
    "CMESG" = 50,
    "JOINCHAN" = 51,
    "CREATECHAN" = 52,
    "INVITECHAN" = 53,
    "KICKCHAN" = 54,
    "QUIETCHAN" = 55,
    "BANCHAN" = 56,
    "PREVIEWCHAN" = 57,
    "SHUTDOWN" = 58,
    "LISTBANS" = 59,
    "UNBAN" = 60,
    "SETWELCOME" = 61,
    "CHANOP" = 62,
    "LISTCHAN" = 63,
    "TAGS" = 64,
    "SETPCODE" = 65,
    "SETMINTIP" = 66,
    "UEOPT" = 67,
    "HDVIDEO" = 68,
    "METRICS" = 69,
    "OFFERCAM" = 70,
    "REQUESTCAM" = 71,
    "MYWEBCAM" = 72,
    "MYCAMSTATE" = 73,
    "PMHISTORY" = 74,
    "CHATFLASH" = 75,
    "TRUEPVT" = 76,
    "BOOKMARKS" = 77,
    "EVENT" = 78,
    "STATEDUMP" = 79,
    "RECOMMEND" = 80,
    "EXTDATA" = 81,
    "NOTIFY" = 84,
    "PUBLISH" = 85,
    "XREQUEST" = 86,
    "XRESPONSE" = 87,
    "EDGECON" = 88,
    "XMESG" = 89,
    "CLUBSHOW" = 90,
    "CLUBCMD" = 91,
    "ZGWINVALID" = 95,
    "CONNECTING" = 96,
    "CONNECTED" = 97,
    "DISCONNECTED" = 98,
    "LOGOUT" = 99,
}

export enum FCUCR {
    "VM_LOUNGE" = 0,
    "CREATOR" = 0,
    "VM_MYWEBCAM" = 1,
    "FRIENDS" = 1,
    "MODELS" = 2,
    "PREMIUMS" = 4,
    "BASIC" = 8,
    "BASICS" = 8,
    "ALL" = 15,
}

export enum FCUOPT {
    "EMPTY" = 0,
    "PLATFORM_MFC" = 1,
    "PLATFORM_CAMYOU" = 2,
    "PLATFORM_OFFLINE" = 4,
    "PLATFORM_XSDEFAULT" = 8,
    "RESERVED_05" = 16,
    "RESERVED_06" = 32,
    "RESERVED_07" = 64,
    "LOG_XMESG" = 128,
    "RESERVED_09" = 256,
    "RESERVED_10" = 512,
    "RESERVED_11" = 1024,
    "RESERVED_12" = 2048,
    "RESERVED_13" = 4096,
    "RESERVED_14" = 8192,
    "RESERVED_15" = 16384,
    "RESERVED_16" = 32768,
    "RESERVED_17" = 65536,
    "FLAG_HDVIDEO" = 131072,
    "FLAG_MODELSW" = 262144,
    "FLAG_XMPP" = 524288,
    "FLAG_WHITEBOARD1" = 1048576,
    "FLAG_WHITEBOARD2" = 2097152,
    "FLAG_ATTACHED" = 4194304,
}

export enum FCUPDATE {
    "NONE" = 0,
    "MISSMFC" = 1,
    "NEWTIP" = 2,
    "REGION_SAFE" = 3,
    "CAMSCORE" = 4,
    "ROOMFILTER" = 5,
    "CLUBMEMBERSHIP" = 6,
    "CLUB" = 7,
    "CLUBCACHE" = 8,
}

export enum FCUSER {
    "TESTCAM2" = 469516,
    "TESTCAM3" = 469517,
    "TESTCAM1" = 469518,
    "MFCNEWS" = 481462,
    "CAMNEWS" = 481464,
    "LOUNGE" = 486121,
    "LOUNGE1K" = 486123,
    "LOUNGE10K" = 486124,
    "CAM_LOUNGE" = 486128,
    "MFCSHARE" = 1535156,
    "CAMSHARE" = 1535157,
}

export enum FCVIDEO {
    "TX_IDLE" = 0,
    "TX_RESET" = 1,
    "TX_AWAY" = 2,
    "TX_CONFIRMING" = 11,
    "TX_PVT" = 12,
    "TX_GRP" = 13,
    "TX_CLUB" = 14,
    "TX_KILLMODEL" = 15,
    "C2C_ON" = 20,
    "C2C_OFF" = 21,
    "RX_IDLE" = 90,
    "RX_PVT" = 91,
    "RX_VOY" = 92,
    "RX_GRP" = 93,
    "RX_CLUB" = 94,
    "NULL" = 126,
    "OFFLINE" = 127,
    "UNKNOWN" = 127,
}

export enum FCW {
    "STATE_INIT" = 0,
    "STATE_READY" = 1,
    "STATE_WORKING" = 2,
    "STATE_WAITING" = 3,
    "STATE_INVALID" = 4,
}

export enum FCWINDOW {
    "NO_USER_PM" = 20,
    "OPTIONS_ADD_FRIEND" = 31,
    "OPTIONS_ADD_IGNORE" = 32,
}

export enum FCWOPT {
    "NONE" = 0,
    "ADD" = 1,
    "REMOVE" = 2,
    "LIST" = 4,
    "NO_RECEIPT" = 128,
    "REDIS_JSON" = 256,
    "USERID" = 1024,
    "USERDATA" = 2048,
    "USERNAME" = 4096,
    "C_USERNAME" = 32768,
    "C_MONTHSLOGIN" = 65536,
    "C_LEVEL" = 131072,
    "C_VSTATE" = 262144,
    "C_CHATTEXT" = 524288,
    "C_PROFILE" = 1048576,
    "C_AVATAR" = 2097152,
    "C_RANK" = 4194304,
    "C_SDATE" = 8388608,
}

export enum HIDE {
    "MODEL_GROUPS_AWAY" = 1,
    "MODEL_GROUPS_PRIVATE" = 2,
    "MODEL_GROUPS_GROUP" = 4,
    "MODEL_GROUPS_PUBLIC" = 8,
}

export enum LOUNGE {
    "MASK_AUTO_CLICK" = 1,
    "MASK_NO_CAMSNAPS" = 2,
    "MASK_LOUNGE_MODE" = 4,
}

export enum MAX {
    "FCL" = 30,
}

export enum MFC {
    "NEWS_USER_ID" = 481462,
}

export enum MODEL {
    "LIST_ICON_NEW_MODEL" = 1,
    "LIST_ICON_RECOMMEND" = 2,
    "LIST_ICON_POPULAR" = 4,
    "LIST_ICON_RECENT" = 8,
    "LIST_ICON_MISSMFC" = 16,
    "LIST_ICON_TRENDING" = 32,
    "LIST_ICON_CUSTOM_ALERTS" = 64,
    "VERSION_REQUIRED" = 220170401,
    "VERSION_MODELWEB" = 320110101,
}

export enum MODELORDER {
    "NONE" = 0,
    "PVT" = 1,
    "TRUEPVT" = 2,
    "GRP" = 4,
}

export enum MYWEBCAM {
    "EVERYONE" = 0,
    "ONLYUSERS" = 1,
    "ONLYFRIENDS" = 2,
    "ONLYMODELS" = 3,
    "FRIENDSANDMODELS" = 4,
    "WHITELIST" = 5,
    "FRIEND_ID" = 100,
}

export enum OBSMON {
    "NULL" = 0,
    "APPROVING" = 10,
    "UNAPPROVED" = 11,
    "READY" = 12,
    "ACTIVE" = 20,
    "TIMEOUT" = 30,
    "INACTIVE" = 31,
    "CLOSED" = 32,
}

export enum PLAT {
    "MFC" = 1,
    "CAM" = 2,
}

export enum PLATFORM {
    "NONE" = 0,
    "MFC" = 1,
    "CAMMUNITY" = 2,
    "CAMYOU" = 2,
}

export enum ROOMFILTER {
    "EMPTY" = 0,
    "LOG" = 1,
    "DROP" = 2,
    "WARN" = 4,
    "REGEX" = 8,
    "SPECIAL" = 16,
    "FROMHELPER" = 32,
    "EXACT_WORD" = 64,
    "RESERVED_7" = 128,
    "RESERVED_8" = 256,
    "RESERVED_9" = 512,
    "IS_GUEST" = 1024,
    "IS_BASIC" = 2048,
    "IS_PREMIUM" = 4096,
    "IS_MODEL" = 8192,
    "IN_PUBLIC" = 16384,
    "IN_SESSION" = 32768,
    "RESERVED_16" = 65536,
    "RESERVED_17" = 131072,
    "RESERVED_18" = 262144,
    "RESERVED_19" = 524288,
    "RESERVED_20" = 1048576,
}

export enum SERVER {
    "VERSION_REQUIRED" = 20071218,
    "VERSION" = 20071218,
}

export enum SESSCHAN {
    "ID_START" = 200000000,
    "ID_END" = 300000000,
}

export enum SESSION {
    "ID_START" = 75000000,
    "ID_END" = 950000000,
}

export enum TKOPT {
    "NONE" = 0,
    "START" = 1,
    "STOP" = 2,
    "OPEN" = 4,
    "PVT" = 8,
    "VOY" = 16,
    "GRP" = 32,
    "TIP" = 256,
    "TIP_HIDDEN_AMT" = 512,
    "TIP_OFFLINE" = 1024,
    "TIP_MSG" = 2048,
    "TIP_ANON" = 4096,
    "TIP_PUBLIC" = 8192,
    "TIP_FROMROOM" = 16384,
    "TIP_PUBLICMSG" = 32768,
    "TIP_HISTORY" = 65536,
    "TIP_SILENT" = 131072,
    "TIP_NOCOUNT" = 262144,
    "HDVIDEO" = 1048576,
    "TIP_OFFLINE_USER" = 2097152,
    "TIP_OFFLINE_MODEL" = 4194304,
    "TIP_PURCHASE" = 8388608,
    "TIP_PURCHASE_CLUB" = 16777216,
    "TIP_PURCHASE_GOAL" = 33554432,
    "TIP_PURCHASE_NOTIFY" = 67108864,
    "TIP_PURCHASE_LINK" = 134217728,
    "TIP_PURCHASE_ALBUM" = 268435456,
    "TIP_PURCHASE_COLLECTION" = 536870912,
    "TIP_PURCHASE_STOREITEM" = 1073741824,
    "TIP_PURCHASE_OTHER" = 2147483648,
}

export enum USER {
    "ID_START" = 100,
    "ID_END" = 50000000,
}

export enum USEREXT {
    "NUM" = 0,
    "STRING" = 1,
    "DATA" = 2,
    "STAMP" = 3,
}

export enum V1 {
    "FLV" = 0,
    "F4V" = 1,
}

export enum V2 {
    "NONE" = 2,
    "FLV" = 4,
    "F4V" = 8,
    "MP4X" = 16,
    "MP4W" = 32,
}

export enum VST {
    "FMS" = 0,
    "WOWZA" = 1,
    "WOWZA_RELAY" = 2,
    "WOWZA_CAM2CAM" = 3,
    "WOWZA_OBS" = 8,
    "NGINX" = 10,
    "NULL" = 255,
}

export enum WEBCAM {
    "SECURITY_EVERYONE" = 0,
    "SECURITY_FRIENDS" = 2,
    "SECURITY_MODELS" = 3,
    "SECURITY_MODELS_FRIENDS" = 4,
    "SECURITY_ALLOWED" = 5,
    "SECURITY_FRIEND_ID" = 100,
}

export enum WINDOW {
    "MODE_DEFAULT" = 0,
    "MODE_DESKTOP_DHTML" = 1,
    "MODE_DHTML" = 1,
    "MODE_MOBILE_DHTML" = 2,
    "MODE_BROWSER" = 2,
}

export enum WORKER {
    "ID_START" = 50000000,
    "ID_END" = 75000000,
}

export enum WREQUEST {
    "ID_START" = 500000000,
    "ID_END" = 600000000,
}

// tslint:disable:trailing-comma
export const CACHED_SERVERCONFIG = {
    "ajax_servers": [
        "xchat50",
        "xchat51",
        "xchat52",
        "xchat53",
        "xchat54",
        "xchat90",
        "xchat92",
        "xchat93"
    ],
    "chat_servers": [
        "xchat108",
        "xchat61",
        "xchat94",
        "xchat109",
        "xchat22",
        "xchat47",
        "xchat48",
        "xchat49",
        "xchat50",
        "xchat51",
        "xchat52",
        "xchat53",
        "xchat54",
        "xchat26",
        "ychat30",
        "ychat31",
        "xchat95",
        "xchat20",
        "xchat111",
        "xchat112",
        "xchat113",
        "xchat114",
        "xchat115",
        "xchat116",
        "xchat118",
        "xchat119",
        "xchat42",
        "xchat43",
        "xchat44",
        "ychat32",
        "xchat58",
        "xchat27",
        "xchat45",
        "xchat46",
        "xchat39",
        "ychat33",
        "xchat59",
        "xchat120",
        "xchat121",
        "xchat122",
        "xchat123",
        "xchat124",
        "xchat125",
        "xchat126",
        "xchat67",
        "xchat66",
        "xchat62",
        "xchat63",
        "xchat64",
        "xchat65",
        "xchat23",
        "xchat24",
        "xchat25",
        "xchat69",
        "xchat70",
        "xchat71",
        "xchat72",
        "xchat73",
        "xchat74",
        "xchat75",
        "xchat76",
        "xchat77",
        "xchat60",
        "xchat80",
        "xchat28",
        "xchat29",
        "xchat30",
        "xchat31",
        "xchat32",
        "xchat33",
        "xchat34",
        "xchat35",
        "xchat36",
        "xchat90",
        "xchat91",
        "xchat92",
        "xchat93",
        "xchat81",
        "xchat83",
        "xchat79",
        "xchat68",
        "xchat78",
        "xchat84",
        "xchat85",
        "xchat86",
        "xchat87",
        "xchat88",
        "xchat89",
        "xchat96",
        "xchat97",
        "xchat98",
        "xchat99",
        "xchat100",
        "xchat101",
        "xchat102",
        "xchat103",
        "xchat104",
        "xchat105",
        "xchat106",
        "xchat127"
    ],
    "h5video_servers": {
        "1099": "myvideo99",
        "1104": "video604",
        "1105": "video605",
        "1106": "video606",
        "1107": "video607",
        "1108": "video608",
        "1109": "video609",
        "1110": "video610",
        "1111": "video611",
        "1112": "video612",
        "1113": "video613",
        "1114": "video614",
        "1115": "video615",
        "1116": "video616",
        "1117": "video617",
        "1118": "video618",
        "1119": "video619",
        "1120": "video620",
        "1121": "video621",
        "1122": "video622",
        "1123": "video623",
        "1124": "video624",
        "1125": "video625",
        "1126": "video626",
        "1127": "video627",
        "1128": "video628",
        "1129": "video629",
        "1130": "video630",
        "1131": "video631",
        "1132": "video632",
        "1133": "video633",
        "1134": "video634",
        "1135": "video635",
        "1136": "video636",
        "1137": "video637",
        "1138": "video638",
        "1139": "video639",
        "1140": "video640",
        "1141": "video641",
        "1142": "video642",
        "1143": "video643",
        "1144": "video644",
        "1145": "video645",
        "1201": "video701",
        "1202": "video702",
        "1203": "video703",
        "1204": "video704",
        "1205": "video705",
        "1206": "video706",
        "1207": "video707",
        "1208": "video708",
        "1209": "video709",
        "1210": "video710",
        "1211": "video711",
        "1212": "video712",
        "1213": "video713",
        "1214": "video714",
        "1215": "video715",
        "1216": "video716",
        "1217": "video717",
        "1218": "video718",
        "1219": "video719",
        "1221": "video721",
        "1222": "video722",
        "1223": "video723",
        "1224": "video724",
        "1225": "video725",
        "1226": "video726",
        "1227": "video727",
        "1228": "video728",
        "1229": "video729",
        "1230": "video730",
        "1231": "video731",
        "1232": "video732",
        "1233": "video733",
        "1234": "video734",
        "1235": "video735",
        "1236": "video736",
        "1237": "video737",
        "1238": "video738",
        "1239": "video739",
        "1241": "video741",
        "1242": "video742",
        "1243": "video743",
        "1244": "video744",
        "1245": "video745",
        "1246": "video746",
        "1247": "video747",
        "1248": "video748",
        "1249": "video749",
        "1250": "video750",
        "1251": "video751",
        "1252": "video752",
        "1253": "video753",
        "1254": "video754",
        "1255": "video755",
        "1256": "video756",
        "1257": "video757",
        "1258": "video758",
        "1259": "video759",
        "1260": "video760",
        "1261": "video761",
        "1262": "video762",
        "1263": "video763",
        "1264": "video764",
        "1265": "video765",
        "1266": "video766",
        "1267": "video767",
        "1268": "video768",
        "1269": "video769",
        "1270": "video770",
        "1271": "video771",
        "1272": "video772",
        "1273": "video773",
        "1274": "video774",
        "1275": "video775",
        "1276": "video776",
        "1277": "video777",
        "1278": "video778",
        "1279": "video779",
        "1281": "video781",
        "1282": "video782",
        "1283": "video783",
        "1284": "video784",
        "1285": "video785",
        "1286": "video786",
        "1287": "video787",
        "1288": "video788",
        "1289": "video789",
        "1290": "video790",
        "1291": "video791",
        "1292": "video792",
        "1293": "video793",
        "1294": "video794",
        "1295": "video795",
        "1296": "video796",
        "1297": "video797",
        "1298": "video798",
        "1299": "video799",
        "1300": "video800",
        "1301": "video801",
        "1302": "video802",
        "1303": "video803",
        "1304": "video804",
        "1305": "video805",
        "1306": "video806",
        "1307": "video807",
        "1308": "video808",
        "1309": "video809",
        "1310": "video810",
        "1311": "video811",
        "1312": "video812",
        "1313": "video813",
        "1314": "video814",
        "1315": "video815",
        "1316": "video816",
        "1317": "video817",
        "1318": "video818",
        "1319": "video819",
        "1320": "video820",
        "1321": "video821",
        "1322": "video822",
        "1323": "video823",
        "1324": "video824",
        "1325": "video825",
        "1326": "video826",
        "1327": "video827",
        "1328": "video828",
        "1329": "video829",
        "1330": "video830",
        "1331": "video831",
        "1332": "video832",
        "1333": "video833",
        "1334": "video834",
        "1335": "video835",
        "1336": "video836",
        "1337": "video837",
        "1338": "video838",
        "1339": "video839",
        "1340": "video840",
        "1341": "video841",
        "1342": "video842",
        "1343": "video843",
        "1344": "video844",
        "1345": "video845",
        "1346": "video846",
        "1347": "video847",
        "1348": "video848",
        "1349": "video849",
        "1350": "video850",
        "1351": "video851",
        "1352": "video852",
        "1353": "video853",
        "1354": "video854",
        "1355": "video855",
        "1356": "video856",
        "1357": "video857",
        "1358": "video858",
        "1359": "video859",
        "840": "video340",
        "841": "video341",
        "842": "video342",
        "845": "video345",
        "846": "video346",
        "847": "video347",
        "848": "video348",
        "849": "video349",
        "850": "video350",
        "851": "video351",
        "852": "video352",
        "853": "video353",
        "854": "video354",
        "855": "video355",
        "856": "video356",
        "857": "video357",
        "858": "video358",
        "859": "video359",
        "860": "video360",
        "861": "video361",
        "862": "video362",
        "863": "video363",
        "864": "video364",
        "865": "video365",
        "866": "video366",
        "867": "video367",
        "868": "video368",
        "869": "video369",
        "870": "video370",
        "871": "video371",
        "904": "video404",
        "905": "video405",
        "906": "video406",
        "907": "video407",
        "908": "video408",
        "909": "video409",
        "910": "video410",
        "911": "video411",
        "912": "video412",
        "913": "video413",
        "914": "video414",
        "915": "video415",
        "916": "video416",
        "917": "video417",
        "918": "video418",
        "919": "video419",
        "940": "video440",
        "941": "video441",
        "942": "video442",
        "943": "video443",
        "944": "video444",
        "945": "video445",
        "946": "video446",
        "947": "video447",
        "948": "video448",
        "949": "video449",
        "950": "video450",
        "951": "video451",
        "952": "video452",
        "953": "video453",
        "954": "video454",
        "955": "video455",
        "956": "video456",
        "957": "video457",
        "958": "video458",
        "959": "video459",
        "960": "video460",
        "961": "video461",
        "962": "video462",
        "963": "video463",
        "964": "video464",
        "965": "video465",
        "966": "video466",
        "967": "video467",
        "968": "video468",
        "969": "video469",
        "970": "video470",
        "971": "video471",
        "972": "video472",
        "973": "video473",
        "974": "video474",
        "975": "video475",
        "976": "video476",
        "977": "video477",
        "978": "video478",
        "979": "video479",
        "980": "video480",
        "981": "video481",
        "982": "video482",
        "983": "video483",
        "984": "video484",
        "985": "video485",
        "986": "video486",
        "987": "video487",
        "988": "video488",
        "989": "video489",
        "990": "video490",
        "991": "video491",
        "992": "video492"
    },
    "ngvideo_servers": {
        "1360": "video860",
        "1361": "video861",
        "1362": "video862",
        "1363": "video863",
        "1364": "video864",
        "1365": "video865",
        "1366": "video866",
        "1367": "video867",
        "1368": "video868",
        "1369": "video869",
        "1370": "video870",
        "1371": "video871",
        "1372": "video872",
        "1373": "video873",
        "1374": "video874",
        "1375": "video875",
        "1376": "video876",
        "1377": "video877",
        "1378": "video878",
        "1379": "video879",
        "1380": "video880",
        "1381": "video881",
        "1382": "video882",
        "1383": "video883",
        "1384": "video884",
        "1385": "video885",
        "1386": "video886",
        "1387": "video887",
        "1398": "video898",
        "1399": "video899",
        "1545": "video545",
        "1546": "video546",
        "1547": "video547",
        "1548": "video548",
        "1549": "video549",
        "1550": "video550",
        "1551": "video551",
        "1552": "video552",
        "1553": "video553",
        "1554": "video554",
        "1555": "video555",
        "1556": "video556",
        "1557": "video557",
        "1558": "video558",
        "1559": "video559",
        "3000": "video2000",
        "3001": "video2001",
        "3002": "video2002",
        "3003": "video2003",
        "3004": "video2004",
        "3005": "video2005",
        "3006": "video2006",
        "3007": "video2007",
        "3008": "video2008",
        "3009": "video2009",
        "3010": "video2010",
        "3011": "video2011",
        "3012": "video2012",
        "3013": "video2013",
        "3014": "video2014",
        "3015": "video2015",
        "3016": "video2016",
        "3017": "video2017",
        "3018": "video2018",
        "3019": "video2019",
        "3020": "video2020",
        "3021": "video2021",
        "3022": "video2022",
        "3023": "video2023",
        "3024": "video2024",
        "3025": "video2025",
        "3026": "video2026",
        "3027": "video2027",
        "3028": "video2028",
        "3029": "video2029",
        "3030": "video2030",
        "3031": "video2031",
        "3032": "video2032",
        "3033": "video2033",
        "3034": "video2034",
        "3035": "video2035",
        "3036": "video2036",
        "3037": "video2037",
        "3038": "video2038",
        "3039": "video2039",
        "3040": "video2040"
    },
    "release": true,
    "video_servers": [
        "video112",
        "video116",
        "video120",
        "video124",
        "video128",
        "video132",
        "video144",
        "video148",
        "video162",
        "video170",
        "video174",
        "video200",
        "video204",
        "video4",
        "video19",
        "video24",
        "video29",
        "video39",
        "video44",
        "video232",
        "video240",
        "video244",
        "video248",
        "video280",
        "video284",
        "video288",
        "video292",
        "video296",
        "video304",
        "video308",
        "video312",
        "video316",
        "video332",
        "video336",
        "video384"
    ],
    "websocket_servers": {
        "xchat100": "rfc6455",
        "xchat101": "rfc6455",
        "xchat102": "rfc6455",
        "xchat103": "rfc6455",
        "xchat104": "rfc6455",
        "xchat105": "rfc6455",
        "xchat106": "rfc6455",
        "xchat108": "hybi00",
        "xchat109": "rfc6455",
        "xchat111": "rfc6455",
        "xchat112": "rfc6455",
        "xchat113": "rfc6455",
        "xchat114": "rfc6455",
        "xchat115": "rfc6455",
        "xchat116": "rfc6455",
        "xchat118": "rfc6455",
        "xchat119": "rfc6455",
        "xchat120": "rfc6455",
        "xchat121": "rfc6455",
        "xchat122": "rfc6455",
        "xchat123": "rfc6455",
        "xchat124": "rfc6455",
        "xchat125": "rfc6455",
        "xchat126": "rfc6455",
        "xchat127": "rfc6455",
        "xchat20": "rfc6455",
        "xchat22": "rfc6455",
        "xchat23": "rfc6455",
        "xchat24": "rfc6455",
        "xchat25": "rfc6455",
        "xchat26": "rfc6455",
        "xchat27": "rfc6455",
        "xchat28": "rfc6455",
        "xchat29": "rfc6455",
        "xchat39": "rfc6455",
        "xchat62": "rfc6455",
        "xchat63": "rfc6455",
        "xchat64": "rfc6455",
        "xchat65": "rfc6455",
        "xchat66": "rfc6455",
        "xchat67": "rfc6455",
        "xchat68": "rfc6455",
        "xchat69": "rfc6455",
        "xchat70": "rfc6455",
        "xchat71": "rfc6455",
        "xchat72": "rfc6455",
        "xchat73": "rfc6455",
        "xchat74": "rfc6455",
        "xchat75": "rfc6455",
        "xchat76": "rfc6455",
        "xchat77": "rfc6455",
        "xchat78": "rfc6455",
        "xchat79": "rfc6455",
        "xchat80": "rfc6455",
        "xchat81": "rfc6455",
        "xchat83": "rfc6455",
        "xchat84": "rfc6455",
        "xchat85": "rfc6455",
        "xchat86": "rfc6455",
        "xchat87": "rfc6455",
        "xchat88": "rfc6455",
        "xchat89": "rfc6455",
        "xchat91": "rfc6455",
        "xchat94": "rfc6455",
        "xchat95": "rfc6455",
        "xchat96": "rfc6455",
        "xchat97": "rfc6455",
        "xchat98": "rfc6455",
        "xchat99": "rfc6455"
    },
    "wzobs_servers": {
        "1388": "video888",
        "1389": "video889",
        "1390": "video890",
        "1391": "video891",
        "1392": "video892",
        "1393": "video893",
        "1394": "video894",
        "1395": "video895",
        "1396": "video896",
        "1397": "video897",
        "938": "video438",
        "939": "video439"
    }
};
// tslint:enable:trailing-comma