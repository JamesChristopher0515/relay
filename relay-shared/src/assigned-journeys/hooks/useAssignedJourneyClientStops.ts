import { useGetClientMilestoneStopsQuery } from '../../frontend/api/hooks/useApi'
import { ClientMilestoneStop } from '../../RelayTypes'

export default function useAssignedJourneyClientStops(
  {
    assignedJourneyId,
  }: {
    assignedJourneyId: string
  },
  opts = {}
) {
  const {
    data: stopsData,
    isLoading,
    isFetching,
  } = useGetClientMilestoneStopsQuery(
    {
      assignedJourney: assignedJourneyId,
    },
    opts
  )

  if (isLoading) {
    return []
  }
  return (stopsData?.data ?? []) as ClientMilestoneStop[]
}
