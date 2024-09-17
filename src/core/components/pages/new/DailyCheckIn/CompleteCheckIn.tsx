import CheckInHeader from 'check-in/components/CheckInLayout'
import { CheckInViewController } from 'check-in/controllers/CheckInViewController'
import PostCheckInConversationManager from 'check-in/conversations/PostCheckInConversationManager'
import ConversationView from 'conversations/ConversationView'
import { Txt } from '@mtyk/frontend/core/components'
import Flex from '@mtyk/frontend/core/components/Flex'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import React, { useEffect, useRef } from 'react'
import ConversationController from 'relay-shared/conversations/controllers/ConversationController'
import { ViewControllerProps } from '@mtyk/frontend/controllers/helpers/makeController'
import useWrappedAxiosShared from 'relay-shared/core/hooks/useWrappedAxiosShared'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'
import { Todo } from 'relay-shared/RelayTypes'

export type CompleteCheckInProps = ViewControllerProps<
  typeof CheckInViewController
> & {
  assignedQuestionnaireTodos: Todo[]
}

const NewCheckInSummary: React.FC<CompleteCheckInProps> = (props) => {
  const { assignedQuestionnaireTodos } = props
  const history = useHistory()

  const axios = useWrappedAxiosShared()
  const { current: conversationManager } = useRef(
    new PostCheckInConversationManager(
      assignedQuestionnaireTodos,
      axios,
      () => {
        history.push('/')
      }
    )
  )
  // const conversationController = ConversationController.use({
  // conversationManager,
  // } as any)
  const headerProps = {
    titleIcon: RelayIcons.puzzlePiece,
    titleProps: { color: '#584546' },
    titleIconProps: { color: '#DEABAB' },
    title: 'Daily Check-in',
  }

  useEffect(() => {
    // conversationManager.listen('is-finished', async (finished) => {
    //   if (finished) {
    //     history.replace('/')
    //   }
    // })
    conversationManager.start()
  }, [conversationManager])

  return (
    <CheckInHeader
      {...headerProps}
      menuOptions={[
        {
          title: 'Exit',
          action: () => {
            history.replace('/')
          },
        },
      ]}
    >
      <Flex center style={{ height: '100%', flex: 1 }} grow>
        {conversationManager ? (
          <ConversationView conversationManager={conversationManager} />
        ) : (
          <Txt>Loading...</Txt>
        )}
      </Flex>
    </CheckInHeader>
  )
}

export default NewCheckInSummary
