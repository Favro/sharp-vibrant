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
var _Swatch_rgb, _Swatch_population, _Swatch_hsl, _Swatch_yiq, _Swatch_hex, _Swatch_titleTextColor, _Swatch_bodyTextColor;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swatch = void 0;
const util_1 = require("./util");
class Swatch {
    static applyFilter(colors, f) {
        if (typeof f !== 'function') {
            return colors;
        }
        return [].filter.call(colors, ({ r, g, b }) => f(r, g, b, 255));
    }
    constructor(rgb, population) {
        _Swatch_rgb.set(this, void 0);
        _Swatch_population.set(this, void 0);
        _Swatch_hsl.set(this, void 0);
        _Swatch_yiq.set(this, void 0);
        _Swatch_hex.set(this, void 0);
        _Swatch_titleTextColor.set(this, void 0);
        _Swatch_bodyTextColor.set(this, void 0);
        __classPrivateFieldSet(this, _Swatch_rgb, rgb, "f");
        __classPrivateFieldSet(this, _Swatch_population, population, "f");
    }
    get r() { return __classPrivateFieldGet(this, _Swatch_rgb, "f")[0]; }
    get g() { return __classPrivateFieldGet(this, _Swatch_rgb, "f")[1]; }
    get b() { return __classPrivateFieldGet(this, _Swatch_rgb, "f")[2]; }
    get rgb() { return __classPrivateFieldGet(this, _Swatch_rgb, "f"); }
    get hsl() {
        if (!__classPrivateFieldGet(this, _Swatch_hsl, "f")) {
            __classPrivateFieldSet(this, _Swatch_hsl, (0, util_1.rgbToHsl)(...__classPrivateFieldGet(this, _Swatch_rgb, "f")), "f");
        }
        return __classPrivateFieldGet(this, _Swatch_hsl, "f");
    }
    get hex() {
        if (!__classPrivateFieldGet(this, _Swatch_hex, "f")) {
            const [r, g, b] = __classPrivateFieldGet(this, _Swatch_rgb, "f");
            __classPrivateFieldSet(this, _Swatch_hex, (0, util_1.rgbToHex)(r, g, b), "f");
        }
        return __classPrivateFieldGet(this, _Swatch_hex, "f");
    }
    get population() { return __classPrivateFieldGet(this, _Swatch_population, "f"); }
    toJSON() {
        return {
            rgb: this.rgb,
            population: this.population,
        };
    }
    getYiq() {
        if (!__classPrivateFieldGet(this, _Swatch_yiq, "f")) {
            const rgb = __classPrivateFieldGet(this, _Swatch_rgb, "f");
            __classPrivateFieldSet(this, _Swatch_yiq, (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000, "f");
        }
        return __classPrivateFieldGet(this, _Swatch_yiq, "f");
    }
    get titleTextColor() {
        if (!__classPrivateFieldGet(this, _Swatch_titleTextColor, "f")) {
            __classPrivateFieldSet(this, _Swatch_titleTextColor, this.getYiq() < 200 ? '#fff' : '#000', "f");
        }
        return __classPrivateFieldGet(this, _Swatch_titleTextColor, "f");
    }
    get bodyTextColor() {
        if (!__classPrivateFieldGet(this, _Swatch_bodyTextColor, "f")) {
            __classPrivateFieldSet(this, _Swatch_bodyTextColor, this.getYiq() < 150 ? '#fff' : '#000', "f");
        }
        return __classPrivateFieldGet(this, _Swatch_bodyTextColor, "f");
    }
}
exports.Swatch = Swatch;
_Swatch_rgb = new WeakMap(), _Swatch_population = new WeakMap(), _Swatch_hsl = new WeakMap(), _Swatch_yiq = new WeakMap(), _Swatch_hex = new WeakMap(), _Swatch_titleTextColor = new WeakMap(), _Swatch_bodyTextColor = new WeakMap();
//# sourceMappingURL=color.js.map