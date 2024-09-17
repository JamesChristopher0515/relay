import { Questionnaire, QuestionnaireResult, QuestionnaireResultAnswer, QuestionnaireScale } from '../../RelayTypes';
import { QuestionnaireForCalculation } from './questionnaireTypes';
export default function getQuestionnaireResultOutputs(answers: QuestionnaireResult['answers'], questionnaire: Questionnaire, evall: (code: string) => any): {
    range: number;
    value: any;
}[];
export declare function getQuestionnaireScaleMax(scale: Pick<QuestionnaireScale, 'elements'>): number;
export declare function getQuestionnaireOutput(answers: Pick<QuestionnaireResult['answers'][number], 'value' | 'question'>[], questionnaire: Pick<Questionnaire, 'sections' | 'outputs' | 'scales' | 'id'>, output: Questionnaire['outputs'][number], evall: (code: string) => any): {
    range: number;
    value: any;
};
export declare function findAnswerQuestion(questionnaire: QuestionnaireForCalculation, answer: Pick<QuestionnaireResultAnswer, 'question'>): import("../../RelayTypes").QuestionnaireQuestion & {
    sectionIndex: number;
};
//# sourceMappingURL=getQuestionnaireOutputs.d.ts.map