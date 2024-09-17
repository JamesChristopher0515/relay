"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDep = void 0;
function baseDep(dep) {
    return { ...dep, __baseDep: true };
}
exports.default = baseDep;
function isDep(dep) {
    return typeof dep === 'object' && !!dep && dep.__baseDep === true;
}
exports.isDep = isDep;
//# sourceMappingURL=baseDep.js.map