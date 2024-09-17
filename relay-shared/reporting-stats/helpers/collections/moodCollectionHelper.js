import { getFeelingDescription, } from '../../../feelings/helpers/getAllFeelings';
const moodCollectionHelper = {
    collectionType: 'mood',
    icon: 'feelings',
    valueDomain: { min: 0, max: 1 },
    formatStat(stat) {
        return getFeelingDescription(stat.data.feelings, false);
    },
};
export default moodCollectionHelper;
//# sourceMappingURL=moodCollectionHelper.js.map