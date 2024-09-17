import { sortBy } from 'lodash';
import idEq, { findId } from '../../models/helpers/idEq';
export default function groupClientStopsByMilestoneChange({ journey, clientStops: stops, }) {
    const stopsWMilestoneIndex = stops.map(s => ({
        ...s,
        milestoneIndex: findId(journey.milestones, s.milestone)[1],
    }));
    const sortedNewestFirst = sortBy(stopsWMilestoneIndex, stop => new Date(stop.createdAt).getTime()).reverse();
    const groupedByMilestoneChanges = [];
    let lastMilestoneId = null;
    for (const stop of sortedNewestFirst) {
        if (!idEq(stop.milestone, lastMilestoneId)) {
            groupedByMilestoneChanges.push([]);
            lastMilestoneId = stop.milestone;
        }
        groupedByMilestoneChanges[groupedByMilestoneChanges.length - 1].push(stop);
    }
    return { groupedByMilestoneChanges, sortedNewestFirst };
}
//# sourceMappingURL=groupClientStopsByMilestoneChange.js.map