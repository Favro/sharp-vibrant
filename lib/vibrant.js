"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var _Vibrant_src;
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("./color");
// eslint-disable-next-line import/no-cycle
const builder_1 = __importDefault(require("./builder"));
const Util = __importStar(require("./util"));
const quantizer_1 = __importDefault(require("./quantizer"));
const generator_1 = require("./generator");
// eslint-disable-next-line import/no-cycle
const Filters = __importStar(require("./filter"));
class Vibrant {
    static from(src) {
        return new builder_1.default(src);
    }
    constructor(src, opts) {
        _Vibrant_src.set(this, void 0);
        __classPrivateFieldSet(this, _Vibrant_src, src, "f");
        this.opts = (Object.assign(Object.assign({}, Vibrant.DefaultOpts), opts));
        this.opts.combinedFilter = Filters.combineFilters(this.opts.filters);
    }
    process(image) {
        const { quantizer, generator } = this.opts;
        return image.applyFilter(this.opts.combinedFilter)
            .then((imageData) => quantizer(imageData.data, this.opts))
            .then((colors) => color_1.Swatch.applyFilter(colors, this.opts.combinedFilter))
            .then((colors) => Promise.resolve(generator(colors)));
    }
    getPalette(cb) {
        const image = new this.opts.ImageClass();
        const result = image.load(__classPrivateFieldGet(this, _Vibrant_src, "f"), this.opts)
            .then((loadedImage) => this.process(loadedImage))
            .then((palette) => {
            const paletteResult = {
                pixelCount: image.pixelCount,
                imageDimensions: {
                    width: image.width,
                    height: image.height,
                },
                palette,
            };
            image.cleanup();
            return paletteResult;
        }, (err) => {
            image.cleanup();
            throw err;
        });
        if (cb) {
            result.then((palette) => cb(null, palette), (err) => cb(err));
        }
        return result;
    }
}
_Vibrant_src = new WeakMap();
Vibrant.Builder = builder_1.default;
Vibrant.Quantizer = quantizer_1.default;
Vibrant.Generator = generator_1.Default;
Vibrant.Filter = Filters;
Vibrant.Util = Util;
Vibrant.Swatch = color_1.Swatch;
Vibrant.DefaultOpts = {
    colorCount: 64,
    quality: 5,
    generator: generator_1.Default,
    ImageClass: null,
    quantizer: quantizer_1.default,
    filters: [Filters.Default],
};
exports.default = Vibrant;
//# sourceMappingURL=vibrant.js.map