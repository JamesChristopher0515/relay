import { DepProvider, DepType, GetProvidedDeps } from './TokenDepSpec';
export type ProviderMiddleware = (dep: DepType, isSync: boolean) => any | Promise<any> | undefined;
export declare const createDepContext: (middlewares?: ProviderMiddleware[], middlewaresSync?: ProviderMiddleware[]) => {
    provide: <T extends Record<string, DepType>>(deps: T, extra?: Partial<GetProvidedDeps<T>>) => Promise<GetProvidedDeps<T>>;
    provideSync: <T_1 extends Record<string, DepType>>(deps: T_1, extra?: Partial<GetProvidedDeps<T_1>>) => GetProvidedDeps<T_1>;
    providers: DepProvider<any>[];
    provideDeps: <T extends Record<string, DepType>>(deps: T, extra?: Partial<GetProvidedDeps<T>>) => Promise<GetProvidedDeps<T>>;
    provideDepsSync: <T_1 extends Record<string, DepType>>(deps: T_1, extra?: Partial<GetProvidedDeps<T_1>>) => GetProvidedDeps<T_1>;
    /**
     * @deprecated will move to `add2` in future, simpler API
     */
    add: <T_2>(provider: DepProvider<T_2>) => void;
    add2: <T_3 extends DepType, V = import("./TokenDepSpec").GetProvidedDep<T_3>>(dep: DepType, provider: V | (() => V) | (() => Promise<V>)) => void;
    addMiddleware: (middleware: ProviderMiddleware, isSync: boolean) => void;
};
export type DepContext = {
    /**
     * @deprecated
     */
    provideDeps: ReturnType<typeof createDepContext>['provideDeps'];
    /**
     * @deprecated
     */
    provideDepsSync: ReturnType<typeof createDepContext>['provideDepsSync'];
    provide: ReturnType<typeof createDepContext>['provideDeps'];
    provideSync: ReturnType<typeof createDepContext>['provideDepsSync'];
    add: <T>(provider: DepProvider<T>) => void;
    add2: (dep: DepType, provider: any) => void;
    addMiddleware: (middleware: ProviderMiddleware, isSync: boolean) => void;
};
export declare const globalDepContext: DepContext;
//# sourceMappingURL=createDepContext.d.ts.map