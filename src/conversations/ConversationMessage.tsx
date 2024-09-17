import { Flex } from '@mtyk/frontend/core/components'
import nonEmptyStr from '@mtyk/frontend/strings/helpers/nonEmptyStr'
import React, { createElement, ReactNode } from 'react'
import useClientShared from 'relay-shared/clients/hooks/useClientShared'
import ChatMessage from 'relay-shared/frontend/chat/components/ChatMessage'
import { ConversationResponseManual } from './RelayConversationTypes'

export interface ConversationMessageProps {
  response: ConversationResponseManual<any>
  children?: any
  isLast: boolean
}

export default function ConversationMessage(props: ConversationMessageProps) {
  const [client] = useClientShared()
  const {
    response: { text, response: innerResponse, node, component },
    children,
    isLast,
  } = props

  return (
    <Flex>
      {nonEmptyStr(text) ? (
        <ChatMessage message={{ from: 'relay', content: text }} user={client} />
      ) : null}
      {nonEmptyStr(innerResponse) ? (
        <OurMessage>{innerResponse}</OurMessage>
      ) : null}
      {node}
      {component ? createElement(component, { isLast }) : null}
    </Flex>
  )
}
export function OurMessage({
  children,
  ...rest
}: {
  children: ReactNode
  style?: any
}) {
  const [client] = useClientShared()
  return (
    <ChatMessage
      user={client}
      message={{
        _id: 'id',
        content: children,
        from: client._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }}
      {...rest}
    />
  )
}

export function TheirsMessage({
  children,
  _id,
}: {
  _id: string
  children: string
}) {
  const [client] = useClientShared()

  return (
    <ChatMessage
      user={client}
      message={{
        _id,
        content: children,
        from: client._id + 'relay',
        createdAt: new Date(),
        updatedAt: new Date(),
      }}
    />
  )
}
