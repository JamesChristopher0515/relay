import { useInterval } from '@mtyk/frontend/timing/hooks/useInterval'
import React from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export function ProgressBar({
  value,
  height: _height,
  color,
}: {
  height?: number
  color?: string
  value?: number
}) {
  const progressValue = useSharedValue(0)
  const duration = 1800

  const hasValue = typeof value === 'number'
  useInterval(() => {
    if (!hasValue) {
      progressValue.value = 0
      progressValue.value = withTiming(1, { duration })
    }
  }, duration)

  const barStyles = useAnimatedStyle(() => {
    if (hasValue) {
      return {
        width: withTiming(value * 100, { duration }),
      }
    }
    return {
      width: progressValue.value * 100 + '%',
    }
  }, [])

  const height = _height ?? 3
  return (
    <Animated.View
      style={{ height, width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: color ?? '#6d6767',
            opacity: 0.5,
            height,
          },
          barStyles,
        ]}
      />
    </Animated.View>
  )
}
