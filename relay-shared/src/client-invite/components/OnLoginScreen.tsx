import { Flex, Txt, Icon } from '@mtyk/frontend/core/components'
import React from 'react'
import machine from '../../appointments/machines/VideoCallMachine'
import { RC } from '../../core/components/RC'
import ClientInviteMachine from '../machines/ClientInvite.machine'
import useInputAdapter from '@mtyk/frontend/forms/hooks/useInputAdapter'
import RelayIcons from '../../frontend/icons/RelayIcons'

export function OnLoginScreen() {
  const email = useInputAdapter('')
  return (
    <Flex center>
      <Flex center gap={25}>
        <Flex gap={5}>
          <Icon
            icon={RelayIcons.puzzlePiece}
            size="2em"
            color="rgba(0, 0, 0, .2)"
          />
          <Txt center medium>
            Relay
          </Txt>
        </Flex>

        <Flex center gap={12}>
          <Txt center style={{ maxWidth: 300 }}>
            Please enter the email or username provided to you by your
            practitioner
          </Txt>
          <Flex rc gap={5}>
            <RC name="Input" placeholder="Email of username" {...email} />
            <RC
              name="IconButton"
              label="Next"
              icon={RelayIcons.next}
              action={async () => {
                await ClientInviteMachine.transitionTo('onSubmitEmail', {
                  email: email.value,
                })
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
