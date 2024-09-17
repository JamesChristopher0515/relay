import { useGetAssignedJourneyQuery } from '../../frontend/api/hooks/useApi';
export default function useAssignedJourney(id) {
    const { data: aj } = useGetAssignedJourneyQuery(id, {
        skip: typeof id !== 'string',
    });
    return aj;
}
//# sourceMappingURL=useAssignedJourney.js.map