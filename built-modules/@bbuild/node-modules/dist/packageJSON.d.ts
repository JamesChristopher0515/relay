export type RemoveUndefined<T> = T extends undefined ? never : T;
export type KeysMatching<T, substr extends string> = RemoveUndefined<{
    [K in keyof T]: K extends string ? Lowercase<K> extends `${string}${Lowercase<substr>}${string}` ? K : never : never;
}[keyof T]>;
export interface PackageJSON extends Record<string, any> {
    name: string;
    version: string;
    description?: string;
    keywords?: string[];
    homepage?: string;
    bugs?: string | {
        email?: string;
        url?: string;
    };
    workspaces?: string[];
    license?: string;
    author?: string | {
        name?: string;
        email?: string;
        url?: string;
    };
    contributors?: Array<string | {
        name?: string;
        email?: string;
        url?: string;
    }>;
    files?: string[];
    main?: string;
    types?: string;
    typings?: string;
    bin?: string | {
        [key: string]: string;
    };
    module?: string;
    index?: string;
    dependencies?: {
        [key: string]: string;
    };
    devDependencies?: {
        [key: string]: string;
    };
    peerDependencies?: {
        [key: string]: string;
    };
    optionalDependencies?: {
        [key: string]: string;
    };
    bundledDependencies?: string[];
    scripts?: {
        [key: string]: string;
    };
}
export declare function mergePackageJSON(destination: PackageJSON, source: PackageJSON): PackageJSON;
//# sourceMappingURL=packageJSON.d.ts.map