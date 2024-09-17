import useMemoryImmer from '@mtyk/frontend/react/hooks/useMemoryImmer'
import useClientShared from '../../clients/hooks/useClientShared'
import newGoal from '../helpers/newGoal'

export default function useNewGoal() {
  const [client] = useClientShared()
  return useMemoryImmer('newGoal', newGoal({ client: client._id }))
}
