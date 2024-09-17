import { AssignedJourney, ClientMilestoneStop, Journey } from '../../RelayTypes';
export declare function getAssignedJourneyProgressFromSingleStop({ journey, assignedJourney, clientStop, }: {
    journey: Journey;
    assignedJourney: AssignedJourney;
    clientStop: ClientMilestoneStop;
}): number;
export default function getAssignedJourneyProgress({ journey, assignedJourney, clientStops, }: {
    journey: Journey;
    assignedJourney: AssignedJourney;
    clientStops: ClientMilestoneStop[];
}): number;
//# sourceMappingURL=getAssignedJourneyProgress.d.ts.map