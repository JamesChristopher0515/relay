"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getAllQuestionnaireQuestions_1 = __importDefault(require("./getAllQuestionnaireQuestions"));
function isQuestionnaireAnswerValid(questionnaire, questionId, value) {
    const allQs = (0, getAllQuestionnaireQuestions_1.default)(questionnaire, true);
    const questionData = allQs.find((q) => q._id.toString() === questionId);
    const scaleForQ = questionnaire.scales[questionData.scale];
    return !!scaleForQ.elements[value];
}
exports.default = isQuestionnaireAnswerValid;
//# sourceMappingURL=isQuestionnaireAnswerValid.js.map