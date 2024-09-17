import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import BasicConversation from 'conversations/BasicConversation'
import QuestionnaireConversationManager from 'conversations/QuestionnaireConversationManager'
import { useClient } from 'core/hooks/useUser'
import { useEffect, useState } from 'react'
import wrapArrayHook from 'relay-shared/core/helpers/wrapArrayHook'
import useWrappedAxiosShared from 'relay-shared/core/hooks/useWrappedAxiosShared'
import { useGetTodosQuery } from 'relay-shared/frontend/api/hooks/useApi'

export interface TodoConversationControllerProps {
  todoIds: string[]
  onFinish?: () => void
}

export default makeController(function TodoConversationController(
  props: TodoConversationControllerProps
) {
  const { todoIds, onFinish } = props
  const [client] = useClient()
  const axios = useWrappedAxiosShared()
  const history = useHistory()
  const [conversationManager, setConversationManager] = useState<
    QuestionnaireConversationManager | undefined
  >()
  const { data: todos, isLoading } = wrapArrayHook(
    useGetTodosQuery({
      client: client._id,
      ids: todoIds,
    })
  )
  useEffect(() => {
    if (!isLoading) {
      const manager = new QuestionnaireConversationManager(axios)
      manager.addQuestionnaireConversations(todos)
      manager.addConversation(
        new BasicConversation({
          responders: {
            done: (response, opts) => {
              setTimeout(() => {
                onFinish?.()
              }, 3000)
              return {
                text: `Thanks for completing this questionnaire, taking you back to the today page now.`,
                finish: true,
              }
            },
          },
        })
      )
      setConversationManager(manager)
      manager.start()
      // manager.listen('is-finished', () => {
      // onFinish?.()
      // })
    }
  }, [isLoading])

  return {
    conversationManager,
  }
})
