export var QuestionnaireEditability;
(function (QuestionnaireEditability) {
    QuestionnaireEditability[QuestionnaireEditability["None"] = 0] = "None";
    QuestionnaireEditability[QuestionnaireEditability["NamesOnly"] = 1] = "NamesOnly";
    QuestionnaireEditability[QuestionnaireEditability["All"] = 2] = "All";
})(QuestionnaireEditability || (QuestionnaireEditability = {}));
export default function getQuestionnaireEditability(questionnaire, editingUser) {
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
//# sourceMappingURL=getQuestionnaireEditability.js.map