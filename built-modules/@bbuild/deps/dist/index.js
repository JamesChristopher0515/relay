import { mapValues } from '@bbuild/dash';
import { profileAsync } from '@bbuild/profile';
import { isDep } from './baseDep';
import { createDepContext, globalDepContext } from './createDepContext';
import { actorIDep, interfaceDep, machineDep } from './interfaceDep';
import { packageDep } from './packageDep';
import { serverOnly } from './private';
import { provideDeps, provideDepsSync } from './provideDeps';
import { keyDep } from './tokenDep';
import { typeDep } from './typeDep';
import { zodDep } from './zodDep';
const getFnName = (fn) => {
    return fn.name || fn.toString().match(/function\s*([^(]*)\(/)?.[1] || 'unknown';
};
export function depFn(deps, fn) {
    const __skipstack__depFn = async function __skipstack__depFn(input, opts = {
        ctx: globalDepContext,
    }) {
        try {
            const wrapped = profileAsync(fn);
            const ctx = opts?.ctx ?? globalDepContext;
            const provided = await provideDeps(deps, input, ctx);
            const result = await wrapped.call(this, provided);
            return result;
        }
        catch (e) {
            console.log(`Error in depFn for ${fn.name}`, e);
            throw e;
        }
    };
    __skipstack__depFn.deps = deps;
    __skipstack__depFn.isDepFn = true;
    __skipstack__depFn._name = getFnName(fn);
    // fnn.name = fn.name
    return __skipstack__depFn;
}
export function getAsyncContext() {
    return null;
}
export function depMap(map) {
    const configure = (providers, ctx = globalDepContext) => {
        const toProvide = mapValues(providers, (p, key) => {
            if (isDep(p)) {
                return p;
            }
            return { provide: p, token: key };
        });
        for (const key in toProvide) {
            ctx.add(toProvide[key]);
        }
    };
    return new Proxy({ ...map, configure }, {
        get: function (target, prop, receiver) {
            if (prop === 'configure') {
                return configure;
            }
            if (typeof target[prop] === 'object' && target[prop] !== null) {
                return new Proxy(target[prop], {
                    get: function (innerTarget, innerProp, innerReceiver) {
                        if (innerProp === 'get') {
                            return async function () {
                                return (await provideDeps({
                                    [prop]: innerTarget,
                                }, {}, globalDepContext))[prop];
                            };
                        }
                        if (innerProp === 'getSync') {
                            return function () {
                                return provideDepsSync({
                                    [prop]: innerTarget,
                                }, {}, globalDepContext)[prop];
                            };
                        }
                        return Reflect.get(innerTarget, innerProp, innerReceiver);
                    },
                });
            }
            return Reflect.get(target, prop, receiver);
        },
    });
}
export { actorIDep, createDepContext, globalDepContext, interfaceDep, keyDep as keyArg, keyDep, machineDep, packageDep, provideDeps, provideDepsSync, serverOnly, typeDep as typeArg, typeDep, zodDep, };
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["deps"]) {
    console.warn(`Duplicate module deps imported. This can lead to bugs.`);
}
globalStore["deps"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map