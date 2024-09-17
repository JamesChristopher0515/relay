import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import { assert } from '@mtyk/frontend/core/helpers'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import useAssignedResourceOpener from 'assigned-resource/hooks/useAssignedResourceOpener'
import { format } from 'date-fns'
import { pick } from 'lodash'
import Toast from 'react-native-root-toast'
import { isAppointmentValid } from 'relay-shared/appointments/helpers/getValidAppointmentTime'
import useTodo from 'relay-shared/frontend/todos/hooks/useTodo'
import idOrFromObj from 'relay-shared/models/helpers/idOrFromObj'
import { ClientTodo } from 'relay-shared/RelayTypes'
import TodoDetailsModal from 'todos/components/TodoDetailsModal'

export default makeController(function TodoController({
  todo: todoDoc,
  todoId,
  poll,
}: {
  useAssignedResourceOpener?: any
  poll?: boolean

  /**
   * @deprecated Should only use for the special "check-in" todo on native, but
   *   we need to find a less confusing way of doing this
   */
  todo?: ClientTodo & any
  todoId?: string
}) {
  const id = idOrFromObj(todoDoc ?? todoId)
  assert(typeof id === 'string', 'expected todo to be string')

  const queryOptions = {
    pollingInterval: poll ? 5000 : undefined,
  }

  const [_doc, { update }] = useTodo(id, queryOptions)
  const remoteDoc = _doc as ClientTodo & { onClick: any }

  const history = useHistory()
  const resource = {
    ...(remoteDoc?.assignedResource ?? {}),
    ...pick(remoteDoc ?? {}, ['content']),
  }
  const opener = useAssignedResourceOpener({ resource })
  const dec = useDecorationsContext()

  const isQuestionnaire = remoteDoc?.questionnaire
  const isWorksheet = remoteDoc?.worksheet
  const isAppointment = remoteDoc?.appointment
  const isContent = remoteDoc?.content
  const isCheckIn = id === 'dailyfeeling'
  const isBasic = !isQuestionnaire && !isWorksheet && !isContent

  const action = async () => {
    if (id === 'dailyfeeling') {
      history.push('/check-in')
      return
    }
    if (remoteDoc.appointment) {
      const canJoin = isAppointmentValid(remoteDoc.appointment)
      if (!canJoin) {
        const inPast =
          new Date(remoteDoc.appointment.date).getTime() < new Date().getTime()
        Toast.show(
          inPast
            ? `This appointment can no longer be joined`
            : `This appointment doesn't start until ${format(
              new Date(remoteDoc.appointment.date),
              'H:mm a'
            )}`
        )
        return
      }
      return history.push(`/appointment/${idOrFromObj(remoteDoc)}`)
    }
    if (remoteDoc.questionnaire) {
      if (remoteDoc.complete) {
        // return
      }
      return history.replace(`/questionnaire/${idOrFromObj(remoteDoc)}`)
    }
    if (remoteDoc.worksheet) {
      return history.replace(`/worksheet/${idOrFromObj(remoteDoc)}`)
    }
    if (remoteDoc.onClick) {
      remoteDoc.onClick()
    } else {
      const openable =
        remoteDoc.assignedResource?.type === 'content' ||
        remoteDoc.assignedResource?.type === 'thinking-points'

      if (openable) {
        const viewed = (await opener.open()) === true
        const shouldComplete = remoteDoc.complete || viewed
        await update({
          complete: shouldComplete,
        })
      } else {
        dec.openModal(TodoDetailsModal, { todoId: id })
      }
    }
  }

  const api = {
    complete: async (complete: boolean) => {
      await update({ complete })
    },
    action,
    isComplete: isCheckIn ? todoDoc!.complete : remoteDoc?.complete,
    isQuestionnaire,
    isWorksheet,
    isContent,
    isBasic,
    isAppointment,
    todo: remoteDoc,
  }
  return api
})
