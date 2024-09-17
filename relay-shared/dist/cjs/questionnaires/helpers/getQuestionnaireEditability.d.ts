import { Questionnaire, User } from '../../RelayTypes';
export declare enum QuestionnaireEditability {
    None = 0,
    NamesOnly = 1,
    All = 2
}
export default function getQuestionnaireEditability(questionnaire: Questionnaire, editingUser: User): QuestionnaireEditability;
//# sourceMappingURL=getQuestionnaireEditability.d.ts.map