export declare function tryAssignConfig(config: {
    path: any;
    configExists: boolean;
    configPath: string;
}, appFolder: string, outObj?: {}): {};
export declare function getNodeModulesWithConfigForApp(name: string): Promise<{
    withConfig: {
        path: any;
        configExists: boolean;
        configPath: string;
    }[];
    appFolder: string;
}>;
//# sourceMappingURL=tryLoadConfig.d.ts.map