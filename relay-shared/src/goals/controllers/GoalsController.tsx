import useClientShared from '../../clients/hooks/useClientShared'
import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import mutationForwarder from '../../core/helpers/mutationForwarder'
import wrapArrayHook from '../../core/helpers/wrapArrayHook'
import {
  useCreateGoalMutation,
  useDeleteGoalMutation,
  useGetGoalsQuery,
} from '../../frontend/api/hooks/useApi'

interface GoalsControllerProps {}

export default makeController(function GoalsController(
  props: GoalsControllerProps
) {
  const {} = props
  const [client] = useClientShared()
  const { data: goals, ...rest } = wrapArrayHook(
    useGetGoalsQuery({ client: client._id })
  )
  const [createGoalMutation] = useCreateGoalMutation()
  const [deleteGoalMutation] = useDeleteGoalMutation()

  return {
    data: goals,
    ...rest,
    remove: mutationForwarder(deleteGoalMutation),
    create: mutationForwarder(createGoalMutation),
  }
})
