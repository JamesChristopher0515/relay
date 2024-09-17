import { makeReanimated } from '@mtyk/frontend/native/animation/helpers/makeAnimated'
import passInheritedProps from '@mtyk/frontend/react/helpers/passInheritedProps'
import React from 'react'
import { Pressable } from 'react-native'
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const AnimatedPressable = makeReanimated(Pressable)

const ScalingPressable = React.forwardRef(
  ({ children, onPress, action, invert, ...rest }: any, ref) => {
    const buttonPressScale = useSharedValue(1)
    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [
          { scale: withTiming(buttonPressScale.value, { duration: 100 }) },
        ],
      }
    })

    return (
      <AnimatedPressable
        ref={ref}
        onPress={action ?? onPress}
        onPressIn={() => (buttonPressScale.value = 1 - 0.1)}
        onPressOut={() => (buttonPressScale.value = 1)}
        {...rest}
        {...passInheritedProps(rest, { style: animatedStyles })}
      >
        {children}
      </AnimatedPressable>
    )
  }
)

export default ScalingPressable
