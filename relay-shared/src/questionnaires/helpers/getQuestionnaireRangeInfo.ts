import { minBy, maxBy } from 'lodash'
import { Questionnaire } from '../../RelayTypes'

export default function getQuestionnaireRangeInfo({
  questionnaire,
  output,
}: {
  questionnaire: Questionnaire
  output: number
}) {
  const outputToShow = questionnaire.outputs[output]
  const { ranges } = outputToShow
  const minMin = minBy(ranges, 'min')!
  const maxMax = maxBy(ranges, 'max')!
  const totalRange = maxMax.max - minMin.min
  return {
    totalRange,
    minRange: minMin,
    maxRange: maxMax,
  }
}
