"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function idOrFromObj(objorId) {
    return typeof objorId === 'string'
        ? objorId
        : '_id' in objorId
            ? objorId._id.toString()
            : objorId.toJSON()._id;
}
exports.default = idOrFromObj;
//# sourceMappingURL=idOrFromObj.js.map