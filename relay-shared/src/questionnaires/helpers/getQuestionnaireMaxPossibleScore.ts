import { Questionnaire } from '../../RelayTypes'
import getAllQuestionnaireQuestions from './getAllQuestionnaireQuestions'
import { getQuestionnaireOutput } from './getQuestionnaireOutputs'

export default function getQuestionnaireMaxPossibleScore(
  questionnaire: Pick<Questionnaire, 'sections' | 'scales' | 'outputs' | 'id'>,
  evall: (str: string) => any
) {
  const allQuestions = getAllQuestionnaireQuestions(questionnaire, true)
  const { scales } = questionnaire
  const maxAnswers = allQuestions.map(q => ({
    value: scales[q.scale].elements.length - 1,
    question: q._id,
  }))
  return getQuestionnaireOutput(
    maxAnswers,
    questionnaire,
    questionnaire.outputs[0],
    evall
  ).value
}
