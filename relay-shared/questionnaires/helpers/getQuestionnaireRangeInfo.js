import { minBy, maxBy } from 'lodash';
export default function getQuestionnaireRangeInfo({ questionnaire, output, }) {
    const outputToShow = questionnaire.outputs[output];
    const { ranges } = outputToShow;
    const minMin = minBy(ranges, 'min');
    const maxMax = maxBy(ranges, 'max');
    const totalRange = maxMax.max - minMin.min;
    return {
        totalRange,
        minRange: minMin,
        maxRange: maxMax,
    };
}
//# sourceMappingURL=getQuestionnaireRangeInfo.js.map