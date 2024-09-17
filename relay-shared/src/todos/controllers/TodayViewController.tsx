import { startOfToday } from 'date-fns'
import groupByAsArray from '@mtyk/frontend/typescript/helpers/groupByAsArray'
import { useEffect } from 'react'
import useTodayCheckIn from '../../check-in/hooks/useTodayCheckIn'
import useClientShared from '../../clients/hooks/useClientShared'
import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import wrapArrayHook from '../../core/helpers/wrapArrayHook'
import useTimeOfDay from '../../core/hooks/useTimeOfDay'
import { useGetTodayTodos } from '../../frontend/api/hooks/useApi'
import { Todo } from '../../RelayTypes'
import getTodoType from '../helpers/getTodoType'

export default makeController(function TodayViewController({
  day,
  noPoll,
}: {
  day?: Date
  noPoll?: boolean
}) {
  const [client] = useClientShared()
  const {
    data: todayTodos,
    isLoading,
    refetch,
  } = wrapArrayHook(
    useGetTodayTodos(
      {
        client: client._id,
        day,
      },
      {},
      noPoll
    )
  )

  useEffect(() => {
    refetch()
  }, [])

  const todaysCheckIn = useTodayCheckIn()
  const checkInComplete = !!todaysCheckIn
  const completeCount = todayTodos.filter((t) => t.complete).length

  const completeFraction = completeCount / todayTodos.length
  const timeOfDay = useTimeOfDay()
  const allComplete = todayTodos.every((t) => t.complete)
  const title = allComplete ? `You're done for today!` : `Good ${timeOfDay}!`
  const message = allComplete
    ? `There are no tasks left to do, but you can always come back to record anything else.`
    : `There are some tasks waiting for you to complete...`

  const noAssignedJourneyAndNotExpiredAppointment = todayTodos.filter(
    (t) => !t.assignedJourney && !t.appointment?.endedAt
  )
  const assignedJourney = todayTodos.filter((t) => t.assignedJourney)
  const todosByType = [
    // A transient/fake todo for the check-in each day
    {
      group: 'check-in',
      items: [
        {
          _id: 'dailyfeeling',
          name: 'Complete daily check-in',
          complete: checkInComplete,
          completedAt: checkInComplete ? todaysCheckIn?.createdAt : undefined,
          client: client._id,
          assigned: startOfToday(),
        },
      ],
    } as Todo,
    ...groupByAsArray(
      // Show assigned journey todos as separate section
      noAssignedJourneyAndNotExpiredAppointment,
      getTodoType
    ),
  ]

  return {
    todos: noAssignedJourneyAndNotExpiredAppointment as Todo[],
    assignedJourney: assignedJourney as Todo[],
    todosByType,
    message,
    title,
    completeFraction,
    completeCount,
    isLoading,
  }
})
