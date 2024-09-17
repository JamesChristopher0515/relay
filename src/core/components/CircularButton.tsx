import ScalingPressable from 'core/components/ScalingPressable'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import Icon from '@mtyk/frontend/core/components/Icon'
import React from 'react'
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects'
import { unifyStyles } from '@mtyk/frontend/react/helpers/unifyStyle'
import { DefaultNativeProps } from '@mtyk/frontend/native/MTYKNativeTypes'

function CircularButton({
  onPress: _onPress,
  action,
  icon,
  style,
  disabled,
  iconProps,
  children,
  size,
}: DefaultNativeProps & {
  disabled?: boolean
  action: () => void
  size?: number
  icon?: any
  iconProps?: any
  /** @deprecated Prefer `action` */
  onPress?: () => void
}) {
  const onPress = action ?? _onPress
  return (
    <Flex
      as={ScalingPressable}
      onPress={() => {
        if (!disabled) {
          onPress?.()
        }
      }}
      center
      style={[
        {
          backgroundColor: '#EAE2E2',
          borderRadius: 1000,
          opacity: disabled ? 0.5 : 1,
          ...makeSize(size ?? 40),
        },
        ...unifyStyles(style),
      ]}
    >
      <Icon
        icon={icon}
        size={15}
        {...iconProps}
        style={{
          ...iconProps?.style,
          color: '#969696',
        }}
      />
      {children ? (
        <Txt medium style={{ color: 'white', fontSize: 16 }}>
          {children}
        </Txt>
      ) : null}
    </Flex>
  )
}

export default CircularButton
