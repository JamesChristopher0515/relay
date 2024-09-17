import { CheckInViewController } from 'check-in/controllers/CheckInViewController'
import RelayButton from 'core/components/RelayButton'
import TextButton from 'core/components/TextButton'
import { Flex } from '@mtyk/frontend/core/components'
import React from 'react'
import { ViewControllerProps } from '@mtyk/frontend/controllers/helpers/makeController'

interface CheckInBackForwardProps {
  checkInViewController: ViewControllerProps<typeof CheckInViewController>
}

export default function CheckInBackForward(props: CheckInBackForwardProps) {
  const { checkInViewController } = props

  return (
    <Flex rowCenter between style={{ marginVertical: 15 }}>
      {checkInViewController.canGoBack() ? (
        <TextButton action={checkInViewController.goBack}>Back</TextButton>
      ) : null}
      <Flex grow />
      <RelayButton
        action={checkInViewController.goToNextStep}
        disabled={!checkInViewController.canProgress()}
      >
        Next
      </RelayButton>
    </Flex>
  )
}
