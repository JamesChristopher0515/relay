declare const statCollectionHelpers: {
    mood: import("./StatCollectionHelper").StatCollectionHelper<number, {
        feelings: import("../../../feelings/helpers/getAllFeelings").FeelingSelection[];
        checkIns: string[];
        arousal: number;
    }>;
    'questionnaire-result': import("./StatCollectionHelper").StatCollectionHelper<number, {
        questionnaireResult: string;
    }>;
    journey: import("./StatCollectionHelper").StatCollectionHelper<number, {
        clientMilestoneStop: string;
    }>;
    health: import("./StatCollectionHelper").StatCollectionHelper<number, {
        value: number;
    }>;
};
export declare function getStatCollectionHelper(collectionType: keyof typeof statCollectionHelpers): typeof statCollectionHelpers[typeof collectionType];
export default statCollectionHelpers;
//# sourceMappingURL=statCollectionHelpers.d.ts.map