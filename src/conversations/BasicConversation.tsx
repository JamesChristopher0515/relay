import RelayConversation from './RelayConversation'
import { RelayConversationOptions } from './RelayConversationTypes'

export default class BasicConversation extends RelayConversation {
  defaultResponder

  get defaultState(): any {
    return {}
  }

  constructor(opts: RelayConversationOptions<any>) {
    super(opts)
  }
}
