import idEq from '../../models/helpers/idEq';
import getAllQuestionnaireQuestions from './getAllQuestionnaireQuestions';
export default function getQuestionInfo(questionnaire, questionId) {
    const allQuestions = getAllQuestionnaireQuestions(questionnaire);
    const question = allQuestions.find((q) => idEq(q._id, questionId));
    const scale = questionnaire.scales[question.scale];
    return {
        scale,
        question,
    };
}
//# sourceMappingURL=getQuestionInfo.js.map