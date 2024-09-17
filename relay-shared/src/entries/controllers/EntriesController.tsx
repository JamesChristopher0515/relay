import useTodayCheckIn from '../../check-in/hooks/useTodayCheckIn'
import {
  add,
  eachMonthOfInterval,
  endOfMonth,
  format,
  isSameDay,
  startOfMonth,
} from 'date-fns'
import _, { orderBy } from 'lodash'
import { useState } from 'react'
import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import wrapArrayHook from '../../core/helpers/wrapArrayHook'
import { useGetCheckInsQuery } from '../../frontend/api/hooks/useApi'
import useClientShared from '../../clients/hooks/useClientShared'

export interface EntriesControllerProps {}

export default makeController(function EntriesController(
  props: EntriesControllerProps
) {
  const {} = props

  const checkInToday = useTodayCheckIn()
  const [client] = useClientShared()
  const [loadStartDate, setLoadStartDate] = useState(
    startOfMonth(add(new Date(), { months: -2 }))
  )
  const {
    data: entries,
    isLoading,
    error,
  } = wrapArrayHook(
    useGetCheckInsQuery({
      createdAt: { $gte: loadStartDate.toISOString() },
      client: client._id,
    })
  )
  // console.log({ entries, isLoading, error })
  const loadMore = () => setLoadStartDate(add(loadStartDate, { months: -1 }))
  const months = eachMonthOfInterval({
    start: loadStartDate,
    end: endOfMonth(new Date()),
  })
  const monthYearFormat = 'yyyy-MM'
  const byMonth = _(entries)
    .groupBy(entry => format(startOfMonth(entry.createdAt), monthYearFormat))
    .value()

  return {
    checkInToday,
    loadMore,
    months,
    getInfoForDay: (day: Date) => {
      const month = format(day, monthYearFormat)
      const checkIns = byMonth[month] ?? []
      const checkInsForDay = orderBy(
        checkIns?.filter(checkIn => isSameDay(checkIn.createdAt, day)) ?? [],
        ['createdAt'],
        ['asc']
      )
      const latestCheckInForDay = checkInsForDay[checkInsForDay.length - 1]
      return {
        checkInsForDay,
        latestCheckIn: latestCheckInForDay,
        hasCheckIn: checkInsForDay?.length ?? 0 > 0,
        hasMultipleCheckIns: checkInsForDay.length > 1,
        hasJournalEntry: checkInsForDay.some(checkIn => checkIn.journalEntry),
        hasFeeling: !!latestCheckInForDay?.feelings?.[0]?.name,
        feeling: latestCheckInForDay?.feelings?.[0],
      }
    },
    getInfoForMonth: (month: Date) => {
      const entries = byMonth[format(month, monthYearFormat)]
      return {
        entries,
        formattedMonth: format(month, 'MMMM'),
        formattedYear: format(month, 'yyyy'),
        month: startOfMonth(month),
      }
    },
  }
})
