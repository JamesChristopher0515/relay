import { faUser, faUserCog } from '@fortawesome/free-solid-svg-icons'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import React from 'react'
import useLogout from 'relay-shared/frontend/api/hooks/useLogout'
import TabButton from '../../core/components/TabButton'
import SettingsSection, { SettingsTitleFA } from './SettingsSection'

export default function SettingsAccount({ ...rest }) {
  const [logoutMutation] = useLogout()
  const dec = useDecorationsContext()
  const logout = async () => {
    await logoutMutation()
    dec.close()
  }

  return (
    <SettingsSection
      title="My Account"
      icon={<SettingsTitleFA icon={faUserCog} />}
      {...rest}
      // style={{ marginTop: 100 }}
    >
      <Flex center style={{ height: 180 }}>
        <Txt style={{ color: '#999' }}> Milestone 6</Txt>
      </Flex>
      <TabButton
        isActive
        onPress={() => {
          logout()
        }}
        style={{
          fontSize: 17,
          marginTop: 70,
          marginBottom: 20,
          alignSelf: 'center',
        }}
      >
        Logout
      </TabButton>
    </SettingsSection>
  )
}
