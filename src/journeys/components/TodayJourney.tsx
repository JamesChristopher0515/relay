import { Flex, Txt } from '@mtyk/frontend/core/components'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import compose from '@mtyk/frontend/react/helpers/compose'
import { ProgressBar } from 'conversations/ProgressBar'
import ScalingPressable from 'core/components/ScalingPressable'
import React from 'react'
import { getAssignedJourneyActiveMilestoneIndex } from 'relay-shared/assigned-journeys/helpers/getAssignedJourneyActiveMilestoneIndex'
import useAssignedJourneyWithInfo from 'relay-shared/assigned-journeys/hooks/useAssignedJourneyWithInfo'
import {
  AssignedJourney,
  ClientMilestoneStop,
  Id,
  Todo,
} from 'relay-shared/RelayTypes'
import TodayViewController from 'relay-shared/todos/controllers/TodayViewController'
import TodoGroupBox from 'today/components/TodoGroupBox'

export interface TodayJourneyProps {
  assignedJourney: Id
}
export interface TodayJourneyRefHandle {}

function TodayJourneyInner(props: {
  assignedJourney: AssignedJourney
  clientStop: ClientMilestoneStop
  todos: Todo[]
}) {
  const { assignedJourney, clientStop, todos } = props
  const incompleteTodos = todos.filter((t) => !t.complete)
  const { journey } = assignedJourney
  const { milestoneIndex, progress } = getAssignedJourneyActiveMilestoneIndex({
    journey,
    assignedJourney,
    clientStop,
  })
  const history = useHistory()

  return (
    <ScalingPressable
      onPress={() => {
        history.replace(`/assigned-journey/${assignedJourney._id}`)
      }}
    >
      <TodoGroupBox style={{ width: '50%' }}>
        <Flex center fw>
          {/* <Flex rowCenter between fw padding={[10, 20]}> */}
          <Flex center padding={[20, 10]} gap={5}>
            <Txt
              size={16}
              semibold
              color="#333"
              numberOfLines={1}
              style={{ flexShrink: 1 }}
            >
              {journey.name}
            </Txt>
            <Txt color="#575852">Level {milestoneIndex + 1}</Txt>
          </Flex>
          {/* </Flex> */}
          <ProgressBar value={progress} />
          {incompleteTodos.length ? (
            <Txt size={13} style={{ margin: 3 }}>
              {incompleteTodos.length} task
              {incompleteTodos.length === 1 ? '' : 's'} waiting
            </Txt>
          ) : null}
          {/* {todos.map((t, index) => {
            return (
              <TodoRow
                item={t}
                index={index}
                groupInfo={{ iconColor: '#555' }}
              />
            )
          })} */}
        </Flex>
      </TodoGroupBox>
    </ScalingPressable>
  )
}

export default compose()(function TodayJourney(props: TodayJourneyProps) {
  const { assignedJourney } = props
  const todayController = TodayViewController.use({})
  const info = useAssignedJourneyWithInfo(assignedJourney)

  const relatedTodos = todayController.assignedJourney.filter(
    (t) => t.assignedJourney === assignedJourney
  )
  const clientStopToShow = info.lastActiveClientStop
  const ready = info.assignedJourney && clientStopToShow

  return (
    <Flex style={{ marginTop: 10 }}>
      {!ready ? null : (
        <TodayJourneyInner
          assignedJourney={info.assignedJourney!}
          clientStop={clientStopToShow!}
          todos={relatedTodos}
        />
      )}
    </Flex>
  )
})
