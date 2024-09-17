import { Flex, Txt } from '@mtyk/frontend/core/components'
import React from 'react'
import { Id } from '../../RelayTypes'
import useAppointmentInfo from '../hooks/useAppointmentInfo'

export interface VideoCallTimerProps {
  appointmentId: Id
  style?: any
}

function formatHHMMSS(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  let hours = Math.floor(totalSeconds / 3600).toString()
  if (hours === '0') {
    hours = ''
  }
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (totalSeconds % 60).toString().padStart(2, '0')
  return `${hours ? hours + ':' : ''}${minutes}:${seconds}`
}

export default function VideoCallTimer(props: VideoCallTimerProps) {
  const { appointmentId, ...rest } = props

  const info = useAppointmentInfo(appointmentId)
  const { msRemaining } = info

  const formattedTime =
    msRemaining < 0 ? formatHHMMSS(0) : formatHHMMSS(msRemaining)

  return (
    <Flex
      center
      style={{
        ...rest.style,
      }}
    >
      <Txt center color="white">
        {formattedTime}
      </Txt>
    </Flex>
  )
}
