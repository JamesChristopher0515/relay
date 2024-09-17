import {
  faCheck,
  faChevronRight,
  faCircle,
} from '@fortawesome/free-solid-svg-icons'
import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import { Flex, Icon } from '@mtyk/frontend/core/components'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import { borderTop } from '@mtyk/frontend/styles/helpers/styleObjects'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import findJourneyStop from 'relay-shared/journeys/helpers/findJourneyStop'
import { ClientMilestoneStop, Journey } from 'relay-shared/RelayTypes'
import useTodoControllerNative from '../../todos/hooks/useTodoControllerNative'
import StopTxtClient from './StopTxtClient'

const MilestoneHistoryItemController = makeController(
  ({
    clientMilestoneStop,
    journey,
    milestoneIndex,
  }: {
    clientMilestoneStop: ClientMilestoneStop
    journey: Journey
    milestoneIndex: number
  }) => {
    const todoController = useTodoControllerNative.use({
      todoId: clientMilestoneStop.todo,
      poll: true,
    })
    const history = useHistory()
    const milestone = journey.milestones[milestoneIndex]
    const { stop } = findJourneyStop({
      stop: clientMilestoneStop.stop,
      milestone: milestone._id,
      journey,
    })

    const action =
      stop?.type === 'worksheet'
        ? () => history.push(`/worksheet/${clientMilestoneStop.todo}`)
        : todoController.isBasic
        ? null
        : todoController.action
    console.log({ name: stop.name, action })
    return { action, stop, hasAction: typeof action === 'function' }
  }
)

export function MilestoneHistoryItem({
  stop: clientStop,
  milestoneIndex,
  journey,
}: {
  stop: ClientMilestoneStop
  journey: Journey
  milestoneIndex: number
}) {
  const controller = MilestoneHistoryItemController.use({
    clientMilestoneStop: clientStop,
    milestoneIndex,
    journey,
  })

  return (
    <TouchableOpacity onPress={controller.action}>
      <Flex
        row
        fw
        padding={[10, 10]}
        between
        style={{
          ...borderTop(1, 'rgba(0, 0, 0, 0.1)'),
        }}
      >
        <StopTxtClient bold={controller.hasAction} stop={controller.stop} />
        <Icon
          icon={
            controller.hasAction
              ? faChevronRight
              : clientStop.completedAt
              ? faCheck
              : faCircle
          }
          color="rgba(0, 0, 0, 0.3)"
          style={{
            fontSize: 152,
            transform: [
              {
                scale: controller.hasAction
                  ? 1
                  : clientStop.completedAt
                  ? 0.8
                  : 0.4,
              },
            ],
          }}
        />
      </Flex>
    </TouchableOpacity>
  )
}
