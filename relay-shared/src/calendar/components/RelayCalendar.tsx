import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import useInputAdapter from '@mtyk/frontend/forms/hooks/useInputAdapter'
import { DefaultProps } from '@mtyk/frontend/native/MTYKNativeTypes'
import { percentage } from '@mtyk/frontend/strings'
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects'
import HoverableThing from '@mtyk/frontend/tooltips/components/HoverableThing'
import { isAfter, isSameDay, isSameMonth, isWithinInterval } from 'date-fns'
import dayjs, { Dayjs } from 'dayjs'
import { times } from 'lodash'
import React, { useEffect, useMemo } from 'react'
import RelayIconButton from '../../core/components/RelayIconButton'
import FormattedDate from '../../frontend/core/components/FormattedDate'
import RelayIcons from '../../frontend/icons/RelayIcons'
import Ratioed from './Ratioed'

interface RelayCalendarProps extends DefaultProps.Input<Dayjs> {
  style?: React.CSSProperties
  selectedTimeRange: { start: Date; end: Date }
  hideMonth?: boolean

  dayProps?: any
  disableFuture?: boolean
  disablePast?: boolean
  dayStyles?: { [key: string]: React.CSSProperties }
}

export default function RelayCalendar(props: RelayCalendarProps) {
  const { onChange, dayProps, dayStyles, selectedTimeRange, style, ...rest } =
    props

  const selectedMonth = useInputAdapter<Dayjs>(dayjs().startOf('month'))
  const selectedDay = useInputAdapter<Dayjs>(dayjs().startOf('day'))

  useEffect(() => {
    if (selectedTimeRange?.end) {
      if (!isSameDay(selectedTimeRange.end, selectedDay.value.toDate())) {
        selectedDay.onChange(dayjs(selectedTimeRange.end).startOf('day'))
        selectedMonth.onChange(dayjs(selectedTimeRange.end).startOf('month'))
      }
    } else {
      if (!isSameDay(selectedDay.value.toDate(), new Date())) {
        selectedDay.onChange(dayjs().startOf('day'))
        selectedMonth.onChange(dayjs().startOf('month'))
      }
    }
  }, [selectedTimeRange?.end, selectedDay])

  /** Includes some days outside beginning and end */
  const daysToShowForMonth = useMemo(() => {
    const countDaysInMonth = selectedMonth.value.daysInMonth()
    const firstDayOfMonth = dayjs(selectedMonth.value).startOf('month')
    const daysInMonth = times(countDaysInMonth, (i) => {
      return firstDayOfMonth.clone().add(i, 'days')
    })

    const dayOfFirstInMonth = daysInMonth[0].day()
    if (dayOfFirstInMonth !== 1) {
      // If monday isn't the first day, gotta add some days to the beginning
      let daysToAdd = dayOfFirstInMonth - 1
      if (daysToAdd === -1) {
        daysToAdd = 6
      }
      const firstDay = daysInMonth[0]

      // console.log({ dayOfFirstInMonth, daysToAdd, firstDay })
      daysInMonth.unshift(
        ...times(daysToAdd, (i) => {
          // console.log({ i })
          return firstDay.clone().subtract(daysToAdd - i, 'days')
        })
      )
    }

    return daysInMonth
  }, [selectedMonth.value])

  const selectDay = (day: Dayjs) => {
    if (!day.isSame(selectedMonth.value, 'month')) {
      selectedMonth.onChange(day.clone().startOf('month'))
    }
    selectedDay.onChange(day)
    if (!day.isSame(selectedDay.value.startOf('day'))) {
      onChange(day)
    }
  }

  const isSelected = (day: Dayjs) => {
    return day.isSame(selectedDay.value)
  }

  const isToday = (day: Dayjs) => {
    return day.isSame(dayjs(), 'day')
  }

  const isCurrentMonth = (day: Dayjs) => {
    return day.isSame(selectedMonth.value, 'month')
  }

  const selectedMonthIsCurrent = isSameMonth(
    selectedMonth.value.toDate(),
    new Date()
  )

  const iconProps = {
    color: `rgb(100, 99, 99)`,
  }
  return (
    <Flex
      {...rest}
      gap={'.7em'}
      style={{ height: '24em', width: '88%', ...style }}
    >
      {props.hideMonth ? null : (
        <Flex rowCenter between>
          <Txt color={'rgb(100, 99, 99)'} semibold size={'.9em'}>
            <Flex rowCenter>
              <FormattedDate format="MMMM yyyy">
                {selectedMonth.value.toDate()}
              </FormattedDate>
            </Flex>
          </Txt>
          <Flex rowCenter>
            {selectedMonthIsCurrent ? null : (
              <RelayIconButton
                iconProps={iconProps}
                style={{
                  backgroundColor: 'transparent',
                  transform: `scale(.84)`,
                }}
                label="Back to today"
                icon={RelayIcons.clockRotateLeft}
                action={() => {
                  selectDay(dayjs())
                }}
              />
            )}
            <RelayIconButton
              iconProps={iconProps}
              label="Previous Month"
              style={{
                backgroundColor: 'transparent',
                transform: `scale(.84)`,
              }}
              icon={faCaretLeft}
              action={() => {
                selectedMonth.onChange(
                  selectedMonth.value.clone().subtract(1, 'month')
                )
              }}
            />
            <RelayIconButton
              label="Next Month"
              style={{
                backgroundColor: 'transparent',
                transform: `scale(.84)`,
              }}
              iconProps={iconProps}
              icon={faCaretRight}
              action={() => {
                selectedMonth.onChange(
                  selectedMonth.value.clone().add(1, 'month')
                )
              }}
            />
          </Flex>
        </Flex>
      )}
      <div
        className="CalendarDaysWrap"
        css={`
          width: 110%;
          position: relative;
          left: -10px;
          margin: 0 auto;
        `}
      >
        <Flex
          row
          style={{
            width: '100%',
            padding: '0 1.15em',
            fontSize: '.95em',
            position: 'relative',
            left: '-.3em',
            justifyContent: 'space-between',
            fontWeight: 600,
            marginBottom: '1em',
            color: 'rgb(100, 99, 99)',
            opacity: 0.8,
          }}
        >
          <Txt>MON</Txt>
          <Txt>TUE</Txt>
          <Txt>WED</Txt>
          <Txt>THU</Txt>
          <Txt>FRI</Txt>
          <Txt>SAT</Txt>
          <Txt>SUN</Txt>
        </Flex>
        {daysToShowForMonth.map((day) => {
          const selected = isSelected(day)
          const inTimeRange =
            selectedTimeRange &&
            isWithinInterval(day.toDate(), selectedTimeRange)
          const isInFuture = isAfter(day.toDate(), new Date())
          const currMonth = isCurrentMonth(day)
          const isInPast = day.toDate().getTime() < new Date().getTime()
          const isToday = isSameDay(new Date(), day.toDate())
          const disabled =
            (isInFuture && props.disableFuture) ||
            (isInPast && props.disablePast)
          const size = 1 / 7
          return (
            <HoverableThing tooltip="Double-click to create appointment">
              <Ratioed
                component={Flex}
                key={day.toString()}
                className="CalendarDay"
                center
                onClick={() => {
                  if (!disabled) {
                    selectDay(day)
                  }
                }}
                css={
                  disabled
                    ? `
                    cursor: not-allowed;
                  `
                    : `
                &:hover {
                  transform: scale(1.1);
                }
              `
                }
                {...dayProps}
                style={{
                  float: 'left',
                  margin: '-0.28em auto',
                  userSelect: 'none',
                  cursor: disabled ? 'default' : 'pointer',
                  width: percentage(size),
                  borderRadius: '1000px',
                  textAlign: 'center',
                  opacity: disabled ? 0.5 : selected || currMonth ? 1 : 0.5,

                  ...dayStyles,
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    ...makeSize('2.5em'),
                    borderRadius: '1000px',
                    transition: 'background .2s',
                    backgroundColor: selected
                      ? '#dee9f2'
                      : isToday
                      ? '#e9ded8'
                      : 'transparent',
                  }}
                />
                <Txt
                  semibold={selected || inTimeRange}
                  color={selected ? '#76818C' : isToday ? '#866453' : '#76818C'}
                  size={'.85em'}
                  style={{ position: 'relative' }}
                >
                  {day.date()}
                </Txt>
              </Ratioed>
            </HoverableThing>
          )
        })}
      </div>
    </Flex>
  )
}
