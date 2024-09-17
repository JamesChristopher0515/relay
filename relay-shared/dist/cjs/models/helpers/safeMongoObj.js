"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Using mongo documents objects in certain cases on backend (e.g. spreading
 * values) can have unexpected results. This turns mongo objects into standard
 * ones if necessary on backend
 */
function safeMongoObj(obj) {
    if (obj && typeof obj === 'object' && typeof obj.toJSON === 'function') {
        return obj.toJSON();
    }
    return obj;
}
exports.default = safeMongoObj;
//# sourceMappingURL=safeMongoObj.js.map