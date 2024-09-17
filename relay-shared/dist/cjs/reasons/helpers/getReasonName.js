"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function getReasonName(reason) {
    if (reason.custom) {
        return reason.custom || 'Custom';
    }
    return (0, lodash_1.capitalize)(reason.name);
}
exports.default = getReasonName;
//# sourceMappingURL=getReasonName.js.map