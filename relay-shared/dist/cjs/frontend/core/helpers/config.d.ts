export interface RelayFrontendConfig {
    localStorage: {
        getItem: any;
        setItem: any;
        removeItem: any;
    };
}
export default function Config(config?: RelayFrontendConfig): RelayFrontendConfig;
export declare const config: RelayFrontendConfig;
//# sourceMappingURL=config.d.ts.map