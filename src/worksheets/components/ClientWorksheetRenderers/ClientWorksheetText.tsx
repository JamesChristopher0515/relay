import { Flex } from '@mtyk/frontend/core/components'
import compose from '@mtyk/frontend/react/helpers/compose'
import RelayButton from 'core/components/RelayButton'
import React from 'react'
import useClientShared from 'relay-shared/clients/hooks/useClientShared'
import ChatMessage from 'relay-shared/frontend/chat/components/ChatMessage'
import { WorksheetItemType } from 'relay-shared/RelaySchema'
import ClientWorksheetResponseInput from '../ClientWorksheetResponseInput'
import { ClientWorksheetItemRendererProps } from './ClientWorksheetItemRendererProps'

export interface ClientWorksheetMessageProps
  extends ClientWorksheetItemRendererProps {
  item: WorksheetItemType<'response-text'>
}
export interface ClientWorksheetMessageRefHandle {}

export default compose()(function ClientWorksheetMessage(
  props: ClientWorksheetMessageProps
) {
  const { item, response, onResponse, worksheet } = props
  const { data } = item
  const [client] = useClientShared()
  if (response?.complete) {
    return (
      <ChatMessage message={{ content: response.data }} user={client._id} />
    )
  }
  return (
    <Flex>
      <ClientWorksheetResponseInput
        value={response?.data ?? ''}
        onChangeText={(value, submit) => {
          onResponse(value, submit ?? false)
        }}
      />
    </Flex>
  )
})
