import RelayButton from 'core/components/RelayButton'
import { Flex } from '@mtyk/frontend/core/components'
import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { OurMessage } from './ConversationMessage'
import {
  ResponderFunction,
  ResponderFunctionManual,
  ResponderType,
} from './RelayConversationTypes'

export function wrapResponderWithIds(
  responder: Omit<ResponderFunction<any, any>, 'responderId'>,
  responderId = uuidv4()
) {
  const func = async function wrappedResponder(response, opts) {
    const newResponseItem = await (responder as any)(response, opts)
    const id = uuidv4()
    return { ...newResponseItem, responderId, id }
  }
  func.responderId = responderId
  return func
}

export const conversationUtils = {
  button: (buttonProps: any, next: ResponderType) => {
    return function (this: any, response, opts) {
      if (response) {
        return { advance: next }
      }
      return {
        component: ({ isLast }) => {
          if (!isLast) {
            return <OurMessage>Ok</OurMessage>
          }
          return (
            <Flex center style={{ paddingVertical: 30 }}>
              <RelayButton
                {...buttonProps}
                style={{ alignSelf: 'center', width: 'auto' }}
                action={() => opts.conversationManager.respond(this, true)}
              />
            </Flex>
          )
        },
      }
    }
  },

  messageReducer: function <T>({
    items,
    generateId,
    fn,
    next,
  }: {
    items: T[]
    generateId: (index: number) => string
    fn: (
      item: T,
      opts: { index: number; arr: T[]; respond: (value: any) => void }
    ) => ResponderFunctionManual<any, any>
    next: ResponderType
  }): ResponderFunction<any, any>[] {
    const responders = {}
    for (let index = 0; index < items.length; index++) {
      const item = items[index]
      const isLast = index === items.length - 1
      responders[generateId(index)] = async function reducedResponder(
        response,
        opts
      ) {
        if (response) {
          if (isLast) {
            return { advance: next }
          }
          return { advance: generateId(index + 1) }
        }
        return {
          ...(await fn.call(item, item, {
            index,
            array: items,
            respond: (value) =>
              opts.conversationManager.respond(generateId(index), value),
          })(response, opts)),
          responderId: generateId(index),
        }
      }
    }
    return responders
  },

  okButton: (next: ResponderType) => {
    return conversationUtils.button(
      {
        children: 'OK',
      },
      next
    )
  },

  doneButton: (next: ResponderType) => {
    return conversationUtils.button(
      {
        children: 'OK',
      },
      next
    )
  },

  createTextResponders: (prefix: string, strings: string[], next: any) => {
    let responders = {}
    const keyForI = (i) => (i === 0 ? prefix : `${prefix}-${i + 1}`)
    for (let i = 0; i < strings.length; i++) {
      responders[keyForI(i)] = () => {
        const nextOne = i === strings.length - 1 ? next : keyForI(i + 1)
        return Promise.resolve({
          text: strings[i],
          advance: nextOne,
        })
      }
    }
    return responders
  },
}
