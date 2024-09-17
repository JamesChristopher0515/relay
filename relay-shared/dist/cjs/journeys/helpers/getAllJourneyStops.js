"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
function getAllJourneyStops(journey) {
    return (0, lodash_1.flattenDeep)(journey.milestones.map((milestone) => milestone.stops));
}
exports.default = getAllJourneyStops;
//# sourceMappingURL=getAllJourneyStops.js.map