import React from 'react'
import { Txt, Flex, Icon } from '@mtyk/frontend/core/components'
import { TouchableOpacity } from 'react-native'

interface HeaderButtonProps {}

export default function HeaderButton(props: HeaderButtonProps) {
  const { action, style, children } = props
  return (
    <TouchableOpacity onPress={action}>
      <Txt rowCenter bold color={'#7E6565'} style={{ ...style }}>
        {children}
      </Txt>
    </TouchableOpacity>
  )
}
