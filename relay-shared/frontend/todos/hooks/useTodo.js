import { useCreateTodoMutation, useDeleteTodoMutation, useGetTodoQuery, useUpdateTodoMutation, } from '../../api/hooks/useApi';
import isObjectId from '../../../core/helpers/isObjectId';
export default function useTodo(id, opts = {}) {
    const { data: doc } = useGetTodoQuery(id, {
        skip: typeof id !== 'string' || !isObjectId(id),
        ...opts,
    });
    const [updateMut] = useUpdateTodoMutation();
    const [remove] = useDeleteTodoMutation();
    const [create] = useCreateTodoMutation();
    return [
        doc,
        {
            create,
            update: async (update) => updateMut({ id: id, update }),
            remove: async () => remove(id),
        },
    ];
}
//# sourceMappingURL=useTodo.js.map