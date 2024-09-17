import { useClient } from 'core/hooks/useUser'
import wrapArrayHook from 'relay-shared/core/helpers/wrapArrayHook'
import { useGetClientContentsQuery } from 'relay-shared/frontend/api/hooks/useApi'

export default function useRecentContent() {
  const [client] = useClient()
  const { data: clientContent, isLoading } = wrapArrayHook(
    useGetClientContentsQuery({ client: client._id })
  )
  const sorted = clientContent
    .filter((c) => c.lastViewed)
    .sort((a, b) => b.lastViewed - a.lastViewed)

  return { data: sorted, isLoading }
}
