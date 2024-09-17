import { PromisifyIfNotPromise } from '@bbuild/types';
import { DepType, GetProvidedDeps, TokenDepSpec } from './TokenDepSpec';
import { DepContext, createDepContext, globalDepContext } from './createDepContext';
import { actorIDep, interfaceDep, machineDep } from './interfaceDep';
import { PackageType, packageDep } from './packageDep';
import { serverOnly } from './private';
import { provideDeps, provideDepsSync } from './provideDeps';
import { keyDep } from './tokenDep';
import { typeDep } from './typeDep';
import { zodDep } from './zodDep';
export type DepFnOpts = {
    ctx?: DepContext;
};
export type DepFn<T = any> = T & {
    __depFn: true;
};
export declare function depFn<T extends Record<string, DepType>, F extends (opts: GetProvidedDeps<T>) => Promise<any> | any>(deps: T, fn: F): (deps: Partial<GetProvidedDeps<T>>, opts?: DepFnOpts) => DepFn<PromisifyIfNotPromise<ReturnType<F>>>;
export declare function getAsyncContext(): any;
export declare function depMap<T extends Record<string, DepType>>(map: T): { [K in keyof T]: T[K] & {
    get: () => Promise<GetProvidedDeps<T>[K]>;
    getSync: () => GetProvidedDeps<T>[K];
}; } & {
    configure: (providers: { [K_1 in keyof T]: T[K_1] extends TokenDepSpec<any, infer V, any> ? V | {
        provide: () => Promise<V> | (() => V);
    } : never; }, ctx?: DepContext) => void;
};
export { DepType, PackageType, actorIDep, createDepContext, globalDepContext, interfaceDep, keyDep as keyArg, keyDep, machineDep, packageDep, provideDeps, provideDepsSync, serverOnly, typeDep as typeArg, typeDep, zodDep, };
//# sourceMappingURL=index.d.ts.map