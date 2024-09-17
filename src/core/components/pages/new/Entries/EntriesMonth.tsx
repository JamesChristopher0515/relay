import NewCheckInSummary from 'check-in/components/NewCheckIn/NewCheckInSummary'
import { format, startOfDay, startOfMonth } from 'date-fns'
import FeelingIcon from 'feelings/components/FeelingIcon'
import { chunk } from 'lodash'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects'
import React from 'react'
import { FlatList, TouchableOpacity, View } from 'react-native'
import getCalendarDays from 'relay-shared/core/helpers/getCalendarDays'
import { ViewControllerProps } from '@mtyk/frontend/controllers/helpers/makeController'
import EntriesController from 'relay-shared/entries/controllers/EntriesController'
import ReadIcon from 'resources/components/ReadIcon'
import Styles from './Styles'

export function EntriesMonth({
  entriesController,
  month,
}: {
  entriesController: ViewControllerProps<typeof EntriesController>
  month: Date
}) {
  const calendarDays = getCalendarDays(
    month,
    (day) => startOfDay(day).getTime() <= startOfDay(new Date()).getTime()
  )
  const weekRows = chunk(calendarDays.daysInMonth, 7)
  const dec = useDecorationsContext()
  function renderWeekRow(
    week: Date[],
    index: number,
    calendarDays: ReturnType<typeof getCalendarDays>
  ) {
    const formattedStartOfWeek = format(week[0], 'do')
    const month = startOfMonth(week[week.length - 1])
    return (
      <>
        <View style={Styles.monthBookContainer}>
          <Txt
            color="#D3AEAE"
            bold
            size={14}
            style={{
              width: '20%',
            }}
          >
            {index > 0 ? formattedStartOfWeek : 'Mon'}
          </Txt>
          <View style={Styles.weekPoints}>
            {week.map(entriesDay(calendarDays, entriesController, month, dec))}
          </View>
        </View>
      </>
    )
  }
  return (
    <Flex>
      <FlatList
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        data={weekRows}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: week, index }) =>
          renderWeekRow(week, index, calendarDays)
        }
        numColumns={1}
      />
    </Flex>
  )
}
function entriesDay(
  calendarDays: {
    isToday: (day: Date) => boolean
    isCurrentMonth: (day: Date) => boolean
    isWithinMonth: (day: Date, month: Date) => boolean
    daysInMonth: Date[]
  },
  entriesController: ViewControllerProps<typeof EntriesController>,
  month: Date,
  dec
): (value: Date, index: number, array: Date[]) => JSX.Element {
  return function (day) {
    const isToday = calendarDays.isToday(day)
    const dayInfo = entriesController.getInfoForDay(day)
    const isWithinMonth = calendarDays.isWithinMonth(day, month)
    return (
      <Flex
        center
        key={day.toString()}
        style={{
          width: 100 / 7 + '%',
          opacity: isWithinMonth ? 1 : 0.7,
        }}
      >
        {!dayInfo.hasFeeling ? (
          <View
            style={{
              ...makeSize(8),
              borderRadius: 999,
              borderWidth: 2,
              borderColor: isToday ? '#9B5C5C' : '#E0CECE',
            }}
          />
        ) : (
          <TouchableOpacity
            onPress={() => {
              dec.openModal(NewCheckInSummary, {
                checkIn: dayInfo.latestCheckIn._id,
                isModal: true,
              })
            }}
          >
            <FeelingIcon
              feeling={dayInfo.feeling?.name}
              style={[Styles.emojiLogo, { ...makeSize(23) }]}
            />
            {dayInfo.hasJournalEntry ? (
              <Flex
                style={{
                  position: 'absolute',
                  bottom: -6,
                  right: -5,
                }}
              >
                <ReadIcon fill={'#948080'} color={'#948080'} size={15} />
              </Flex>
            ) : null}
          </TouchableOpacity>
        )}
      </Flex>
    )
  }
}
