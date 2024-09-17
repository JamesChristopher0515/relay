import { Questionnaire, QuestionnaireQuestion } from '../../RelayTypes';
export default function getAllQuestionnaireQuestions(questionnaire: Pick<Questionnaire, 'sections'>, questionsOnly?: boolean): (QuestionnaireQuestion & {
    sectionIndex: number;
})[];
export declare function isQuestionAQuestion(question: QuestionnaireQuestion): boolean;
//# sourceMappingURL=getAllQuestionnaireQuestions.d.ts.map