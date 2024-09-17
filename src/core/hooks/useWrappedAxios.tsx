import { useAppSelector } from 'core/hooks/coreHooks'
import { mapValues } from 'lodash'
import useWrappedAxiosShared from 'relay-shared/core/hooks/useWrappedAxiosShared'
import { wrappedAxios } from 'relay-shared/frontend/api/hooks/useApi'

/**
 * @deprecated prefer `useWrappedAxiosShared`
 */
export function useWrappedAxios() {
  const auth = useAppSelector((state) => state.auth)
  return mapValues(wrappedAxios, (fn, key) => {
    return (url, bodyOrOpts?, opts?) => {
      const actualOps = key === 'get' ? bodyOrOpts : opts
      const actualBody = key === 'post' ? bodyOrOpts : undefined
      const optsForAxios = {
        ...actualOps,
        headers: {
          ...(actualOps?.headers ?? {}),
          Authorization: `Bearer ${auth.tokens?.access.token}`,
        },
      }
      if (key === 'get') {
        return fn(url, optsForAxios)
      } else {
        return fn(url, actualBody, optsForAxios)
      }
    }
  })
}

export type WrappedAxios = ReturnType<typeof useWrappedAxiosShared>
