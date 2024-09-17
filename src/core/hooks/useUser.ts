import RelayContext from 'core/context/RelayContext'
import { useContext } from 'react'
import { useUpdateClientMutation } from 'relay-shared/frontend/api/hooks/useApi'
import { Client } from 'relay-shared/RelayTypes'

/**
 * @deprecated Use `useClient` instead as it's less ambigious and maps better to shared code
 */
function useUser() {
  const context = useContext(RelayContext)
  const [updateClient] = useUpdateClientMutation()
  return {
    user: context.user as any as Client,
    update: (update) => updateClient({ id: context.user.id, update }),
    refetch: () => updateClient({ id: context.user.id, update: {} }),
  }
}

export const useClient = () => {
  const { user, ...rest } = useUser()
  return [user, rest] as const
}
export default useUser
