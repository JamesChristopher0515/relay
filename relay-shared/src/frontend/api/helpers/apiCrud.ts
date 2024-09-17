import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import { BaseQueryFn } from '@reduxjs/toolkit/query/react'
import { AxiosRequestConfig } from 'axios'
import * as _ from 'lodash'
import { z, ZodTypeAny } from 'zod'
import { plural, resourceToUrl } from '../helpers/apiUrls'
import { Id, PaginatedQueryOpts } from './apiTypes'
import { tagsForMany, tagsForSingle } from './tagHelpers'
import type { ApiTags } from './tagTypes'

interface GenerateCrudOpts<R> {
  locallyUpdatable?: any[] // Using R here seems to break things
  alsoInvalidates?: any[]
}

const invalidator = (
  resource: ApiTags,
  opts: GenerateCrudOpts<any>,
  id?: string
) => {
  const { locallyUpdatable, alsoInvalidates } = opts
  const tags = [
    ...(id ? [{ type: resource, id }] : []),
    resource,
    // Make sure the user's own doc updates if we update via client/practitioner methods
    ...(resource === 'Client' || resource === 'Practitioner' ? ['User'] : []),
    ...(alsoInvalidates ?? []),
  ]
  console.log('Invalidating tags', tags)
  return tags
}

export const creator = (resource: ApiTags, opts: GenerateCrudOpts<any>) => {
  const resourcePath = resourceToUrl(resource)

  return {
    query: (data: any) => {
      return {
        url: `/${plural(resourcePath)}`,
        method: 'POST',
        data,
      }
    },
    invalidatesTags: () => invalidator(resource, opts),
  } as any
}
const possiblyOpenQueriesByResource: { [resource: string]: any } = {}

export const updater = (
  resource: ApiTags,
  opts: GenerateCrudOpts<any>,
  relayApiGetter: () => any
) => {
  const { locallyUpdatable } = opts
  const resourcePath = resourceToUrl(resource)
  return {
    query: ({ id, update }) => {
      return {
        url: `/${resourcePath}/${id}`,
        method: 'PATCH',
        data: update,
      }
    },
    invalidatesTags: ({ id }) => {
      return invalidator(resource, opts, id)
    },
    async onQueryStarted({ id, update }, { dispatch, queryFulfilled }) {
      const multiPatchResults = (
        possiblyOpenQueriesByResource[resource] ?? []
      ).map(q => {
        return dispatch(
          relayApiGetter().util.updateQueryData(`get${resource}s`, q, draft => {
            for (const o of draft?.data ?? []) {
              if (o.id === id) {
                Object.assign(o, _.pick(update, locallyUpdatable))
              }
            }
          })
        )
      })

      const patchResultOne = dispatch(
        relayApiGetter().util.updateQueryData(`get${resource}`, id, draft => {
          Object.assign(draft, _.pick(update, locallyUpdatable))
        })
      )
      try {
        await queryFulfilled
      } catch (e) {
        console.error(e)
        for (const multi of multiPatchResults) {
          multi.undo()
        }
        patchResultOne.undo()
      }
    },
  } as any
}

export const getOne = (resource: ApiTags) => {
  const resourcePath = resourceToUrl(resource)
  return {
    query: id => {
      return {
        url: `/${resourcePath}/${id}`,
        method: 'GET',
      }
    },
    providesTags: tagsForSingle.bind(null, resource),
  } as any
}

export const _getMany = ({
  resource,
  url,
}: {
  resource: ApiTags
  url: string
}) => {
  return {
    query: (params: PaginatedQueryOpts) => {
      possiblyOpenQueriesByResource[resource] = _.uniqBy(
        (possiblyOpenQueriesByResource[resource] ?? []).concat(params),
        v => JSON.stringify(v)
      )
      return {
        url,
        method: 'GET',
        params,
      }
    },
    providesTags: tagsForMany.bind(null, resource),
  } as any
}

export const getMany = (resource: ApiTags) => {
  const resourcePath = resourceToUrl(resource)
  return _getMany({ resource, url: `/${plural(resourcePath)}` })
}

export const generateCRUD = <
  T extends ApiTags,
  R,
  S extends {
    read: ZodTypeAny
    create: ZodTypeAny
    update: ZodTypeAny
  }
>(
  relayApiGetter: any,
  builder: EndpointBuilder<
    BaseQueryFn<
      {
        url: string
        method: AxiosRequestConfig['method']
        data?: AxiosRequestConfig['data']
      },
      unknown,
      unknown,
      any,
      any
    >,
    ApiTags,
    'relay-api'
  >,
  resource: T,
  resourceType: R,
  schemas: S,
  opts: GenerateCrudOpts<any> = {}
) => {
  const toTransform = {
    create: builder.mutation<void, z.infer<S['create']>>(
      creator(resource, opts)
    ),
    update: builder.mutation<void, { id: Id; update: z.infer<S['update']> }>(
      updater(resource, opts, relayApiGetter)
    ),
    get: builder.query<R | undefined, Id>(getOne(resource)),
    getMany: builder.query<
      { data: R[]; meta: any },
      PaginatedQueryOpts & z.infer<S['read']>
    >(getMany(resource)),
    delete: builder.mutation<void, Id>(
      (() => {
        return {
          query: id => {
            const url = `/${resourceToUrl(resource)}/${id}`
            return {
              url,
              method: 'DELETE',
            }
          },
          invalidatesTags: [resource, ...(opts.alsoInvalidates ?? [])],
        } as any
      })()
    ),
  }

  const toReturn = _.mapKeys(toTransform, (value, key) => {
    if (key === 'getMany') {
      return `get${resource}s`
    }
    return `${key}${resource}`
  }) as {
    [key in `create${T}`]: typeof toTransform['create']
  } & {
    [key in `update${T}`]: typeof toTransform['update']
  } & {
    [key in `get${T}`]: typeof toTransform['get']
  } & {
    [key in `get${T}s`]: typeof toTransform['getMany']
  } & {
    [key in `delete${T}`]: typeof toTransform['delete']
  }

  return toReturn
}
