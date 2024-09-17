import { parseDates } from '@mtyk/frontend/core/helpers';
import assert from '@mtyk/frontend/core/helpers/assertDefined';
import * as api from '../../frontend/api/hooks/useApi';
export default function useSingleResource(resource, id) {
    const getSingle = api[`useGet${resource}Query`];
    // const getMany = api[`useGet${resource}sQuery`]
    const [update] = api[`useUpdate${resource}Mutation`]();
    const [create] = api[`useCreate${resource}Mutation`]();
    const [remove] = api[`useDelete${resource}Mutation`]();
    const { data: d, ...rest } = getSingle(resource, {
        skip: !id || id === 'new',
    });
    return [
        parseDates(d),
        {
            ...rest,
            create,
            update,
            remove: () => {
                assert(id);
                remove(id);
            },
        },
    ];
}
//# sourceMappingURL=useSingleResource.js.map