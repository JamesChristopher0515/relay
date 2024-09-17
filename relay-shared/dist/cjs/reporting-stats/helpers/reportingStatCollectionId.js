"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statCollectionForRelay = exports.statCollectionForHealth = exports.statCollectionForMood = exports.statCollectionForTodo = exports.statCollectionForJourney = exports.statCollectionForWordCloud = exports.statCollectionForCheckIn = exports.statCollectionForHowImFeeling = exports.statCollectionForQuestionnaireResult = exports.parseStatCollectionId = void 0;
function createStatCollectionId({ collectionType, data, options, }) {
    return JSON.stringify({
        collectionType,
        data,
        options,
    });
}
exports.default = createStatCollectionId;
function parseStatCollectionId(statCollectionId) {
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
exports.parseStatCollectionId = parseStatCollectionId;
function statCollectionForQuestionnaireResult({ questionnaire, client, }) {
    return createStatCollectionId({
        collectionType: 'questionnaire-result',
        data: {
            questionnaire,
            client,
        },
    });
}
exports.statCollectionForQuestionnaireResult = statCollectionForQuestionnaireResult;
function statCollectionForHowImFeeling({ client }) {
    return createStatCollectionId({
        collectionType: 'how-im-feeling',
        data: {
            client,
        },
    });
}
exports.statCollectionForHowImFeeling = statCollectionForHowImFeeling;
function statCollectionForCheckIn({ client }) {
    return createStatCollectionId({
        collectionType: 'check-in',
        data: {
            client,
        },
    });
}
exports.statCollectionForCheckIn = statCollectionForCheckIn;
function statCollectionForWordCloud({ client }) {
    return createStatCollectionId({
        collectionType: 'word-cloud',
        data: {
            client,
        },
    });
}
exports.statCollectionForWordCloud = statCollectionForWordCloud;
function statCollectionForJourney({ client, journey, }) {
    return createStatCollectionId({
        collectionType: 'journey',
        data: {
            client,
            journey,
        },
    });
}
exports.statCollectionForJourney = statCollectionForJourney;
function statCollectionForTodo({ client, todo, }) {
    return createStatCollectionId({
        collectionType: 'todo',
        data: {
            client,
            todo,
        },
    });
}
exports.statCollectionForTodo = statCollectionForTodo;
function statCollectionForMood({ client }) {
    return createStatCollectionId({
        collectionType: 'mood',
        data: {
            client,
        },
    });
}
exports.statCollectionForMood = statCollectionForMood;
function statCollectionForHealth({ client, health, }) {
    return createStatCollectionId({
        collectionType: 'health',
        data: {
            health,
            client,
        },
        manuallyGenerated: true,
    });
}
exports.statCollectionForHealth = statCollectionForHealth;
function statCollectionForRelay({ client }) {
    return createStatCollectionId({
        collectionType: 'relay',
        data: { client },
    });
}
exports.statCollectionForRelay = statCollectionForRelay;
//# sourceMappingURL=reportingStatCollectionId.js.map