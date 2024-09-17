"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Compare ids in a safe way on backend and frontend, regardless
 * of whether ObjectId type or string
 */
function idCompare(a, b) {
    return a.toString() === b.toString();
}
exports.default = idCompare;
//# sourceMappingURL=idCompare.js.map