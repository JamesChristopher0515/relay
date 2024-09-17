import { Journey, AssignedJourney, ClientMilestoneStop } from '../../RelayTypes';
export declare function getAssignedJourneyActiveMilestoneIndex({ journey, assignedJourney, clientStop, }: {
    journey: Journey;
    assignedJourney: AssignedJourney;
    clientStop: ClientMilestoneStop;
}): {
    progress: number;
    milestoneIndex: number;
    stopIndex: number;
    milestone: import("../../RelayTypes").JourneyMilestone | undefined;
};
//# sourceMappingURL=getAssignedJourneyActiveMilestoneIndex.d.ts.map