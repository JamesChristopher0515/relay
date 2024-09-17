import { Txt } from '@mtyk/frontend/core/components'
import React, { ComponentProps } from 'react'
import useEntityLink from 'relay-shared/entities/hooks/useEntityLink'
import { JourneyStop } from 'relay-shared/RelayTypes'
import invariant from 'tiny-invariant'

function MainTxt({ children, ...rest }) {
  // const isActive = !isUndefined(clientStop?.completedAt)
  return (
    <Txt color="#555" {...rest}>
      {children}
    </Txt>
  )
}

function EntityLinkTxt({ ...rest }: Parameters<typeof useEntityLink>[0]) {
  const { text } = useEntityLink(rest)
  return <>{text}</>
}

interface StopTxtClientProps extends ComponentProps<typeof Txt> {
  stop?: JourneyStop
}

export default function StopTxtClient({
  stop: _stop,
  ...rest
}: StopTxtClientProps) {
  const stop = _stop
  invariant(stop, 'Stop is required')

  if (stop.type === 'todo') {
    return (
      <MainTxt {...rest}>
        <Txt medium>{stop.data.name}</Txt>
      </MainTxt>
    )
  } else if (stop.type === 'questionnaire') {
    return (
      <MainTxt {...rest}>
        <EntityLinkTxt type="questionnaire" id={stop.data.questionnaire} />
      </MainTxt>
    )
  } else if (stop.type === 'content') {
    return (
      <MainTxt {...rest}>
        <EntityLinkTxt type="content" id={stop.data.content} />
      </MainTxt>
    )
  } else if (stop.type === 'delay') {
    return (
      <MainTxt {...rest}>
        Wait for <Txt medium>{stop.data.schedule}</Txt>
      </MainTxt>
    )
  } else if (stop.type === 'thinking-points') {
    return <MainTxt {...rest}>Thinking points</MainTxt>
  } else if (stop.type === 'review') {
    return <MainTxt {...rest}>Review point</MainTxt>
  } else if (stop.type === 'worksheet') {
    return (
      <MainTxt {...rest}>
        <EntityLinkTxt type="worksheet" id={stop.data.worksheet} />
      </MainTxt>
    )
  }

  throw new Error(`Unknown stop type`)
}
