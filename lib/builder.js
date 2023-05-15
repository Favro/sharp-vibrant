"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Builder_src, _Builder_opts;
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-cycle
const vibrant_1 = __importDefault(require("./vibrant"));
class Builder {
    constructor(src, opts = {}) {
        _Builder_src.set(this, void 0);
        _Builder_opts.set(this, void 0);
        __classPrivateFieldSet(this, _Builder_src, src, "f");
        __classPrivateFieldSet(this, _Builder_opts, opts, "f");
        if (vibrant_1.default.DefaultOpts.filters) {
            __classPrivateFieldGet(this, _Builder_opts, "f").filters = [...vibrant_1.default.DefaultOpts.filters];
        }
        else {
            __classPrivateFieldGet(this, _Builder_opts, "f").filters = [];
        }
    }
    maxColorCount(n) {
        __classPrivateFieldGet(this, _Builder_opts, "f").colorCount = n;
        return this;
    }
    maxDimension(d) {
        __classPrivateFieldGet(this, _Builder_opts, "f").maxDimension = d;
        return this;
    }
    addFilter(f) {
        __classPrivateFieldGet(this, _Builder_opts, "f").filters.push(f);
        return this;
    }
    removeFilter(f) {
        const i = __classPrivateFieldGet(this, _Builder_opts, "f").filters.indexOf(f);
        if (i > 0)
            __classPrivateFieldGet(this, _Builder_opts, "f").filters.splice(i);
        return this;
    }
    clearFilters() {
        __classPrivateFieldGet(this, _Builder_opts, "f").filters = [];
        return this;
    }
    quality(q) {
        __classPrivateFieldGet(this, _Builder_opts, "f").quality = q;
        return this;
    }
    useImageClass(imageClass) {
        __classPrivateFieldGet(this, _Builder_opts, "f").ImageClass = imageClass;
        return this;
    }
    useGenerator(generator) {
        __classPrivateFieldGet(this, _Builder_opts, "f").generator = generator;
        return this;
    }
    useQuantizer(quantizer) {
        __classPrivateFieldGet(this, _Builder_opts, "f").quantizer = quantizer;
        return this;
    }
    build() {
        return new vibrant_1.default(__classPrivateFieldGet(this, _Builder_src, "f"), __classPrivateFieldGet(this, _Builder_opts, "f"));
    }
    getPalette(cb) {
        return this.build().getPalette(cb);
    }
}
exports.default = Builder;
_Builder_src = new WeakMap(), _Builder_opts = new WeakMap();
//# sourceMappingURL=builder.js.map