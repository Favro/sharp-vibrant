"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const color_1 = require("../color");
const vbox_1 = __importDefault(require("./vbox"));
const pqueue_1 = __importDefault(require("./pqueue"));
const fractByPopulations = 0.75;
function splitBoxes(pq, target) {
    let lastSize = pq.size;
    while (pq.size < target) {
        const vbox = pq.pop();
        if (!vbox || vbox.count < 1) {
            break;
        }
        const [vbox1, vbox2] = vbox.split();
        pq.push(vbox1);
        if (vbox2 && vbox2.count > 0)
            pq.push(vbox2);
        // No more new boxes, converged
        if (pq.size === lastSize) {
            break;
        }
        else {
            lastSize = pq.size;
        }
    }
}
function generateSwatches(pq) {
    const swatches = [];
    while (pq.size) {
        const v = pq.pop();
        const color = v.avg;
        swatches.push(new color_1.Swatch(color, v.count));
    }
    return swatches;
}
const MMCQ = (pixels, opts) => {
    if (pixels.length === 0 || opts.colorCount < 2 || opts.colorCount > 256) {
        throw new Error('Wrong MMCQ parameters');
    }
    const vbox = vbox_1.default.build(pixels);
    const pq = new pqueue_1.default((a, b) => a.count - b.count);
    pq.push(vbox);
    // first set of colors, sorted by population
    splitBoxes(pq, fractByPopulations * opts.colorCount);
    // Re-order
    const pq2 = new pqueue_1.default((a, b) => a.count * a.volume - b.count * b.volume);
    pq2.contents = pq.contents;
    // next set - generate the median cuts using the (npix * vol) sorting.
    splitBoxes(pq2, opts.colorCount - pq2.size);
    // calculate the actual colors
    return generateSwatches(pq2);
};
exports.default = MMCQ;
//# sourceMappingURL=mmcq.js.map