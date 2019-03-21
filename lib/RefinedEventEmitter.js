"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
// tslint:disable:no-any
/** EventEmitter with narrowed types for better intellisense and compiler checks */
class RefinedEventEmitter {
    constructor() {
        this._emitter = new events_1.EventEmitter();
    }
    addListener(event, listener) { this._emitter.addListener(event, listener); return this; }
    on(event, listener) { this._emitter.on(event, listener); return this; }
    once(event, listener) { this._emitter.once(event, listener); return this; }
    prependListener(event, listener) { this._emitter.prependListener(event, listener); return this; }
    prependOnceListener(event, listener) { this._emitter.prependOnceListener(event, listener); return this; }
    removeListener(event, listener) { this._emitter.removeListener(event, listener); return this; }
    removeAllListeners(event) { this._emitter.removeAllListeners(event); return this; }
    getMaxListeners() { return this._emitter.getMaxListeners(); }
    setMaxListeners(n) { this._emitter.setMaxListeners(n); return this; }
    listeners(event) { return this._emitter.listeners(event); }
    emit(event, ...args) { return this._emitter.emit(event, ...args); }
    eventNames() { return this._emitter.eventNames(); }
    listenerCount(type) { return this._emitter.listenerCount(type); }
    rawListeners(event) { return this._emitter.rawListeners(event); }
}
exports.RefinedEventEmitter = RefinedEventEmitter;
// tslint:enable:no-any
//# sourceMappingURL=RefinedEventEmitter.js.map