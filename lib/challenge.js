/* globals phantom, MfcDomChallenge */
// PhantomJS script for answering MFC's DOM challenge
// Run with --web-security=no as so:
//  .\node_modules\.bin\phantomjs --web-security=no .\src\main\challenge.js <platform id>
"use strict";
var system = require("system");
var webPage = require("webpage");
var page = webPage.create();

if (system.args.length !== 2) {
    console.log("Please specify the platform id to use, 1 for MFC, 2 for CamYou");
    phantom.exit(1);
}

var platformId = parseInt(system.args[1]);
var baseUrl = platformId === 2 ? "camyou.com" : "myfreecams.com";

page.onConsoleMessage = function(msg) {
    console.log(msg);
    phantom.exit(0);
};

page.includeJs(
    "https://www." + baseUrl + "/MfcJs/MfcDomChallenge/MfcDomChallenge.js",
    function () {
        // The two branches of this 'if' are largely redundant and would
        // normally be collapsed, but code inside the evaluate function
        // will be run in the page context, not here. So it doesn't have
        // access to the platformId or baseUrl variables set above.
        // There are alternatives like using the evaluateJavaScript function
        // that takes a string instead and just templatizing the string.
        // But, meh, whatever, this works.
        if (platformId === 1) {
            (page.evaluate(function () {
                new MfcDomChallenge({
                    "api_url": "https://api.myfreecams.com",
                    "site": "www",
                    "pid": 1,
                    "callback": function (hRes) {
                        console.log(JSON.stringify(hRes));
                    }
                });
            }));
        } else {
            (page.evaluate(function () {
                new MfcDomChallenge({
                    "api_url": "https://api.camyou.com",
                    "site": "www",
                    "pid": 2,
                    "callback": function (hRes) {
                        console.log(JSON.stringify(hRes));
                    }
                });
            }));
        }
    }
);
