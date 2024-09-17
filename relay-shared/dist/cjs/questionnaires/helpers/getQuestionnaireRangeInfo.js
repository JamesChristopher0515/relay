"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function getQuestionnaireRangeInfo({ questionnaire, output, }) {
    const outputToShow = questionnaire.outputs[output];
    const { ranges } = outputToShow;
    const minMin = (0, lodash_1.minBy)(ranges, 'min');
    const maxMax = (0, lodash_1.maxBy)(ranges, 'max');
    const totalRange = maxMax.max - minMin.min;
    return {
        totalRange,
        minRange: minMin,
        maxRange: maxMax,
    };
}
exports.default = getQuestionnaireRangeInfo;
//# sourceMappingURL=getQuestionnaireRangeInfo.js.map