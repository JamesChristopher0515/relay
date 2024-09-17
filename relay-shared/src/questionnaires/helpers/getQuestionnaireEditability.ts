import { Questionnaire, User } from '../../RelayTypes'

export enum QuestionnaireEditability {
  None = 0,
  NamesOnly = 1,
  All = 2,
}
export default function getQuestionnaireEditability(
  questionnaire: Questionnaire,
  editingUser: User
): QuestionnaireEditability {
  if (
    typeof questionnaire.practice === 'string' &&
    editingUser.practice !== questionnaire.practice
  ) {
    return QuestionnaireEditability.None
  }
  if (questionnaire.hasResult) {
    return QuestionnaireEditability.NamesOnly
  } else {
    return QuestionnaireEditability.All
  }
}
