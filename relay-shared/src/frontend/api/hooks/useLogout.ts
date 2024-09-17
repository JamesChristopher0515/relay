import { batch, useDispatch } from 'react-redux'
import useClientShared from '../../../clients/hooks/useClientShared'
import { config } from '../../core/helpers/config'
import { setTokens, setUser } from '../reducers/authReducer'
import { useClearAllMutation, useUpdateClientMutation } from './useApi'

const isPractitionerApp =
  typeof window !== 'undefined' && typeof window.location?.pathname === 'string'

/** Note that this is shared between both client and practitioner apps */
export default function useLogoutShared() {
  const dispatch = useDispatch()
  const [clear] = useClearAllMutation()
  const [updateUser] = useUpdateClientMutation()
  const [client] = useClientShared()

  const logoutFunc = async function () {
    const { localStorage } = config

    if (!isPractitionerApp) {
      updateUser({
        id: client._id,
        update: {
          expoPushToken: null,
        },
      }).catch((e) => console.error(e))
    }
    await localStorage.removeItem('tokens')
    await localStorage.removeItem('user')

    batch(() => {
      dispatch(setTokens())
      dispatch(setUser())
      clear().catch((e) => console.error(e))
    })
    if (isPractitionerApp) {
      if (window.location.pathname === '/') {
        window.location.reload()
      } else {
        window.location.href = '/login'
      }
    }
  }
  return [logoutFunc]
}
