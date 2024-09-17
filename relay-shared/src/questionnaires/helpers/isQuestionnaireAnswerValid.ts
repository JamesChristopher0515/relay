import { Questionnaire } from '../../RelayTypes'
import getAllQuestionnaireQuestions from './getAllQuestionnaireQuestions'

export default function isQuestionnaireAnswerValid(
    questionnaire: Questionnaire,
    questionId: string,
    value: number
) {
    const allQs = getAllQuestionnaireQuestions(questionnaire, true)
    const questionData = allQs.find((q) => q._id.toString() === questionId)!
    const scaleForQ = questionnaire.scales[questionData.scale]
    return !!scaleForQ.elements[value]
}
