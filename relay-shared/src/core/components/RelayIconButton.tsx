import { Flex, Icon } from '@mtyk/frontend/core/components'
import { MTYKIcon } from '@mtyk/frontend/core/components/Icon'
import { circle } from '@mtyk/frontend/styles/helpers/styleObjects'
import { shadow } from '@mtyk/frontend/styles/helpers/styles'
import HoverableThing from '@mtyk/frontend/tooltips/components/HoverableThing'
import React, { forwardRef } from 'react'

export interface IconButtonProps {
  icon: MTYKIcon
  action: (event: any) => void
  label: string
  iconProps?: any
  transparent?: boolean
  rightClickAction?: () => void
  style?: any
  accent?: boolean
  disabled?: boolean
}

export default forwardRef(function IconButton(props: IconButtonProps, ref) {
  const { icon, iconProps, label, action, transparent, rightClickAction } =
    props
  return (
    <HoverableThing tooltip={label}>
      <Flex
        ref={ref}
        center
        onClick={action}
        onContextMenu={(event) => {
          if (rightClickAction) {
            event.preventDefault()
            rightClickAction()
          }
        }}
        style={{
          ...circle('2em'),
          ...(transparent ? {} : shadow()),
          opacity: props.disabled ? 0.5 : 1,
          userSelect: 'none',
          cursor: 'pointer',
          ...props.style,
        }}
      >
        <Icon
          icon={icon}
          color={props.accent ? 'white' : '#444'}
          {...iconProps}
        />
      </Flex>
    </HoverableThing>
  )
})
