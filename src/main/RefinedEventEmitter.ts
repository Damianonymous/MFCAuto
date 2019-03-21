import { EventEmitter } from "events";

// tslint:disable:no-any

/** EventEmitter with narrowed types for better intellisense and compiler checks */
export class RefinedEventEmitter<EventNames extends string, CallbackType extends (...args: any[]) => void, EmitArgs> implements EventEmitter {
    private readonly _emitter = new EventEmitter();
    public addListener(event: EventNames, listener: CallbackType) { this._emitter.addListener(event, listener); return this; }
    public on(event: EventNames, listener: CallbackType) { this._emitter.on(event, listener); return this; }
    public once(event: EventNames, listener: CallbackType) { this._emitter.once(event, listener); return this; }
    public prependListener(event: EventNames, listener: CallbackType) { this._emitter.prependListener(event, listener); return this; }
    public prependOnceListener(event: EventNames, listener: CallbackType) { this._emitter.prependOnceListener(event, listener); return this; }
    public removeListener(event: EventNames, listener: CallbackType) { this._emitter.removeListener(event, listener); return this; }
    public removeAllListeners(event?: EventNames) { this._emitter.removeAllListeners(event); return this; }
    public getMaxListeners() { return this._emitter.getMaxListeners(); }
    public setMaxListeners(n: number) { this._emitter.setMaxListeners(n); return this; }
    public listeners(event: EventNames) { return this._emitter.listeners(event ) as CallbackType[]; }
    public emit(event: EventNames, ...args: Array<EmitArgs>) { return this._emitter.emit(event, ...args); }
    public eventNames() { return this._emitter.eventNames() as EventNames[]; }
    public listenerCount(type: EventNames) { return this._emitter.listenerCount(type); }
    public rawListeners(event: EventNames) { return this._emitter.rawListeners(event) as CallbackType[]; }
}

// tslint:enable:no-any
