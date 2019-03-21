/// <reference types="cheerio" />
export declare enum LogLevel {
    /** No logging to the console, not even errors */
    SILENT = 0,
    /** Only fatal or state corrupting errors */
    ERROR = 1,
    /** Non-fatal warnings */
    WARNING = 2,
    /** Status info, this is the default logging level */
    INFO = 3,
    /** More verbose status info */
    VERBOSE = 4,
    /** Debug information that won't be useful to most people */
    DEBUG = 5,
    /** Debug information plus the entire packet log. This is very very verbose. */
    TRACE = 6,
}
/**
 * Sets default logging options
 * @param level Maximum LogLevel for which to log
 * @param logFileName Default file to log to
 * @param consoleFormatter Default formatter, usually you should leave this alone except
 * to possibly specify 'null' to turn off all console logging while leaving a fileRoot
 * to log only to a file instead
 */
export declare function setLogLevel(level: LogLevel, logFileName?: string, consoleFormatter?: ((msg: string) => string) | null): void;
export declare function logWithLevelInternal(level: LogLevel, msg: string | (() => string), logFileName?: string, consoleFormatter?: ((msg: string) => string) | null): void;
export declare function logInternal(msg: string | (() => string), logFileName?: string, consoleFormatter?: ((msg: string) => string) | null): void;
export declare function logWithLevel(level: LogLevel, msg: string | (() => string), logFileName?: string, consoleFormatter?: ((msg: string) => string) | null): void;
export declare function log(msg: string | (() => string), logFileName?: string, consoleFormatter?: ((msg: string) => string) | null): void;
export declare function decodeIfNeeded(str: string): string;
export declare function decodeAny(anything: any): any;
export declare function applyMixins(derivedCtor: Function, baseCtors: Function[]): void;
export declare type Constructor<T> = new (...args: any[]) => T;
/**
 * Helper function to find the full path to an executable of a given name
 * that should have been brought down as a direct npm dependency of MFCAuto.
 */
export declare function findDependentExe(name: string): string;
/**
 * Helper function that spawns the given executable with the given arguments
 * and returns a promise that resolves with all the text the process wrote
 * to stdout, or rejects if the process couldn't be run or had any stderr output
 */
export declare function spawnOutput(command: string, args?: string[]): Promise<string>;
/**
 * Takes a string representation of a JS object, with potentially
 * unquoted or single quoted keys, converts it to a form that
 * can be parsed with JSON.parse, and returns the parsed result.
 * @param input
 */
export declare function parseJsObj(input: string): any;
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
export declare function loadFromWeb(url: string, massager?: (src: string) => string): Promise<any>;
/**
 * Creates an object suitable for use as the POST payload for a given HTML form.
 * This will not correctly handle any form elements that are dynamically added,
 * removed, or altered by page script. Fortunately, MFC doesn't seem to do that
 * at the moment.
 * @param form A CheerioElement containing the HTML form to create parameters for
 * @param userOptions Any user provided overrides for the page defaults
 * @access private
 */
export declare function createFormInput<T, U>(form: CheerioElement, userOptions: T | undefined): U;
