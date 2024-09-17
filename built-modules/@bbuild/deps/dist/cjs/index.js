"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodDep = exports.typeDep = exports.typeArg = exports.serverOnly = exports.provideDepsSync = exports.provideDeps = exports.packageDep = exports.machineDep = exports.keyDep = exports.keyArg = exports.interfaceDep = exports.globalDepContext = exports.createDepContext = exports.actorIDep = exports.depMap = exports.getAsyncContext = exports.depFn = void 0;
const dash_1 = require('@bbuild/dash');
const profile_1 = require('@bbuild/profile');
const baseDep_1 = require("./baseDep");
const createDepContext_1 = require("./createDepContext");
Object.defineProperty(exports, "createDepContext", { enumerable: true, get: function () { return createDepContext_1.createDepContext; } });
Object.defineProperty(exports, "globalDepContext", { enumerable: true, get: function () { return createDepContext_1.globalDepContext; } });
const interfaceDep_1 = require("./interfaceDep");
Object.defineProperty(exports, "actorIDep", { enumerable: true, get: function () { return interfaceDep_1.actorIDep; } });
Object.defineProperty(exports, "interfaceDep", { enumerable: true, get: function () { return interfaceDep_1.interfaceDep; } });
Object.defineProperty(exports, "machineDep", { enumerable: true, get: function () { return interfaceDep_1.machineDep; } });
const packageDep_1 = require("./packageDep");
Object.defineProperty(exports, "packageDep", { enumerable: true, get: function () { return packageDep_1.packageDep; } });
const private_1 = require("./private");
Object.defineProperty(exports, "serverOnly", { enumerable: true, get: function () { return private_1.serverOnly; } });
const provideDeps_1 = require("./provideDeps");
Object.defineProperty(exports, "provideDeps", { enumerable: true, get: function () { return provideDeps_1.provideDeps; } });
Object.defineProperty(exports, "provideDepsSync", { enumerable: true, get: function () { return provideDeps_1.provideDepsSync; } });
const tokenDep_1 = require("./tokenDep");
Object.defineProperty(exports, "keyArg", { enumerable: true, get: function () { return tokenDep_1.keyDep; } });
Object.defineProperty(exports, "keyDep", { enumerable: true, get: function () { return tokenDep_1.keyDep; } });
const typeDep_1 = require("./typeDep");
Object.defineProperty(exports, "typeArg", { enumerable: true, get: function () { return typeDep_1.typeDep; } });
Object.defineProperty(exports, "typeDep", { enumerable: true, get: function () { return typeDep_1.typeDep; } });
const zodDep_1 = require("./zodDep");
Object.defineProperty(exports, "zodDep", { enumerable: true, get: function () { return zodDep_1.zodDep; } });
const getFnName = (fn) => {
    return fn.name || fn.toString().match(/function\s*([^(]*)\(/)?.[1] || 'unknown';
};
function depFn(deps, fn) {
    const __skipstack__depFn = async function __skipstack__depFn(input, opts = {
        ctx: createDepContext_1.globalDepContext,
    }) {
        try {
            const wrapped = (0, profile_1.profileAsync)(fn);
            const ctx = opts?.ctx ?? createDepContext_1.globalDepContext;
            const provided = await (0, provideDeps_1.provideDeps)(deps, input, ctx);
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
exports.depFn = depFn;
function getAsyncContext() {
    return null;
}
exports.getAsyncContext = getAsyncContext;
function depMap(map) {
    const configure = (providers, ctx = createDepContext_1.globalDepContext) => {
        const toProvide = (0, dash_1.mapValues)(providers, (p, key) => {
            if ((0, baseDep_1.isDep)(p)) {
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
                                return (await (0, provideDeps_1.provideDeps)({
                                    [prop]: innerTarget,
                                }, {}, createDepContext_1.globalDepContext))[prop];
                            };
                        }
                        if (innerProp === 'getSync') {
                            return function () {
                                return (0, provideDeps_1.provideDepsSync)({
                                    [prop]: innerTarget,
                                }, {}, createDepContext_1.globalDepContext)[prop];
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
exports.depMap = depMap;
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