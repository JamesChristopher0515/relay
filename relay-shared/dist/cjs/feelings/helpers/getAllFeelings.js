"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeelingByName = exports.getFeelingDescription = exports.getFeelingName = exports.commaAnd = exports.getFeelingsAverage = exports.getFeelingColor = exports.getSimpleFeelings = void 0;
const lodash_1 = require("lodash");
const emotions = [
    { name: 'grateful', valence: 1 },
    { name: 'happy', valence: 1 },
    { name: 'excited', valence: 1 },
    { name: 'proud', valence: 1 },
    { name: 'energized', valence: 1 },
    { name: 'motivated', valence: 1 },
    { name: 'loving', valence: 1 },
    { name: 'content', valence: 1 },
    { name: 'relaxed', valence: 0.8 },
    { name: 'stressed', valence: 0.6 },
    { name: 'tired', valence: 0.5 },
    { name: 'not sure', valence: 0.5 },
    { name: 'down', valence: 0.4 },
    { name: 'anxious', valence: 0.4 },
    { name: 'annoyed', valence: 0.4 },
    { name: 'unmotivated', valence: 0.4 },
    { name: 'worried', valence: 0.4 },
    { name: 'angry', valence: 0.2 },
    { name: 'hopeless', valence: 0.2 },
    { name: 'exhausted', valence: 0.2 },
    { name: 'panicked', valence: 0.4 },
    { name: 'frustrated', valence: 0.4 },
    { name: 'sad', valence: 0.2 },
    { name: 'bad', valence: 0 },
    { name: 'not great', valence: 0.2 },
    { name: 'ok', valence: 0.6 },
    { name: 'good', valence: 0.8 },
    { name: 'great', valence: 1 },
];
function getSimpleFeelings() {
    return emotions.slice(-5);
}
exports.getSimpleFeelings = getSimpleFeelings;
function getFeelingColor(feeling) {
    if (feeling.valence <= 0.2) {
        return '#DEB6B6';
    }
    else if (feeling.valence <= 0.4) {
        return '#E1C7B0';
    }
    else if (feeling.valence <= 0.6) {
        return '#E4E0CA';
    }
    else if (feeling.valence <= 0.8) {
        return '#B3E1D6';
    }
    else {
        return '#AFE5BF';
    }
}
exports.getFeelingColor = getFeelingColor;
function getAllFeelings() {
    return emotions.map((emotion, index) => {
        return {
            ...emotion,
        };
    });
}
exports.default = getAllFeelings;
function getFeelingsAverage(feelings) {
    if (feelings.length === 0) {
        return {
            valence: 0,
            arousal: 0,
        };
    }
    return {
        valence: (0, lodash_1.meanBy)(feelings, 'valence'),
        arousal: (0, lodash_1.maxBy)(feelings, 'arousal'),
    };
}
exports.getFeelingsAverage = getFeelingsAverage;
const commaAnd = (strs) => {
    const exceptLast = strs.slice(0, Math.max(strs.length - 1, 1)).join(', ');
    return exceptLast + (strs.length > 1 ? ` and ${(0, lodash_1.last)(strs)}` : ``);
};
exports.commaAnd = commaAnd;
const commaAndOthers = (strs) => {
    if (strs.length > 3) {
        return strs.slice(0, 3).join(', ') + ` and ${strs.length - 3} more`;
    }
    else {
        return (0, exports.commaAnd)(strs);
    }
};
function getFeelingName(feeling) {
    return (0, lodash_1.capitalize)(feeling.name);
}
exports.getFeelingName = getFeelingName;
function getFeelingDescription(feelings, includeEmoji = true) {
    if (feelings.length === 0) {
        return 'No mood data recorded';
    }
    const { name } = feelings[0];
    const allFeelings = feelings.map(feeling => {
        const feelingObj = getFeelingByName(feeling.name);
        return {
            ...feelingObj,
        };
    });
    const uniqed = (0, lodash_1.uniqBy)(allFeelings, f => f.name);
    const differentFeelings = uniqed.length > 1;
    const howMany = differentFeelings
        ? uniqed.length - 1
        : feelings.filter(f => f.name === name).length;
    const [firstFeeling, ...rest] = uniqed;
    if (differentFeelings) {
        return 'Feeling ' + commaAndOthers(uniqed.map(f => (0, lodash_1.startCase)(f.name)));
    }
    return (`Feeling "${(0, lodash_1.startCase)(firstFeeling.name)}" ${includeEmoji ? '' : ''}`.trim() + (howMany > 1 ? ` (${howMany} in time range)` : ''));
}
exports.getFeelingDescription = getFeelingDescription;
function getFeelingByName(name) {
    const match = getAllFeelings().find(f => f.name === name);
    if (typeof window !== 'undefined') {
        // Practitioner app, allow fallback for unavailable feelings until we add support
        if (!match) {
            return getAllFeelings()[0];
        }
    }
    return match;
}
exports.getFeelingByName = getFeelingByName;
//# sourceMappingURL=getAllFeelings.js.map