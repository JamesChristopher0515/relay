import { clamp, fractionToPercentage } from 'core/helpers/math'
import useSliderStepper from 'core/hooks/useCardStepper'
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export interface SliderProps {
  labels?: string[]
  onDragEnd?: () => void
  style?: any
}

export const VerticalSliderConfig = {
  height: 300,
}

const VerticalSlider = forwardRef((props: SliderProps, ref) => {
  const { onDragEnd, ...rest } = props
  const {
    stepIndex: step,
    steps,

    animatedValue,
    setFraction,
  } = useSliderStepper({
    defaultSteps: [
      { fraction: 0 },
      { fraction: 1 / 3 },
      { fraction: 2 / 3 },
      { fraction: 1 },
    ],
    flatSteps: true,
    ...props,
  })

  const [dragging, setDragging] = useState(false)
  const [touched, setTouched] = useState(false)
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })

  // Separate aniamted value for knob to keep things as smooth as poss
  const knobValue = useSharedValue(0)
  useDerivedValue(() => {
    if (!dragging && !touched) {
      knobValue.value = withTiming(animatedValue.value, { duration: 150 })
    }
  }, [touched, dragging])

  useImperativeHandle(ref, () => {
    return {
      knobValue,
    }
  })
  const sliderRef = useRef<View>(null)
  const gestureHandler = useAnimatedGestureHandler(
    {
      onActive: (event, ctx) => {
        knobValue.value = clamp((event.absoluteY - layout.y) / layout.height)
        // Ensure we don't send "onAnswer" updates whenever the slider changes
        runOnJS(setFraction)(knobValue.value, true)
      },
      onStart: () => {
        // console.log('drag started')
        runOnJS(setDragging)(true)
        runOnJS(setTouched)(true)
      },
      onEnd: (event, ctx) => {
        runOnJS(setFraction)(knobValue.value)
        runOnJS(setDragging)(false)
        if (onDragEnd) {
          runOnJS(onDragEnd)()
        }
      },
    },
    [step, steps, layout]
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
    updateBounds()
    setTimeout(() => {
      updateBounds()
    }, 500)
  }, [])

  const knobStyle = useAnimatedStyle(() => {
    return {
      bottom: fractionToPercentage(knobValue.value),
    }
  })

  const fillStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: '#DDD2D2',
      height: withTiming(fractionToPercentage(knobValue.value), {
        duration: 150,
      }),
    }
  })

  const knobSize = 36
  return (
    <View ref={sliderRef} collapsable={false} style={{ ...rest.style }}>
      {/* Slider bg */}
      <View
        style={[
          {
            height: VerticalSliderConfig.height,
            width: 7,
            borderRadius: 100,
            backgroundColor: `#E5DDDD`,
            alignItems: 'stretch',
          },
        ]}
      >
        {/* Slider fill */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 100,
            },
            fillStyle,
          ]}
        />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            onTouchStart={() => setFraction(knobValue.value)}
            hitSlop={{ top: 10, bottom: 10, left: 20, right: 20 }}
            style={[
              {
                ...makeSize(knobSize),
                position: 'absolute',
                left: -knobSize * 0.4,
                transform: [{ translateX: -knobSize * 0.4 }],
                borderRadius: 100,
                backgroundColor: '#BBA9A9',
                alignItems: 'center',
                justifyContent: 'center',
              },
              knobStyle,
            ]}
          />
        </PanGestureHandler>
      </View>
    </View>
  )
})

export default VerticalSlider
