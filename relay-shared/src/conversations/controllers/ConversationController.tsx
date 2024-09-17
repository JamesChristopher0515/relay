import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import useEventToState from '../helpers/useEventToState'
import RelayConversationManager from '../RelayConversationManager'

export interface ConversationControllerProps {
  conversationManager: RelayConversationManager<any>
}

export default makeController(function ConversationController(
  props: ConversationControllerProps
) {
  const { conversationManager } = props
  const [isFinished] = useEventToState(
    conversationManager,
    'is-finished',
    undefined,
    false
  )
  const [isLoading] = useEventToState(
    conversationManager,
    'is-loading',
    undefined,
    true
  )
  const [items] = useEventToState(
    conversationManager,
    'conversation-changed',
    undefined,
    []
  )
  return {
    conversationManager,
    isLoading,
    items,
    isFinished,
  }
})
