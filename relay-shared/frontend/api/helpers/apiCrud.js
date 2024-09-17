import * as _ from 'lodash';
import { plural, resourceToUrl } from '../helpers/apiUrls';
import { tagsForMany, tagsForSingle } from './tagHelpers';
const invalidator = (resource, opts, id) => {
    const { locallyUpdatable, alsoInvalidates } = opts;
    const tags = [
        ...(id ? [{ type: resource, id }] : []),
        resource,
        // Make sure the user's own doc updates if we update via client/practitioner methods
        ...(resource === 'Client' || resource === 'Practitioner' ? ['User'] : []),
        ...(alsoInvalidates ?? []),
    ];
    console.log('Invalidating tags', tags);
    return tags;
};
export const creator = (resource, opts) => {
    const resourcePath = resourceToUrl(resource);
    return {
        query: (data) => {
            return {
                url: `/${plural(resourcePath)}`,
                method: 'POST',
                data,
            };
        },
        invalidatesTags: () => invalidator(resource, opts),
    };
};
const possiblyOpenQueriesByResource = {};
export const updater = (resource, opts, relayApiGetter) => {
    const { locallyUpdatable } = opts;
    const resourcePath = resourceToUrl(resource);
    return {
        query: ({ id, update }) => {
            return {
                url: `/${resourcePath}/${id}`,
                method: 'PATCH',
                data: update,
            };
        },
        invalidatesTags: ({ id }) => {
            return invalidator(resource, opts, id);
        },
        async onQueryStarted({ id, update }, { dispatch, queryFulfilled }) {
            const multiPatchResults = (possiblyOpenQueriesByResource[resource] ?? []).map(q => {
                return dispatch(relayApiGetter().util.updateQueryData(`get${resource}s`, q, draft => {
                    for (const o of draft?.data ?? []) {
                        if (o.id === id) {
                            Object.assign(o, _.pick(update, locallyUpdatable));
                        }
                    }
                }));
            });
            const patchResultOne = dispatch(relayApiGetter().util.updateQueryData(`get${resource}`, id, draft => {
                Object.assign(draft, _.pick(update, locallyUpdatable));
            }));
            try {
                await queryFulfilled;
            }
            catch (e) {
                console.error(e);
                for (const multi of multiPatchResults) {
                    multi.undo();
                }
                patchResultOne.undo();
            }
        },
    };
};
export const getOne = (resource) => {
    const resourcePath = resourceToUrl(resource);
    return {
        query: id => {
            return {
                url: `/${resourcePath}/${id}`,
                method: 'GET',
            };
        },
        providesTags: tagsForSingle.bind(null, resource),
    };
};
export const _getMany = ({ resource, url, }) => {
    return {
        query: (params) => {
            possiblyOpenQueriesByResource[resource] = _.uniqBy((possiblyOpenQueriesByResource[resource] ?? []).concat(params), v => JSON.stringify(v));
            return {
                url,
                method: 'GET',
                params,
            };
        },
        providesTags: tagsForMany.bind(null, resource),
    };
};
export const getMany = (resource) => {
    const resourcePath = resourceToUrl(resource);
    return _getMany({ resource, url: `/${plural(resourcePath)}` });
};
export const generateCRUD = (relayApiGetter, builder, resource, resourceType, schemas, opts = {}) => {
    const toTransform = {
        create: builder.mutation(creator(resource, opts)),
        update: builder.mutation(updater(resource, opts, relayApiGetter)),
        get: builder.query(getOne(resource)),
        getMany: builder.query(getMany(resource)),
        delete: builder.mutation((() => {
            return {
                query: id => {
                    const url = `/${resourceToUrl(resource)}/${id}`;
                    return {
                        url,
                        method: 'DELETE',
                    };
                },
                invalidatesTags: [resource, ...(opts.alsoInvalidates ?? [])],
            };
        })()),
    };
    const toReturn = _.mapKeys(toTransform, (value, key) => {
        if (key === 'getMany') {
            return `get${resource}s`;
        }
        return `${key}${resource}`;
    });
    return toReturn;
};
//# sourceMappingURL=apiCrud.js.map