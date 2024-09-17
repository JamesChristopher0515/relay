import { useMachine2 } from '@bbuild/machine2-react'
import Backable from './Backable'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import useInputAdapter from '@mtyk/frontend/forms/hooks/useInputAdapter'
import React from 'react'
import ClientInviteMachine from '../machines/ClientInvite.machine'
import { RC } from '../../core/components/RC'

export function OnEnterPassword() {
  const { currentContext } = useMachine2(ClientInviteMachine)
  const password = useInputAdapter('')
  return (
    <Backable>
      <Flex>
        <Txt>Relay</Txt>

        <Txt>
          Please enter the email or username provided to you by your
          practitioner
        </Txt>

        <Flex rc gap={5}>
          <RC
            name="Input"
            type="password"
            placeholder="Password"
            {...password}
          />
          <RC
            name="IconButton"
            label="Next"
            action={async () => {
              await ClientInviteMachine.transitionTo('onLogin', {
                email: currentContext.email,
                password,
              })
            }}
          />
        </Flex>
      </Flex>
    </Backable>
  )
}
