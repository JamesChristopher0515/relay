import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import { border, circle } from '@mtyk/frontend/styles/helpers/styleObjects'
import { borderTop } from '@mtyk/frontend/styles/helpers/styles'
import { CheckInCard } from 'check-in/components/CheckInCard'
import { isSameDay } from 'date-fns'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import FormattedDate from 'relay-shared/frontend/core/components/FormattedDate'
import { ClientTodo } from 'relay-shared/RelayTypes'
import useTodoControllerNative from '../../todos/hooks/useTodoControllerNative'

export interface TodoRowProps {
  groupInfo?: {
    iconColor: string
  }
  item: ClientTodo
  index?: number
}

export function TodoRow({ groupInfo: _groupInfo, item, index }: TodoRowProps) {
  const controller = useTodoControllerNative.use({ todo: item })

  const groupInfo = _groupInfo ?? {
    iconColor: '#666',
  }

  const appointmentIsToday = isSameDay(
    item.appointment?.date ?? new Date(),
    new Date()
  )
  const appointmentHasPassed = item.appointment?.date < new Date()
  const altColor = '#8BAC94'
  const altSize = 17
  const isAppointment = !!item.appointmentId

  return (
    <TouchableOpacity onPress={controller.action}>
      <Flex gap={10}>
        <Flex
          rowCenter
          key={item._id}
          shrink={1}
          style={{ marginTop: (index ?? 0) === 0 ? 0 : 14 }}
        >
          <Txt
            size={16}
            semibold={controller.isComplete}
            bold={!controller.isComplete}
            numberOfLines={1}
            style={{
              flexGrow: 1,
              flexShrink: 1,
              color: '#575852',
            }}
          >
            {item.name}
          </Txt>
          {!isAppointment ? (
            <Flex
              center
              style={{
                ...circle(25),
                marginLeft: 10,
                backgroundColor: controller.isComplete
                  ? groupInfo.iconColor
                  : 'transparent',
                ...border(1, groupInfo.iconColor),
              }}
            >
              <Icon
                icon={faCheck}
                size={14}
                color={controller.isComplete ? 'white' : 'transparent'}
              />
            </Flex>
          ) : null}
        </Flex>
        {item._id === 'dailyfeeling' && controller.isComplete ? (
          <CheckInCard
            today
            appearance="flat"
            style={{
              ...borderTop(1, 'rgba(0, 0, 0, 0.1)'),
              borderRadius: 0,
              marginTop: 12,
              paddingTop: 10,
            }}
          />
        ) : null}
        {item.appointment ? (
          <Flex rc between>
            <FormattedDate
              semibold
              format={'h:mma'}
              color={altColor}
              size={altSize}
              date={item.appointment.date}
            />
            <FormattedDate
              semibold
              color={altColor}
              size={altSize}
              showToday
              format={'MMMM do'}
              date={item.appointment.date}
              relative={appointmentIsToday && !appointmentHasPassed}
            />
          </Flex>
        ) : null}
      </Flex>
    </TouchableOpacity>
  )
}
