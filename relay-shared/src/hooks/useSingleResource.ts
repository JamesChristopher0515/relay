import { parseDates } from '@mtyk/frontend/core/helpers'
import assert from '@mtyk/frontend/core/helpers/assertDefined'
import type { ApiTags } from '../frontend/api/helpers/tagTypes'
import * as api from '../frontend/api/hooks/useApi'

export default function useSingleResource(resource: ApiTags, id?: string) {
  const getSingle = api[`useGet${resource}Query`]
  // const getMany = api[`useGet${resource}sQuery`]
  const [update] = api[`useUpdate${resource}Mutation`]()
  const [create] = api[`useCreate${resource}Mutation`]()
  const [remove] = api[`useDelete${resource}Mutation`]()
  const { data: d, ...rest } = getSingle(resource, {
    skip: !id || id === 'new',
  })
  return [
    parseDates(d),
    {
      ...rest,
      create,
      update,
      remove: () => {
        assert(id)
        remove(id)
      },
    },
  ] as const
}
