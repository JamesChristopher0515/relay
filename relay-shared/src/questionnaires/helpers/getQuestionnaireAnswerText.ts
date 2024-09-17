import assert from '@mtyk/frontend/core/helpers/assertDefined'
import { Questionnaire, QuestionnaireQuestion } from '../../RelayTypes'

export default function getQuestionnaireAnswerText(
  questionnaire: Questionnaire,
  question: QuestionnaireQuestion,
  answer: number
) {
  assert(questionnaire, 'questionnaire is required')
  assert(question, 'question is required')
  assert(typeof answer === 'number', 'answer is required')
  return (
    question.answers[answer] ??
    questionnaire.scales[question.scale].elements[answer].name
  )
}
