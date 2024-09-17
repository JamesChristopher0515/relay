import HeaderButton from 'core/components/buttons/HeaderButton'
import PageLayout from 'core/components/layout/PageLayout'
import usePractitioner from 'core/hooks/usePractitioner'
import { useClient } from 'core/hooks/useUser'
import dayjs from 'dayjs'
import { Txt } from '@mtyk/frontend/core/components'
import { AnimatedFlex } from '@mtyk/frontend/native/animation/components/AnimatedComponents'
import React, { useState } from 'react'
import { ChatController } from 'relay-shared/frontend/chat/components/ChatController'
import { Practitioner } from 'relay-shared/RelayTypes'
import { AvailabilityOverlay } from './AvailabilityOverlay'
import { ChatView } from './ChatView'

function ChatPageInner({
  practitioner,
  unavailable,
  setShowOverlay,
}: {
  practitioner: Practitioner
  unavailable
  setShowOverlay
}) {
  const [client] = useClient()
  return (
    <ChatController
      client={client!}
      practitioner={practitioner}
      user={client!}
      component={ChatView}
      unavailable={unavailable}
      setShowOverlay={setShowOverlay}
    />
  )
}

function ChatPage() {
  const { practitioner, isLoading } = usePractitioner()
  const [user] = useClient()
  const today = (dayjs().day() + 8) % 7 // day.js starts week on sunday
  const todaySchedule = practitioner?.schedule.days[today]
  const now = dayjs()
  const asTodayTime = (d) => {
    const date = dayjs(d)
    const todayTime = dayjs()
    return todayTime.hour(date.hour()).minute(date.minute())
  }
  const isAvailable =
    todaySchedule &&
    todaySchedule.enabled &&
    asTodayTime(todaySchedule.start).isBefore(now) &&
    asTodayTime(todaySchedule.end).isAfter(now)
  const unavailable = practitioner && !isAvailable
  const [showOverlay, setShowOverlay] = useState(false)

  if (showOverlay) {
    return (
      <AvailabilityOverlay
        practitioner={practitioner}
        hide={() => setShowOverlay(false)}
      />
    )
  }
  return (
    <PageLayout
      safeView={{ top: null }}
      hideSettings
      header={
        <>
          <HeaderButton action={() => setShowOverlay(true)}>
            View Schedule
          </HeaderButton>
        </>
      }
    >
      <AnimatedFlex grow center={!practitioner} style={{ flex: 1 }}>
        {practitioner ? (
          <ChatPageInner
            practitioner={practitioner}
            unavailable={unavailable}
            setShowOverlay={setShowOverlay}
          />
        ) : user.practitioner ? null : (
          <Txt style={{ color: '#555', maxWidth: 340, textAlign: 'center' }}>
            You don't currently have an assigned practitioner
          </Txt>
        )}
      </AnimatedFlex>
    </PageLayout>
  )
}

export default ChatPage
