import re
from urllib.request import urlopen
import json
serverConfig = "https://www.myfreecams.com/_js/serverconfig.js"
url = "https://www.myfreecams.com/_js/mfccore.js"
# Maybe it's wrong to merge in the w. stuff?  Is that all just for the UI?
constantRe = re.compile(r'(\s|;?|,)(FCS|w)\.([A-Z0-9]+)_([A-Z0-9_]+)\s+?=\s+?([0-9]+);')
constantMap = dict()

header = """// Various constants and enums used by MFC.  Most of these values can be seen here:
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
"""

#Add our own constants...
constantMap.setdefault("FCTYPE", dict())["CLIENT_MANUAL_DISCONNECT"] = -6
constantMap.setdefault("FCTYPE", dict())["CLIENT_DISCONNECTED"] = -5
constantMap.setdefault("FCTYPE", dict())["CLIENT_MODELSLOADED"] = -4
constantMap.setdefault("FCTYPE", dict())["CLIENT_CONNECTED"] = -3
constantMap.setdefault("FCTYPE", dict())["ANY"] = -2
constantMap.setdefault("FCTYPE", dict())["UNKNOWN"] = -1

with urlopen(url) as data:
    scriptText = data.read().decode('utf-8')

    result = constantRe.findall(scriptText)
    for (prefix1, prefix2, fctype, subtype, num) in result:
        constantMap.setdefault(fctype, dict())[subtype] = num

    with open("Constants.ts", "w") as f:
        f.write(header)
        for fctype in sorted(constantMap):
            f.write("\nexport enum {} {{\n".format(fctype))
            for subtype, value in sorted(constantMap[fctype].items(), key=lambda x: int(x[1])):
                f.write('    "{}" = {},\n'.format(subtype, value))
            f.write("}\n")

        with urlopen(serverConfig) as configData:
            configText = configData.read().decode('utf-8')
            config = json.loads(configText)
            configText = json.dumps(config, indent=4, sort_keys=True)
            f.write("\n// tslint:disable:trailing-comma\n")
            f.write("export const CACHED_SERVERCONFIG = {}".format(configText))
            f.write(";\n// tslint:enable:trailing-comma\n")
print("Done")
