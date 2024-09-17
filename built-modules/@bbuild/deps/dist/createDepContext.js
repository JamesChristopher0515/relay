import { invariant } from '@bbuild/errors';
import { prettifyZodError } from '@bbuild/schema';
export const createDepContext = (middlewares, middlewaresSync) => {
    let providers = [];
    const providerMiddlewares = middlewares || [];
    const providerMiddlewaresSync = middlewaresSync || [];
    const getDeps = (deps, extra = {}, isSync) => {
        const output = {};
        const getDepFromMiddlewares = async (dep) => {
            const middlewaresToUse = isSync
                ? providerMiddlewaresSync
                : providerMiddlewares;
            for (const middleware of middlewaresToUse) {
                const result = await middleware(dep, isSync);
                if (result !== undefined) {
                    return result;
                }
            }
            return undefined;
        };
        const getDepFromStore = (key, dep, input) => {
            if (dep.specType !== 'token') {
                return undefined;
            }
            const tokenMatch = providers.find((p) => p.token === dep.token);
            const keyMatch = providers.find((p) => p.token === key);
            const match = tokenMatch ?? keyMatch;
            if (!match) {
                if (!dep.optional) {
                    throw new Error(`No provider found for token: ${dep.token} key: ${key} (type: ${dep.specType})`);
                }
            }
            else {
                if (match.provide && typeof match.provide !== 'function') {
                    return match.provide;
                }
                const token = match.token;
                return (match.provide?.({
                    [token]: input[key],
                }) ?? match.value);
            }
        };
        const canAddFromExtra = (dep, key) => {
            if (dep.private) {
                return false;
            }
            if (key in extra) {
                return true;
            }
            return false;
        };
        const processDeps = async () => {
            for (const key in deps) {
                const dep = deps[key];
                if (canAddFromExtra(dep, key)) {
                    output[key] = extra[key];
                }
                else {
                    const middlewareResult = await getDepFromMiddlewares(dep);
                    if (middlewareResult !== undefined) {
                        output[key] = isSync ? middlewareResult : await middlewareResult;
                    }
                    else {
                        output[key] = await getDepFromStore(key, dep, extra);
                    }
                }
                if (dep.specType === 'token' && 'runtimeType' in dep) {
                    // verify type
                    if (dep.runtimeType === 'zod') {
                        // Validate value against the Zod schema if specified
                        const { schema } = dep;
                        let result;
                        try {
                            result = schema.safeParse(output[key]);
                        }
                        catch (e) {
                            result = { success: false, error: e, data: undefined };
                        }
                        invariant(result.success ||
                            (dep.optional && typeof output[key] === 'undefined'), `Validation failed for key: ${key}: ${result.error
                            ? prettifyZodError(result.error, output[key])
                            : 'Unknown error'}`);
                        if (result.success) {
                            output[key] = result.data;
                        }
                        else {
                            output[key] = undefined;
                        }
                    }
                    else {
                        invariant(!!(typeof output[key] === dep.runtimeType ||
                            (typeof output[key] === 'undefined' && dep.optional)), `Type mismatch for dep ${key}: expected ${dep.runtimeType} but got ${typeof output[key]}`);
                    }
                }
            }
        };
        const processSyncDeps = () => {
            for (const key in deps) {
                const dep = deps[key];
                if (canAddFromExtra(dep, key)) {
                    output[key] = extra[key];
                    continue;
                }
                output[key] = getDepFromStore(key, dep, extra);
            }
        };
        if (isSync) {
            processSyncDeps();
            return output;
        }
        else {
            return processDeps().then(() => output);
        }
    };
    const api = {
        providers,
        provideDeps: async (deps, extra = {}) => {
            return getDeps(deps, extra, false);
        },
        provideDepsSync: (deps, extra = {}) => {
            return getDeps(deps, extra, true);
        },
        /**
         * @deprecated will move to `add2` in future, simpler API
         */
        add: (provider) => {
            providers.push(provider);
        },
        add2: (dep, provider) => {
            if (dep.specType === 'token') {
                if (typeof provider === 'function') {
                    providers.push({ token: dep.token, provide: provider });
                }
                else {
                    providers.push({ token: dep.token, value: provider });
                }
            }
            else {
                throw new Error('Unsupported dep spec type: ' + dep.specType);
            }
        },
        addMiddleware: (middleware, isSync) => {
            if (isSync) {
                providerMiddlewaresSync.push(middleware);
            }
            else {
                providerMiddlewares.push(middleware);
            }
        },
    };
    return { ...api, provide: api.provideDeps, provideSync: api.provideDepsSync };
};
// export type DepContext2<D extends Record<string, DepType>> = DepContext & {
//   resolve: <K extends keyof D>(key: K) => Promise<D[K]>
//   resolveSync: <K extends keyof D>(key: K) => D[K]
// }
const globalObject = typeof global !== 'undefined' ? global : window;
if (typeof globalObject !== 'undefined') {
    // Check  global context hasn't already been created, if so, warn
    if (globalObject.__depContext) {
        console.warn('Global dep context already exists, have you imported two different versions of deps?');
    }
    else {
        globalObject.__depContext = createDepContext();
    }
}
export const globalDepContext = globalObject.__depContext;
//# sourceMappingURL=createDepContext.js.map