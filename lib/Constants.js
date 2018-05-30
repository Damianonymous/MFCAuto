"use strict";
// Various constants and enums used by MFC.  Most of these values can be seen here:
// http://www.myfreecams.com/_js/mfccore.js
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAGIC = -2027771214;
exports.FLASH_PORT = 8100;
exports.WEBSOCKET_PORT = 8080;
// STATE is essentially the same as FCVIDEO but has friendly names
// for better log messages and code readability
var STATE;
(function (STATE) {
    STATE[STATE["FreeChat"] = 0] = "FreeChat";
    // TX_RESET = 1,         // Unused?
    STATE[STATE["Away"] = 2] = "Away";
    // TX_CONFIRMING = 11,   // Unused?
    STATE[STATE["Private"] = 12] = "Private";
    STATE[STATE["GroupShow"] = 13] = "GroupShow";
    // TX_RESERVED = 14,     // Unused?
    // TX_KILLMODEL = 15,    // Unused?
    // C2C_ON = 20,          // Unused?
    // C2C_OFF = 21,         // Unused?
    STATE[STATE["Online"] = 90] = "Online";
    // RX_PVT = 91,          // Unused?
    // RX_VOY = 92,          // Unused?
    // RX_GRP = 93,          // Unused?
    // NULL = 126,           // Unused?
    STATE[STATE["Offline"] = 127] = "Offline";
})(STATE = exports.STATE || (exports.STATE = {}));
// Version number to pass along with our
// FCTYPE_LOGIN login requests
//
// The latest Flash version number is here:
//   https://www.myfreecams.com/js/wsgw.js
// The latest WebSocket version number is here:
//   http://m.myfreecams.com/source.min.js
var LOGIN_VERSION;
(function (LOGIN_VERSION) {
    LOGIN_VERSION[LOGIN_VERSION["FLASH"] = 20071025] = "FLASH";
    LOGIN_VERSION[LOGIN_VERSION["WEBSOCKET"] = 20080910] = "WEBSOCKET";
})(LOGIN_VERSION = exports.LOGIN_VERSION || (exports.LOGIN_VERSION = {}));
var CAMCHAN;
(function (CAMCHAN) {
    CAMCHAN[CAMCHAN["ID_START"] = 400000000] = "ID_START";
    CAMCHAN[CAMCHAN["ID_END"] = 500000000] = "ID_END";
})(CAMCHAN = exports.CAMCHAN || (exports.CAMCHAN = {}));
var CHANNEL;
(function (CHANNEL) {
    CHANNEL[CHANNEL["ID_START"] = 100000000] = "ID_START";
    CHANNEL[CHANNEL["ID_END"] = 400000000] = "ID_END";
})(CHANNEL = exports.CHANNEL || (exports.CHANNEL = {}));
var CLIENT;
(function (CLIENT) {
    CLIENT[CLIENT["VERSION_REQUIRED"] = 20060925] = "VERSION_REQUIRED";
})(CLIENT = exports.CLIENT || (exports.CLIENT = {}));
var DISPLAY;
(function (DISPLAY) {
    DISPLAY[DISPLAY["PM_INLINE_WHISPER"] = 1] = "PM_INLINE_WHISPER";
    DISPLAY[DISPLAY["PM_INLINE_ALL"] = 2] = "PM_INLINE_ALL";
})(DISPLAY = exports.DISPLAY || (exports.DISPLAY = {}));
var EVSESSION;
(function (EVSESSION) {
    EVSESSION[EVSESSION["NONE"] = 0] = "NONE";
    EVSESSION[EVSESSION["PRIVATE"] = 1] = "PRIVATE";
    EVSESSION[EVSESSION["VOYEUR"] = 2] = "VOYEUR";
    EVSESSION[EVSESSION["GROUP"] = 3] = "GROUP";
    EVSESSION[EVSESSION["FEATURE"] = 4] = "FEATURE";
    EVSESSION[EVSESSION["AWAYPVT"] = 5] = "AWAYPVT";
    EVSESSION[EVSESSION["TIP"] = 10] = "TIP";
    EVSESSION[EVSESSION["PUBLIC"] = 100] = "PUBLIC";
    EVSESSION[EVSESSION["AWAY"] = 101] = "AWAY";
    EVSESSION[EVSESSION["START"] = 102] = "START";
    EVSESSION[EVSESSION["UPDATE"] = 103] = "UPDATE";
    EVSESSION[EVSESSION["STOP"] = 104] = "STOP";
    EVSESSION[EVSESSION["SPECIAL"] = 1000] = "SPECIAL";
})(EVSESSION = exports.EVSESSION || (exports.EVSESSION = {}));
var EVUP;
(function (EVUP) {
    EVUP[EVUP["NONE"] = 0] = "NONE";
    EVUP[EVUP["DIFF"] = 1] = "DIFF";
    EVUP[EVUP["FULL"] = 2] = "FULL";
})(EVUP = exports.EVUP || (exports.EVUP = {}));
var FCACCEPT;
(function (FCACCEPT) {
    FCACCEPT[FCACCEPT["NOBODY"] = 0] = "NOBODY";
    FCACCEPT[FCACCEPT["FRIENDS"] = 1] = "FRIENDS";
    FCACCEPT[FCACCEPT["ALL"] = 2] = "ALL";
    FCACCEPT[FCACCEPT["V2_NONE"] = 8] = "V2_NONE";
    FCACCEPT[FCACCEPT["V2_FRIENDS"] = 16] = "V2_FRIENDS";
    FCACCEPT[FCACCEPT["V2_MODELS"] = 32] = "V2_MODELS";
    FCACCEPT[FCACCEPT["V2_PREMIUMS"] = 64] = "V2_PREMIUMS";
    FCACCEPT[FCACCEPT["V2_BASICS"] = 128] = "V2_BASICS";
    FCACCEPT[FCACCEPT["V2_BOOKMARKS"] = 256] = "V2_BOOKMARKS";
    FCACCEPT[FCACCEPT["V2_TOPFRIENDS"] = 512] = "V2_TOPFRIENDS";
})(FCACCEPT = exports.FCACCEPT || (exports.FCACCEPT = {}));
var FCACT;
(function (FCACT) {
    FCACT[FCACT["CHAN_TIP"] = 1006] = "CHAN_TIP";
    FCACT[FCACT["CHAN_BAN"] = 1011] = "CHAN_BAN";
    FCACT[FCACT["CHAN_UNBAN"] = 1012] = "CHAN_UNBAN";
    FCACT[FCACT["CHAN_JOIN"] = 1051] = "CHAN_JOIN";
    FCACT[FCACT["CHAN_PART"] = 1052] = "CHAN_PART";
    FCACT[FCACT["CHAN_TOPIC"] = 1061] = "CHAN_TOPIC";
    FCACT[FCACT["CHAN_WHITEBOARD_ON"] = 1101] = "CHAN_WHITEBOARD_ON";
    FCACT[FCACT["CHAN_WHITEBOARD_OFF"] = 1102] = "CHAN_WHITEBOARD_OFF";
    FCACT[FCACT["LOGIN"] = 8001] = "LOGIN";
    FCACT[FCACT["LOGOUT"] = 8002] = "LOGOUT";
})(FCACT = exports.FCACT || (exports.FCACT = {}));
var FCAPP;
(function (FCAPP) {
    FCAPP[FCAPP["NONE"] = 0] = "NONE";
    FCAPP[FCAPP["MASTER"] = 1] = "MASTER";
    FCAPP[FCAPP["CHAT"] = 2] = "CHAT";
    FCAPP[FCAPP["WORKER"] = 3] = "WORKER";
    FCAPP[FCAPP["AUTH"] = 4] = "AUTH";
    FCAPP[FCAPP["LOADTEST"] = 5] = "LOADTEST";
    FCAPP[FCAPP["TRANSCODER"] = 6] = "TRANSCODER";
})(FCAPP = exports.FCAPP || (exports.FCAPP = {}));
var FCBAN;
(function (FCBAN) {
    FCBAN[FCBAN["NONE"] = 0] = "NONE";
    FCBAN[FCBAN["TEMP"] = 1] = "TEMP";
    FCBAN[FCBAN["60DAY"] = 2] = "60DAY";
    FCBAN[FCBAN["LIFE"] = 3] = "LIFE";
})(FCBAN = exports.FCBAN || (exports.FCBAN = {}));
var FCCHAN;
(function (FCCHAN) {
    FCCHAN[FCCHAN["NOOPT"] = 0] = "NOOPT";
    FCCHAN[FCCHAN["EVENT_NONE"] = 0] = "EVENT_NONE";
    FCCHAN[FCCHAN["JOIN"] = 1] = "JOIN";
    FCCHAN[FCCHAN["EVENT_CLEARCHAT"] = 1] = "EVENT_CLEARCHAT";
    FCCHAN[FCCHAN["PART"] = 2] = "PART";
    FCCHAN[FCCHAN["ERR_NOCHANNEL"] = 2] = "ERR_NOCHANNEL";
    FCCHAN[FCCHAN["EVENT_MUTE"] = 2] = "EVENT_MUTE";
    FCCHAN[FCCHAN["ERR_NOTMEMBER"] = 3] = "ERR_NOTMEMBER";
    FCCHAN[FCCHAN["EVENT_TOPIC"] = 3] = "EVENT_TOPIC";
    FCCHAN[FCCHAN["OLDMSG"] = 4] = "OLDMSG";
    FCCHAN[FCCHAN["ERR_GUESTMUTE"] = 4] = "ERR_GUESTMUTE";
    FCCHAN[FCCHAN["EVENT_COUNTDOWN"] = 4] = "EVENT_COUNTDOWN";
    FCCHAN[FCCHAN["ERR_GROUPMUTE"] = 5] = "ERR_GROUPMUTE";
    FCCHAN[FCCHAN["EVENT_KICK"] = 5] = "EVENT_KICK";
    FCCHAN[FCCHAN["ERR_NOTALLOWED"] = 6] = "ERR_NOTALLOWED";
    FCCHAN[FCCHAN["EVENT_WHITEBOARD_ON"] = 6] = "EVENT_WHITEBOARD_ON";
    FCCHAN[FCCHAN["EVENT_WHITEBOARD_OFF"] = 7] = "EVENT_WHITEBOARD_OFF";
    FCCHAN[FCCHAN["HISTORY"] = 8] = "HISTORY";
    FCCHAN[FCCHAN["EVENT_RESERVED_008"] = 8] = "EVENT_RESERVED_008";
    FCCHAN[FCCHAN["EVENT_RESERVED_009"] = 9] = "EVENT_RESERVED_009";
    FCCHAN[FCCHAN["EVENT_RESERVED_010"] = 10] = "EVENT_RESERVED_010";
    FCCHAN[FCCHAN["EVENT_RESERVED_011"] = 11] = "EVENT_RESERVED_011";
    FCCHAN[FCCHAN["EVENT_RESERVED_012"] = 12] = "EVENT_RESERVED_012";
    FCCHAN[FCCHAN["EVENT_RESERVED_013"] = 13] = "EVENT_RESERVED_013";
    FCCHAN[FCCHAN["EVENT_RESERVED_014"] = 14] = "EVENT_RESERVED_014";
    FCCHAN[FCCHAN["EVENT_RESERVED_015"] = 15] = "EVENT_RESERVED_015";
    FCCHAN[FCCHAN["LIST"] = 16] = "LIST";
    FCCHAN[FCCHAN["EVENT_RESERVED_016"] = 16] = "EVENT_RESERVED_016";
    FCCHAN[FCCHAN["CAMSTATE"] = 16] = "CAMSTATE";
    FCCHAN[FCCHAN["EVENT_RESERVED_017"] = 17] = "EVENT_RESERVED_017";
    FCCHAN[FCCHAN["EVENT_RESERVED_018"] = 18] = "EVENT_RESERVED_018";
    FCCHAN[FCCHAN["EVENT_RESERVED_019"] = 19] = "EVENT_RESERVED_019";
    FCCHAN[FCCHAN["WELCOME"] = 32] = "WELCOME";
    FCCHAN[FCCHAN["BATCHPART"] = 64] = "BATCHPART";
    FCCHAN[FCCHAN["EXT_USERNAME"] = 128] = "EXT_USERNAME";
    FCCHAN[FCCHAN["EXT_USERDATA"] = 256] = "EXT_USERDATA";
})(FCCHAN = exports.FCCHAN || (exports.FCCHAN = {}));
var FCERRTYPE;
(function (FCERRTYPE) {
    FCERRTYPE[FCERRTYPE["INVALIDUSER"] = 10] = "INVALIDUSER";
    FCERRTYPE[FCERRTYPE["NOACCESS"] = 11] = "NOACCESS";
    FCERRTYPE[FCERRTYPE["NOSPACE"] = 12] = "NOSPACE";
})(FCERRTYPE = exports.FCERRTYPE || (exports.FCERRTYPE = {}));
var FCGROUP;
(function (FCGROUP) {
    FCGROUP[FCGROUP["NONE"] = 0] = "NONE";
    FCGROUP[FCGROUP["EXPIRED"] = 1] = "EXPIRED";
    FCGROUP[FCGROUP["BUSY"] = 2] = "BUSY";
    FCGROUP[FCGROUP["EMPTY"] = 3] = "EMPTY";
    FCGROUP[FCGROUP["DECLINED"] = 4] = "DECLINED";
    FCGROUP[FCGROUP["UNAVAILABLE"] = 5] = "UNAVAILABLE";
    FCGROUP[FCGROUP["SESSION"] = 9] = "SESSION";
})(FCGROUP = exports.FCGROUP || (exports.FCGROUP = {}));
var FCL;
(function (FCL) {
    FCL[FCL["NULL"] = 0] = "NULL";
    FCL[FCL["FRIENDS"] = 1] = "FRIENDS";
    FCL[FCL["IGNORES"] = 2] = "IGNORES";
    FCL[FCL["BOOKMARKS"] = 3] = "BOOKMARKS";
    FCL[FCL["HIDDEN"] = 4] = "HIDDEN";
    FCL[FCL["HPFRIENDS"] = 5] = "HPFRIENDS";
    FCL[FCL["TOPFRIENDS"] = 6] = "TOPFRIENDS";
    FCL[FCL["NEWS_SUBS"] = 7] = "NEWS_SUBS";
    FCL[FCL["NEWS_HIDDEN"] = 8] = "NEWS_HIDDEN";
    FCL[FCL["MYWEBCAM_ALLOW"] = 9] = "MYWEBCAM_ALLOW";
    FCL[FCL["MYWEBCAM_DENY"] = 10] = "MYWEBCAM_DENY";
    FCL[FCL["BLOCKS_STATES"] = 11] = "BLOCKS_STATES";
    FCL[FCL["BLOCKS_COUNTRIES"] = 12] = "BLOCKS_COUNTRIES";
    FCL[FCL["ROOMFILTERS"] = 13] = "ROOMFILTERS";
    FCL[FCL["BANS"] = 14] = "BANS";
    FCL[FCL["MUTES"] = 15] = "MUTES";
    FCL[FCL["RESERVED_16"] = 16] = "RESERVED_16";
    FCL[FCL["RESERVED_17"] = 17] = "RESERVED_17";
    FCL[FCL["RESERVED_18"] = 18] = "RESERVED_18";
    FCL[FCL["RESERVED_19"] = 19] = "RESERVED_19";
    FCL[FCL["TAGS"] = 20] = "TAGS";
    FCL[FCL["CAMS"] = 21] = "CAMS";
    FCL[FCL["ROOMMATES"] = 22] = "ROOMMATES";
    FCL[FCL["RESERVED_23"] = 23] = "RESERVED_23";
    FCL[FCL["RESERVED_24"] = 24] = "RESERVED_24";
    FCL[FCL["RESERVED_25"] = 25] = "RESERVED_25";
    FCL[FCL["RESERVED_26"] = 26] = "RESERVED_26";
    FCL[FCL["RESERVED_27"] = 27] = "RESERVED_27";
    FCL[FCL["RESERVED_28"] = 28] = "RESERVED_28";
    FCL[FCL["RESERVED_29"] = 29] = "RESERVED_29";
})(FCL = exports.FCL || (exports.FCL = {}));
var FCLEVEL;
(function (FCLEVEL) {
    FCLEVEL[FCLEVEL["GUEST"] = 0] = "GUEST";
    FCLEVEL[FCLEVEL["BASIC"] = 1] = "BASIC";
    FCLEVEL[FCLEVEL["PREMIUM"] = 2] = "PREMIUM";
    FCLEVEL[FCLEVEL["MODEL"] = 4] = "MODEL";
    FCLEVEL[FCLEVEL["ADMIN"] = 5] = "ADMIN";
})(FCLEVEL = exports.FCLEVEL || (exports.FCLEVEL = {}));
var FCMODE;
(function (FCMODE) {
    FCMODE[FCMODE["NOPM"] = 0] = "NOPM";
    FCMODE[FCMODE["FRIENDPM"] = 1] = "FRIENDPM";
    FCMODE[FCMODE["ALLPM"] = 2] = "ALLPM";
})(FCMODE = exports.FCMODE || (exports.FCMODE = {}));
var FCMODEL;
(function (FCMODEL) {
    FCMODEL[FCMODEL["NONE"] = 0] = "NONE";
    FCMODEL[FCMODEL["NOGROUP"] = 1] = "NOGROUP";
    FCMODEL[FCMODEL["FEATURE1"] = 2] = "FEATURE1";
    FCMODEL[FCMODEL["FEATURE2"] = 4] = "FEATURE2";
    FCMODEL[FCMODEL["FEATURE3"] = 8] = "FEATURE3";
    FCMODEL[FCMODEL["FEATURE4"] = 16] = "FEATURE4";
    FCMODEL[FCMODEL["FEATURE5"] = 32] = "FEATURE5";
})(FCMODEL = exports.FCMODEL || (exports.FCMODEL = {}));
var FCNEWSOPT;
(function (FCNEWSOPT) {
    FCNEWSOPT[FCNEWSOPT["NONE"] = 0] = "NONE";
    FCNEWSOPT[FCNEWSOPT["IN_CHAN"] = 1] = "IN_CHAN";
    FCNEWSOPT[FCNEWSOPT["IN_PM"] = 2] = "IN_PM";
    FCNEWSOPT[FCNEWSOPT["AUTOFRIENDS_OFF"] = 4] = "AUTOFRIENDS_OFF";
    FCNEWSOPT[FCNEWSOPT["ADDFRIENDS_OFF"] = 4] = "ADDFRIENDS_OFF";
    FCNEWSOPT[FCNEWSOPT["IN_CHAN_NOPVT"] = 8] = "IN_CHAN_NOPVT";
    FCNEWSOPT[FCNEWSOPT["IN_CHAN_NOGRP"] = 16] = "IN_CHAN_NOGRP";
})(FCNEWSOPT = exports.FCNEWSOPT || (exports.FCNEWSOPT = {}));
var FCNOSESS;
(function (FCNOSESS) {
    FCNOSESS[FCNOSESS["NONE"] = 0] = "NONE";
    FCNOSESS[FCNOSESS["PVT"] = 1] = "PVT";
    FCNOSESS[FCNOSESS["GRP"] = 2] = "GRP";
    FCNOSESS[FCNOSESS["TRUEPVT"] = 4] = "TRUEPVT";
    FCNOSESS[FCNOSESS["TOKEN_MIN"] = 8] = "TOKEN_MIN";
})(FCNOSESS = exports.FCNOSESS || (exports.FCNOSESS = {}));
var FCOPT;
(function (FCOPT) {
    FCOPT[FCOPT["NONE"] = 0] = "NONE";
    FCOPT[FCOPT["BOLD"] = 1] = "BOLD";
    FCOPT[FCOPT["ITALICS"] = 2] = "ITALICS";
    FCOPT[FCOPT["REMOTEPVT"] = 4] = "REMOTEPVT";
    FCOPT[FCOPT["TRUEPVT"] = 8] = "TRUEPVT";
    FCOPT[FCOPT["CAM2CAM"] = 16] = "CAM2CAM";
    FCOPT[FCOPT["RGNBLOCK"] = 32] = "RGNBLOCK";
    FCOPT[FCOPT["TOKENAPPROX"] = 64] = "TOKENAPPROX";
    FCOPT[FCOPT["TOKENHIDE"] = 128] = "TOKENHIDE";
    FCOPT[FCOPT["RPAPPROX"] = 256] = "RPAPPROX";
    FCOPT[FCOPT["RPHIDE"] = 512] = "RPHIDE";
    FCOPT[FCOPT["HDVIDEO"] = 1024] = "HDVIDEO";
    FCOPT[FCOPT["MODELSW"] = 2048] = "MODELSW";
    FCOPT[FCOPT["GUESTMUTE"] = 4096] = "GUESTMUTE";
    FCOPT[FCOPT["BASICMUTE"] = 8192] = "BASICMUTE";
    FCOPT[FCOPT["SMALLCAPS"] = 16384] = "SMALLCAPS";
    FCOPT[FCOPT["XMPP"] = 32768] = "XMPP";
    FCOPT[FCOPT["WHITEBOARD1"] = 65536] = "WHITEBOARD1";
    FCOPT[FCOPT["WHITEBOARD2"] = 131072] = "WHITEBOARD2";
})(FCOPT = exports.FCOPT || (exports.FCOPT = {}));
var FCPORT;
(function (FCPORT) {
    FCPORT[FCPORT["EDGE_POLICY"] = 843] = "EDGE_POLICY";
    FCPORT[FCPORT["MASTER_EDGE"] = 4000] = "MASTER_EDGE";
    FCPORT[FCPORT["MASTER_AUTH"] = 4001] = "MASTER_AUTH";
    FCPORT[FCPORT["AUTH_DATAGRAM"] = 4002] = "AUTH_DATAGRAM";
    FCPORT[FCPORT["MASTER_WORKER"] = 4003] = "MASTER_WORKER";
    FCPORT[FCPORT["EDGE_WORKER"] = 4004] = "EDGE_WORKER";
    FCPORT[FCPORT["EDGE_CLIENT1"] = 5001] = "EDGE_CLIENT1";
    FCPORT[FCPORT["EDGE_AJAX"] = 8080] = "EDGE_AJAX";
    FCPORT[FCPORT["EDGE_CLIENT3"] = 8100] = "EDGE_CLIENT3";
    FCPORT[FCPORT["EDGE_WEBSOCKGW"] = 8101] = "EDGE_WEBSOCKGW";
    FCPORT[FCPORT["EDGE_CLIENT2"] = 8550] = "EDGE_CLIENT2";
})(FCPORT = exports.FCPORT || (exports.FCPORT = {}));
var FCRESPONSE;
(function (FCRESPONSE) {
    FCRESPONSE[FCRESPONSE["SUCCESS"] = 0] = "SUCCESS";
    FCRESPONSE[FCRESPONSE["ERROR"] = 1] = "ERROR";
    FCRESPONSE[FCRESPONSE["NOTICE"] = 2] = "NOTICE";
    FCRESPONSE[FCRESPONSE["SUSPEND"] = 3] = "SUSPEND";
    FCRESPONSE[FCRESPONSE["SHUTOFF"] = 4] = "SHUTOFF";
    FCRESPONSE[FCRESPONSE["WARNING"] = 5] = "WARNING";
    FCRESPONSE[FCRESPONSE["QUEUED"] = 6] = "QUEUED";
    FCRESPONSE[FCRESPONSE["NO_RESULTS"] = 7] = "NO_RESULTS";
    FCRESPONSE[FCRESPONSE["CACHED"] = 8] = "CACHED";
    FCRESPONSE[FCRESPONSE["JSON"] = 9] = "JSON";
    FCRESPONSE[FCRESPONSE["INVALIDUSER"] = 10] = "INVALIDUSER";
    FCRESPONSE[FCRESPONSE["NOACCESS"] = 11] = "NOACCESS";
    FCRESPONSE[FCRESPONSE["NOSPACE"] = 12] = "NOSPACE";
    FCRESPONSE[FCRESPONSE["INVALIDREQ"] = 13] = "INVALIDREQ";
    FCRESPONSE[FCRESPONSE["INVALIDARG"] = 14] = "INVALIDARG";
    FCRESPONSE[FCRESPONSE["NOTFOUND"] = 15] = "NOTFOUND";
    FCRESPONSE[FCRESPONSE["INSUFFICIENT"] = 16] = "INSUFFICIENT";
})(FCRESPONSE = exports.FCRESPONSE || (exports.FCRESPONSE = {}));
var FCRPC;
(function (FCRPC) {
    FCRPC[FCRPC["NONE"] = 0] = "NONE";
    FCRPC[FCRPC["UPDATEFRIEND"] = 1] = "UPDATEFRIEND";
    FCRPC[FCRPC["UPDATEIGNORE"] = 2] = "UPDATEIGNORE";
    FCRPC[FCRPC["RESLOADED"] = 3] = "RESLOADED";
    FCRPC[FCRPC["W_READY"] = 4] = "W_READY";
    FCRPC[FCRPC["W_OFFLINEQUERY"] = 5] = "W_OFFLINEQUERY";
    FCRPC[FCRPC["W_FRIENDLIST"] = 6] = "W_FRIENDLIST";
    FCRPC[FCRPC["W_IGNORELIST"] = 7] = "W_IGNORELIST";
    FCRPC[FCRPC["W_EXT_REQUEST"] = 8] = "W_EXT_REQUEST";
    FCRPC[FCRPC["W_EXT_RESPONSE"] = 9] = "W_EXT_RESPONSE";
    FCRPC[FCRPC["FCSVAR"] = 10] = "FCSVAR";
})(FCRPC = exports.FCRPC || (exports.FCRPC = {}));
var FCS;
(function (FCS) {
    FCS[FCS["SUBSCRIBE"] = 1] = "SUBSCRIBE";
    FCS[FCS["SYNC"] = 2] = "SYNC";
    FCS[FCS["SESSION"] = 10] = "SESSION";
    FCS[FCS["BAN"] = 11] = "BAN";
    FCS[FCS["MODEL"] = 12] = "MODEL";
    FCS[FCS["EVENT"] = 13] = "EVENT";
    FCS[FCS["EVENT2"] = 14] = "EVENT2";
    FCS[FCS["EXTDATA"] = 15] = "EXTDATA";
    FCS[FCS["GWCONNECT"] = 16] = "GWCONNECT";
    FCS[FCS["MUTE"] = 18] = "MUTE";
    FCS[FCS["AUTHREQ"] = 100] = "AUTHREQ";
    FCS[FCS["BANREQ"] = 101] = "BANREQ";
    FCS[FCS["EVENTREQ"] = 102] = "EVENTREQ";
    FCS[FCS["EVENTRESP"] = 103] = "EVENTRESP";
    FCS[FCS["SENDEVENT"] = 104] = "SENDEVENT";
    FCS[FCS["SENDEVENT2"] = 105] = "SENDEVENT2";
})(FCS = exports.FCS || (exports.FCS = {}));
var FCSBAN;
(function (FCSBAN) {
    FCSBAN[FCSBAN["NONE"] = 0] = "NONE";
    FCSBAN[FCSBAN["USER"] = 1] = "USER";
    FCSBAN[FCSBAN["IP"] = 2] = "IP";
})(FCSBAN = exports.FCSBAN || (exports.FCSBAN = {}));
var FCTYPE;
(function (FCTYPE) {
    FCTYPE[FCTYPE["CLIENT_MANUAL_DISCONNECT"] = -6] = "CLIENT_MANUAL_DISCONNECT";
    FCTYPE[FCTYPE["CLIENT_DISCONNECTED"] = -5] = "CLIENT_DISCONNECTED";
    FCTYPE[FCTYPE["CLIENT_MODELSLOADED"] = -4] = "CLIENT_MODELSLOADED";
    FCTYPE[FCTYPE["CLIENT_CONNECTED"] = -3] = "CLIENT_CONNECTED";
    FCTYPE[FCTYPE["ANY"] = -2] = "ANY";
    FCTYPE[FCTYPE["UNKNOWN"] = -1] = "UNKNOWN";
    FCTYPE[FCTYPE["NULL"] = 0] = "NULL";
    FCTYPE[FCTYPE["LOGIN"] = 1] = "LOGIN";
    FCTYPE[FCTYPE["ADDFRIEND"] = 2] = "ADDFRIEND";
    FCTYPE[FCTYPE["PMESG"] = 3] = "PMESG";
    FCTYPE[FCTYPE["STATUS"] = 4] = "STATUS";
    FCTYPE[FCTYPE["DETAILS"] = 5] = "DETAILS";
    FCTYPE[FCTYPE["TOKENINC"] = 6] = "TOKENINC";
    FCTYPE[FCTYPE["ADDIGNORE"] = 7] = "ADDIGNORE";
    FCTYPE[FCTYPE["PRIVACY"] = 8] = "PRIVACY";
    FCTYPE[FCTYPE["ADDFRIENDREQ"] = 9] = "ADDFRIENDREQ";
    FCTYPE[FCTYPE["USERNAMELOOKUP"] = 10] = "USERNAMELOOKUP";
    FCTYPE[FCTYPE["ZBAN"] = 11] = "ZBAN";
    FCTYPE[FCTYPE["BROADCASTNEWS"] = 12] = "BROADCASTNEWS";
    FCTYPE[FCTYPE["ANNOUNCE"] = 13] = "ANNOUNCE";
    FCTYPE[FCTYPE["MANAGELIST"] = 14] = "MANAGELIST";
    FCTYPE[FCTYPE["INBOX"] = 15] = "INBOX";
    FCTYPE[FCTYPE["GWCONNECT"] = 16] = "GWCONNECT";
    FCTYPE[FCTYPE["RELOADSETTINGS"] = 17] = "RELOADSETTINGS";
    FCTYPE[FCTYPE["HIDEUSERS"] = 18] = "HIDEUSERS";
    FCTYPE[FCTYPE["RULEVIOLATION"] = 19] = "RULEVIOLATION";
    FCTYPE[FCTYPE["SESSIONSTATE"] = 20] = "SESSIONSTATE";
    FCTYPE[FCTYPE["REQUESTPVT"] = 21] = "REQUESTPVT";
    FCTYPE[FCTYPE["ACCEPTPVT"] = 22] = "ACCEPTPVT";
    FCTYPE[FCTYPE["REJECTPVT"] = 23] = "REJECTPVT";
    FCTYPE[FCTYPE["ENDSESSION"] = 24] = "ENDSESSION";
    FCTYPE[FCTYPE["TXPROFILE"] = 25] = "TXPROFILE";
    FCTYPE[FCTYPE["STARTVOYEUR"] = 26] = "STARTVOYEUR";
    FCTYPE[FCTYPE["SERVERREFRESH"] = 27] = "SERVERREFRESH";
    FCTYPE[FCTYPE["SETTING"] = 28] = "SETTING";
    FCTYPE[FCTYPE["BWSTATS"] = 29] = "BWSTATS";
    FCTYPE[FCTYPE["TKX"] = 30] = "TKX";
    FCTYPE[FCTYPE["SETTEXTOPT"] = 31] = "SETTEXTOPT";
    FCTYPE[FCTYPE["SERVERCONFIG"] = 32] = "SERVERCONFIG";
    FCTYPE[FCTYPE["MODELGROUP"] = 33] = "MODELGROUP";
    FCTYPE[FCTYPE["REQUESTGRP"] = 34] = "REQUESTGRP";
    FCTYPE[FCTYPE["STATUSGRP"] = 35] = "STATUSGRP";
    FCTYPE[FCTYPE["GROUPCHAT"] = 36] = "GROUPCHAT";
    FCTYPE[FCTYPE["CLOSEGRP"] = 37] = "CLOSEGRP";
    FCTYPE[FCTYPE["UCR"] = 38] = "UCR";
    FCTYPE[FCTYPE["MYUCR"] = 39] = "MYUCR";
    FCTYPE[FCTYPE["SLAVECON"] = 40] = "SLAVECON";
    FCTYPE[FCTYPE["SLAVECMD"] = 41] = "SLAVECMD";
    FCTYPE[FCTYPE["SLAVEFRIEND"] = 42] = "SLAVEFRIEND";
    FCTYPE[FCTYPE["SLAVEVSHARE"] = 43] = "SLAVEVSHARE";
    FCTYPE[FCTYPE["ROOMDATA"] = 44] = "ROOMDATA";
    FCTYPE[FCTYPE["NEWSITEM"] = 45] = "NEWSITEM";
    FCTYPE[FCTYPE["GUESTCOUNT"] = 46] = "GUESTCOUNT";
    FCTYPE[FCTYPE["PRELOGINQ"] = 47] = "PRELOGINQ";
    FCTYPE[FCTYPE["MODELGROUPSZ"] = 48] = "MODELGROUPSZ";
    FCTYPE[FCTYPE["ROOMHELPER"] = 49] = "ROOMHELPER";
    FCTYPE[FCTYPE["CMESG"] = 50] = "CMESG";
    FCTYPE[FCTYPE["JOINCHAN"] = 51] = "JOINCHAN";
    FCTYPE[FCTYPE["CREATECHAN"] = 52] = "CREATECHAN";
    FCTYPE[FCTYPE["INVITECHAN"] = 53] = "INVITECHAN";
    FCTYPE[FCTYPE["KICKCHAN"] = 54] = "KICKCHAN";
    FCTYPE[FCTYPE["QUIETCHAN"] = 55] = "QUIETCHAN";
    FCTYPE[FCTYPE["BANCHAN"] = 56] = "BANCHAN";
    FCTYPE[FCTYPE["PREVIEWCHAN"] = 57] = "PREVIEWCHAN";
    FCTYPE[FCTYPE["SHUTDOWN"] = 58] = "SHUTDOWN";
    FCTYPE[FCTYPE["LISTBANS"] = 59] = "LISTBANS";
    FCTYPE[FCTYPE["UNBAN"] = 60] = "UNBAN";
    FCTYPE[FCTYPE["SETWELCOME"] = 61] = "SETWELCOME";
    FCTYPE[FCTYPE["CHANOP"] = 62] = "CHANOP";
    FCTYPE[FCTYPE["LISTCHAN"] = 63] = "LISTCHAN";
    FCTYPE[FCTYPE["TAGS"] = 64] = "TAGS";
    FCTYPE[FCTYPE["SETPCODE"] = 65] = "SETPCODE";
    FCTYPE[FCTYPE["SETMINTIP"] = 66] = "SETMINTIP";
    FCTYPE[FCTYPE["UEOPT"] = 67] = "UEOPT";
    FCTYPE[FCTYPE["HDVIDEO"] = 68] = "HDVIDEO";
    FCTYPE[FCTYPE["METRICS"] = 69] = "METRICS";
    FCTYPE[FCTYPE["OFFERCAM"] = 70] = "OFFERCAM";
    FCTYPE[FCTYPE["REQUESTCAM"] = 71] = "REQUESTCAM";
    FCTYPE[FCTYPE["MYWEBCAM"] = 72] = "MYWEBCAM";
    FCTYPE[FCTYPE["MYCAMSTATE"] = 73] = "MYCAMSTATE";
    FCTYPE[FCTYPE["PMHISTORY"] = 74] = "PMHISTORY";
    FCTYPE[FCTYPE["CHATFLASH"] = 75] = "CHATFLASH";
    FCTYPE[FCTYPE["TRUEPVT"] = 76] = "TRUEPVT";
    FCTYPE[FCTYPE["BOOKMARKS"] = 77] = "BOOKMARKS";
    FCTYPE[FCTYPE["EVENT"] = 78] = "EVENT";
    FCTYPE[FCTYPE["STATEDUMP"] = 79] = "STATEDUMP";
    FCTYPE[FCTYPE["RECOMMEND"] = 80] = "RECOMMEND";
    FCTYPE[FCTYPE["EXTDATA"] = 81] = "EXTDATA";
    FCTYPE[FCTYPE["NOTIFY"] = 84] = "NOTIFY";
    FCTYPE[FCTYPE["PUBLISH"] = 85] = "PUBLISH";
    FCTYPE[FCTYPE["XREQUEST"] = 86] = "XREQUEST";
    FCTYPE[FCTYPE["XRESPONSE"] = 87] = "XRESPONSE";
    FCTYPE[FCTYPE["EDGECON"] = 88] = "EDGECON";
    FCTYPE[FCTYPE["ZGWINVALID"] = 95] = "ZGWINVALID";
    FCTYPE[FCTYPE["CONNECTING"] = 96] = "CONNECTING";
    FCTYPE[FCTYPE["CONNECTED"] = 97] = "CONNECTED";
    FCTYPE[FCTYPE["DISCONNECTED"] = 98] = "DISCONNECTED";
    FCTYPE[FCTYPE["LOGOUT"] = 99] = "LOGOUT";
})(FCTYPE = exports.FCTYPE || (exports.FCTYPE = {}));
var FCUCR;
(function (FCUCR) {
    FCUCR[FCUCR["VM_LOUNGE"] = 0] = "VM_LOUNGE";
    FCUCR[FCUCR["CREATOR"] = 0] = "CREATOR";
    FCUCR[FCUCR["VM_MYWEBCAM"] = 1] = "VM_MYWEBCAM";
    FCUCR[FCUCR["FRIENDS"] = 1] = "FRIENDS";
    FCUCR[FCUCR["MODELS"] = 2] = "MODELS";
    FCUCR[FCUCR["PREMIUMS"] = 4] = "PREMIUMS";
    FCUCR[FCUCR["BASICS"] = 8] = "BASICS";
    FCUCR[FCUCR["BASIC"] = 8] = "BASIC";
    FCUCR[FCUCR["ALL"] = 15] = "ALL";
})(FCUCR = exports.FCUCR || (exports.FCUCR = {}));
var FCUOPT;
(function (FCUOPT) {
    FCUOPT[FCUOPT["EMPTY"] = 0] = "EMPTY";
    FCUOPT[FCUOPT["PLATFORM_MFC"] = 1] = "PLATFORM_MFC";
    FCUOPT[FCUOPT["PLATFORM_CAMYOU"] = 2] = "PLATFORM_CAMYOU";
    FCUOPT[FCUOPT["PLATFORM_OFFLINE"] = 4] = "PLATFORM_OFFLINE";
    FCUOPT[FCUOPT["PLATFORM_XSDEFAULT"] = 8] = "PLATFORM_XSDEFAULT";
    FCUOPT[FCUOPT["RESERVED_05"] = 16] = "RESERVED_05";
    FCUOPT[FCUOPT["RESERVED_06"] = 32] = "RESERVED_06";
    FCUOPT[FCUOPT["RESERVED_07"] = 64] = "RESERVED_07";
    FCUOPT[FCUOPT["RESERVED_08"] = 128] = "RESERVED_08";
    FCUOPT[FCUOPT["RESERVED_09"] = 256] = "RESERVED_09";
    FCUOPT[FCUOPT["RESERVED_10"] = 512] = "RESERVED_10";
    FCUOPT[FCUOPT["RESERVED_11"] = 1024] = "RESERVED_11";
    FCUOPT[FCUOPT["RESERVED_12"] = 2048] = "RESERVED_12";
    FCUOPT[FCUOPT["RESERVED_13"] = 4096] = "RESERVED_13";
    FCUOPT[FCUOPT["RESERVED_14"] = 8192] = "RESERVED_14";
    FCUOPT[FCUOPT["RESERVED_15"] = 16384] = "RESERVED_15";
    FCUOPT[FCUOPT["RESERVED_16"] = 32768] = "RESERVED_16";
    FCUOPT[FCUOPT["RESERVED_17"] = 65536] = "RESERVED_17";
})(FCUOPT = exports.FCUOPT || (exports.FCUOPT = {}));
var FCUPDATE;
(function (FCUPDATE) {
    FCUPDATE[FCUPDATE["NONE"] = 0] = "NONE";
    FCUPDATE[FCUPDATE["MISSMFC"] = 1] = "MISSMFC";
    FCUPDATE[FCUPDATE["NEWTIP"] = 2] = "NEWTIP";
    FCUPDATE[FCUPDATE["REGION_SAFE"] = 3] = "REGION_SAFE";
    FCUPDATE[FCUPDATE["CAMSCORE"] = 4] = "CAMSCORE";
    FCUPDATE[FCUPDATE["ROOMFILTER"] = 5] = "ROOMFILTER";
})(FCUPDATE = exports.FCUPDATE || (exports.FCUPDATE = {}));
var FCVIDEO;
(function (FCVIDEO) {
    FCVIDEO[FCVIDEO["TX_IDLE"] = 0] = "TX_IDLE";
    FCVIDEO[FCVIDEO["TX_RESET"] = 1] = "TX_RESET";
    FCVIDEO[FCVIDEO["TX_AWAY"] = 2] = "TX_AWAY";
    FCVIDEO[FCVIDEO["TX_CONFIRMING"] = 11] = "TX_CONFIRMING";
    FCVIDEO[FCVIDEO["TX_PVT"] = 12] = "TX_PVT";
    FCVIDEO[FCVIDEO["TX_GRP"] = 13] = "TX_GRP";
    FCVIDEO[FCVIDEO["TX_RESERVED"] = 14] = "TX_RESERVED";
    FCVIDEO[FCVIDEO["TX_KILLMODEL"] = 15] = "TX_KILLMODEL";
    FCVIDEO[FCVIDEO["C2C_ON"] = 20] = "C2C_ON";
    FCVIDEO[FCVIDEO["C2C_OFF"] = 21] = "C2C_OFF";
    FCVIDEO[FCVIDEO["RX_IDLE"] = 90] = "RX_IDLE";
    FCVIDEO[FCVIDEO["RX_PVT"] = 91] = "RX_PVT";
    FCVIDEO[FCVIDEO["RX_VOY"] = 92] = "RX_VOY";
    FCVIDEO[FCVIDEO["RX_GRP"] = 93] = "RX_GRP";
    FCVIDEO[FCVIDEO["NULL"] = 126] = "NULL";
    FCVIDEO[FCVIDEO["OFFLINE"] = 127] = "OFFLINE";
    FCVIDEO[FCVIDEO["UNKNOWN"] = 127] = "UNKNOWN";
})(FCVIDEO = exports.FCVIDEO || (exports.FCVIDEO = {}));
var FCW;
(function (FCW) {
    FCW[FCW["STATE_INIT"] = 0] = "STATE_INIT";
    FCW[FCW["STATE_READY"] = 1] = "STATE_READY";
    FCW[FCW["STATE_WORKING"] = 2] = "STATE_WORKING";
    FCW[FCW["STATE_WAITING"] = 3] = "STATE_WAITING";
    FCW[FCW["STATE_INVALID"] = 4] = "STATE_INVALID";
})(FCW = exports.FCW || (exports.FCW = {}));
var FCWINDOW;
(function (FCWINDOW) {
    FCWINDOW[FCWINDOW["NO_USER_PM"] = 20] = "NO_USER_PM";
    FCWINDOW[FCWINDOW["OPTIONS_ADD_FRIEND"] = 31] = "OPTIONS_ADD_FRIEND";
    FCWINDOW[FCWINDOW["OPTIONS_ADD_IGNORE"] = 32] = "OPTIONS_ADD_IGNORE";
})(FCWINDOW = exports.FCWINDOW || (exports.FCWINDOW = {}));
var FCWOPT;
(function (FCWOPT) {
    FCWOPT[FCWOPT["NONE"] = 0] = "NONE";
    FCWOPT[FCWOPT["ADD"] = 1] = "ADD";
    FCWOPT[FCWOPT["REMOVE"] = 2] = "REMOVE";
    FCWOPT[FCWOPT["LIST"] = 4] = "LIST";
    FCWOPT[FCWOPT["NO_RECEIPT"] = 128] = "NO_RECEIPT";
    FCWOPT[FCWOPT["REDIS_JSON"] = 256] = "REDIS_JSON";
    FCWOPT[FCWOPT["USERID"] = 1024] = "USERID";
    FCWOPT[FCWOPT["USERDATA"] = 2048] = "USERDATA";
    FCWOPT[FCWOPT["USERNAME"] = 4096] = "USERNAME";
    FCWOPT[FCWOPT["C_USERNAME"] = 32768] = "C_USERNAME";
    FCWOPT[FCWOPT["C_MONTHSLOGIN"] = 65536] = "C_MONTHSLOGIN";
    FCWOPT[FCWOPT["C_LEVEL"] = 131072] = "C_LEVEL";
    FCWOPT[FCWOPT["C_VSTATE"] = 262144] = "C_VSTATE";
    FCWOPT[FCWOPT["C_CHATTEXT"] = 524288] = "C_CHATTEXT";
    FCWOPT[FCWOPT["C_PROFILE"] = 1048576] = "C_PROFILE";
    FCWOPT[FCWOPT["C_AVATAR"] = 2097152] = "C_AVATAR";
    FCWOPT[FCWOPT["C_RANK"] = 4194304] = "C_RANK";
    FCWOPT[FCWOPT["C_SDATE"] = 8388608] = "C_SDATE";
})(FCWOPT = exports.FCWOPT || (exports.FCWOPT = {}));
var HIDE;
(function (HIDE) {
    HIDE[HIDE["MODEL_GROUPS_AWAY"] = 1] = "MODEL_GROUPS_AWAY";
    HIDE[HIDE["MODEL_GROUPS_PRIVATE"] = 2] = "MODEL_GROUPS_PRIVATE";
    HIDE[HIDE["MODEL_GROUPS_GROUP"] = 4] = "MODEL_GROUPS_GROUP";
    HIDE[HIDE["MODEL_GROUPS_PUBLIC"] = 8] = "MODEL_GROUPS_PUBLIC";
})(HIDE = exports.HIDE || (exports.HIDE = {}));
var LOUNGE;
(function (LOUNGE) {
    LOUNGE[LOUNGE["MASK_AUTO_CLICK"] = 1] = "MASK_AUTO_CLICK";
    LOUNGE[LOUNGE["MASK_NO_CAMSNAPS"] = 2] = "MASK_NO_CAMSNAPS";
    LOUNGE[LOUNGE["MASK_LOUNGE_MODE"] = 4] = "MASK_LOUNGE_MODE";
})(LOUNGE = exports.LOUNGE || (exports.LOUNGE = {}));
var MAX;
(function (MAX) {
    MAX[MAX["FCL"] = 30] = "FCL";
})(MAX = exports.MAX || (exports.MAX = {}));
var MFC;
(function (MFC) {
    MFC[MFC["NEWS_USER_ID"] = 481462] = "NEWS_USER_ID";
})(MFC = exports.MFC || (exports.MFC = {}));
var MODEL;
(function (MODEL) {
    MODEL[MODEL["LIST_ICON_NEW_MODEL"] = 1] = "LIST_ICON_NEW_MODEL";
    MODEL[MODEL["LIST_ICON_RECOMMEND"] = 2] = "LIST_ICON_RECOMMEND";
    MODEL[MODEL["LIST_ICON_POPULAR"] = 4] = "LIST_ICON_POPULAR";
    MODEL[MODEL["LIST_ICON_RECENT"] = 8] = "LIST_ICON_RECENT";
    MODEL[MODEL["LIST_ICON_MISSMFC"] = 16] = "LIST_ICON_MISSMFC";
    MODEL[MODEL["LIST_ICON_TRENDING"] = 32] = "LIST_ICON_TRENDING";
    MODEL[MODEL["LIST_ICON_CUSTOM_ALERTS"] = 64] = "LIST_ICON_CUSTOM_ALERTS";
    MODEL[MODEL["VERSION_REQUIRED"] = 220170401] = "VERSION_REQUIRED";
    MODEL[MODEL["VERSION_MODELWEB"] = 320110101] = "VERSION_MODELWEB";
})(MODEL = exports.MODEL || (exports.MODEL = {}));
var MODELORDER;
(function (MODELORDER) {
    MODELORDER[MODELORDER["NONE"] = 0] = "NONE";
    MODELORDER[MODELORDER["PVT"] = 1] = "PVT";
    MODELORDER[MODELORDER["TRUEPVT"] = 2] = "TRUEPVT";
    MODELORDER[MODELORDER["GRP"] = 4] = "GRP";
})(MODELORDER = exports.MODELORDER || (exports.MODELORDER = {}));
var MYWEBCAM;
(function (MYWEBCAM) {
    MYWEBCAM[MYWEBCAM["EVERYONE"] = 0] = "EVERYONE";
    MYWEBCAM[MYWEBCAM["ONLYUSERS"] = 1] = "ONLYUSERS";
    MYWEBCAM[MYWEBCAM["ONLYFRIENDS"] = 2] = "ONLYFRIENDS";
    MYWEBCAM[MYWEBCAM["ONLYMODELS"] = 3] = "ONLYMODELS";
    MYWEBCAM[MYWEBCAM["FRIENDSANDMODELS"] = 4] = "FRIENDSANDMODELS";
    MYWEBCAM[MYWEBCAM["WHITELIST"] = 5] = "WHITELIST";
    MYWEBCAM[MYWEBCAM["FRIEND_ID"] = 100] = "FRIEND_ID";
})(MYWEBCAM = exports.MYWEBCAM || (exports.MYWEBCAM = {}));
var OBSMON;
(function (OBSMON) {
    OBSMON[OBSMON["NULL"] = 0] = "NULL";
    OBSMON[OBSMON["APPROVING"] = 10] = "APPROVING";
    OBSMON[OBSMON["UNAPPROVED"] = 11] = "UNAPPROVED";
    OBSMON[OBSMON["READY"] = 12] = "READY";
    OBSMON[OBSMON["ACTIVE"] = 20] = "ACTIVE";
    OBSMON[OBSMON["TIMEOUT"] = 30] = "TIMEOUT";
    OBSMON[OBSMON["INACTIVE"] = 31] = "INACTIVE";
    OBSMON[OBSMON["CLOSED"] = 32] = "CLOSED";
})(OBSMON = exports.OBSMON || (exports.OBSMON = {}));
var PLAT;
(function (PLAT) {
    PLAT[PLAT["MFC"] = 1] = "MFC";
    PLAT[PLAT["CAM"] = 2] = "CAM";
})(PLAT = exports.PLAT || (exports.PLAT = {}));
var PLATFORM;
(function (PLATFORM) {
    PLATFORM[PLATFORM["NONE"] = 0] = "NONE";
    PLATFORM[PLATFORM["MFC"] = 1] = "MFC";
    PLATFORM[PLATFORM["CAMYOU"] = 2] = "CAMYOU";
    PLATFORM[PLATFORM["CAMMUNITY"] = 2] = "CAMMUNITY";
})(PLATFORM = exports.PLATFORM || (exports.PLATFORM = {}));
var ROOMFILTER;
(function (ROOMFILTER) {
    ROOMFILTER[ROOMFILTER["EMPTY"] = 0] = "EMPTY";
    ROOMFILTER[ROOMFILTER["LOG"] = 1] = "LOG";
    ROOMFILTER[ROOMFILTER["DROP"] = 2] = "DROP";
    ROOMFILTER[ROOMFILTER["WARN"] = 4] = "WARN";
    ROOMFILTER[ROOMFILTER["REGEX"] = 8] = "REGEX";
    ROOMFILTER[ROOMFILTER["SPECIAL"] = 16] = "SPECIAL";
    ROOMFILTER[ROOMFILTER["FROMHELPER"] = 32] = "FROMHELPER";
    ROOMFILTER[ROOMFILTER["EXACT_WORD"] = 64] = "EXACT_WORD";
    ROOMFILTER[ROOMFILTER["RESERVED_7"] = 128] = "RESERVED_7";
    ROOMFILTER[ROOMFILTER["RESERVED_8"] = 256] = "RESERVED_8";
    ROOMFILTER[ROOMFILTER["RESERVED_9"] = 512] = "RESERVED_9";
    ROOMFILTER[ROOMFILTER["IS_GUEST"] = 1024] = "IS_GUEST";
    ROOMFILTER[ROOMFILTER["IS_BASIC"] = 2048] = "IS_BASIC";
    ROOMFILTER[ROOMFILTER["IS_PREMIUM"] = 4096] = "IS_PREMIUM";
    ROOMFILTER[ROOMFILTER["IS_MODEL"] = 8192] = "IS_MODEL";
    ROOMFILTER[ROOMFILTER["IN_PUBLIC"] = 16384] = "IN_PUBLIC";
    ROOMFILTER[ROOMFILTER["IN_SESSION"] = 32768] = "IN_SESSION";
    ROOMFILTER[ROOMFILTER["RESERVED_16"] = 65536] = "RESERVED_16";
    ROOMFILTER[ROOMFILTER["RESERVED_17"] = 131072] = "RESERVED_17";
    ROOMFILTER[ROOMFILTER["RESERVED_18"] = 262144] = "RESERVED_18";
    ROOMFILTER[ROOMFILTER["RESERVED_19"] = 524288] = "RESERVED_19";
    ROOMFILTER[ROOMFILTER["RESERVED_20"] = 1048576] = "RESERVED_20";
})(ROOMFILTER = exports.ROOMFILTER || (exports.ROOMFILTER = {}));
var SERVER;
(function (SERVER) {
    SERVER[SERVER["VERSION"] = 20071218] = "VERSION";
    SERVER[SERVER["VERSION_REQUIRED"] = 20071218] = "VERSION_REQUIRED";
})(SERVER = exports.SERVER || (exports.SERVER = {}));
var SESSCHAN;
(function (SESSCHAN) {
    SESSCHAN[SESSCHAN["ID_START"] = 200000000] = "ID_START";
    SESSCHAN[SESSCHAN["ID_END"] = 300000000] = "ID_END";
})(SESSCHAN = exports.SESSCHAN || (exports.SESSCHAN = {}));
var SESSION;
(function (SESSION) {
    SESSION[SESSION["ID_START"] = 75000000] = "ID_START";
    SESSION[SESSION["ID_END"] = 950000000] = "ID_END";
})(SESSION = exports.SESSION || (exports.SESSION = {}));
var TKOPT;
(function (TKOPT) {
    TKOPT[TKOPT["NONE"] = 0] = "NONE";
    TKOPT[TKOPT["START"] = 1] = "START";
    TKOPT[TKOPT["STOP"] = 2] = "STOP";
    TKOPT[TKOPT["OPEN"] = 4] = "OPEN";
    TKOPT[TKOPT["PVT"] = 8] = "PVT";
    TKOPT[TKOPT["VOY"] = 16] = "VOY";
    TKOPT[TKOPT["GRP"] = 32] = "GRP";
    TKOPT[TKOPT["TIP"] = 256] = "TIP";
    TKOPT[TKOPT["TIP_HIDDEN_AMT"] = 512] = "TIP_HIDDEN_AMT";
    TKOPT[TKOPT["TIP_OFFLINE"] = 1024] = "TIP_OFFLINE";
    TKOPT[TKOPT["TIP_MSG"] = 2048] = "TIP_MSG";
    TKOPT[TKOPT["TIP_ANON"] = 4096] = "TIP_ANON";
    TKOPT[TKOPT["TIP_PUBLIC"] = 8192] = "TIP_PUBLIC";
    TKOPT[TKOPT["TIP_FROMROOM"] = 16384] = "TIP_FROMROOM";
    TKOPT[TKOPT["TIP_PUBLICMSG"] = 32768] = "TIP_PUBLICMSG";
    TKOPT[TKOPT["TIP_HISTORY"] = 65536] = "TIP_HISTORY";
    TKOPT[TKOPT["TIP_SILENT"] = 131072] = "TIP_SILENT";
    TKOPT[TKOPT["TIP_NOCOUNT"] = 262144] = "TIP_NOCOUNT";
    TKOPT[TKOPT["HDVIDEO"] = 1048576] = "HDVIDEO";
    TKOPT[TKOPT["TIP_PURCHASE"] = 8388608] = "TIP_PURCHASE";
    TKOPT[TKOPT["TIP_PURCHASE_RES_24"] = 16777216] = "TIP_PURCHASE_RES_24";
    TKOPT[TKOPT["TIP_PURCHASE_RES_25"] = 33554432] = "TIP_PURCHASE_RES_25";
    TKOPT[TKOPT["TIP_PURCHASE_NOTIFY"] = 67108864] = "TIP_PURCHASE_NOTIFY";
    TKOPT[TKOPT["TIP_PURCHASE_LINK"] = 134217728] = "TIP_PURCHASE_LINK";
    TKOPT[TKOPT["TIP_PURCHASE_ALBUM"] = 268435456] = "TIP_PURCHASE_ALBUM";
    TKOPT[TKOPT["TIP_PURCHASE_COLLECTION"] = 536870912] = "TIP_PURCHASE_COLLECTION";
    TKOPT[TKOPT["TIP_PURCHASE_STOREITEM"] = 1073741824] = "TIP_PURCHASE_STOREITEM";
    TKOPT[TKOPT["TIP_PURCHASE_RES_31"] = 2147483648] = "TIP_PURCHASE_RES_31";
})(TKOPT = exports.TKOPT || (exports.TKOPT = {}));
var USER;
(function (USER) {
    USER[USER["ID_START"] = 100] = "ID_START";
    USER[USER["ID_END"] = 50000000] = "ID_END";
})(USER = exports.USER || (exports.USER = {}));
var USEREXT;
(function (USEREXT) {
    USEREXT[USEREXT["NUM"] = 0] = "NUM";
    USEREXT[USEREXT["STRING"] = 1] = "STRING";
    USEREXT[USEREXT["DATA"] = 2] = "DATA";
    USEREXT[USEREXT["STAMP"] = 3] = "STAMP";
})(USEREXT = exports.USEREXT || (exports.USEREXT = {}));
var V1;
(function (V1) {
    V1[V1["FLV"] = 0] = "FLV";
    V1[V1["F4V"] = 1] = "F4V";
})(V1 = exports.V1 || (exports.V1 = {}));
var V2;
(function (V2) {
    V2[V2["NONE"] = 2] = "NONE";
    V2[V2["FLV"] = 4] = "FLV";
    V2[V2["F4V"] = 8] = "F4V";
    V2[V2["MP4X"] = 16] = "MP4X";
    V2[V2["MP4W"] = 32] = "MP4W";
})(V2 = exports.V2 || (exports.V2 = {}));
var WEBCAM;
(function (WEBCAM) {
    WEBCAM[WEBCAM["SECURITY_EVERYONE"] = 0] = "SECURITY_EVERYONE";
    WEBCAM[WEBCAM["SECURITY_FRIENDS"] = 2] = "SECURITY_FRIENDS";
    WEBCAM[WEBCAM["SECURITY_MODELS"] = 3] = "SECURITY_MODELS";
    WEBCAM[WEBCAM["SECURITY_MODELS_FRIENDS"] = 4] = "SECURITY_MODELS_FRIENDS";
    WEBCAM[WEBCAM["SECURITY_ALLOWED"] = 5] = "SECURITY_ALLOWED";
    WEBCAM[WEBCAM["SECURITY_FRIEND_ID"] = 100] = "SECURITY_FRIEND_ID";
})(WEBCAM = exports.WEBCAM || (exports.WEBCAM = {}));
var WINDOW;
(function (WINDOW) {
    WINDOW[WINDOW["MODE_DEFAULT"] = 0] = "MODE_DEFAULT";
    WINDOW[WINDOW["MODE_DHTML"] = 1] = "MODE_DHTML";
    WINDOW[WINDOW["MODE_DESKTOP_DHTML"] = 1] = "MODE_DESKTOP_DHTML";
    WINDOW[WINDOW["MODE_BROWSER"] = 2] = "MODE_BROWSER";
    WINDOW[WINDOW["MODE_MOBILE_DHTML"] = 2] = "MODE_MOBILE_DHTML";
})(WINDOW = exports.WINDOW || (exports.WINDOW = {}));
var WORKER;
(function (WORKER) {
    WORKER[WORKER["ID_START"] = 50000000] = "ID_START";
    WORKER[WORKER["ID_END"] = 75000000] = "ID_END";
})(WORKER = exports.WORKER || (exports.WORKER = {}));
var WREQUEST;
(function (WREQUEST) {
    WREQUEST[WREQUEST["ID_START"] = 500000000] = "ID_START";
    WREQUEST[WREQUEST["ID_END"] = 600000000] = "ID_END";
})(WREQUEST = exports.WREQUEST || (exports.WREQUEST = {}));
// tslint:disable:trailing-comma
exports.CACHED_SERVERCONFIG = {
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
        "xchat41",
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
        "xchat40",
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
        "1388": "video888",
        "1389": "video889",
        "1390": "video890",
        "1392": "video892",
        "1393": "video893",
        "1394": "video894",
        "1395": "video895",
        "1396": "video896",
        "1397": "video897",
        "1398": "video898",
        "1399": "video899",
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
        "938": "video438",
        "939": "video439",
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
        "1545": "video545",
        "1546": "video546",
        "1547": "video547",
        "1548": "video548",
        "1549": "video549",
        "1550": "video550",
        "1551": "video551",
        "1552": "video552",
        "1553": "video553",
        "1554": "video554"
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
    }
};
// tslint:enable:trailing-comma
//# sourceMappingURL=Constants.js.map