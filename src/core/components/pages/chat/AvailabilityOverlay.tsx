import { Flex, Txt } from '@mtyk/frontend/core/components'
import { absoluteFill } from '@mtyk/frontend/styles/helpers/styleObjects'
import TabButton from 'core/components/TabButton'
import dayjs from 'dayjs'
import React from 'react'

export function AvailabilityOverlay({ practitioner, hide }) {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]

  return (
    <Flex
      center
      flex={1}
      style={{
        paddingTop: 70,
        backgroundColor: `#F8F4F4`,
        ...absoluteFill(),
      }}
    >
      <Txt
        style={{
          width: 250,
          maxWidth: '70%',
          fontSize: 14,
          marginBottom: 60,
          textAlign: 'center',
          color: '#222',
          lineHeight: 20,
        }}
      >
        <Txt>{practitioner.name}</Txt> is available for chat during the
        following hours
      </Txt>
      <Flex gap={7}>
        {practitioner.schedule.days.map((day, i) => {
          const formatTime = (d) => dayjs(d).format('HH:mm')
          const dayName = days[i]
          const isToday = i === (dayjs().day() + 8) % 7
          return (
            <Flex
              rowCenter
              key={i}
              context={{ fontSize: 15, scale: 1, color: '#666' }}
            >
              <Txt medium style={{ width: 120 }}>
                {dayName}
              </Txt>
              {day.enabled ? (
                <Flex
                  rowCenter
                  style={{}}
                  context={isToday ? { color: 'black' } : {}}
                >
                  <Txt style={{ width: 52 }} semibold={isToday}>
                    {formatTime(day.start)}
                  </Txt>
                  <Txt style={{ width: 20 }} semibold={isToday}>
                    -
                  </Txt>
                  <Txt semibold={isToday}>{formatTime(day.end)}</Txt>
                </Flex>
              ) : (
                <Txt>Not available</Txt>
              )}
            </Flex>
          )
        })}
      </Flex>
      <Flex context={{ scale: 1.2 }}>
        <TabButton
          isActive
          onPress={hide}
          style={{ fontSize: 14, marginTop: 80, alignSelf: 'center' }}
        >
          Continue to Chat
        </TabButton>
        <Txt
          style={{
            color: '#555',
            textAlign: 'center',
            alignSelf: 'center',
            maxWidth: 200,
            lineHeight: 19,
            marginTop: 23,
          }}
        >
          <Txt>{practitioner.name}</Txt> won't receive notifications while
          unavailable
        </Txt>
      </Flex>
    </Flex>
  )
}
