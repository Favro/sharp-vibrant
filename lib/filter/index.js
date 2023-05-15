"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.combineFilters = exports.Default = void 0;
var default_1 = require("./default");
Object.defineProperty(exports, "Default", { enumerable: true, get: function () { return __importDefault(default_1).default; } });
function combineFilters(filters) {
    // TODO: caching
    if (!Array.isArray(filters) || filters.length === 0)
        return null;
    return (r, g, b, a) => {
        if (a === 0)
            return false;
        for (let i = 0; i < filters.length; i += 1) {
            if (!filters[i](r, g, b, a))
                return false;
        }
        return true;
    };
}
exports.combineFilters = combineFilters;
//# sourceMappingURL=index.js.map