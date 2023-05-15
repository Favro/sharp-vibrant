"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
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
var _SharpImage_imageData;
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const base_1 = __importDefault(require("./base"));
class SharpImage extends base_1.default {
    constructor() {
        super(...arguments);
        _SharpImage_imageData.set(this, void 0);
    }
    load(image, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            let sharpInstance;
            // Check to see if image is a sharp instance.
            // Because sharp doesn't return a class, there's not much else we can do to verify type.
            if (typeof image === 'object' && 'resize' in image) {
                sharpInstance = image;
            }
            else if (typeof image === 'string' || image instanceof Buffer) {
                sharpInstance = (0, sharp_1.default)(image);
            }
            else {
                return Promise.reject(new Error(`Cannot load image of type ${typeof image}`));
            }
            if (opts.maxDimension > 0) {
                sharpInstance = sharpInstance.resize(opts.maxDimension, opts.maxDimension, {
                    fit: 'inside',
                    withoutEnlargement: true,
                });
            }
            const buffer = yield sharpInstance.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
            __classPrivateFieldSet(this, _SharpImage_imageData, {
                data: buffer.data,
                width: buffer.info.width,
                height: buffer.info.height,
            }, "f");
            return this;
        });
    }
    get pixelCount() {
        return this.imageData.width * this.imageData.height;
    }
    get imageData() {
        return __classPrivateFieldGet(this, _SharpImage_imageData, "f");
    }
    get width() {
        return this.imageData.width;
    }
    get height() {
        return this.imageData.height;
    }
    // eslint-disable-next-line class-methods-use-this
    cleanup() {
    }
}
exports.default = SharpImage;
_SharpImage_imageData = new WeakMap();
//# sourceMappingURL=sharp.js.map