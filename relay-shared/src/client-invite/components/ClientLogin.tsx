import { useMachine2 } from '@bbuild/machine2-react'
import { Txt } from '@mtyk/frontend/core/components'
import React, { useEffect } from 'react'
import ClientInviteMachine from '../machines/ClientInvite.machine'
import { InviteSent } from './InviteSent'
import { OnAppReady } from './OnAppReady'
import { OnContinueWithEmail, OnContinueWithUser } from './OnContinueWithUser'
import { OnEnterPassword } from './OnEnterPassword'
import { OnLoginScreen } from './OnLoginScreen'
import { OnSubmitEmail } from './OnSubmitEmail'

export interface ClientLoginProps {
  verify?: string
}
export interface ClientLoginRefHandle {}

export default function ClientLogin(props: ClientLoginProps) {
  const { verify } = props
  const machine = useMachine2(ClientInviteMachine)
  const { currentState, isTransitioning, currentContext } = machine

  useEffect(() => {
    if (machine.currentState === 'Idle') {
      if (verify) {
        machine.transitionTo('onContinueWithVerifyToken', { token: verify })
      } else {
        machine.transitionTo('onAppReady', {})
      }
    }
  }, [])

  const map = {
    onContinueWithUser: OnContinueWithUser,
    onContinueWithVerifyToken: OnContinueWithUser,
    onSubmitEmail: OnSubmitEmail,
    onSetPassword: OnContinueWithEmail,
    onLoginScreen: OnLoginScreen,
    inviteSent: InviteSent,
    onEnterPassword: OnEnterPassword,
    onAppReady: OnAppReady,
  }

  const Component = map[currentState]
  if (!Component) {
    return <Txt>No component for {currentState}</Txt>
  }
  return <Component />
}
