import { clamp, fractionToPercentage } from 'core/helpers/math'
import useSliderStepper from 'core/hooks/useCardStepper'
import { Txt } from '@mtyk/frontend/core/components'
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
  defaultValue?: number
  onDragEnd?: ({ stepIndex: number }) => void
  style?: any
}

const Slider = forwardRef((props: SliderProps, ref) => {
  const { onDragEnd, ...rest } = props
  const {
    stepIndex: step,
    steps,
    defaultValue,
    animatedValue,
    stepForFraction,
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
      setRawFraction: (fraction) => {
        setFraction(fraction)
        knobValue.value = fraction
        animatedValue.value = fraction
      },
      resetToDefault: () => {
        setFraction(defaultValue)
        knobValue.value = withTiming(defaultValue, { duration: 150 })
        animatedValue.value = withTiming(defaultValue, { duration: 150 })
      },
      stepIndex: step,
      rawFraction: knobValue.value,
    }
  })

  function onDragEndLocal(value) {
    const stepIndex = stepForFraction(value)
    const obj = { stepIndex }
    if (onDragEnd) {
      onDragEnd(obj)
    }
  }

  const sliderRef = useRef<View>(null)
  const gestureHandler = useAnimatedGestureHandler(
    {
      onActive: (event, ctx) => {
        knobValue.value = clamp((event.absoluteX - layout.x) / layout.width)
        // Ensure we don't send "onAnswer" updates whenever the slider changes
        runOnJS(setFraction)(knobValue.value)
      },
      onStart: () => {
        // console.log('drag started')
        runOnJS(setDragging)(true)
        runOnJS(setTouched)(true)
      },
      onEnd: (event, ctx) => {
        runOnJS(setFraction)(knobValue.value)
        runOnJS(setDragging)(false)
        runOnJS(onDragEndLocal)(knobValue.value)
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
      left: fractionToPercentage(knobValue.value),
    }
  })

  const tooltipStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: withTiming(dragging ? 1 : 0, { duration: 100 }) },
        {
          translateX:
            animatedValue.value < 0.2
              ? 50
              : animatedValue.value > 0.8
              ? -50
              : 0,
        },
      ],
    }
  }, [dragging])

  const fillStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: '#DDD2D2',
      width: withTiming(fractionToPercentage(knobValue.value), {
        duration: 150,
      }),
    }
  })

  const knobSize = 36
  const label =
    (props.labels ?? [
      '',
      'A lot',
      'Quite a bit',
      'A little bit',
      'Not at all',
    ])[step] ?? 'No label'

  return (
    <View ref={sliderRef} collapsable={false} style={{ ...rest.style }}>
      {/* Slider bg */}
      <View
        style={[
          {
            height: 7,
            width: '100%',
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
              top: 0,
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
                top: -knobSize * 0.4,
                transform: [{ translateX: -knobSize * 0.4 }],
                borderRadius: 100,
                backgroundColor: '#BBA9A9',
                alignItems: 'center',
                justifyContent: 'center',
              },
              knobStyle,
            ]}
          >
            <Animated.View
              style={[
                {
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  position: 'absolute',
                  alignSelf: 'center',
                  borderRadius: 8,
                  flexGrow: 1,
                  width: 150,
                  top: -50,
                  justifyContent: 'center',
                  height: 30,
                  alignItems: 'center',
                },
                tooltipStyle,
              ]}
            >
              <Txt medium center color={'white'} size={16}>
                {label}
              </Txt>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </View>
  )
})

export default Slider
