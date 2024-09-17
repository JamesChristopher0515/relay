import PageLayout from 'core/components/layout/PageLayout'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import { AnimatedFlex } from '@mtyk/frontend/native/animation/components/AnimatedComponents'
import React from 'react'

function JournalPage() {
  return (
    <PageLayout>
      <AnimatedFlex center style={{ flex: 1 }}>
        <Txt style={{ color: '#555' }}>Milestone 5</Txt>
      </AnimatedFlex>
    </PageLayout>
  )
}

export default JournalPage
