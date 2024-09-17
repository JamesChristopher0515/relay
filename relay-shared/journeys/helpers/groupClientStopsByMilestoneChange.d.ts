import { ClientMilestoneStop, Journey } from '../../RelayTypes';
export default function groupClientStopsByMilestoneChange({ journey, clientStops: stops, }: {
    journey: Journey;
    clientStops: ClientMilestoneStop[];
}): {
    groupedByMilestoneChanges: {
        milestoneIndex: number;
        client: string;
        assignedJourney: string;
        milestone: string;
        stop: string;
        completedAt?: Date | undefined;
        _id: string;
        createdAt: Date;
        updatedAt: Date;
    }[][];
    sortedNewestFirst: {
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
};
//# sourceMappingURL=groupClientStopsByMilestoneChange.d.ts.map