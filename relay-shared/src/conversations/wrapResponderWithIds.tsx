import { v4 as uuidv4 } from 'uuid'
import { ResponderFunction } from './RelayConversationTypes'

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
