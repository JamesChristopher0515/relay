import { StatCollectionHelper } from './StatCollectionHelper';
export declare function getHealthTypeInfo(): {
    steps: {
        format: (stat: any) => string;
        icon: import("@fortawesome/fontawesome-common-types").IconDefinition;
    };
    distance: {
        format: (stat: any) => string;
        icon: import("@fortawesome/fontawesome-common-types").IconDefinition;
    };
    sleep: {
        format: (stat: any) => string;
        icon: import("@fortawesome/fontawesome-common-types").IconDefinition;
    };
};
declare const healthCollectionHelper: StatCollectionHelper<number, {
    value: number;
}>;
export default healthCollectionHelper;
//# sourceMappingURL=healthCollectionHelper.d.ts.map