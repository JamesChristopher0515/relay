"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findId = void 0;
/**
 * Compare ids in a safe way on backend and frontend, regardless
 * of whether ObjectId type or string
 */
function idEq(a, b) {
    return String(a) === String(b);
}
exports.default = idEq;
function findId(arr, id) {
    const index = arr.findIndex(d => idEq(d._id, id));
    return [arr[index], index];
}
exports.findId = findId;
//# sourceMappingURL=idEq.js.map