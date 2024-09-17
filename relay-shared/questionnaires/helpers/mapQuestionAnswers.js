import getQuestionnaireAnswerText from './getQuestionnaireAnswerText';
export default function mapQuestionAnswers(questionnaire, question) {
    const scale = questionnaire.scales[question.scale];
    return scale.elements.map((element, i) => {
        return {
            scale,
            ...element,
            text: getQuestionnaireAnswerText(questionnaire, question, i),
        };
    });
}
//# sourceMappingURL=mapQuestionAnswers.js.map