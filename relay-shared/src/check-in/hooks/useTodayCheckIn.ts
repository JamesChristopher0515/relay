import { endOfDay, startOfDay } from 'date-fns'
import useClientShared from '../../clients/hooks/useClientShared'
import { useGetCheckInsQuery } from '../../frontend/api/hooks/useApi'

export default function useTodayCheckIn() {
  const [client] = useClientShared()
  const { data: checkIns, isLoading } = useGetCheckInsQuery({
    client: client._id,
    createdAt: {
      $gte: startOfDay(new Date()).toString(),
      $lt: endOfDay(new Date()).toString(),
    },
  })
  const latestCheckIn = checkIns?.data[0]
  return latestCheckIn
}
