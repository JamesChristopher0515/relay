import { keyDep } from "./tokenDep";
export const zodDep = (schema, opts = {}) => {
    const dep = keyDep(opts.token, opts);
    return { ...dep, runtimeType: "zod", schema };
};
//# sourceMappingURL=zodDep.js.map