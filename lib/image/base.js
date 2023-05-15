"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ImageBase {
    applyFilter(filter) {
        const { imageData } = this;
        if (typeof filter === 'function') {
            const pixels = imageData.data;
            const n = pixels.length / 4;
            let offset;
            let r;
            let g;
            let b;
            let a;
            for (let i = 0; i < n; i += 1) {
                offset = i * 4;
                r = pixels[offset + 0];
                g = pixels[offset + 1];
                b = pixels[offset + 2];
                a = pixels[offset + 3];
                // Mark ignored color
                if (!filter(r, g, b, a))
                    pixels[offset + 3] = 0;
            }
        }
        return Promise.resolve(imageData);
    }
}
exports.default = ImageBase;
//# sourceMappingURL=base.js.map