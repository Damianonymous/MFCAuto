/// <reference types="node" />
import { EventEmitter } from "events";
/** EventEmitter with narrowed types for better intellisense and compiler checks */
export declare class RefinedEventEmitter<EventNames extends string, CallbackType extends (...args: any[]) => void, EmitArgs> implements EventEmitter {
    private readonly _emitter;
    addListener(event: EventNames, listener: CallbackType): this;
    on(event: EventNames, listener: CallbackType): this;
    once(event: EventNames, listener: CallbackType): this;
    prependListener(event: EventNames, listener: CallbackType): this;
    prependOnceListener(event: EventNames, listener: CallbackType): this;
    removeListener(event: EventNames, listener: CallbackType): this;
    removeAllListeners(event?: EventNames): this;
    getMaxListeners(): number;
    setMaxListeners(n: number): this;
    listeners(event: EventNames): CallbackType[];
    emit(event: EventNames, ...args: Array<EmitArgs>): boolean;
    eventNames(): EventNames[];
    listenerCount(type: EventNames): number;
    rawListeners(event: EventNames): CallbackType[];
}
