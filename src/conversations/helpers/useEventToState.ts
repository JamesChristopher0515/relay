import EventListenable from '@mtyk/frontend/events/helpers/EventListener'
import { useEffect, useState } from 'react'

export default function useEventToState<E extends string, S>(
  event: E,
  obj?: EventListenable<E>,
  listener?: (data: any) => S,
  defaultValue?: S
) {
  const [state, setState] = useState<S | undefined>(defaultValue)
  useEffect(() => {
    return obj?.listen(event, (event, data) => {
      setState(listener?.(data) ?? data)
    })
  }, [obj])
  return [state] as const
}
