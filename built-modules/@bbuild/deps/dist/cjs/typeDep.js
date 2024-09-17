"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDep = void 0;
const baseDep_1 = __importDefault(require("./baseDep"));
const tokenDep_1 = require("./tokenDep");
/**
 * @deprecated probably best using zodDep, very restrictive
 * @example
 * const depString = typeDep(String);
 * const depNumber = typeDep(Number);
 * const depBoolean = typeDep(Boolean);
 */
const typeDep = (typeConstructor, opts = {}) => {
    const dep = (0, tokenDep_1.keyDep)(opts.token, opts);
    const asString = typeConstructor.name.toLowerCase();
    return (0, baseDep_1.default)({ ...dep, runtimeType: asString });
};
exports.typeDep = typeDep;
//# sourceMappingURL=typeDep.js.map