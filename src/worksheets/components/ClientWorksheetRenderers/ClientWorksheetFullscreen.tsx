import { Flex } from '@mtyk/frontend/core/components'
import compose from '@mtyk/frontend/react/helpers/compose'
import useDimensions from '@mtyk/frontend/styles/hooks/useDimensions'
import { ConversationViewContext } from 'conversations/contexts/ConversationViewContext'
import RelayAvoidingView from 'core/components/RelayAvoidingView'
import React, { ReactNode, useContext } from 'react'

export interface ClientWorksheetFullscreenProps {
  top: ReactNode
  collapse?: boolean
  bottom: ReactNode
}
export interface ClientWorksheetFullscreenRefHandle {}

export default compose()(function ClientWorksheetFullscreen(
  props: ClientWorksheetFullscreenProps
) {
  const { top, bottom, collapse } = props
  const context = useContext(ConversationViewContext)
  // Use screen height as a backup, hopefully not necessary?
  const dimensions = useDimensions()
  const height = context?.height ?? dimensions?.height ?? 0
  return (
    <Flex
      style={collapse ? { marginBottom: 60 } : { height: height }}
      grow={0}
      shrink={0}
    >
      <Flex shrink={true} grow={!collapse}>
        {top}
      </Flex>
      <Flex style={{ width: '100%' }}>{bottom}</Flex>
    </Flex>
  )
})
