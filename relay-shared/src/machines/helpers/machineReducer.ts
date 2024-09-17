import { TransitionHandle } from '@mtyk/universe/dist/cjs/universe/state/IStateDesc'

export default function machineReducer<T, R>(
  fn: (context: any, arg: T, handle: TransitionHandle) => R
) {
  return (async (arg: T, handle: TransitionHandle) => {
    return fn(handle.currentState.context, arg, handle)
  }) as any
}
