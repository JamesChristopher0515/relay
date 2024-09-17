import { Flex, Txt } from '@mtyk/frontend/core/components'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import compose from '@mtyk/frontend/react/helpers/compose'
import CheckInHeader from 'check-in/components/CheckInLayout'
import { BasicConversationManager } from 'conversations/BasicConversationManager'
import ConversationView from 'conversations/ConversationView'
import JourneyConversation from 'journeys/conversations/JourneyConversation'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import useAssignedJourneyWithInfo from 'relay-shared/assigned-journeys/hooks/useAssignedJourneyWithInfo'
import TodayViewController from 'relay-shared/todos/controllers/TodayViewController'
import JourneyHistory from './JourneyHistory'

export default compose()(function AssignedJourneyPage({ match }) {
  const assignedJourneyId = match.params.id
  const aj = useAssignedJourneyWithInfo(assignedJourneyId)
  const history = useHistory()
  const today = TodayViewController.use({})
  const [convoManager, setConvoManager] = useState(null)

  useEffect(() => {
    const doc = aj.assignedJourney
    if (doc && !today.isLoading) {
      const todos = today.assignedJourney.filter(
        (t) => t.assignedJourney === doc._id && !t.complete
      )
      const journeyConvo = new JourneyConversation({
        journeyTodos: todos,
      })
      const basicConvoManager = new BasicConversationManager({
        conversations: [],
      })
      basicConvoManager.addConversation(journeyConvo)
      setConvoManager(basicConvoManager)
      basicConvoManager.start()
    }
  }, [aj.assignedJourney?._id, today.isLoading])

  if (!aj.assignedJourney) {
    return <Txt>Loading...</Txt>
  }

  const { journey } = aj.assignedJourney
  const milestone = journey.milestones[aj.milestoneIndex]
  return (
    <CheckInHeader
      hideLogo
      title={journey.name}
      menuOptions={[
        {
          title: 'Back to Today',
          action: () => history.replace('/'),
        },
      ]}
      // extra={
      //   <Flex>
      //     <Txt style={{ marginTop: 10 }}>
      //       <Txt medium>Level {aj.milestoneIndex + 1}</Txt>
      //       {'   '}
      //       {milestone.name}
      //     </Txt>
      //   </Flex>
      // }
    >
      <Flex style={{ height: '70%' }}>
        {convoManager ? (
          <ConversationView conversationManager={convoManager} />
        ) : null}
      </Flex>

      <Flex grow style={{ paddingHorizontal: 20 }}>
        <ScrollView
          style={{ flex: 1, flexGrow: 1, maxHeight: 300, height: 200 }}
          contentContainerStyle={{
            justifyContent: 'flex-end',
            flex: 1,
            paddingBottom: 45,
          }}
        >
          <JourneyHistory assignedJourney={assignedJourneyId} />
        </ScrollView>
      </Flex>
    </CheckInHeader>
  )
})
