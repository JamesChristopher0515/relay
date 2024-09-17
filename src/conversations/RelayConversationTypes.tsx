import { MTYKIcon } from '@mtyk/frontend/core/components/Icon'
import { ComponentType, ReactNode } from 'react'
import RelayConversationManager from './RelayConversationManager'

export type ResponderType = ResponderFunctionManual<any, any> | string
export interface ConversationResponse<R> {
  node?: ReactNode
  component?: ComponentType<{ isLast: boolean }>
  isFullScreen?: boolean
  text?: string
  response?: string
  finish?: boolean
  advance?: ResponderType

  // Automatically added by RelayConversation, no need to create yourself
  id: string
  responderId: string
}

export type ConversationResponseManual<R> = Omit<
  ConversationResponse<R>,
  'id' | 'responderId'
>
type MaybePromised<T> = Promise<T> | T
export interface InjectedResponderOpts<A extends ResponseMap, B> {
  conversationManager: RelayConversationManager<A>
  respondWith: (value: any) => void
}

export interface ResponderFunctionManual<R, A> {
  (
    this: this,
    response: R,
    opts: InjectedResponderOpts<any, any>
  ): MaybePromised<ConversationResponseManual<R>>
}

export interface ResponderFunction<R, A> extends ResponderFunctionManual<R, A> {
  responderId: string
}
export interface ResponseMap {
  [key: string]: ResponderFunction<any, any>
}

export interface RelayConversationOptions<T extends ResponseMap> {
  responders: T
  name?: string
  icon?: MTYKIcon
  initialResponder?: keyof T
}
