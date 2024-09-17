import { faBed, faShoePrints } from '@fortawesome/free-solid-svg-icons';
import { parseStatCollectionId } from '../reportingStatCollectionId';
export function getHealthTypeInfo() {
    return {
        steps: {
            format: stat => {
                return `${Math.round(stat.value)} steps`;
            },
            icon: faShoePrints,
        },
        distance: {
            format: stat => {
                return `${Math.round(stat.value / 1000)}km`;
            },
            icon: faShoePrints,
        },
        sleep: {
            format: stat => {
                let value = (stat.value / (1000 * 60 * 60)).toFixed(1);
                value = value.replace(/\.0$/, ''); // replace whole numbers
                return `${value}hrs in bed`;
            },
            icon: faBed,
        },
    };
}
const healthCollectionHelper = {
    collectionType: 'health',
    icon: 'health',
    formatStat(stat) {
        const collectionInfo = parseStatCollectionId(stat.collectionId);
        const healthType = collectionInfo.data.health;
        return getHealthTypeInfo()[healthType].format();
    },
};
export default healthCollectionHelper;
//# sourceMappingURL=healthCollectionHelper.js.map