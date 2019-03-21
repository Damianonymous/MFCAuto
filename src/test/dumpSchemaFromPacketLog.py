"""
After running packetInspector.js for however long, you'll have
a packetLog.txt file with a ton of traffic. This script will
read in that log and dump a JSON schema that correctly validates
all the sMessage payloads of the packets received in the log.

Requires genson (https://github.com/wolverdude/genson/)
    pip install genson
"""

import sys
import json
from genson import Schema

if __name__ == "__main__":
    fctypeMap = {}

    with open("packetLog.txt", encoding="utf-8") as log:
        for line in log:
            # Strip off the timestamp and filename
            line = line[38:]
            packet = json.loads(line)
            if (packet["FCType"] == "MANAGELIST"
                or packet["FCType"] == "TAGS"
                or packet["FCType"] == "ROOMDATA"):
                # These packet types are too diverse
                # or overly unique and generate schemas
                # that are not particularly useful
                continue
            schema = fctypeMap.setdefault(packet["FCType"], Schema())
            sMessage = packet.setdefault("sMessage", None)
            schema.add_object(sMessage)
        full_schema = "{"
        for k, v in fctypeMap.items():
            full_schema += '"{}": {},'.format(k, v.to_json())
        full_schema = full_schema[:-1]
        full_schema += "}"
        with open("packetLogSchema.json", "w") as output:
            output.write(json.dumps(json.loads(full_schema), sort_keys=True, indent=4))
