"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const assert_1 = __importDefault(require("../../core/helpers/assert"));
const idEq_1 = __importDefault(require("../../models/helpers/idEq"));
const getAllQuestionnaireQuestions_1 = __importDefault(require("./getAllQuestionnaireQuestions"));
function calculateMotivationScore(questionnaire, answers) {
    const allQuestions = (0, getAllQuestionnaireQuestions_1.default)(questionnaire, true);
    const statements = (0, lodash_1.uniq)(allQuestions.map((q) => q.id.replace(/_(happiness|importance)/, '')));
    return statements.reduce((accum, statement) => {
        const happinessId = statement + '_happiness';
        const importanceId = statement + '_importance';
        const happinessQuestion = allQuestions.find((q) => q.id === happinessId);
        const importanceQuestion = allQuestions.find((q) => q.id === importanceId);
        const happinessAnswer = answers.find((answer) => (0, idEq_1.default)(answer.question, happinessQuestion._id));
        const importanceAnswer = answers.find((answer) => (0, idEq_1.default)(answer.question, importanceQuestion._id));
        (0, assert_1.default)(!!importanceAnswer && !!happinessAnswer, `Couldn't find answers for ${statement} in motivation questionnaire`);
        const happinessScale = questionnaire.scales[happinessQuestion.scale].elements;
        const importanceScale = questionnaire.scales[importanceQuestion.scale].elements;
        const thisScore = (0, lodash_1.last)(happinessScale).value;
        if (importanceAnswer.value === 0) {
            // Not important, so actual score has no bearing, return full score
            return accum + thisScore;
        }
        // Score starts on max (3) and decreases as importance increases, if score is less than "Good"
        const negate = (0, lodash_1.maxBy)(happinessScale, 'value').value -
            happinessScale[happinessAnswer.value].value;
        return (accum +
            (thisScore - negate * importanceScale[importanceAnswer.value].value));
    }, 0);
}
exports.default = calculateMotivationScore;
//# sourceMappingURL=calculateMotivationScore.js.map