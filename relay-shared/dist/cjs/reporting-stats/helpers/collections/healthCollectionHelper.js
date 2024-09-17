"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealthTypeInfo = void 0;
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const reportingStatCollectionId_1 = require("../reportingStatCollectionId");
function getHealthTypeInfo() {
    return {
        steps: {
            format: stat => {
                return `${Math.round(stat.value)} steps`;
            },
            icon: free_solid_svg_icons_1.faShoePrints,
        },
        distance: {
            format: stat => {
                return `${Math.round(stat.value / 1000)}km`;
            },
            icon: free_solid_svg_icons_1.faShoePrints,
        },
        sleep: {
            format: stat => {
                let value = (stat.value / (1000 * 60 * 60)).toFixed(1);
                value = value.replace(/\.0$/, ''); // replace whole numbers
                return `${value}hrs in bed`;
            },
            icon: free_solid_svg_icons_1.faBed,
        },
    };
}
exports.getHealthTypeInfo = getHealthTypeInfo;
const healthCollectionHelper = {
    collectionType: 'health',
    icon: 'health',
    formatStat(stat) {
        const collectionInfo = (0, reportingStatCollectionId_1.parseStatCollectionId)(stat.collectionId);
        const healthType = collectionInfo.data.health;
        return getHealthTypeInfo()[healthType].format();
    },
};
exports.default = healthCollectionHelper;
//# sourceMappingURL=healthCollectionHelper.js.map