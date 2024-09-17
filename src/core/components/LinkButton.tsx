import { Flex, Txt } from '@mtyk/frontend/core/components'
import Icon, { MTYKIcon } from '@mtyk/frontend/core/components/Icon'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import { DefaultNativeProps } from '@mtyk/frontend/native/MTYKNativeTypes'
import { unifyStyles } from '@mtyk/frontend/react/helpers/unifyStyle'
import React from 'react'
import ScalingPressable from './ScalingPressable'

function LinkButton({
  iconProps,
  onPress,
  icon,
  href,
  children,
  style,
  textProps,
}: {
  onPress?: any
  icon?: MTYKIcon
  iconProps?: any
  textProps?: any
  href?: string
} & DefaultNativeProps) {
  const history = useHistory()
  return (
    <ScalingPressable
      onPress={
        onPress ??
        (() => {
          history.push(href)
        })
      }
      style={unifyStyles(style)}
    >
      <Flex gap={10} rowCenter>
        {icon ? <Icon color={'#34b4c7'} icon={icon} {...iconProps} /> : null}
        <Txt
          medium
          style={{
            color: '#34b4c7',
            fontSize: style?.fontSize ?? 13,
            ...textProps?.style,
          }}
        >
          {children}
        </Txt>
      </Flex>
    </ScalingPressable>
  )
}

export default LinkButton
