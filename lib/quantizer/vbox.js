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
var _VBox_volume, _VBox_avg, _VBox_count;
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
class VBox {
    static build(pixels) {
        const hn = 1 << (3 * util_1.SIGBITS);
        const hist = new Uint32Array(hn);
        let rmax = 0;
        let rmin = Number.MAX_VALUE;
        let gmax = 0;
        let gmin = Number.MAX_VALUE;
        let bmax = 0;
        let bmin = Number.MAX_VALUE;
        let r;
        let g;
        let b;
        let a;
        const n = pixels.length / 4;
        let i = 0;
        while (i < n) {
            const offset = i * 4;
            i += 1;
            r = pixels[offset + 0];
            g = pixels[offset + 1];
            b = pixels[offset + 2];
            a = pixels[offset + 3];
            // Ignored pixels' alpha is marked as 0 in filtering stage
            if (a === 0)
                continue;
            r >>= util_1.RSHIFT;
            g >>= util_1.RSHIFT;
            b >>= util_1.RSHIFT;
            const index = (0, util_1.getColorIndex)(r, g, b);
            hist[index] += 1;
            if (r > rmax)
                rmax = r;
            if (r < rmin)
                rmin = r;
            if (g > gmax)
                gmax = g;
            if (g < gmin)
                gmin = g;
            if (b > bmax)
                bmax = b;
            if (b < bmin)
                bmin = b;
        }
        return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, hist);
    }
    constructor(r1, r2, g1, g2, b1, b2, hist) {
        _VBox_volume.set(this, -1);
        _VBox_avg.set(this, null);
        _VBox_count.set(this, -1);
        this.dimension = {
            r1, r2, g1, g2, b1, b2,
        };
        this.hist = hist;
    }
    invalidate() {
        __classPrivateFieldSet(this, _VBox_volume, -1, "f");
        __classPrivateFieldSet(this, _VBox_count, -1, "f");
        __classPrivateFieldSet(this, _VBox_avg, null, "f");
    }
    get volume() {
        if (__classPrivateFieldGet(this, _VBox_volume, "f") < 0) {
            const { r1, r2, g1, g2, b1, b2, } = this.dimension;
            __classPrivateFieldSet(this, _VBox_volume, (r2 - r1 + 1) * (g2 - g1 + 1) * (b2 - b1 + 1), "f");
        }
        return __classPrivateFieldGet(this, _VBox_volume, "f");
    }
    get count() {
        if (__classPrivateFieldGet(this, _VBox_count, "f") < 0) {
            const { hist } = this;
            const { r1, r2, g1, g2, b1, b2, } = this.dimension;
            let c = 0;
            for (let r = r1; r <= r2; r += 1) {
                for (let g = g1; g <= g2; g += 1) {
                    for (let b = b1; b <= b2; b += 1) {
                        const index = (0, util_1.getColorIndex)(r, g, b);
                        c += hist[index];
                    }
                }
            }
            __classPrivateFieldSet(this, _VBox_count, c, "f");
        }
        return __classPrivateFieldGet(this, _VBox_count, "f");
    }
    clone() {
        const { hist } = this;
        const { r1, r2, g1, g2, b1, b2, } = this.dimension;
        return new VBox(r1, r2, g1, g2, b1, b2, hist);
    }
    get avg() {
        if (!__classPrivateFieldGet(this, _VBox_avg, "f")) {
            const { hist } = this;
            const { r1, r2, g1, g2, b1, b2, } = this.dimension;
            let ntot = 0;
            const mult = 1 << (8 - util_1.SIGBITS);
            let rsum = 0;
            let gsum = 0;
            let bsum = 0;
            for (let r = r1; r <= r2; r += 1) {
                for (let g = g1; g <= g2; g += 1) {
                    for (let b = b1; b <= b2; b += 1) {
                        const index = (0, util_1.getColorIndex)(r, g, b);
                        const h = hist[index];
                        ntot += h;
                        rsum += (h * (r + 0.5) * mult);
                        gsum += (h * (g + 0.5) * mult);
                        bsum += (h * (b + 0.5) * mult);
                    }
                }
            }
            if (ntot) {
                __classPrivateFieldSet(this, _VBox_avg, [
                    ~~(rsum / ntot),
                    ~~(gsum / ntot),
                    ~~(bsum / ntot),
                ], "f");
            }
            else {
                __classPrivateFieldSet(this, _VBox_avg, [
                    ~~((mult * (r1 + r2 + 1)) / 2),
                    ~~((mult * (g1 + g2 + 1)) / 2),
                    ~~((mult * (b1 + b2 + 1)) / 2),
                ], "f");
            }
        }
        return __classPrivateFieldGet(this, _VBox_avg, "f");
    }
    contains(rgb) {
        let [r, g, b] = rgb;
        const { r1, r2, g1, g2, b1, b2, } = this.dimension;
        r >>= util_1.RSHIFT;
        g >>= util_1.RSHIFT;
        b >>= util_1.RSHIFT;
        return r >= r1 && r <= r2
            && g >= g1 && g <= g2
            && b >= b1 && b <= b2;
    }
    split() {
        const { hist } = this;
        const { r1, r2, g1, g2, b1, b2, } = this.dimension;
        const { count } = this;
        if (!count)
            return [];
        if (count === 1)
            return [this.clone()];
        const rw = r2 - r1 + 1;
        const gw = g2 - g1 + 1;
        const bw = b2 - b1 + 1;
        const maxw = Math.max(rw, gw, bw);
        let accSum = null;
        let sum = 0;
        let total = 0;
        let maxd = null;
        if (maxw === rw) {
            maxd = 'r';
            accSum = new Uint32Array(r2 + 1);
            for (let r = r1; r <= r2; r += 1) {
                sum = 0;
                for (let g = g1; g <= g2; g += 1) {
                    for (let b = b1; b <= b2; b += 1) {
                        const index = (0, util_1.getColorIndex)(r, g, b);
                        sum += hist[index];
                    }
                }
                total += sum;
                accSum[r] = total;
            }
        }
        else if (maxw === gw) {
            maxd = 'g';
            accSum = new Uint32Array(g2 + 1);
            for (let g = g1; g <= g2; g += 1) {
                sum = 0;
                for (let r = r1; r <= r2; r += 1) {
                    for (let b = b1; b <= b2; b += 1) {
                        const index = (0, util_1.getColorIndex)(r, g, b);
                        sum += hist[index];
                    }
                }
                total += sum;
                accSum[g] = total;
            }
        }
        else {
            maxd = 'b';
            accSum = new Uint32Array(b2 + 1);
            for (let b = b1; b <= b2; b += 1) {
                sum = 0;
                for (let r = r1; r <= r2; r += 1) {
                    for (let g = g1; g <= g2; g += 1) {
                        const index = (0, util_1.getColorIndex)(r, g, b);
                        sum += hist[index];
                    }
                }
                total += sum;
                accSum[b] = total;
            }
        }
        let splitPoint = -1;
        const reverseSum = new Uint32Array(accSum.length);
        for (let i = 0; i < accSum.length; i += 1) {
            const d = accSum[i];
            if (splitPoint < 0 && d > total / 2)
                splitPoint = i;
            reverseSum[i] = total - d;
        }
        return this.doCut(maxd, splitPoint, accSum, reverseSum);
    }
    doCut(d, splitPoint, accSum, reverseSum) {
        const dim1 = `${d}1`;
        const dim2 = `${d}2`;
        const d1 = this.dimension[dim1];
        let d2 = this.dimension[dim2];
        const vbox1 = this.clone();
        const vbox2 = this.clone();
        const left = splitPoint - d1;
        const right = d2 - splitPoint;
        if (left <= right) {
            d2 = Math.min(d2 - 1, ~~(splitPoint + right / 2));
            d2 = Math.max(0, d2);
        }
        else {
            d2 = Math.max(d1, ~~(splitPoint - 1 - left / 2));
            d2 = Math.min(this.dimension[dim2], d2);
        }
        while (!accSum[d2])
            d2 += 1;
        let c2 = reverseSum[d2];
        while (!c2 && accSum[d2 - 1])
            c2 = reverseSum[d2 -= 1];
        vbox1.dimension[dim2] = d2;
        vbox2.dimension[dim1] = d2 + 1;
        return [vbox1, vbox2];
    }
}
exports.default = VBox;
_VBox_volume = new WeakMap(), _VBox_avg = new WeakMap(), _VBox_count = new WeakMap();
//# sourceMappingURL=vbox.js.map