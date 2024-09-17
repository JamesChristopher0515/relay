import isHelpfulAudioStatus from 'content/helpers/isHelpfulAudioStatus'
import msToString from 'content/helpers/msToString'
import useMediaPlayer from 'content/hooks/useMediaPlayer'
import { clamp, fractionToPercentage } from 'core/helpers/math'
import { isNumber } from 'lodash'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import { DefaultNativeProps } from '@mtyk/frontend/native/MTYKNativeTypes'
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects'
import { allCorners } from '@mtyk/frontend/styles/helpers/styles'
import { useInterval } from '@mtyk/frontend/timing/hooks/useInterval'
import React, { useEffect, useRef, useState } from 'react'
import { TextInput, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
const knobSize = 36

interface MediaPlayerControls extends DefaultNativeProps {
  expanded?: boolean
}

const MediaPlayerControls = ({ expanded, ...rest }: MediaPlayerControls) => {
  const [dragging, setDragging] = useState(false)
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })
  const [msLeft, setMsLeft] = useState(0)
  const [msIn, setMsIn] = useState(0)

  const tooltipTextRef = useRef() as React.MutableRefObject<TextInput>

  const playerContext = useMediaPlayer((status) => {})
  const { latestStatus } = playerContext

  function updateControlsForLatestStatus() {
    if (isHelpfulAudioStatus(latestStatus.current)) {
      const status = latestStatus.current
      if (isNumber(status.durationMillis)) {
        const left = Math.max(status.durationMillis - status.positionMillis)
        setMsLeft(left)
        setMsIn(status.positionMillis)
        if (!dragging) {
          knobValue.value = status.positionMillis / status.durationMillis
        }
      }
      if (
        isNumber(status.playableDurationMillis) &&
        isNumber(status.durationMillis)
      ) {
        playableValue.value =
          status.playableDurationMillis / status.durationMillis
      }
    }
  }

  useInterval(updateControlsForLatestStatus, 500)

  const color = '#725353'
  const setFraction = (fraction: number, whatdoesitdo?: boolean) => {
    // console.log({ fraction, status: latestStatus.current })
    if (isHelpfulAudioStatus(latestStatus.current)) {
      const status = latestStatus.current
      if (typeof status.durationMillis === 'number') {
        playerContext.setPosition(status.durationMillis * fraction)
      }
    }
  }

  function updateTooltipValueWhileDragging(fraction: number) {
    if (
      tooltipTextRef.current &&
      isHelpfulAudioStatus(latestStatus.current) &&
      isNumber(latestStatus.current.durationMillis)
    ) {
      const status = latestStatus.current
      const through = status.durationMillis * fraction
      // console.log({ through, duration: status.durationMillis, fraction })
      tooltipTextRef.current.setNativeProps({
        text: msToString(through),
      })
    }
  }

  const playableValue = useSharedValue(0)
  const knobValue = useSharedValue(0)
  const sliderRef = useRef<View>(null)
  const gestureHandler = useAnimatedGestureHandler(
    {
      onActive: (event, ctx) => {
        if (expanded) {
          const fraction = clamp((event.absoluteX - layout.x) / layout.width)
          knobValue.value = fraction
          runOnJS(updateTooltipValueWhileDragging)(fraction)
        }
      },
      onStart: () => {
        if (expanded) {
          runOnJS(setDragging)(true)
        }
      },
      onEnd: (event, ctx) => {
        if (expanded) {
          runOnJS(setFraction)(knobValue.value)
          runOnJS(setDragging)(false)
        }
      },
    },
    [layout, setFraction, expanded]
  )

  const updateBounds = () => {
    if (sliderRef.current) {
      sliderRef.current.measureInWindow(
        (x: number, y: number, width: number, height: number) => {
          setLayout({ x, y, width, height })
        }
      )
    }
  }

  useEffect(() => {
    updateControlsForLatestStatus()
    updateBounds()
    setTimeout(() => {
      updateBounds()
    }, 500)
  }, [])

  const knobStyle = useAnimatedStyle(() => {
    const availableWidth = layout.width - knobSize
    return {
      opacity: expanded ? 1 : 0,
      left: availableWidth * knobValue.value,
    }
  }, [layout, expanded])

  const tooltipStyle = useAnimatedStyle(() => {
    const distanceFromCenter = Math.abs(0.5 - knobValue.value)
    const offset = Math.max(0, distanceFromCenter - 0.4) * 10
    const signedOffset = offset * (knobValue.value > 0.5 ? -1 : 1)

    return {
      transform: [
        {
          scale: withTiming(dragging ? 1 : 0, { duration: 100 }),
        },
        {
          translateX: signedOffset * 35,
        },
      ],
    }
  }, [dragging, true])

  const loadedFill = useAnimatedStyle(() => {
    return {
      backgroundColor: 'rgba(0, 0, 0, 0.15)',
      width: withTiming(fractionToPercentage(playableValue.value), {
        duration: 150,
      }),
    }
  })
  const fillStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: color,
      width: withTiming(fractionToPercentage(knobValue.value), {
        duration: 150,
      }),
    }
  })

  return (
    <View ref={sliderRef} collapsable={false} style={[{}, rest.style || {}]}>
      {/* Slider bg */}
      <View
        style={[
          {
            height: 4,
            width: '100%',
            backgroundColor: `#E5DDDD`,
            alignItems: 'stretch',
          },
        ]}
      >
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 0,
              top: 0,
            },
            loadedFill,
          ]}
        />
        {/* Slider fill */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 0,
              top: 0,
            },
            fillStyle,
          ]}
        />

        {/* Knob */}
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            hitSlop={{ ...allCorners(30) }}
            style={[
              {
                ...makeSize(knobSize),
                position: 'absolute',
                top: -knobSize * 0.4,
                borderRadius: 100,
                backgroundColor: '#BBA9A9',
                alignItems: 'center',
                justifyContent: 'center',
              },
              knobStyle,
            ]}
          >
            {isHelpfulAudioStatus(latestStatus.current) &&
            typeof latestStatus.current.durationMillis === 'number' ? (
              <Animated.View
                style={[
                  {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    position: 'absolute',
                    alignSelf: 'center',
                    borderRadius: 8,
                    flexGrow: 1,
                    width: 90,
                    top: -50,
                    justifyContent: 'center',
                    height: 30,
                    alignItems: 'center',
                  },
                  tooltipStyle,
                ]}
              >
                <TextInput
                  ref={tooltipTextRef}
                  style={{
                    fontFamily: 'Manrope_400Regular',
                    fontSize: 19,
                    textAlign: 'center',
                    color: 'white',
                  }}
                />
              </Animated.View>
            ) : null}
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  )
}

export default MediaPlayerControls
