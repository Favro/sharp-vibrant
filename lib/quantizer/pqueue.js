"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _PQueue_sorted, _PQueue_comparator;
Object.defineProperty(exports, "__esModule", { value: true });
class PQueue {
    sort() {
        if (!__classPrivateFieldGet(this, _PQueue_sorted, "f")) {
            this.contents.sort(__classPrivateFieldGet(this, _PQueue_comparator, "f"));
            __classPrivateFieldSet(this, _PQueue_sorted, true, "f");
        }
    }
    constructor(comparator) {
        _PQueue_sorted.set(this, void 0);
        _PQueue_comparator.set(this, void 0);
        __classPrivateFieldSet(this, _PQueue_comparator, comparator, "f");
        this.contents = [];
        __classPrivateFieldSet(this, _PQueue_sorted, false, "f");
    }
    push(item) {
        this.contents.push(item);
        __classPrivateFieldSet(this, _PQueue_sorted, false, "f");
    }
    peek(index) {
        this.sort();
        return this.contents[typeof index === 'number' ? index : this.contents.length - 1];
    }
    pop() {
        this.sort();
        return this.contents.pop();
    }
    get size() {
        return this.contents.length;
    }
    map(mapper) {
        this.sort();
        return this.contents.map(mapper);
    }
}
exports.default = PQueue;
_PQueue_sorted = new WeakMap(), _PQueue_comparator = new WeakMap();
//# sourceMappingURL=pqueue.js.map