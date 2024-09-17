import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import { globalDepContext } from '@bbuild/deps'
import React from 'react'
import { RC } from '../../core/components/RC'
import Backable from './Backable'
import { LinkingDep } from '../../core/helpers/clientAppDeps'
import RelayIcons from '../../frontend/icons/RelayIcons'

export function InviteSent() {
  return (
    <Backable>
      <Flex gap={18} center>
        <Icon icon={RelayIcons.envelope} size="3em" />
        <Txt size={18} center>
          We’ve sent another invitation to your email.
        </Txt>
        <Txt size={16} center>
          Please follow the instructions within to continue.{' '}
        </Txt>
        <RC
          name="Button"
          action={async () => {
            const { LinkingDep: Linking } = await globalDepContext.provideDeps({
              LinkingDep,
            })
            Linking.openURL('message://')
          }}
        >
          Check Email
        </RC>
      </Flex>
    </Backable>
  )
}
