import React, { useEffect } from 'react'
import VideoCallMachine from 'relay-shared/appointments/machines/VideoCallMachine'
import useWrappedAxiosShared from 'relay-shared/core/hooks/useWrappedAxiosShared'
import { useGetTodoQuery } from 'relay-shared/frontend/api/hooks/useApi'
import useMachine from 'relay-shared/machines/hooks/useMachine'
import ClientVideoCall from './ClientVideoCall'

export interface AppointmentPageProps {}
export interface AppointmentPageRefHandle {}

export default function AppointmentPage(props: { match: any }) {
  const { match } = props
  const { id: todoId } = match.params
  const { data: todo } = useGetTodoQuery(todoId)
  const axios = useWrappedAxiosShared()

  const callMachine = useMachine(VideoCallMachine)
  useEffect(() => {
    if (todo?.appointmentId) {
      callMachine.transition('got_token', {
        axios,
        appointmentId: todo.appointmentId,
      })
    }
  }, [todo?.appointmentId])

  if (callMachine.is('got_token')) {
    const { token, roomName } = callMachine.context
    return (
      <ClientVideoCall
        appointmentId={todo.appointmentId}
        token={token}
        roomName={roomName}
      />
    )
  }
  return null
}
