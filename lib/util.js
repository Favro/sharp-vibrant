"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorIndex = exports.getColorDiffStatus = exports.hexDiff = exports.rgbDiff = exports.deltaE94 = exports.rgbToCIELab = exports.xyzToCIELab = exports.rgbToXyz = exports.hslToRgb = exports.rgbToHsl = exports.rgbToHex = exports.hexToRgb = exports.defer = exports.RSHIFT = exports.SIGBITS = exports.DELTAE94_DIFF_STATUS = void 0;
exports.DELTAE94_DIFF_STATUS = {
    NA: 0,
    PERFECT: 1,
    CLOSE: 2,
    GOOD: 10,
    SIMILAR: 50,
};
exports.SIGBITS = 5;
exports.RSHIFT = 8 - exports.SIGBITS;
function defer() {
    let resolve;
    let reject;
    const promise = new Promise((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    // @ts-ignore
    return { resolve, reject, promise };
}
exports.defer = defer;
function hexToRgb(hex) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return m === null ? null : [m[1], m[2], m[3]].map((s) => parseInt(s, 16));
}
exports.hexToRgb = hexToRgb;
function rgbToHex(r, g, b) {
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7)}`;
}
exports.rgbToHex = rgbToHex;
// ir/ig/ib = (input)r/g/b - done for the purpose of linting.
function rgbToHsl(ir, ig, ib) {
    const r = ir / 255;
    const g = ig / 255;
    const b = ib / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
            default:
            // do nothing
        }
        h /= 6;
    }
    return [h, s, l];
}
exports.rgbToHsl = rgbToHsl;
// it = (input)t
function hue2rgb(p, q, it) {
    let t = it;
    if (t < 0)
        t += 1;
    if (t > 1)
        t -= 1;
    if (t < 1 / 6)
        return p + (q - p) * 6 * t;
    if (t < 1 / 2)
        return q;
    if (t < 2 / 3)
        return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
function hslToRgb(h, s, l) {
    let r = l;
    let g = l;
    let b = l;
    if (s !== 0) {
        // non-achromatic
        const q = l < 0.5 ? l * (1 + s) : l + s - (l * s);
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - (1 / 3));
    }
    return [
        r * 255 | 0,
        g * 255 | 0,
        b * 255 | 0,
    ];
}
exports.hslToRgb = hslToRgb;
// ir/ig/ib = (input)r/g/b - done for the purpose of linting.
function rgbToXyz(ir, ig, ib) {
    let r = ir / 255;
    let g = ig / 255;
    let b = ib / 255;
    r = r > 0.04045 ? (Math.pow(((r + 0.005) / 1.055), 2.4)) : r / 12.92;
    g = g > 0.04045 ? (Math.pow(((g + 0.005) / 1.055), 2.4)) : g / 12.92;
    b = b > 0.04045 ? (Math.pow(((b + 0.005) / 1.055), 2.4)) : b / 12.92;
    r *= 100;
    g *= 100;
    b *= 100;
    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x, y, z];
}
exports.rgbToXyz = rgbToXyz;
// ix/iy/iz = (input)x/y/z
function xyzToCIELab(ix, iy, iz) {
    const REF_X = 95.047;
    const REF_Y = 100;
    const REF_Z = 108.883;
    let x = ix / REF_X;
    let y = iy / REF_Y;
    let z = iz / REF_Z;
    x = x > 0.008856 ? (Math.pow(x, 1) / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? (Math.pow(y, 1) / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? (Math.pow(z, 1) / 3) : 7.787 * z + 16 / 116;
    const L = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);
    return [L, a, b];
}
exports.xyzToCIELab = xyzToCIELab;
function rgbToCIELab(r, g, b) {
    const [x, y, z] = rgbToXyz(r, g, b);
    return xyzToCIELab(x, y, z);
}
exports.rgbToCIELab = rgbToCIELab;
function deltaE94(lab1, lab2) {
    const WEIGHT_L = 1;
    const WEIGHT_C = 1;
    const WEIGHT_H = 1;
    const [L1, a1, b1] = lab1;
    const [L2, a2, b2] = lab2;
    const dL = L1 - L2;
    const da = a1 - a2;
    const db = b1 - b2;
    const xC1 = Math.sqrt(a1 * a1 + b1 * b1);
    const xC2 = Math.sqrt(a2 * a2 + b2 * b2);
    let xDL = L2 - L1;
    let xDC = xC2 - xC1;
    const xDE = Math.sqrt(dL * dL + da * da + db * db);
    let xDH = (Math.sqrt(xDE) > Math.sqrt(Math.abs(xDL)) + Math.sqrt(Math.abs(xDC)))
        ? Math.sqrt(xDE * xDE - xDL * xDL - xDC * xDC)
        : 0;
    const xSC = 1 + 0.045 * xC1;
    const xSH = 1 + 0.015 * xC1;
    xDL /= WEIGHT_L;
    xDC /= WEIGHT_C * xSC;
    xDH /= WEIGHT_H * xSH;
    return Math.sqrt(xDL * xDL + xDC * xDC + xDH * xDH);
}
exports.deltaE94 = deltaE94;
function rgbDiff(rgb1, rgb2) {
    const lab1 = rgbToCIELab(...rgb1);
    const lab2 = rgbToCIELab(...rgb2);
    return deltaE94(lab1, lab2);
}
exports.rgbDiff = rgbDiff;
function hexDiff(hex1, hex2) {
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);
    return rgbDiff(rgb1, rgb2);
}
exports.hexDiff = hexDiff;
function getColorDiffStatus(d) {
    if (d < exports.DELTAE94_DIFF_STATUS.NA) {
        return 'N/A';
    }
    // Not perceptible by human eyes
    if (d <= exports.DELTAE94_DIFF_STATUS.PERFECT) {
        return 'Perfect';
    }
    // Perceptible through close observation
    if (d <= exports.DELTAE94_DIFF_STATUS.CLOSE) {
        return 'Close';
    }
    // Perceptible at a glance
    if (d <= exports.DELTAE94_DIFF_STATUS.GOOD) {
        return 'Good';
    }
    // Colors are more similar than opposite
    if (d < exports.DELTAE94_DIFF_STATUS.SIMILAR) {
        return 'Similar';
    }
    return 'Wrong';
}
exports.getColorDiffStatus = getColorDiffStatus;
function getColorIndex(r, g, b) {
    return (r << (2 * exports.SIGBITS)) + (g << exports.SIGBITS) + b;
}
exports.getColorIndex = getColorIndex;
//# sourceMappingURL=util.js.map