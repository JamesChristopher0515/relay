import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import React from 'react'
import MixedQuestionnaire from './MixedQuestionnaire'

export default function QuestionnairePage({ match }) {
  const todoIds = (match.params.ids ?? '').split(',')
  const history = useHistory()
  return (
    <MixedQuestionnaire
      todoIds={todoIds}
      onFinish={() => {
        history.replace('/')
      }}
    />
  )
}
