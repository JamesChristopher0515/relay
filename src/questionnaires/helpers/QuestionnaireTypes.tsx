import { Id, Questionnaire } from 'relay-shared/RelayTypes'

export type SingleQuestionnaireQ = {
  questionnaire: Questionnaire
  questionId: Questionnaire['sections'][number]['questions'][number]
}
