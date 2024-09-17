/* eslint-disable react/display-name */
import { mapValues } from 'lodash'
import assert from '@mtyk/frontend/core/helpers/assertDefined'
import EventListenable from '@mtyk/frontend/events/helpers/EventListener'
import { v4 as uuidv4 } from 'uuid'
import RelayConversation from './RelayConversation'
import {
  ConversationResponse,
  ConversationResponseManual,
  ResponderFunction,
  ResponderFunctionManual,
  ResponderType,
  ResponseMap,
} from './RelayConversationTypes'

type RelayConversationManagerOptions<T extends ResponseMap> = {
  conversations: RelayConversation<T>[]
}

export default abstract class RelayConversationManager<
  T extends ResponseMap = any
> extends EventListenable<
  'conversation-changed' | 'is-loading' | 'is-finished'
> {
  constructor(private readonly opts: RelayConversationManagerOptions<T>) {
    super()
    this.conversations = opts.conversations
  }

  responders: { [key: string]: ResponderFunction<any, any> } = {}
  lastResponder: ResponderType | null = null
  private items: ConversationResponse<any>[] = []
  conversations: RelayConversation<any>[] = []
  currentConversation?: RelayConversation<any>
  isResponding = false
  private _initialResponder?: string | undefined
  public get initialResponder(): string | undefined {
    return this._initialResponder
  }
  public set initialResponder(value: string | undefined) {
    this._initialResponder = value
  }

  addConversation(conversation: RelayConversation) {
    this.conversations.push(conversation)
    console.log(`Adding conversation: ${conversation.name}`)
    this.addResponders(conversation.responders, conversation)
  }

  addResponders(
    newResponders: { [key: string]: ResponderFunctionManual<any, any> },
    conversation?: RelayConversation<any>
  ) {
    Object.assign(
      this.responders,
      mapValues(newResponders, (values) => {
        values.conversation = conversation
        return values
      })
    )
  }

  makeInjectedResponderOpts(responderId) {
    return {
      conversationManager: this,
      respondWith: (value: any) => this.respond(responderId, value),
    }
  }

  async generateResponse(
    responderId: keyof T,
    response: any = undefined
  ): Promise<any> {
    const responder = this.responders[responderId]
    assert(responder, `Responder for ${responderId} not found`)
    const item = await responder.call(
      responder,
      response,
      this.makeInjectedResponderOpts(responderId)
    )
    return item
  }

  advance(to: ResponderType) {
    return this.respondObj({ advance: to })
  }

  finish() {
    return this.respondObj({ finish: true })
  }

  respondObj(obj: ConversationResponseManual<any>) {
    return this.respond(() => obj)
  }

  /**
   * Note that we don't await the result of the `advance` responder, if there is
   * one. This function will return a promise once the initial responder has been called.
   */
  async respond(
    responderType: ResponderType,
    response: any = undefined
  ): Promise<any> {
    if (this.isResponding) {
      console.log(`Cancelled response, already responding`)
      return
    }
    console.log(
      `Responding using ${
        typeof responderType === 'function'
          ? `${responderType.name ?? 'function'}()`
          : responderType
      } and response`,
      response
    )
    this.lastResponder = responderType
    this.isResponding = true
    this.emit('is-loading', true)

    const newItem = {
      id: uuidv4(),
      ...(typeof responderType === 'string'
        ? await this.generateResponse(responderType, response)
        : await responderType.call(
            responderType,
            response,
            this.makeInjectedResponderOpts(responderType.responderId)
          )),
    }
    // await delay(700)
    this.setItems([...this.items, newItem])
    this.isResponding = false
    if (newItem.advance) {
      if (newItem.advance === true) {
        this.respond(this.findNextResponder(responderType))
      } else {
        this.respond(newItem.advance, undefined)
      }
    } else if (newItem.finish) {
      this.nextConversation()
    } else {
      this.emit('is-loading', false)
    }
  }

  findNextResponder(after: string) {
    const index = Object.keys(this.responders).indexOf(after)
    console.log({ index })
    return Object.keys(this.responders)[index + 1]
  }

  setItems(items: ConversationResponse<any>[]) {
    this.items = items
    this.emit('conversation-changed', this.items)
    return this.items
  }

  getItems() {
    return this.items
  }

  reset() {
    this.setItems([])
  }

  startConversation(conversation: RelayConversation<any>) {
    this.currentConversation = conversation
    this.respond(conversation.initialResponder)
  }

  nextConversation() {
    console.log(
      'Moving to next conversation, current: ',
      this.currentConversation?.name
    )
    if (!this.currentConversation) {
      console.log(
        `No current conversation, starting first: ${this.conversations[0].name}`
      )
      this.startConversation(this.conversations[0])
    } else {
      const currentConvoIndex = this.conversations.indexOf(
        this.currentConversation
      )
      console.log(
        `Current conversation index: ${currentConvoIndex} length: ${this.conversations.length}`
      )
      assert(currentConvoIndex !== -1, `Conversation not found`)

      if (currentConvoIndex === this.conversations.length - 1) {
        this.emit('is-finished', true)
      } else {
        this.startConversation(this.conversations[currentConvoIndex + 1])
      }
    }
  }

  start() {
    if (this.initialResponder) {
      this.respond(this.initialResponder)
    } else {
      console.log(
        'Trying to start conversation',
        this.conversations[0]?.constructor.name
      )
      this.startConversation(this.conversations[0])
      console.warn(`No initial responder set`)
    }
  }
}
