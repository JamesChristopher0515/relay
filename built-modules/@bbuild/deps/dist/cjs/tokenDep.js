"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyArg = exports.privateDep = exports.keyDep = void 0;
const baseDep_1 = __importDefault(require("./baseDep"));
const keyDep = (token, opts = {}) => {
    // If no token provided, should use from path of dep spec object
    return (0, baseDep_1.default)({
        token,
        specType: 'token',
        optional: opts?.optional,
    });
};
exports.keyDep = keyDep;
// AI: These generic args need to be kept in sync with above
// to keep typescript happy
const privateDep = (token, opts = {}) => {
    return {
        ...(0, exports.keyDep)(token, opts),
        private: true,
    };
};
exports.privateDep = privateDep;
exports.keyArg = exports.keyDep;
//# sourceMappingURL=tokenDep.js.map