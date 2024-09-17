import { WrappedAxios } from '../hooks/useWrappedAxiosShared';
export declare const wrappedAxiosDep: import("@bbuild/deps/TokenDepSpec").TokenDepSpec<string, WrappedAxios, boolean> & {
    __baseDep: boolean;
};
export declare const asyncLocalStorageDep: import("@bbuild/deps/TokenDepSpec").TokenDepSpec<string, {
    getItem: (key: string) => Promise<string | null>;
    setItem: (key: string, value: string) => Promise<void>;
}, boolean> & {
    __baseDep: boolean;
};
export declare const LinkingDep: import("@bbuild/deps/TokenDepSpec").TokenDepSpec<string, {
    openURL: (url: string) => void;
}, boolean> & {
    __baseDep: boolean;
};
//# sourceMappingURL=clientAppDeps.d.ts.map