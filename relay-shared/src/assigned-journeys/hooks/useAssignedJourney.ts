import { useGetAssignedJourneyQuery } from '../../frontend/api/hooks/useApi'
import { AssignedJourney } from '../../RelayTypes'

export default function useAssignedJourney(id?: string) {
  const { data: aj } = useGetAssignedJourneyQuery(id!, {
    skip: typeof id !== 'string',
  })
  return aj as AssignedJourney | undefined
}
