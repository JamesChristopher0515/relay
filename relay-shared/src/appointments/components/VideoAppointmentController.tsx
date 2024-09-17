import { Flex, Txt } from '@mtyk/frontend/core/components'
import { useAsyncEffect } from '@mtyk/frontend/react'
import { absoluteFill } from '@mtyk/frontend/styles/helpers/styleObjects'
import React from 'react'
import useWrappedAxiosShared from '../../core/hooks/useWrappedAxiosShared'
import { useMachine } from '../../machines/hooks/useMachine'
import VideoCallMachine from '../machines/VideoCallMachine'

export default function VideoAppointmentController(props: {
  appointmentId: string
  Component: React.ComponentType<{
    roomName: string
    token: string
    appointmentId: string
  }>
}) {
  const { appointmentId, Component } = props
  const machine = useMachine(VideoCallMachine)
  const axios = useWrappedAxiosShared()

  useAsyncEffect(async () => {
    if (appointmentId) {
      await VideoCallMachine.transition('got_token', { appointmentId, axios })
    }
  }, [appointmentId])

  if (machine.is('got_token')) {
    const { roomName, token } = machine.context
    return (
      <Component
        roomName={roomName}
        token={token}
        appointmentId={appointmentId}
      />
    )
  } else {
    if (machine.error) {
      return (
        <Flex style={{ ...absoluteFill() }} center>
          <Txt>This appointment cannot be joined at this time.</Txt>
        </Flex>
      )
    }
    return null
  }
}
