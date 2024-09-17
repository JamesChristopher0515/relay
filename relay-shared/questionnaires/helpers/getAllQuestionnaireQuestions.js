import { flattenDeep } from 'lodash';
import safeMongoObj from '../../models/helpers/safeMongoObj';
export default function getAllQuestionnaireQuestions(questionnaire, questionsOnly = false) {
    return flattenDeep(questionnaire.sections.map((s, sectionIndex) => s.questions.map((q) => {
        return {
            // Fix for when used when mongo docs on backend
            ...safeMongoObj(q),
            sectionIndex,
        };
    }))).filter((q) => {
        return !questionsOnly || isQuestionAQuestion(q);
    });
}
export function isQuestionAQuestion(question) {
    return question.type.startsWith('question');
}
//# sourceMappingURL=getAllQuestionnaireQuestions.js.map