import { flattenDeep } from 'lodash'
import safeMongoObj from '../../models/helpers/safeMongoObj'

import { Questionnaire, QuestionnaireQuestion } from '../../RelayTypes'
export default function getAllQuestionnaireQuestions(
  questionnaire: Pick<Questionnaire, 'sections'>,
  questionsOnly = false
): (QuestionnaireQuestion & { sectionIndex: number })[] {
  return flattenDeep(
    questionnaire.sections.map((s, sectionIndex: number) =>
      s.questions.map((q) => {
        return {
          // Fix for when used when mongo docs on backend
          ...safeMongoObj(q),
          sectionIndex,
        }
      })
    )
  ).filter((q) => {
    return !questionsOnly || isQuestionAQuestion(q)
  })
}

export function isQuestionAQuestion(question: QuestionnaireQuestion) {
  return question.type.startsWith('question')
}
