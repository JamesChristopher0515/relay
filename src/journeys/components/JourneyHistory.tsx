import { Flex, Txt } from '@mtyk/frontend/core/components'
import compose from '@mtyk/frontend/react/helpers/compose'
import useDimensions from '@mtyk/frontend/styles/hooks/useDimensions'
import React from 'react'
import useAssignedJourneyHistory from 'relay-shared/assigned-journeys/hooks/useAssignedJourneyHistory'
import useAssignedJourneyWithInfo from 'relay-shared/assigned-journeys/hooks/useAssignedJourneyWithInfo'
import { Id } from 'relay-shared/RelayTypes'
import { MilestoneHistoryItem } from './MilestoneHistoryItem'
export interface JourneyHistoryProps {
  assignedJourney: Id
}
export interface JourneyHistoryRefHandle {}

export default compose()(function JourneyHistory(props: JourneyHistoryProps) {
  const { assignedJourney: ajId } = props
  const ajInfo = useAssignedJourneyWithInfo(ajId, {
    includeActiveStopInfo: true,
  })

  const history = useAssignedJourneyHistory(ajId)
  const thisMilestoneHistory = history[ajInfo.milestoneIndex]
  const dimensions = useDimensions()
  if (!ajInfo.assignedJourney || !thisMilestoneHistory) {
    return null
  }

  return (
    <Flex>
      <Flex rowCenter gap={5} style={{ marginBottom: 15 }}>
        {/* <Icon
          icon={faBook}
          color="#444"
          style={{ transform: [{ scale: 0.5 }] }}
        /> */}
        <Txt medium style={{}}>
          History
        </Txt>
      </Flex>
      {thisMilestoneHistory.stops
        .filter((clientStop) => {
          return clientStop.todo
        })
        .map((h, index) => {
          return (
            <MilestoneHistoryItem
              key={h._id}
              journey={ajInfo.assignedJourney!.journey}
              stop={h}
              milestone={ajInfo.assignedJourney!.journey.milestones[index]}
              milestoneIndex={h.milestoneIndex}
            />
          )
        })}
    </Flex>
  )
})
