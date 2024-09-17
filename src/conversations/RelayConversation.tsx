/* eslint-disable react/display-name */
import { mapValues } from 'lodash'
import {
  ResponderFunction,
  ResponderFunctionManual,
} from 'relay-shared/conversations/RelayConversationTypes'
import {
  RelayConversationOptions,
  ResponderType,
  ResponseMap,
} from './RelayConversationTypes'
import { wrapResponderWithIds } from './wrapResponderWithIds'

export default abstract class RelayConversation<
  T extends ResponseMap = any,
  S = any
> {
  get name() {
    return this.opts.name
  }
  get icon() {
    return this.opts.icon
  }
  constructor(private readonly opts: RelayConversationOptions<T>) {}

  get entryPoint() {
    const point =
      this.responders[this.defaultResponder ?? Object.keys(this.responders)[0]]
    return point
  }

  abstract defaultResponder: keyof T | undefined
  abstract get defaultState(): S

  _responders: (T & Record<string, ResponderFunction<any, any>>) | undefined
  get responders(): T {
    if (!this._responders) {
      this._responders = mapValues(this.opts.responders, (responder, key) =>
        wrapResponderWithIds(responder, key)
      ) as any
    }
    return this._responders!
  }

  addResponder(id: string, responder: ResponderFunctionManual<any, any>) {
    ;(this.responders as any)[id] = wrapResponderWithIds(responder, id)
    return (this.responders as any)[id]
  }

  get initialResponder(): ResponderType | undefined {
    return (
      (this.opts.initialResponder as string) ||
      (Object.keys(this.responders)[0] as string)
    )
  }
}
