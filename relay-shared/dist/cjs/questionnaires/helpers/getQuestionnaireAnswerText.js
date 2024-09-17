"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assertDefined_1 = __importDefault(require("@mtyk/frontend/core/helpers/assertDefined"));
function getQuestionnaireAnswerText(questionnaire, question, answer) {
    (0, assertDefined_1.default)(questionnaire, 'questionnaire is required');
    (0, assertDefined_1.default)(question, 'question is required');
    (0, assertDefined_1.default)(typeof answer === 'number', 'answer is required');
    return (question.answers[answer] ??
        questionnaire.scales[question.scale].elements[answer].name);
}
exports.default = getQuestionnaireAnswerText;
//# sourceMappingURL=getQuestionnaireAnswerText.js.map