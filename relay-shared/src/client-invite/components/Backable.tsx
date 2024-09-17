import { Flex } from '@mtyk/frontend/core/components'
import React from 'react'
import ClientInviteMachine from '../machines/ClientInvite.machine'
import { RC } from '../../core/components/RC'
import RelayIcons from '../../frontend/icons/RelayIcons'

function Backable({ children }) {
  return (
    <Flex>
      <RC
        name="TextButton"
        icon={RelayIcons.back}
        action={async () => {
          await ClientInviteMachine.transitionTo('onLoginScreen')
        }}
      >
        Back
      </RC>
      {children}
    </Flex>
  )
}

export default Backable
