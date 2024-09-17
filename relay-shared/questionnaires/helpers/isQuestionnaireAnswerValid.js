import getAllQuestionnaireQuestions from './getAllQuestionnaireQuestions';
export default function isQuestionnaireAnswerValid(questionnaire, questionId, value) {
    const allQs = getAllQuestionnaireQuestions(questionnaire, true);
    const questionData = allQs.find((q) => q._id.toString() === questionId);
    const scaleForQ = questionnaire.scales[questionData.scale];
    return !!scaleForQ.elements[value];
}
//# sourceMappingURL=isQuestionnaireAnswerValid.js.map