import { flattenDeep } from 'lodash';
export default function getAllJourneyStops(journey) {
    return flattenDeep(journey.milestones.map((milestone) => milestone.stops));
}
//# sourceMappingURL=getAllJourneyStops.js.map