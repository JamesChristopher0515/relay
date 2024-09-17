import EventListenable from '@mtyk/frontend/events/helpers/EventListener';
export default function useEventToState<E extends string, S>(obj: EventListenable<E>, event: E, listener?: (data: any) => S, defaultValue?: S): readonly [S | undefined];
//# sourceMappingURL=useEventToState.d.ts.map