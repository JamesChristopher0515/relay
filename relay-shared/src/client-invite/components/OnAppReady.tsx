import { useMachine2 } from '@bbuild/machine2-react'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import useInputAdapter from '@mtyk/frontend/forms/hooks/useInputAdapter'
import React from 'react'
import ClientInviteMachine from '../machines/ClientInvite.machine'
import { RC } from '../../core/components/RC'

export function OnAppReady() {
  const machine = useMachine2(ClientInviteMachine)
  const { currentState, isTransitioning, currentContext } = machine
  const { tokens, user } = currentContext
  const email = useInputAdapter('')

  if (user) {
    return (
      <Flex center gap={10}>
        <Txt center>Welcome to Relay</Txt>
        <RC
          name="Button"
          label={`Continue as ${user.name}`}
          action={async () => {
            await machine.transitionTo('onContinueWithUser', {
              tokens,
              user,
            })
          }}
        />

        <RC
          name="Button"
          label="Login with another account"
          action={async () => {
            await machine.transitionTo('onAppReady', {})
          }}
        />
      </Flex>
    )
  } else {
    return null
  }
}
