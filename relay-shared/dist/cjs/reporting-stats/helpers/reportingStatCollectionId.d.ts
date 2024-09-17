import { CollectionDataTypes } from '../../RelaySchema';
export type StatCollectionId = string;
export type CollectionType = 'how-im-feeling' | 'questionnaire-result' | 'check-in' | 'todo' | 'word-cloud' | 'journey' | 'relay';
export default function createStatCollectionId({ collectionType, data, options, }: {
    /** Basically the same as the widget types for simplicity, but not necessarily associated */
    collectionType: CollectionType;
    data: object;
    options?: {
        manuallyGenerated?: boolean;
    };
}): StatCollectionId;
export declare function parseStatCollectionId(statCollectionId: string): {
    collectionType: string;
    data: any;
    dataType: CollectionDataTypes;
};
export declare function statCollectionForQuestionnaireResult({ questionnaire, client, }: {
    questionnaire: string;
    client: string;
}): string;
export declare function statCollectionForHowImFeeling({ client }: {
    client: string;
}): string;
export declare function statCollectionForCheckIn({ client }: {
    client: string;
}): string;
export declare function statCollectionForWordCloud({ client }: {
    client: string;
}): string;
export declare function statCollectionForJourney({ client, journey, }: {
    client: string;
    journey: string;
}): string;
export declare function statCollectionForTodo({ client, todo, }: {
    client: string;
    todo: string;
}): string;
export declare function statCollectionForMood({ client }: {
    client: string;
}): string;
export declare function statCollectionForHealth({ client, health, }: {
    client: string;
    health: string;
}): string;
export declare function statCollectionForRelay({ client }: {
    client: string;
}): string;
//# sourceMappingURL=reportingStatCollectionId.d.ts.map