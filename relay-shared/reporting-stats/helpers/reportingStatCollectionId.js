export default function createStatCollectionId({ collectionType, data, options, }) {
    return JSON.stringify({
        collectionType,
        data,
        options,
    });
}
export function parseStatCollectionId(statCollectionId) {
    if (typeof statCollectionId !== 'string') {
        throw new Error(`Stat collection id must be a string, got ${statCollectionId}`);
    }
    const parsed = JSON.parse(statCollectionId);
    function getHealthDataType(parsed) {
        return {
            steps: 'scalar',
            distance: 'scalar',
            sleep: 'scalar',
        }[parsed.data.health];
    }
    const dataTypeMap = {
        'how-im-feeling': 'set',
        'questionnaire-result': 'scalar',
        'check-in': 'set',
        todo: 'boolean',
        'word-cloud': 'set',
        journey: 'percent',
        health: getHealthDataType(parsed),
    };
    const { collectionType } = parsed;
    // Add additional info
    return { ...parsed, dataType: dataTypeMap[collectionType] };
}
export function statCollectionForQuestionnaireResult({ questionnaire, client, }) {
    return createStatCollectionId({
        collectionType: 'questionnaire-result',
        data: {
            questionnaire,
            client,
        },
    });
}
export function statCollectionForHowImFeeling({ client }) {
    return createStatCollectionId({
        collectionType: 'how-im-feeling',
        data: {
            client,
        },
    });
}
export function statCollectionForCheckIn({ client }) {
    return createStatCollectionId({
        collectionType: 'check-in',
        data: {
            client,
        },
    });
}
export function statCollectionForWordCloud({ client }) {
    return createStatCollectionId({
        collectionType: 'word-cloud',
        data: {
            client,
        },
    });
}
export function statCollectionForJourney({ client, journey, }) {
    return createStatCollectionId({
        collectionType: 'journey',
        data: {
            client,
            journey,
        },
    });
}
export function statCollectionForTodo({ client, todo, }) {
    return createStatCollectionId({
        collectionType: 'todo',
        data: {
            client,
            todo,
        },
    });
}
export function statCollectionForMood({ client }) {
    return createStatCollectionId({
        collectionType: 'mood',
        data: {
            client,
        },
    });
}
export function statCollectionForHealth({ client, health, }) {
    return createStatCollectionId({
        collectionType: 'health',
        data: {
            health,
            client,
        },
        manuallyGenerated: true,
    });
}
export function statCollectionForRelay({ client }) {
    return createStatCollectionId({
        collectionType: 'relay',
        data: { client },
    });
}
//# sourceMappingURL=reportingStatCollectionId.js.map