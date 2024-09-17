import groupClientStopsByMilestoneChange from '../../journeys/helpers/groupClientStopsByMilestoneChange';
import { findId } from '../../models/helpers/idEq';
import useAssignedJourney from './useAssignedJourney';
import useAssignedJourneyClientStops from './useAssignedJourneyClientStops';
export default function useAssignedJourneyHistory(assignedJourneyId) {
    const qOptions = { refetchOnFocus: true, refetchOnReconnect: true };
    const stops = useAssignedJourneyClientStops({ assignedJourneyId }, qOptions);
    const assignedJourney = useAssignedJourney(assignedJourneyId);
    if (assignedJourney) {
        const { journey } = assignedJourney;
        const { groupedByMilestoneChanges, sortedNewestFirst } = groupClientStopsByMilestoneChange({
            journey,
            clientStops: stops,
        });
        return groupedByMilestoneChanges.flatMap((milestoneStops, milestoneChangeIndex, arr) => {
            const firstClientStop = milestoneStops[0];
            const [milestone, milestoneIndex] = findId(journey.milestones, firstClientStop.milestone);
            if (!milestone) {
                // Couldn't find milestone?
                return [];
            }
            return [
                {
                    milestone,
                    milestoneIndex,
                    stops: milestoneStops,
                },
            ];
        });
    }
    else {
        return [];
    }
}
//# sourceMappingURL=useAssignedJourneyHistory.js.map