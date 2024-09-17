import {
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useGetTodoQuery,
  useUpdateTodoMutation,
} from '../../api/hooks/useApi'
import { Id, Todo } from '../../../RelayTypes'
import isObjectId from '../../../core/helpers/isObjectId'

export default function useTodo(id?: Id, opts: any = {}) {
  const { data: doc } = useGetTodoQuery(id!, {
    skip: typeof id !== 'string' || !isObjectId(id),
    ...opts,
  })
  const [updateMut] = useUpdateTodoMutation()
  const [remove] = useDeleteTodoMutation()
  const [create] = useCreateTodoMutation()
  return [
    doc as Todo,
    {
      create,
      update: async (update: Partial<Todo>) => updateMut({ id: id!, update }),
      remove: async () => remove(id!),
    },
  ] as const
}
