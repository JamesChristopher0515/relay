"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCRUD = exports.getMany = exports._getMany = exports.getOne = exports.updater = exports.creator = void 0;
const _ = __importStar(require("lodash"));
const apiUrls_1 = require("../helpers/apiUrls");
const tagHelpers_1 = require("./tagHelpers");
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
const creator = (resource, opts) => {
    const resourcePath = (0, apiUrls_1.resourceToUrl)(resource);
    return {
        query: (data) => {
            return {
                url: `/${(0, apiUrls_1.plural)(resourcePath)}`,
                method: 'POST',
                data,
            };
        },
        invalidatesTags: () => invalidator(resource, opts),
    };
};
exports.creator = creator;
const possiblyOpenQueriesByResource = {};
const updater = (resource, opts, relayApiGetter) => {
    const { locallyUpdatable } = opts;
    const resourcePath = (0, apiUrls_1.resourceToUrl)(resource);
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
exports.updater = updater;
const getOne = (resource) => {
    const resourcePath = (0, apiUrls_1.resourceToUrl)(resource);
    return {
        query: id => {
            return {
                url: `/${resourcePath}/${id}`,
                method: 'GET',
            };
        },
        providesTags: tagHelpers_1.tagsForSingle.bind(null, resource),
    };
};
exports.getOne = getOne;
const _getMany = ({ resource, url, }) => {
    return {
        query: (params) => {
            possiblyOpenQueriesByResource[resource] = _.uniqBy((possiblyOpenQueriesByResource[resource] ?? []).concat(params), v => JSON.stringify(v));
            return {
                url,
                method: 'GET',
                params,
            };
        },
        providesTags: tagHelpers_1.tagsForMany.bind(null, resource),
    };
};
exports._getMany = _getMany;
const getMany = (resource) => {
    const resourcePath = (0, apiUrls_1.resourceToUrl)(resource);
    return (0, exports._getMany)({ resource, url: `/${(0, apiUrls_1.plural)(resourcePath)}` });
};
exports.getMany = getMany;
const generateCRUD = (relayApiGetter, builder, resource, resourceType, schemas, opts = {}) => {
    const toTransform = {
        create: builder.mutation((0, exports.creator)(resource, opts)),
        update: builder.mutation((0, exports.updater)(resource, opts, relayApiGetter)),
        get: builder.query((0, exports.getOne)(resource)),
        getMany: builder.query((0, exports.getMany)(resource)),
        delete: builder.mutation((() => {
            return {
                query: id => {
                    const url = `/${(0, apiUrls_1.resourceToUrl)(resource)}/${id}`;
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
exports.generateCRUD = generateCRUD;
//# sourceMappingURL=apiCrud.js.map