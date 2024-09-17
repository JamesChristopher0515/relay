export default function useAssignedJourneyHistory(assignedJourneyId: string): {
    milestone: import("../../RelayTypes").JourneyMilestone;
    milestoneIndex: number;
    stops: {
        milestoneIndex: number;
        client: string;
        assignedJourney: string;
        milestone: string;
        stop: string;
        completedAt?: Date | undefined;
        _id: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
}[];
//# sourceMappingURL=useAssignedJourneyHistory.d.ts.map