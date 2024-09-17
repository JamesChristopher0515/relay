export type NodeModuleFile = {
    contents: string;
};
export interface MakeCJSNodeModuleConfig {
    module: {
        name: string;
        exports: {
            [path: string]: NodeModuleFile;
        };
        version: string;
    };
    /**
     * workspace = node_modules folder in the root of the workspace
     * path = path to a specific folder to output files in
     */
    saveTo: {
        path: string;
    } | 'workspace';
}
export declare function makeCJSNodeModule(config: MakeCJSNodeModuleConfig): Promise<void>;
//# sourceMappingURL=index.d.ts.map