import { rInterp } from "core/helpers/animation/interp"
import { useEffect } from "react"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

export default function useSimpleAnimation(makeStyles: (obj: { delta: number, deltaIn: number, deltaOut: number, interp: any }) => any, { delta: customDelta, transitionIn, deltaIn, deltaOut }: {
    transitionIn?: boolean | number,
    delta?: Animated.SharedValue<number>
    deltaIn?: Animated.SharedValue<number>
    deltaOut?: Animated.SharedValue<number>
}) {
    const delta = useSharedValue(0)
    const localDeltaIn = useSharedValue(0)
    const localDeltaOut = useSharedValue(0)

    const _deltaIn = deltaIn ?? localDeltaIn
    const _deltaOut = deltaOut ?? localDeltaOut

    useEffect(() => {
        if (typeof transitionIn !== 'undefined') {
            _deltaIn.value = typeof transitionIn === 'number'
                ? transitionIn
                : withTiming(1, { duration: 500 })
        }
        if (typeof transitionIn !== 'undefined') {
            delta.value = typeof transitionIn === 'number'
                ? transitionIn
                : withTiming(1, { duration: 500 })
        }
    }, [])

    const styles = useAnimatedStyle(() => {
        return makeStyles({
            delta: delta.value,
            deltaIn: _deltaIn.value,
            deltaOut: _deltaOut.value,
            interp: (min: number, max: number) => rInterp(delta.value, min, max)
        })
    })

    return {
        styles,
        delta
    }
}