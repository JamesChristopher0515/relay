import { last, maxBy, uniq } from 'lodash'
import { QuestionnaireResultAnswer } from '../../RelayTypes'
import assert from '../../core/helpers/assert'
import idEq from '../../models/helpers/idEq'
import getAllQuestionnaireQuestions from './getAllQuestionnaireQuestions'
import { QuestionnaireForCalculation } from './questionnaireTypes'

export default function calculateMotivationScore(
    questionnaire: QuestionnaireForCalculation,
    answers: QuestionnaireResultAnswer[]
) {
    const allQuestions = getAllQuestionnaireQuestions(questionnaire, true)
    const statements = uniq(
        allQuestions.map((q) => q.id.replace(/_(happiness|importance)/, ''))
    )
    return statements.reduce((accum, statement) => {
        const happinessId = statement + '_happiness'
        const importanceId = statement + '_importance'
        const happinessQuestion = allQuestions.find(
            (q) => q.id === happinessId
        )!
        const importanceQuestion = allQuestions.find(
            (q) => q.id === importanceId
        )!

        const happinessAnswer = answers.find((answer) =>
            idEq(answer.question, happinessQuestion._id)
        )!
        const importanceAnswer = answers.find((answer) =>
            idEq(answer.question, importanceQuestion._id)
        )!

        assert(
            !!importanceAnswer && !!happinessAnswer,
            `Couldn't find answers for ${statement} in motivation questionnaire`
        )

        const happinessScale =
            questionnaire.scales[happinessQuestion.scale].elements
        const importanceScale =
            questionnaire.scales[importanceQuestion.scale].elements

        const thisScore = last(happinessScale)!.value
        if (importanceAnswer.value === 0) {
            // Not important, so actual score has no bearing, return full score
            return accum + thisScore
        }

        // Score starts on max (3) and decreases as importance increases, if score is less than "Good"
        const negate =
            maxBy(happinessScale, 'value')!.value -
            happinessScale[happinessAnswer.value].value
        return (
            accum +
            (thisScore - negate * importanceScale[importanceAnswer.value].value)
        )
    }, 0)
}
