"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const idEq_1 = __importDefault(require("../../models/helpers/idEq"));
const getAllQuestionnaireQuestions_1 = __importDefault(require("./getAllQuestionnaireQuestions"));
function getQuestionInfo(questionnaire, questionId) {
    const allQuestions = (0, getAllQuestionnaireQuestions_1.default)(questionnaire);
    const question = allQuestions.find((q) => (0, idEq_1.default)(q._id, questionId));
    const scale = questionnaire.scales[question.scale];
    return {
        scale,
        question,
    };
}
exports.default = getQuestionInfo;
//# sourceMappingURL=getQuestionInfo.js.map