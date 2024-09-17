import { faLightbulb } from '@fortawesome/free-regular-svg-icons'
import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import { DefaultNativeProps } from '@mtyk/frontend/native/MTYKNativeTypes'
import React from 'react'

interface TipProps extends DefaultNativeProps {}

export default function Tip(props: TipProps) {
  const { children } = props
  return (
    <Flex rowCenter>
      <Flex columnCenter>
        <Icon icon={faLightbulb} />
        <Txt>Tip</Txt>
      </Flex>
      <Txt>{children}</Txt>
    </Flex>
  )
}
