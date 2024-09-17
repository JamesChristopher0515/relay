"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatCollectionHelper = void 0;
const journeyCollectionHelper_1 = __importDefault(require("./journeyCollectionHelper"));
const moodCollectionHelper_1 = __importDefault(require("./moodCollectionHelper"));
const questionnaireResultCollectionHelper_1 = __importDefault(require("./questionnaireResultCollectionHelper"));
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const healthCollectionHelper_1 = __importDefault(require("./healthCollectionHelper"));
const statCollectionHelpers = {
    mood: moodCollectionHelper_1.default,
    'questionnaire-result': questionnaireResultCollectionHelper_1.default,
    journey: journeyCollectionHelper_1.default,
    health: healthCollectionHelper_1.default,
};
function getStatCollectionHelper(collectionType) {
    const helper = statCollectionHelpers[collectionType];
    (0, tiny_invariant_1.default)(helper, `getStatCollectionHelper: no helper for collection type ${collectionType}`);
    return helper;
}
exports.getStatCollectionHelper = getStatCollectionHelper;
exports.default = statCollectionHelpers;
//# sourceMappingURL=statCollectionHelpers.js.map