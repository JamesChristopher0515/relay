/// <reference types="react" />
export default function useRContext(): {
    practitioner?: import("../../RelayTypes").Practitioner | undefined;
    client?: import("../../RelayTypes").Client | undefined;
    platformComponents: {
        loading: import("react").ComponentType<any>;
        FeelingIcon: import("react").ComponentType<any>;
        Button: import("react").ComponentType<{
            label: string;
            action: any;
            secondary?: boolean | undefined;
        }>;
        Input: import("react").ComponentType<{}>;
        IconButton: import("react").ComponentType<{}>;
        Spinner: import("react").ComponentType<{}>;
    };
    platformHooks: {
        useClient: () => [import("../../RelayTypes").Client, any];
        useWrappedAxios: () => any;
    };
    sharedActions: Record<string, any>;
};
export declare function useSharedActions(): Record<string, any>;
//# sourceMappingURL=useRContext.d.ts.map