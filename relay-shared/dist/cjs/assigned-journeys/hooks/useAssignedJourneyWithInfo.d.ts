import { Id } from '../../RelayTypes';
export default function useAssignedJourneyWithInfo(assignedJourneyId?: Id, { includeActiveStopInfo }?: {
    includeActiveStopInfo: boolean;
}): {
    milestoneIndex: number;
    progress: number;
    assignedJourney: import("../../RelayTypes").AssignedJourney | undefined;
    lastActiveClientStop: any;
    actionRequired: any;
    questionnaireReviewPoint: any;
    genericReviewPoint: boolean;
    activeStop: import("../../RelayTypes").JourneyStop | undefined;
    questionnaireResult: any;
};
//# sourceMappingURL=useAssignedJourneyWithInfo.d.ts.map