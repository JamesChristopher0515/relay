import { uniqBy } from 'lodash'
import { useGetClientContentsQuery } from 'relay-shared/frontend/api/hooks/useApi'
import { useClient } from '../../core/hooks/useUser'
import wrapArrayHook from 'relay-shared/core/helpers/wrapArrayHook'

export default function useAssignedContent() {
  const [client] = useClient()
  const { data: assignedContent, isLoading } = wrapArrayHook(
    useGetClientContentsQuery(
      { isAssigned: true, client: client._id },
      { pollingInterval: 1000 * 5 }
    )
  )

  return {
    isLoading,
    data: uniqBy(assignedContent, (c) => c.content._id),
  }
}
