export declare const MAGIC = -2027771214;
export declare const FLASH_PORT = 8100;
export declare const WEBSOCKET_PORT = 8080;
export declare enum STATE {
    FreeChat = 0,
    Away = 2,
    Private = 12,
    GroupShow = 13,
    Online = 90,
    Offline = 127,
}
export declare enum LOGIN_VERSION {
    FLASH = 20071025,
    WEBSOCKET = 20080910,
}
export declare enum CAMCHAN {
    "ID_START" = 400000000,
    "ID_END" = 500000000,
}
export declare enum CHANNEL {
    "ID_START" = 100000000,
    "ID_END" = 400000000,
}
export declare enum CLIENT {
    "VERSION_REQUIRED" = 20060925,
}
export declare enum DISPLAY {
    "PM_INLINE_WHISPER" = 1,
    "PM_INLINE_ALL" = 2,
}
export declare enum EVSESSION {
    "NONE" = 0,
    "PRIVATE" = 1,
    "VOYEUR" = 2,
    "GROUP" = 3,
    "FEATURE" = 4,
    "AWAYPVT" = 5,
    "TIP" = 10,
    "PUBLIC" = 100,
    "AWAY" = 101,
    "START" = 102,
    "UPDATE" = 103,
    "STOP" = 104,
    "SPECIAL" = 1000,
}
export declare enum EVUP {
    "NONE" = 0,
    "DIFF" = 1,
    "FULL" = 2,
}
export declare enum FCACCEPT {
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
}
export declare enum FCACT {
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
export declare enum FCAPP {
    "NONE" = 0,
    "MASTER" = 1,
    "CHAT" = 2,
    "WORKER" = 3,
    "AUTH" = 4,
    "LOADTEST" = 5,
    "TRANSCODER" = 6,
}
export declare enum FCBAN {
    "NONE" = 0,
    "TEMP" = 1,
    "60DAY" = 2,
    "LIFE" = 3,
}
export declare enum FCCHAN {
    "NOOPT" = 0,
    "EVENT_NONE" = 0,
    "JOIN" = 1,
    "EVENT_CLEARCHAT" = 1,
    "PART" = 2,
    "ERR_NOCHANNEL" = 2,
    "EVENT_MUTE" = 2,
    "ERR_NOTMEMBER" = 3,
    "EVENT_TOPIC" = 3,
    "OLDMSG" = 4,
    "ERR_GUESTMUTE" = 4,
    "EVENT_COUNTDOWN" = 4,
    "ERR_GROUPMUTE" = 5,
    "EVENT_KICK" = 5,
    "ERR_NOTALLOWED" = 6,
    "EVENT_WHITEBOARD_ON" = 6,
    "EVENT_WHITEBOARD_OFF" = 7,
    "HISTORY" = 8,
    "EVENT_RESERVED_008" = 8,
    "EVENT_RESERVED_009" = 9,
    "EVENT_RESERVED_010" = 10,
    "EVENT_RESERVED_011" = 11,
    "EVENT_RESERVED_012" = 12,
    "EVENT_RESERVED_013" = 13,
    "EVENT_RESERVED_014" = 14,
    "EVENT_RESERVED_015" = 15,
    "LIST" = 16,
    "EVENT_RESERVED_016" = 16,
    "CAMSTATE" = 16,
    "EVENT_RESERVED_017" = 17,
    "EVENT_RESERVED_018" = 18,
    "EVENT_RESERVED_019" = 19,
    "WELCOME" = 32,
    "BATCHPART" = 64,
    "EXT_USERNAME" = 128,
    "EXT_USERDATA" = 256,
}
export declare enum FCERRTYPE {
    "INVALIDUSER" = 10,
    "NOACCESS" = 11,
    "NOSPACE" = 12,
}
export declare enum FCGROUP {
    "NONE" = 0,
    "EXPIRED" = 1,
    "BUSY" = 2,
    "EMPTY" = 3,
    "DECLINED" = 4,
    "UNAVAILABLE" = 5,
    "SESSION" = 9,
}
export declare enum FCL {
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
    "RESERVED_16" = 16,
    "RESERVED_17" = 17,
    "RESERVED_18" = 18,
    "RESERVED_19" = 19,
    "TAGS" = 20,
    "CAMS" = 21,
    "ROOMMATES" = 22,
    "RESERVED_23" = 23,
    "RESERVED_24" = 24,
    "RESERVED_25" = 25,
    "RESERVED_26" = 26,
    "RESERVED_27" = 27,
    "RESERVED_28" = 28,
    "RESERVED_29" = 29,
}
export declare enum FCLEVEL {
    "GUEST" = 0,
    "BASIC" = 1,
    "PREMIUM" = 2,
    "MODEL" = 4,
    "ADMIN" = 5,
}
export declare enum FCMODE {
    "NOPM" = 0,
    "FRIENDPM" = 1,
    "ALLPM" = 2,
}
export declare enum FCMODEL {
    "NONE" = 0,
    "NOGROUP" = 1,
    "FEATURE1" = 2,
    "FEATURE2" = 4,
    "FEATURE3" = 8,
    "FEATURE4" = 16,
    "FEATURE5" = 32,
}
export declare enum FCNEWSOPT {
    "NONE" = 0,
    "IN_CHAN" = 1,
    "IN_PM" = 2,
    "AUTOFRIENDS_OFF" = 4,
    "ADDFRIENDS_OFF" = 4,
    "IN_CHAN_NOPVT" = 8,
    "IN_CHAN_NOGRP" = 16,
}
export declare enum FCNOSESS {
    "NONE" = 0,
    "PVT" = 1,
    "GRP" = 2,
    "TRUEPVT" = 4,
    "TOKEN_MIN" = 8,
}
export declare enum FCOPT {
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
}
export declare enum FCPORT {
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
}
export declare enum FCRESPONSE {
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
}
export declare enum FCRPC {
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
export declare enum FCS {
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
export declare enum FCSBAN {
    "NONE" = 0,
    "USER" = 1,
    "IP" = 2,
}
export declare enum FCTYPE {
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
    "ZGWINVALID" = 95,
    "CONNECTING" = 96,
    "CONNECTED" = 97,
    "DISCONNECTED" = 98,
    "LOGOUT" = 99,
}
export declare enum FCUCR {
    "VM_LOUNGE" = 0,
    "CREATOR" = 0,
    "VM_MYWEBCAM" = 1,
    "FRIENDS" = 1,
    "MODELS" = 2,
    "PREMIUMS" = 4,
    "BASICS" = 8,
    "BASIC" = 8,
    "ALL" = 15,
}
export declare enum FCUOPT {
    "EMPTY" = 0,
    "PLATFORM_MFC" = 1,
    "PLATFORM_CAMYOU" = 2,
    "PLATFORM_OFFLINE" = 4,
    "PLATFORM_XSDEFAULT" = 8,
    "RESERVED_05" = 16,
    "RESERVED_06" = 32,
    "RESERVED_07" = 64,
    "RESERVED_08" = 128,
    "RESERVED_09" = 256,
    "RESERVED_10" = 512,
    "RESERVED_11" = 1024,
    "RESERVED_12" = 2048,
    "RESERVED_13" = 4096,
    "RESERVED_14" = 8192,
    "RESERVED_15" = 16384,
    "RESERVED_16" = 32768,
    "RESERVED_17" = 65536,
}
export declare enum FCUPDATE {
    "NONE" = 0,
    "MISSMFC" = 1,
    "NEWTIP" = 2,
    "REGION_SAFE" = 3,
    "CAMSCORE" = 4,
    "ROOMFILTER" = 5,
}
export declare enum FCVIDEO {
    "TX_IDLE" = 0,
    "TX_RESET" = 1,
    "TX_AWAY" = 2,
    "TX_CONFIRMING" = 11,
    "TX_PVT" = 12,
    "TX_GRP" = 13,
    "TX_RESERVED" = 14,
    "TX_KILLMODEL" = 15,
    "C2C_ON" = 20,
    "C2C_OFF" = 21,
    "RX_IDLE" = 90,
    "RX_PVT" = 91,
    "RX_VOY" = 92,
    "RX_GRP" = 93,
    "NULL" = 126,
    "OFFLINE" = 127,
    "UNKNOWN" = 127,
}
export declare enum FCW {
    "STATE_INIT" = 0,
    "STATE_READY" = 1,
    "STATE_WORKING" = 2,
    "STATE_WAITING" = 3,
    "STATE_INVALID" = 4,
}
export declare enum FCWINDOW {
    "NO_USER_PM" = 20,
    "OPTIONS_ADD_FRIEND" = 31,
    "OPTIONS_ADD_IGNORE" = 32,
}
export declare enum FCWOPT {
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
export declare enum HIDE {
    "MODEL_GROUPS_AWAY" = 1,
    "MODEL_GROUPS_PRIVATE" = 2,
    "MODEL_GROUPS_GROUP" = 4,
    "MODEL_GROUPS_PUBLIC" = 8,
}
export declare enum LOUNGE {
    "MASK_AUTO_CLICK" = 1,
    "MASK_NO_CAMSNAPS" = 2,
    "MASK_LOUNGE_MODE" = 4,
}
export declare enum MAX {
    "FCL" = 30,
}
export declare enum MFC {
    "NEWS_USER_ID" = 481462,
}
export declare enum MODEL {
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
export declare enum MODELORDER {
    "NONE" = 0,
    "PVT" = 1,
    "TRUEPVT" = 2,
    "GRP" = 4,
}
export declare enum MYWEBCAM {
    "EVERYONE" = 0,
    "ONLYUSERS" = 1,
    "ONLYFRIENDS" = 2,
    "ONLYMODELS" = 3,
    "FRIENDSANDMODELS" = 4,
    "WHITELIST" = 5,
    "FRIEND_ID" = 100,
}
export declare enum OBSMON {
    "NULL" = 0,
    "APPROVING" = 10,
    "UNAPPROVED" = 11,
    "READY" = 12,
    "ACTIVE" = 20,
    "TIMEOUT" = 30,
    "INACTIVE" = 31,
    "CLOSED" = 32,
}
export declare enum PLAT {
    "MFC" = 1,
    "CAM" = 2,
}
export declare enum PLATFORM {
    "NONE" = 0,
    "MFC" = 1,
    "CAMYOU" = 2,
    "CAMMUNITY" = 2,
}
export declare enum ROOMFILTER {
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
export declare enum SERVER {
    "VERSION" = 20071218,
    "VERSION_REQUIRED" = 20071218,
}
export declare enum SESSCHAN {
    "ID_START" = 200000000,
    "ID_END" = 300000000,
}
export declare enum SESSION {
    "ID_START" = 75000000,
    "ID_END" = 950000000,
}
export declare enum TKOPT {
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
    "TIP_PURCHASE" = 8388608,
    "TIP_PURCHASE_RES_24" = 16777216,
    "TIP_PURCHASE_RES_25" = 33554432,
    "TIP_PURCHASE_NOTIFY" = 67108864,
    "TIP_PURCHASE_LINK" = 134217728,
    "TIP_PURCHASE_ALBUM" = 268435456,
    "TIP_PURCHASE_COLLECTION" = 536870912,
    "TIP_PURCHASE_STOREITEM" = 1073741824,
    "TIP_PURCHASE_RES_31" = 2147483648,
}
export declare enum USER {
    "ID_START" = 100,
    "ID_END" = 50000000,
}
export declare enum USEREXT {
    "NUM" = 0,
    "STRING" = 1,
    "DATA" = 2,
    "STAMP" = 3,
}
export declare enum V1 {
    "FLV" = 0,
    "F4V" = 1,
}
export declare enum V2 {
    "NONE" = 2,
    "FLV" = 4,
    "F4V" = 8,
    "MP4X" = 16,
    "MP4W" = 32,
}
export declare enum WEBCAM {
    "SECURITY_EVERYONE" = 0,
    "SECURITY_FRIENDS" = 2,
    "SECURITY_MODELS" = 3,
    "SECURITY_MODELS_FRIENDS" = 4,
    "SECURITY_ALLOWED" = 5,
    "SECURITY_FRIEND_ID" = 100,
}
export declare enum WINDOW {
    "MODE_DEFAULT" = 0,
    "MODE_DHTML" = 1,
    "MODE_DESKTOP_DHTML" = 1,
    "MODE_BROWSER" = 2,
    "MODE_MOBILE_DHTML" = 2,
}
export declare enum WORKER {
    "ID_START" = 50000000,
    "ID_END" = 75000000,
}
export declare enum WREQUEST {
    "ID_START" = 500000000,
    "ID_END" = 600000000,
}
export declare const CACHED_SERVERCONFIG: {
    "ajax_servers": string[];
    "chat_servers": string[];
    "h5video_servers": {
        "1099": string;
        "1104": string;
        "1105": string;
        "1106": string;
        "1107": string;
        "1108": string;
        "1109": string;
        "1110": string;
        "1111": string;
        "1112": string;
        "1113": string;
        "1114": string;
        "1115": string;
        "1116": string;
        "1117": string;
        "1118": string;
        "1119": string;
        "1120": string;
        "1121": string;
        "1122": string;
        "1123": string;
        "1124": string;
        "1125": string;
        "1126": string;
        "1127": string;
        "1128": string;
        "1129": string;
        "1130": string;
        "1131": string;
        "1132": string;
        "1133": string;
        "1134": string;
        "1135": string;
        "1136": string;
        "1137": string;
        "1138": string;
        "1139": string;
        "1140": string;
        "1141": string;
        "1142": string;
        "1143": string;
        "1144": string;
        "1145": string;
        "1201": string;
        "1202": string;
        "1203": string;
        "1204": string;
        "1205": string;
        "1206": string;
        "1207": string;
        "1208": string;
        "1209": string;
        "1210": string;
        "1211": string;
        "1212": string;
        "1213": string;
        "1214": string;
        "1215": string;
        "1216": string;
        "1217": string;
        "1218": string;
        "1219": string;
        "1221": string;
        "1222": string;
        "1223": string;
        "1224": string;
        "1225": string;
        "1226": string;
        "1227": string;
        "1228": string;
        "1229": string;
        "1230": string;
        "1231": string;
        "1232": string;
        "1233": string;
        "1234": string;
        "1235": string;
        "1236": string;
        "1237": string;
        "1238": string;
        "1239": string;
        "1241": string;
        "1242": string;
        "1243": string;
        "1244": string;
        "1245": string;
        "1246": string;
        "1247": string;
        "1248": string;
        "1249": string;
        "1250": string;
        "1251": string;
        "1252": string;
        "1253": string;
        "1254": string;
        "1255": string;
        "1256": string;
        "1257": string;
        "1258": string;
        "1259": string;
        "1260": string;
        "1261": string;
        "1262": string;
        "1263": string;
        "1264": string;
        "1265": string;
        "1266": string;
        "1267": string;
        "1268": string;
        "1269": string;
        "1270": string;
        "1271": string;
        "1272": string;
        "1273": string;
        "1274": string;
        "1275": string;
        "1276": string;
        "1277": string;
        "1278": string;
        "1279": string;
        "1281": string;
        "1282": string;
        "1283": string;
        "1284": string;
        "1285": string;
        "1286": string;
        "1287": string;
        "1288": string;
        "1289": string;
        "1290": string;
        "1291": string;
        "1292": string;
        "1293": string;
        "1294": string;
        "1295": string;
        "1296": string;
        "1297": string;
        "1298": string;
        "1299": string;
        "1300": string;
        "1301": string;
        "1302": string;
        "1303": string;
        "1304": string;
        "1305": string;
        "1306": string;
        "1307": string;
        "1308": string;
        "1309": string;
        "1310": string;
        "1311": string;
        "1312": string;
        "1313": string;
        "1314": string;
        "1315": string;
        "1316": string;
        "1317": string;
        "1318": string;
        "1319": string;
        "1320": string;
        "1321": string;
        "1322": string;
        "1323": string;
        "1324": string;
        "1325": string;
        "1326": string;
        "1327": string;
        "1328": string;
        "1329": string;
        "1330": string;
        "1331": string;
        "1332": string;
        "1333": string;
        "1334": string;
        "1335": string;
        "1336": string;
        "1337": string;
        "1338": string;
        "1339": string;
        "1340": string;
        "1341": string;
        "1342": string;
        "1343": string;
        "1344": string;
        "1345": string;
        "1346": string;
        "1347": string;
        "1348": string;
        "1349": string;
        "1350": string;
        "1351": string;
        "1352": string;
        "1353": string;
        "1354": string;
        "1355": string;
        "1356": string;
        "1357": string;
        "1358": string;
        "1359": string;
        "1360": string;
        "1361": string;
        "1362": string;
        "1363": string;
        "1364": string;
        "1365": string;
        "1366": string;
        "1367": string;
        "1368": string;
        "1369": string;
        "1370": string;
        "1371": string;
        "1372": string;
        "1373": string;
        "1374": string;
        "1375": string;
        "1376": string;
        "1377": string;
        "1378": string;
        "1379": string;
        "1380": string;
        "1381": string;
        "1382": string;
        "1383": string;
        "1384": string;
        "1385": string;
        "1386": string;
        "1387": string;
        "1388": string;
        "1389": string;
        "1390": string;
        "1392": string;
        "1393": string;
        "1394": string;
        "1395": string;
        "1396": string;
        "1397": string;
        "1398": string;
        "1399": string;
        "840": string;
        "841": string;
        "842": string;
        "845": string;
        "846": string;
        "847": string;
        "848": string;
        "849": string;
        "850": string;
        "851": string;
        "852": string;
        "853": string;
        "854": string;
        "855": string;
        "856": string;
        "857": string;
        "858": string;
        "859": string;
        "860": string;
        "861": string;
        "862": string;
        "863": string;
        "864": string;
        "865": string;
        "866": string;
        "867": string;
        "868": string;
        "869": string;
        "870": string;
        "871": string;
        "904": string;
        "905": string;
        "906": string;
        "907": string;
        "908": string;
        "909": string;
        "910": string;
        "911": string;
        "912": string;
        "913": string;
        "914": string;
        "915": string;
        "916": string;
        "917": string;
        "918": string;
        "919": string;
        "938": string;
        "939": string;
        "940": string;
        "941": string;
        "942": string;
        "943": string;
        "944": string;
        "945": string;
        "946": string;
        "947": string;
        "948": string;
        "949": string;
        "950": string;
        "951": string;
        "952": string;
        "953": string;
        "954": string;
        "955": string;
        "956": string;
        "957": string;
        "958": string;
        "959": string;
        "960": string;
        "961": string;
        "962": string;
        "963": string;
        "964": string;
        "965": string;
        "966": string;
        "967": string;
        "968": string;
        "969": string;
        "970": string;
        "971": string;
        "972": string;
        "973": string;
        "974": string;
        "975": string;
        "976": string;
        "977": string;
        "978": string;
        "979": string;
        "980": string;
        "981": string;
        "982": string;
        "983": string;
        "984": string;
        "985": string;
        "986": string;
        "987": string;
        "988": string;
        "989": string;
        "990": string;
        "991": string;
        "992": string;
    };
    "ngvideo_servers": {
        "1545": string;
        "1546": string;
        "1547": string;
        "1548": string;
        "1549": string;
        "1550": string;
        "1551": string;
        "1552": string;
        "1553": string;
        "1554": string;
    };
    "release": boolean;
    "video_servers": string[];
    "websocket_servers": {
        "xchat100": string;
        "xchat101": string;
        "xchat102": string;
        "xchat103": string;
        "xchat104": string;
        "xchat105": string;
        "xchat106": string;
        "xchat108": string;
        "xchat109": string;
        "xchat111": string;
        "xchat112": string;
        "xchat113": string;
        "xchat114": string;
        "xchat115": string;
        "xchat116": string;
        "xchat118": string;
        "xchat119": string;
        "xchat120": string;
        "xchat121": string;
        "xchat122": string;
        "xchat123": string;
        "xchat124": string;
        "xchat125": string;
        "xchat126": string;
        "xchat127": string;
        "xchat20": string;
        "xchat22": string;
        "xchat23": string;
        "xchat24": string;
        "xchat25": string;
        "xchat26": string;
        "xchat27": string;
        "xchat28": string;
        "xchat29": string;
        "xchat39": string;
        "xchat62": string;
        "xchat63": string;
        "xchat64": string;
        "xchat65": string;
        "xchat66": string;
        "xchat67": string;
        "xchat68": string;
        "xchat69": string;
        "xchat70": string;
        "xchat71": string;
        "xchat72": string;
        "xchat73": string;
        "xchat74": string;
        "xchat75": string;
        "xchat76": string;
        "xchat77": string;
        "xchat78": string;
        "xchat79": string;
        "xchat80": string;
        "xchat81": string;
        "xchat83": string;
        "xchat84": string;
        "xchat85": string;
        "xchat86": string;
        "xchat87": string;
        "xchat88": string;
        "xchat89": string;
        "xchat91": string;
        "xchat94": string;
        "xchat95": string;
        "xchat96": string;
        "xchat97": string;
        "xchat98": string;
        "xchat99": string;
    };
};
