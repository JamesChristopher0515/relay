import { useRef } from 'react'
import { RelayActionCreator } from '../RelayFrontendTypes'

/**
 * Pass a bunch of functions tha require hooks. It then returns a function that
 * you can pass initial action fns to, and it will call them with their hook state
 *
 * See exapmles of usage in codebase to get more clarity
 */
export default function useRelayActionDispatch(
  ...actionCreators: RelayActionCreator[]
) {
  // Run the containing function for the action creator and store any context it creates
  const actionCreatorResults = actionCreators.map((a) => a())

  return function makeDispatchableAction(
    creatorAlreadyPassed: RelayActionCreator,
    ...args: any[]
  ) {
    const actionIndex = actionCreators.indexOf(creatorAlreadyPassed)
    if (actionIndex === -1) {
      throw new Error(
        `Action "${creatorAlreadyPassed.name}" was not passed to "${useRelayActionDispatch.name}()" on component mount`
      )
    }
    return function dispatch() {
      const actionContext = actionCreatorResults[actionIndex]
      return actionContext(...args)
    }
  }
}
