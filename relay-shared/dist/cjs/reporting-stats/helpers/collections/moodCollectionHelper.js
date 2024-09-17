"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getAllFeelings_1 = require("../../../feelings/helpers/getAllFeelings");
const moodCollectionHelper = {
    collectionType: 'mood',
    icon: 'feelings',
    valueDomain: { min: 0, max: 1 },
    formatStat(stat) {
        return (0, getAllFeelings_1.getFeelingDescription)(stat.data.feelings, false);
    },
};
exports.default = moodCollectionHelper;
//# sourceMappingURL=moodCollectionHelper.js.map