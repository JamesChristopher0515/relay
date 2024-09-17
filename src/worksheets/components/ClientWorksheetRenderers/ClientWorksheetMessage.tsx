import compose from '@mtyk/frontend/react/helpers/compose'
import React from 'react'
import useClientShared from 'relay-shared/clients/hooks/useClientShared'
import ChatMessage from 'relay-shared/frontend/chat/components/ChatMessage'
import { WorksheetItemType } from 'relay-shared/RelaySchema'
import { ClientWorksheetItemRendererProps } from './ClientWorksheetItemRendererProps'

export interface ClientWorksheetMessageProps
  extends ClientWorksheetItemRendererProps {
  item: WorksheetItemType<'message'>
}
export interface ClientWorksheetMessageRefHandle {}

export default compose()(function ClientWorksheetMessage(
  props: ClientWorksheetMessageProps
) {
  const { item } = props
  const { data } = item
  const [user] = useClientShared()
  return <ChatMessage message={{ content: data.message.trim() }} user={user} />
})
