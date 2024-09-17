"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.packageDep = void 0;
const packageDep = (p) => {
    // If no token provided, should use from path of dep spec object
    return { package: p, specType: 'package' };
};
exports.packageDep = packageDep;
//# sourceMappingURL=packageDep.js.map