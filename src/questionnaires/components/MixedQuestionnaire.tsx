import CheckInHeader from 'check-in/components/CheckInLayout'
import TodoConversationController from 'conversations/controllers/TodoConversationController'
import ConversationView from 'conversations/ConversationView'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import React from 'react'

export default function MixedQuestionnaire({
  todoIds,
  onFinish,
}: {
  todoIds: string[]
  onFinish: () => void
}) {
  const todoConvoController = TodoConversationController.use({
    todoIds,
    onFinish,
  })
  const history = useHistory()

  return (
    <CheckInHeader
      menuOptions={[
        {
          title: 'Back',
          action: () => history.replace('/'),
        },
      ]}
    >
      {todoConvoController.conversationManager ? (
        <ConversationView
          conversationManager={todoConvoController.conversationManager}
        />
      ) : null}
    </CheckInHeader>
  )
}
