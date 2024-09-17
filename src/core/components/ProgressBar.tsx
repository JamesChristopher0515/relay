import React from 'react'
import { useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import { AnimatedFlex } from '@mtyk/frontend/native/animation/components/AnimatedComponents'
import { absoluteFill } from '@mtyk/frontend/styles/helpers/styleObjects'
import unifyStyle from '@mtyk/frontend/react/helpers/unifyStyle'
import { DefaultNativeProps } from '@mtyk/frontend/native/MTYKNativeTypes'
import { clamp } from '@mtyk/frontend/native/animation/helpers/interp'

function ProgressBar({
  value,
  color,
  backgroundColor,
  style,
}: DefaultNativeProps & {
  value: number
  color?: string
  backgroundColor?: string
}) {
  const innerStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(clamp(value) * 100 + '%', { overshootClamping: true }),
    }
  })

  return (
    <Flex
      style={[
        {
          width: 80,
          height: 5,
          borderRadius: 1000,
          backgroundColor: backgroundColor ?? '#DDD',
          overflow: 'hidden',
        },
        ...unifyStyle(style),
      ]}
    >
      <AnimatedFlex
        style={[
          { backgroundColor: color ?? '#4AD3E7', ...absoluteFill() },
          innerStyle,
        ]}
      ></AnimatedFlex>
    </Flex>
  )
}

export default ProgressBar
