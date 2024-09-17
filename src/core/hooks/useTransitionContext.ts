import React, { createContext, useContext } from 'react'
import Animated from 'react-native-reanimated'

interface Context {
    deltaIn: Animated.SharedValue<number>
    deltaOut: Animated.SharedValue<number>
}

export const TransitionContext = createContext<Partial<Context>>({})

const useTransitionContext = () => useContext(TransitionContext)
export const useDefiniteTransitionContext = () => useContext(TransitionContext) as Context

export default useTransitionContext