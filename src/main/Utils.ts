const load = require("load");
import { spawn } from "child_process";
import * as assert from "assert";
import * as fs from "fs";
import * as path from "path";
import * as request from "request-promise-native";
import * as cheerio from "cheerio";

export enum LogLevel {
    /** No logging to the console, not even errors */
    SILENT,
    /** Only fatal or state corrupting errors */
    ERROR,
    /** Non-fatal warnings */
    WARNING,
    /** Status info, this is the default logging level */
    INFO,
    /** More verbose status info */
    VERBOSE,
    /** Debug information that won't be useful to most people */
    DEBUG,
    /** Debug information plus the entire packet log. This is very very verbose. */
    TRACE,
}

let logLevel = LogLevel.INFO;
let defaultLogFileName: string | undefined;
let defaultConsoleFormatter: ((msg: string) => string) | null | undefined;

/**
 * Sets default logging options
 * @param level Maximum LogLevel for which to log
 * @param logFileName Default file to log to
 * @param consoleFormatter Default formatter, usually you should leave this alone except
 * to possibly specify 'null' to turn off all console logging while leaving a fileRoot
 * to log only to a file instead
 */
export function setLogLevel(level: LogLevel, logFileName?: string, consoleFormatter?: ((msg: string) => string) | null) {
    "use strict";
    logLevel = level;
    defaultLogFileName = logFileName;
    defaultConsoleFormatter = consoleFormatter;
}

export function logWithLevelInternal(level: LogLevel, msg: string | (() => string), logFileName?: string, consoleFormatter?: ((msg: string) => string) | null): void {
    if (logFileName === undefined) {
        logFileName = defaultLogFileName;
    }
    if (consoleFormatter === undefined) {
        consoleFormatter = defaultConsoleFormatter;
    }
    logWithLevel(level, msg, logFileName, consoleFormatter);
}

export function logInternal(msg: string | (() => string), logFileName?: string, consoleFormatter?: ((msg: string) => string) | null): void {
    if (logFileName === undefined) {
        logFileName = defaultLogFileName;
    }
    if (consoleFormatter === undefined) {
        consoleFormatter = defaultConsoleFormatter;
    }
    log(msg, logFileName, consoleFormatter);
}

// Like "log" but respects different levels
export function logWithLevel(level: LogLevel, msg: string | (() => string), logFileName?: string, consoleFormatter?: ((msg: string) => string) | null): void {
    "use strict";
    if (logLevel >= level) {
        log(msg, logFileName, consoleFormatter);
    }
}

// Pads single digit number with a leading zero, simple helper function
function toStr(n: number): string {
    return n < 10 ? "0" + n.toString() : "" + n.toString();
}

function getDateTimeString(): string {
    const d = new Date();
    return (d.getFullYear().toString()) + "/" + (toStr(d.getMonth() + 1)) + "/" + (toStr(d.getDate())) + " - " + (toStr(d.getHours())) + ":" + (toStr(d.getMinutes())) + ":" + (toStr(d.getSeconds()));
}

// Helper logging function that timestamps each message and optionally outputs to a file as well
export function log(msg: string | (() => string), logFileName?: string, consoleFormatter?: ((msg: string) => string) | null): void {
    "use strict";
    assert.notStrictEqual(msg, undefined, "Trying to print undefined.  This usually indicates a bug upstream from the log function.");
    if (msg instanceof Function) {
        msg = msg();
    }

    const taggedMsg = `[${getDateTimeString()}${(logFileName !== undefined ? `, ${logFileName.toUpperCase()}` : "")}] ${msg}`;

    // Explicitly passing null, not undefined, as the consoleFormatter
    // means to skip the console output completely
    // tslint:disable-next-line:no-null-keyword
    if (consoleFormatter !== null) {
        if (consoleFormatter !== undefined) {
            console.log(consoleFormatter(taggedMsg));
        } else {
            console.log(taggedMsg);
        }
    }

    if (logFileName !== undefined) {
        const fd = fs.openSync(logFileName, "a");
        fs.writeSync(fd, taggedMsg + "\r\n");
        fs.closeSync(fd);
    }
}

// Takes a string, detects if it was URI encoded,
// and returns the decoded version
export function decodeIfNeeded(str: string): string {
    if (typeof str === "string" && str.indexOf("%") !== -1) {
        try {
            const decoded = decodeURIComponent(str);
            if (decoded === str) {
                // Apparently it wasn't actually encoded
                // So just return it
                return str;
            } else {
                // If it was fully URI encoded, then re-encoding
                // the decoded should return the original
                const encoded = encodeURIComponent(decoded);
                if (encoded === str) {
                    // Yep, it was fully encoded
                    return decoded;
                } else {
                    // It wasn't fully encoded, maybe it wasn't
                    // encoded at all. Be safe and return the
                    // original
                    logWithLevel(LogLevel.DEBUG, () => `[UTILS] decodeIfNeeded detected partially encoded string? '${str}'`);
                    return str;
                }
            }
        } catch (e) {
            logWithLevel(LogLevel.DEBUG, () => `[UTILS] decodeIfNeeded exception decoding '${str}'`);
            return str;
        }
    } else {
        return str;
    }
}

// tslint:disable-next-line:no-any
export function decodeAny(anything: any): any {
    if (typeof anything === "string") {
        anything = decodeIfNeeded(anything);
    } else if (Array.isArray(anything)) {
        anything.forEach((value, index) => {
            // tslint:disable-next-line:no-unsafe-any
            anything[index] = decodeAny(value);
        });
    } else if (typeof anything === "object" && anything !== null) {
        Object.getOwnPropertyNames(anything).forEach((key) => {
            // tslint:disable-next-line:no-unsafe-any
            anything[key] = decodeAny(anything[key]);
        });
    }
    return anything;
}

// Deprecated. This function is no longer used and may be removed from
// future versions of MFCAuto. For mixin patterns, please move to the
// new TypeScript 2.2+ syntax as described here:
//   https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-2.html
export function applyMixins(derivedCtor: Function, baseCtors: Function[]) {
    "use strict";
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            // tslint:disable-next-line:no-unsafe-any
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

// tslint:disable-next-line:no-any
export type Constructor<T> = new (...args: any[]) => T;

/**
 * Helper function to find the full path to an executable of a given name
 * that should have been brought down as a direct npm dependency of MFCAuto.
 */
export function findDependentExe(name: string): string {
    let location: string | undefined;
    const firstPlaceToCheck = path.join(path.dirname(__dirname), "node_modules", ".bin", name);
    if (fs.existsSync(firstPlaceToCheck)) {
        location = firstPlaceToCheck;
    } else {
        let startingDir = __dirname;
        let nextDirUp = path.dirname(__dirname);
        while (nextDirUp !== startingDir) {
            const placeToCheck = path.join(nextDirUp, ".bin", name);
            if (fs.existsSync(placeToCheck)) {
                location = placeToCheck;
                break;
            } else {
                startingDir = nextDirUp;
                nextDirUp = path.dirname(startingDir);
            }
        }
    }

    // Sanity check the results
    if (location === undefined) {
        logWithLevel(LogLevel.WARNING, `Could not find ${name} at the expected location. Assuming it is on the PATH and invoking anyway. If this fails, please re-run 'npm install'.`);
        return name;
    }
    if (!fs.statSync(location).isFile()) {
        throw new Error(`Found ${name}, but it is not a file?`);
    }
    try {
        fs.accessSync(location, fs.constants.X_OK);
    } catch (e) {
        throw new Error(`Found ${name}, but the calling process does not have execute permissions`);
    }

    return location;
}

/**
 * Helper function that spawns the given executable with the given arguments
 * and returns a promise that resolves with all the text the process wrote
 * to stdout, or rejects if the process couldn't be run or had any stderr output
 */
export async function spawnOutput(command: string, args?: string[]): Promise<string> {
    // @TODO - Might be good to have a timeout in case the spawned process hangs
    return new Promise<string>((resolve, reject) => {
        const ps = spawn(command, args, { shell: true });
        let stdout = "";
        let stderr = "";
        ps.on("error", (err) => {
            reject(err);
        });
        ps.on("exit", (/*code, signal*/) => {
            if (stderr.length > 0) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
        ps.stdout.on("data", (data) => {
            stdout += data;
        });
        ps.stderr.on("data", (data) => {
            stderr += data;
        });
    });
}

/**
 * Takes a string representation of a JS object, with potentially
 * unquoted or single quoted keys, converts it to a form that
 * can be parsed with JSON.parse, and returns the parsed result.
 * @param input
 */
export function parseJsObj(input: string) {
    return JSON.parse(input.replace(/(['"])?([a-zA-Z0-9_\$]+)(['"])?\s*:/g, '"$2":').replace(/'/g, '"'));
}

// tslint:disable:no-any no-unsafe-any

/**
 * Dynamically loads script code from the web, massaging it with the given
 * massager function first, and then passes the resulting instantiated object
 * to the given callback.
 *
 * We try to use this sparingly as it opens us up to breaks from site changes.
 * But it is still useful for the more complex or frequently updated parts
 * of MFC.
 * @param url URL from which to load the site script
 * @param massager Post-processor function that takes the raw site script and
 * converts/massages it to a usable form.
 * @returns A promise that resolves with the object loaded from site code
 * @access private
 */
export async function loadFromWeb(url: string, massager?: (src: string) => string): Promise<any> {
    let contents = await request(url).promise() as string;
    if (massager !== undefined) {
        contents = massager(contents);
    }
    return (load.compiler(contents));
}

/**
 * Creates an object suitable for use as the POST payload for a given HTML form.
 * This will not correctly handle any form elements that are dynamically added,
 * removed, or altered by page script. Fortunately, MFC doesn't seem to do that
 * at the moment.
 * @param form A CheerioElement containing the HTML form to create parameters for
 * @param userOptions Any user provided overrides for the page defaults
 * @access private
 */
export function createFormInput<T, U>(form: CheerioElement, userOptions: T | undefined): U {
    const parsedOptions: any = {};
    const inputs = cheerio.load(form)("input");
    const formValues: Array<{ name: string, value?: string, disabled?: string, type?: string, checked?: string }> = [];
    inputs.each((_index, element) => {
        const currentInput = {
            name: element.attribs.name,
            value: element.attribs.value,
            disabled: element.attribs.disabled,
            type: element.attribs.type,
            checked: element.attribs.checked,
        };
        formValues.push(currentInput);

        if (!currentInput.disabled) {
            if (currentInput.type === "checkbox") {
                if (currentInput.checked) {
                    parsedOptions[currentInput.name] = currentInput.value || "on";
                }
            } else {
                if (currentInput.value !== undefined && currentInput.value !== "") {
                    parsedOptions[currentInput.name] = currentInput.value;
                }
            }
        }
        // @TODO - How should I handle a disabled input field
        // for which we have a userOption specified? Should
        // the userOption cause the field to be enabled?
        // Can tackle this later though as, right now, I
        // don't see any disabled input fields on Share.
    });

    // Merge in our options bag argument, but only take the
    // properties that are valid for this form.
    //
    // In the future, we might remove or reverse this
    // limitation and trust the given userOptions more
    // than the parsedOptions. That could be one way
    // to handle dynamically generated form elements.
    // But for now this style of limitation is more useful
    // because I want one single "SharePurchaseOptions" type
    // and I know not every field on it will be valid for
    // every share item type. So I want to ignore the ones
    // that are invalid.
    if (userOptions !== undefined) {
        formValues.forEach((fv) => {
            if (fv.name in userOptions) {
                const anyOptions = userOptions as any;
                if (fv.type === "checkbox") {
                    if (typeof (anyOptions[fv.name]) !== "boolean") {
                        throw new Error(`createFormInput error: '${fv.name}' option is a checkbox and should be specified as a boolean`);
                    }
                    if (anyOptions[fv.name]) {
                        parsedOptions[fv.name] = fv.value || "on";
                    } else {
                        delete parsedOptions[fv.name];
                    }
                } else {
                    parsedOptions[fv.name] = anyOptions[fv.name];
                }
            }
        });
    }

    return parsedOptions as U;
}

// tslint:enable:no-any no-unsafe-any
