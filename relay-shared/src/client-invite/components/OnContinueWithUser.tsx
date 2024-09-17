import { Flex, Txt } from '@mtyk/frontend/core/components'
import useInputAdapter from '@mtyk/frontend/forms/hooks/useInputAdapter'
import React from 'react'
import ClientInviteMachine from '../machines/ClientInvite.machine'
import { RC } from '../../core/components/RC'

export function OnContinueWithEmail() {
  const password = useInputAdapter('')
  const confirmPassword = useInputAdapter('')

  return (
    <Flex>
      <Txt>Setup a strong password</Txt>
      <Txt>
        Make sure it’s at least 8 characters long and contains a mixture of
        uppercase and lowercase letters.
      </Txt>
      <RC name="Input" type="password" placeholder="Password" {...password} />
      <RC
        name="Input"
        type="password"
        placeholder="Confirm Password"
        {...confirmPassword}
      />
      <RC name="PasswordMeter" password={password} />
      <RC
        name="Button"
        label="Next"
        action={async () => {
          await ClientInviteMachine.transitionTo('onSetPassword', {
            password: password.value,
            confirmPassword: confirmPassword.value,
            verifyToken: ClientInviteMachine.currentContext.token,
          })
        }}
      />
    </Flex>
  )
}

export const OnContinueWithUser = OnContinueWithEmail
export const OnContinueWithVerifyToken = OnContinueWithEmail
