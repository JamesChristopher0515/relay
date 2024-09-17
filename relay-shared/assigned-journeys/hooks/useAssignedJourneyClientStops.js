import { useGetClientMilestoneStopsQuery } from '../../frontend/api/hooks/useApi';
export default function useAssignedJourneyClientStops({ assignedJourneyId, }, opts = {}) {
    const { data: stopsData, isLoading, isFetching, } = useGetClientMilestoneStopsQuery({
        assignedJourney: assignedJourneyId,
    }, opts);
    if (isLoading) {
        return [];
    }
    return (stopsData?.data ?? []);
}
//# sourceMappingURL=useAssignedJourneyClientStops.js.map