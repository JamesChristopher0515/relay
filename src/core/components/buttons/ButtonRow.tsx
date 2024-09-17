import React from 'react'
import { Txt, Flex, Icon } from '@mtyk/frontend/core/components'
import { DefaultNativeProps } from '@mtyk/frontend/native/MTYKNativeTypes'

interface ButtonRowProps extends DefaultNativeProps {}

export default function ButtonRow(props: ButtonRowProps) {
  const { children, ...rest } = props
  return (
    <Flex
      rowCenter
      gap={10}
      // justifyContent="flex-end"
      {...rest}
      style={{ ...rest.style }}
    >
      {children}
    </Flex>
  )
}
