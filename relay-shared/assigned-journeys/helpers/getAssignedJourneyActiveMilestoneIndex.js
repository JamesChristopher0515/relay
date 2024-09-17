import findJourneyStop from '../../journeys/helpers/findJourneyStop';
import { last } from 'lodash';
export function getAssignedJourneyActiveMilestoneIndex({ journey, assignedJourney, clientStop, }) {
    if (assignedJourney.completedAt) {
        return {
            progress: 1,
            milestoneIndex: journey.milestones.length - 1,
            stopIndex: last(journey.milestones).stops.length - 1,
            milestone: last(journey.milestones),
        };
    }
    const { stopIndex, milestoneIndex, milestone } = findJourneyStop({
        journey,
        milestone: clientStop.milestone,
        stop: clientStop.stop,
    });
    const milestoneFrac = Math.max(milestoneIndex / journey.milestones.length, 0);
    const stopFrac = stopIndex / milestone.stops.length;
    const stopContribution = stopFrac / journey.milestones.length;
    return {
        progress: Math.min(stopContribution + milestoneFrac),
        milestoneIndex,
        stopIndex,
        milestone,
    };
}
//# sourceMappingURL=getAssignedJourneyActiveMilestoneIndex.js.map