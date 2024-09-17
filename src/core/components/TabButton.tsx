import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import { MTYKIcon } from '@mtyk/frontend/core/components/Icon'
import { assert } from '@mtyk/frontend/core/helpers'
import { DefaultNativeProps } from '@mtyk/frontend/native/MTYKNativeTypes'
import { unifyStyles } from '@mtyk/frontend/react/helpers/unifyStyle'
import ScalingPressable from 'core/components/ScalingPressable'
import React from 'react'

function TabButton({
  label,
  isActive,
  children,
  onPress: _onPress,
  textStyle,
  icon,
  iconStyle,
  action,
  iconOnRight,
  disabled,
  secondary,
  style,
}: DefaultNativeProps & {
  label?: string
  isActive?: boolean
  icon?: MTYKIcon
  iconOnRight?: boolean
  secondary?: boolean
  textStyle?: any
  disabled?: boolean
  iconStyle?: any
  action?: Function
  /** @deprecated Prefer `action` */ onPress?: Function
}) {
  const onPress = _onPress ?? action
  assert(
    typeof onPress === 'function',
    'TabButton requires either `onPress` or `action`'
  )

  const renderIcon = () => {
    const margin = 6
    return icon ? (
      <Icon
        size={13}
        icon={icon}
        color={iconStyle?.color}
        style={[
          {
            marginRight: iconOnRight ? 0 : margin,
            marginLeft: iconOnRight ? margin : 0,
          },
          iconStyle ?? {},
        ]}
      />
    ) : null
  }
  return (
    <Flex
      rowCenter
      as={ScalingPressable}
      onPress={onPress}
      padding={[5, 12]}
      gap={icon ? 5 : 0}
      style={[
        {
          opacity: disabled ? 0.3 : 1,
          borderRadius: 18,
          backgroundColor: isActive
            ? secondary
              ? '#bbb'
              : '#849C8F'
            : 'transparent',
        },
        ...unifyStyles(style),
      ]}
    >
      {icon && !iconOnRight ? renderIcon() : null}
      <Txt
        bold
        style={[
          {
            color: isActive ? '#FFF0F0' : '#B5A0A0',
            fontSize: style?.fontSize ?? 14,
          },
          textStyle ?? {},
        ]}
      >
        {label ?? children}
      </Txt>
      {icon && iconOnRight ? renderIcon() : null}
    </Flex>
  )
}

export default TabButton
