import { Questionnaire, QuestionnaireQuestion } from '../../RelayTypes'
import getQuestionnaireAnswerText from './getQuestionnaireAnswerText'

export default function mapQuestionAnswers(
  questionnaire: Questionnaire,
  question: QuestionnaireQuestion
) {
  const scale = questionnaire.scales[question.scale]
  return scale.elements.map((element, i) => {
    return {
      scale,
      ...element,
      text: getQuestionnaireAnswerText(questionnaire, question, i),
    }
  })
}
