import baseDep from './baseDep';
import { keyDep } from './tokenDep';
/**
 * @deprecated probably best using zodDep, very restrictive
 * @example
 * const depString = typeDep(String);
 * const depNumber = typeDep(Number);
 * const depBoolean = typeDep(Boolean);
 */
export const typeDep = (typeConstructor, opts = {}) => {
    const dep = keyDep(opts.token, opts);
    const asString = typeConstructor.name.toLowerCase();
    return baseDep({ ...dep, runtimeType: asString });
};
//# sourceMappingURL=typeDep.js.map