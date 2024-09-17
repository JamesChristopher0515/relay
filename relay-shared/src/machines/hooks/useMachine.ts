import { IMachine } from '@mtyk/machine'
import { useLayoutEffect, useState } from 'react'

export function useObservable(observable$, initialValue) {
  const [value, update] = useState(initialValue)
  useLayoutEffect(
    function () {
      const s = observable$.subscribe(update)
      return () => s.unsubscribe()
    },
    [observable$]
  )
  return value
}

export function useMachine<M extends IMachine>(machine: M) {
  const asObservable = useObservable(machine.state, machine._state)
  const transitioning = useObservable(machine.isTransitioning, false)

  // If there's an error, pretend the state is the state before the error occured
  // and return the error separately for UX purposes
  const error = asObservable.context.error?.error

  return {
    ...asObservable,
    ...asObservable.context,
    transition: (newStateKey: keyof M['states'], data: any) =>
      machine.transition(newStateKey, data),
    is: (stateQ: keyof M['states']) => asObservable.state === stateQ,
    error,
    isError: !!error,
    transitioning,
  }
}

export default useMachine
