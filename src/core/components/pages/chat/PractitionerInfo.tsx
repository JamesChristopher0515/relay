import LinkButton from 'core/components/LinkButton'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import React from 'react'

export function PractitionerInfo({ practitioner, showAvailability }) {
  const dec = useDecorationsContext()
  return (
    <Flex column>
      <Txt style={{ fontSize: 12, color: '#555' }}>Chatting with</Txt>
      <Txt style={{ fontSize: 16 }} numberOfLines={1}>
        {practitioner.name}
      </Txt>
      <LinkButton style={{ marginTop: 7 }} onPress={showAvailability}>
        View Availability
      </LinkButton>
    </Flex>
  )
}
