import { Questionnaire, QuestionnaireQuestion } from '../../RelayTypes';
export default function mapQuestionAnswers(questionnaire: Questionnaire, question: QuestionnaireQuestion): {
    text: string;
    name: string;
    value: number;
    scale: import("../../RelayTypes").QuestionnaireScale;
}[];
//# sourceMappingURL=mapQuestionAnswers.d.ts.map