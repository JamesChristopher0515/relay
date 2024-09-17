"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnaireEditability = void 0;
var QuestionnaireEditability;
(function (QuestionnaireEditability) {
    QuestionnaireEditability[QuestionnaireEditability["None"] = 0] = "None";
    QuestionnaireEditability[QuestionnaireEditability["NamesOnly"] = 1] = "NamesOnly";
    QuestionnaireEditability[QuestionnaireEditability["All"] = 2] = "All";
})(QuestionnaireEditability = exports.QuestionnaireEditability || (exports.QuestionnaireEditability = {}));
function getQuestionnaireEditability(questionnaire, editingUser) {
    if (typeof questionnaire.practice === 'string' &&
        editingUser.practice !== questionnaire.practice) {
        return QuestionnaireEditability.None;
    }
    if (questionnaire.hasResult) {
        return QuestionnaireEditability.NamesOnly;
    }
    else {
        return QuestionnaireEditability.All;
    }
}
exports.default = getQuestionnaireEditability;
//# sourceMappingURL=getQuestionnaireEditability.js.map