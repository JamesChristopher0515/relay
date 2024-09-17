"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodDep = void 0;
const tokenDep_1 = require("./tokenDep");
const zodDep = (schema, opts = {}) => {
    const dep = (0, tokenDep_1.keyDep)(opts.token, opts);
    return { ...dep, runtimeType: "zod", schema };
};
exports.zodDep = zodDep;
//# sourceMappingURL=zodDep.js.map