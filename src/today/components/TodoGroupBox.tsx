import { Flex } from '@mtyk/frontend/core/components'
import { DefaultProps } from '@mtyk/frontend/native/MTYKNativeTypes'
import compose from '@mtyk/frontend/react/helpers/compose'
import { shadow } from '@mtyk/frontend/styles/helpers/styles'
import React, { ComponentProps } from 'react'

export interface TodoGroupBoxProps
  extends DefaultProps.Style,
    ComponentProps<typeof Flex> {
  children?: React.ReactNode
}
export interface TodoGroupBoxRefHandle {}

export default compose()(function TodoGroupBox(props: TodoGroupBoxProps) {
  const { children, ...rest } = props
  return (
    <Flex
      row
      justifyContent="flex-start"
      {...rest}
      style={{
        marginTop: 20,
        backgroundColor: `rgba(255, 255, 255, 1)`,
        borderRadius: 10,
        ...shadow(0, 4, 1, 1, '#E0DAD8'),
        ...rest.style,
      }}
    >
      {children}
    </Flex>
  )
})
