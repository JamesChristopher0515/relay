"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function mongoSpreadSafe(obj) {
    if ((0, lodash_1.isObjectLike)(obj) && typeof obj.toJSON === 'function') {
        return obj.toJSON();
    }
    return obj;
}
exports.default = mongoSpreadSafe;
//# sourceMappingURL=mongoSpreadSafe.js.map