// @ts-check
/*
webApiScenarios.js

Used to help debug web API interactions like Client.getTokenUsage
*/

"use strict";

const fs = require("fs");
const mfc = require("../../lib/index.js");
const log = mfc.log;
let user = "guest";
let pass = "guest";

// To examine packet streams for a logged in user, put your
// username and hashed password (read the comment in Client.ts)
// in a file named cred.txt in the test folder. Separate them by
// a single newline. And this script will log in as that user.
// Otherwise it will default to using guest credentials, which
// also work fine but only reveal and subset of the message protocol.
// cred.txt is excluded from git via .gitignore. Please never commit
// your own password hash.
let cred = "cred.txt";
if (fs.existsSync(cred)) {
    let data = fs.readFileSync(cred).toString().split("\r\n");
    if (data.length >= 2) {
        user = data[0];
        pass = data[1];
    }
}

let client = new mfc.Client(user, pass, {modernLogin: true, preserveHtml: false});

// Dump all chat logs in the first week of January
client.getChatLogs(new Date("2018-01-01"), new Date("2018-01-08"))
    .then((logs) => {
        logs.forEach(log => {
            log.lines.forEach(line => {
                console.log(`${line.time.toISOString()} ${line.user}: ${line.text}`);
            });
        });
    });

// Dump all token sessions in the first week of January as a
// tab seperated stream, suitable for importing to a spreadsheet
client.getTokenUsage(new Date("2018-01-01"), new Date("2018-01-08"))
    .then((tokenSessions) => {
        tokenSessions.forEach(sess => {
            console.log(`${sess.date.toISOString()}\t${sess.type}\t${sess.recipient}\t${sess.tokens}\t${sess.comment ? sess.comment : ""}`);
        });
    });
