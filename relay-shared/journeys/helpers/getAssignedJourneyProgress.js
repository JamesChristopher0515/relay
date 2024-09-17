import groupClientStopsByMilestoneChange from './groupClientStopsByMilestoneChange';
import { findId } from '../../models/helpers/idEq';
import { uniqBy } from 'lodash';
import findJourneyStop from './findJourneyStop';
export function getAssignedJourneyProgressFromSingleStop({ journey, assignedJourney, clientStop, }) {
    if (assignedJourney.completedAt) {
        return 1;
    }
    const { stopIndex, milestoneIndex, milestone } = findJourneyStop({
        journey,
        milestone: clientStop.milestone,
        stop: clientStop.stop,
    });
    const milestoneFrac = Math.max(milestoneIndex / journey.milestones.length, 0);
    const stopFrac = stopIndex / milestone.stops.length;
    const stopContribution = stopFrac / journey.milestones.length;
    return Math.min(stopContribution + milestoneFrac);
}
export default function getAssignedJourneyProgress({ journey, assignedJourney, clientStops, }) {
    if (assignedJourney.completedAt) {
        return 1;
    }
    const { groupedByMilestoneChanges } = groupClientStopsByMilestoneChange({
        journey,
        clientStops,
    });
    const latestMilestoneClientStops = groupedByMilestoneChanges[0] ?? [];
    if (!latestMilestoneClientStops.length) {
        return 0;
    }
    const [milestone] = findId(journey.milestones, latestMilestoneClientStops[0].milestone);
    if (!milestone) {
        console.warn(`Couldn't find milestone ${latestMilestoneClientStops[0].milestone} in journey ${journey.name}`);
        return 0;
    }
    // How many stops from the this milestone have we progressed past (skipping repeats)
    const latestMilestoneProgress = uniqBy(latestMilestoneClientStops, 'stop').filter(m => m.completedAt)
        .length / milestone.stops.length;
    const mCount = journey.milestones.length;
    const milestonesCovered = uniqBy(clientStops, 'milestone').length / mCount;
    return (milestonesCovered * ((mCount - 1) / mCount) +
        latestMilestoneProgress * (1 / mCount));
}
//# sourceMappingURL=getAssignedJourneyProgress.js.map