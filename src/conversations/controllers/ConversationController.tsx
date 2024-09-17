import { useEffect, useState } from 'react'
import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import useEventToState from '../helpers/useEventToState'
import RelayConversationManager from '../RelayConversationManager'

export interface ConversationControllerProps {
  conversationManager?: RelayConversationManager<any>
}

export default makeController(function ConversationController(
  props: ConversationControllerProps
) {
  const [conversationManager, setConversationManager] = useState(
    props.conversationManager
  )
  useEffect(() => {
    if (conversationManager !== props.conversationManager) {
      setConversationManager(props.conversationManager)
    }
  }, [conversationManager])

  const [isFinished] = useEventToState(
    'is-finished',
    conversationManager,
    undefined,
    false
  )
  const [isLoading] = useEventToState(
    'is-loading',
    conversationManager,
    undefined,
    true
  )
  const [items] = useEventToState(
    'conversation-changed',
    conversationManager,
    undefined,
    []
  )
  return {
    conversationManager,
    setConversationManager,
    isLoading,
    items,
    isFinished,
  }
})
