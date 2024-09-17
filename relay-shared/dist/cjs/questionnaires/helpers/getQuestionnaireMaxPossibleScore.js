"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAllQuestionnaireQuestions_1 = __importDefault(require("./getAllQuestionnaireQuestions"));
const getQuestionnaireOutputs_1 = require("./getQuestionnaireOutputs");
function getQuestionnaireMaxPossibleScore(questionnaire, evall) {
    const allQuestions = (0, getAllQuestionnaireQuestions_1.default)(questionnaire, true);
    const { scales } = questionnaire;
    const maxAnswers = allQuestions.map(q => ({
        value: scales[q.scale].elements.length - 1,
        question: q._id,
    }));
    return (0, getQuestionnaireOutputs_1.getQuestionnaireOutput)(maxAnswers, questionnaire, questionnaire.outputs[0], evall).value;
}
exports.default = getQuestionnaireMaxPossibleScore;
//# sourceMappingURL=getQuestionnaireMaxPossibleScore.js.map