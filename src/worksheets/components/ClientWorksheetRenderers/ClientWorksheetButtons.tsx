import { Flex } from '@mtyk/frontend/core/components'
import compose from '@mtyk/frontend/react/helpers/compose'
import RelayButton from 'core/components/RelayButton'
import React from 'react'
import useClientShared from 'relay-shared/clients/hooks/useClientShared'
import ChatMessage from 'relay-shared/frontend/chat/components/ChatMessage'
import { WorksheetItemType } from 'relay-shared/RelaySchema'
import { ClientWorksheetItemRendererProps } from './ClientWorksheetItemRendererProps'

export interface ClientWorksheetMessageProps
  extends ClientWorksheetItemRendererProps {
  item: WorksheetItemType<'response-buttons'>
}
export interface ClientWorksheetMessageRefHandle {}

export default compose()(function ClientWorksheetMessage(
  props: ClientWorksheetMessageProps
) {
  const { item, onResponse, response, worksheet } = props
  const { data } = item
  const [user] = useClientShared()
  return (
    <Flex
      fw
      row
      wrap
      gap={10}
      justifyContent="flex-end"
      style={{ marginTop: 30, marginBottom: 30 }}
    >
      {data.buttons
        .filter((b) => (response ? b._id === response.data : true))
        .map((button) => {
          if (response?.complete) {
            return (
              <Flex grow>
                <ChatMessage
                  message={{ content: button.label, from: user._id }}
                  user={user}
                />
              </Flex>
            )
          }
          return (
            <RelayButton
              key={button._id}
              action={() => {
                onResponse(button._id, true)
              }}
            >
              {button.label}
            </RelayButton>
          )
        })}
    </Flex>
  )
})
