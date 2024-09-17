import assert from '@mtyk/frontend/core/helpers/assertDefined';
export default function getQuestionnaireAnswerText(questionnaire, question, answer) {
    assert(questionnaire, 'questionnaire is required');
    assert(question, 'question is required');
    assert(typeof answer === 'number', 'answer is required');
    return (question.answers[answer] ??
        questionnaire.scales[question.scale].elements[answer].name);
}
//# sourceMappingURL=getQuestionnaireAnswerText.js.map