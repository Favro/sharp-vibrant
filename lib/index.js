"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const vibrant_1 = __importDefault(require("./vibrant"));
const sharp_1 = __importDefault(require("./image/sharp"));
vibrant_1.default.DefaultOpts.ImageClass = sharp_1.default;
module.exports = vibrant_1.default;
//# sourceMappingURL=index.js.map