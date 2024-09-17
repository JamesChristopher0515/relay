"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isQuestionAQuestion = void 0;
const lodash_1 = require("lodash");
const safeMongoObj_1 = __importDefault(require("../../models/helpers/safeMongoObj"));
function getAllQuestionnaireQuestions(questionnaire, questionsOnly = false) {
    return (0, lodash_1.flattenDeep)(questionnaire.sections.map((s, sectionIndex) => s.questions.map((q) => {
        return {
            // Fix for when used when mongo docs on backend
            ...(0, safeMongoObj_1.default)(q),
            sectionIndex,
        };
    }))).filter((q) => {
        return !questionsOnly || isQuestionAQuestion(q);
    });
}
exports.default = getAllQuestionnaireQuestions;
function isQuestionAQuestion(question) {
    return question.type.startsWith('question');
}
exports.isQuestionAQuestion = isQuestionAQuestion;
//# sourceMappingURL=getAllQuestionnaireQuestions.js.map