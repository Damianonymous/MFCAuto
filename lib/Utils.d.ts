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
export declare function httpGet(url: string): Promise<string>;
export declare function httpsGet(url: string): Promise<string>;
