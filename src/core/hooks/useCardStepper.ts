import { clamp } from 'core/helpers/math'
import { useEffect, useState } from 'react'
import { useSharedValue } from 'react-native-reanimated'
import invariant from 'tiny-invariant'

interface SliderStepSpec {
  fraction: number
}

export type SliderSteps = SliderStepSpec[]

export default function useSliderStepper({
  defaultValue,
  flatSteps,
  steps: _steps,
  defaultSteps,
}: {
  steps?: SliderStepSpec[]
  defaultSteps: SliderStepSpec[]

  /**
   * Whether steps are evenly spaced. Fixes reverse sliders
   */
  flatSteps?: boolean
  defaultValue?: number

  isNew?: boolean
}) {
  const steps = _steps ?? defaultSteps
  const stepsCount = typeof steps === 'number' ? steps : steps.length
  const [touched, setTouched] = useState(false)

  const stepForFraction = (fraction: number) => {
    fraction = clamp(fraction)
    let step = Math.round((steps.length - 1) * fraction)
    if (flatSteps) {
      step = steps
        .map((step) => step.fraction)
        .lastIndexOf(steps[step].fraction)
    }
    return step
  }
  const defaultIndex = defaultValue
    ? stepForFraction(defaultValue)
    : Math.round(stepsCount / 2)
  const [stepIndex, _setStepIndex] = useState(defaultIndex)
  const currSpec = () => {
    const spec = steps[stepIndex]
    invariant(spec, `No spec found for step ${stepIndex} in ${steps}`)
    return { ...spec }
  }

  const setStepIndex = (i: number) => {
    _setStepIndex(i)
    if (!touched) {
      setTouched(true)
    }
  }

  const animatedValue = useSharedValue(0)

  useEffect(() => {
    // When step changes, trigger animation
    if (flatSteps) {
      animatedValue.value =
        Math.round((stepIndex / (stepsCount - 1)) * 100) / 100
    } else {
      animatedValue.value = currSpec().fraction
    }
  }, [stepIndex])

  return {
    stepIndex: stepIndex,
    setStepIndex,
    currStep: steps[stepIndex],
    increment: () => setStepIndex(Math.min(stepIndex + 1, stepsCount - 1)),
    decrement: () => setStepIndex(Math.max(stepIndex - 1, 0)),
    get realFraction() {
      return stepIndex / (steps.length - 1)
    },
    animatedValue,
    stepForFraction,
    steps,
    defaultValue: steps[defaultIndex].fraction,
    setFraction: (fraction: number) => setStepIndex(stepForFraction(fraction)),
    touched,
  }
}
