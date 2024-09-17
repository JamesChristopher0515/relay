"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getQuestionnaireAnswerText_1 = __importDefault(require("./getQuestionnaireAnswerText"));
function mapQuestionAnswers(questionnaire, question) {
    const scale = questionnaire.scales[question.scale];
    return scale.elements.map((element, i) => {
        return {
            scale,
            ...element,
            text: (0, getQuestionnaireAnswerText_1.default)(questionnaire, question, i),
        };
    });
}
exports.default = mapQuestionAnswers;
//# sourceMappingURL=mapQuestionAnswers.js.map