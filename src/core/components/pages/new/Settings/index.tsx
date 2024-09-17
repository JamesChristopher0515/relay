import { Flex, Txt } from '@mtyk/frontend/core/components'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import { isIos } from '@mtyk/frontend/native/helpers/platform'
import { shadow } from '@mtyk/frontend/styles/helpers/styles'
import TimePicker from 'core/components/forms/TimePicker'
import { useClient } from 'core/hooks/useUser'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import CheckBox from 'react-native-check-box'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SwitchToggle from 'react-native-switch-toggle'
import useLogout from 'relay-shared/frontend/api/hooks/useLogout'
import SettingsCheckInController from 'settings/components/SettingsCheckInController'
import SettingsHealthController from 'settings/components/SettingsHealthController'
import Images from '../Images/Images'
import Styles from './Styles'

type IProps = {}

const Settings: React.FC<IProps> = (props) => {
  const [client] = useClient()

  const dec = useDecorationsContext()
  const [logout] = useLogout()
  const checkInSettingsController = SettingsCheckInController.use({})
  const healthSettingsController = SettingsHealthController.use({})
  const borderRadius = 20
  return (
    <Flex
      grow
      onTouchStart={() => {}}
      style={{
        backgroundColor: 'white',
        paddingBottom: 20,
        borderTopLeftRadius: borderRadius,
        borderTopRightRadius: borderRadius,
        ...shadow(),
      }}
    >
      <View style={Styles.containerWrapper}>
        {/* First CheckBox */}
        <View style={Styles.checkBoxContainer}>
          <Text style={Styles.textOption}>
            {checkInSettingsController?.checkInMessage}
          </Text>
          <View style={{ alignItems: 'center' }}>
            <CheckBox
              isChecked={true}
              onClick={() => {}}
              checkBoxColor={'#A38888'}
              checkedCheckBoxColor={'#A38888'}
              uncheckedCheckBoxColor={'#DADFE6'}
              style={{
                width: hp(2.5),
                height: hp(2.5),
              }}
            />
            <Text style={Styles.checkText}>{'Check-in'}</Text>
          </View>
        </View>
        {/* Remind me at  */}
        <View style={Styles.remindContainer}>
          {checkInSettingsController?.remindMeOptions.map((option, index) => {
            return (
              <Flex rowCenter between key={index} fw>
                <Txt style={Styles.remaindText} semibold>
                  {option.label}
                </Txt>
                <TimePicker {...option.timePickerProps} />
              </Flex>
            )
          })}
        </View>
        {/* Line */}
        <View style={Styles.seperator} />
        {/* Privay */}
        {isIos() ? (
          <>
            <View style={Styles.privacyContainer}>
              <Text style={Styles.textOption}>
                Relay can automatically send relevant health information to your
                doctor.
              </Text>
              <View style={{ alignItems: 'center' }}>
                <Image source={Images.lock} style={Styles.lockImage} />
                <Text style={Styles.checkText}>{'Privacy'}</Text>
              </View>
            </View>

            {/* sleep  */}
            {healthSettingsController.toggles.map((type) => {
              return (
                <View style={Styles.toogleContainer} key={type.name}>
                  <Text style={Styles.sleepText}>{type.name}</Text>
                  <SwitchToggle
                    switchOn={type.value}
                    onPress={() => type.onChange(!type.value)}
                    circleColorOff="white"
                    circleColorOn="white"
                    backgroundColorOn="#CDBFBF"
                    backgroundColorOff="#e7dae0"
                    containerStyle={{
                      width: hp(5),
                      height: hp(2.5),
                      borderRadius: 25,
                      padding: 2,
                    }}
                    circleStyle={{
                      width: hp(2),
                      height: hp(2),
                      borderRadius: hp(2),
                    }}
                  />
                </View>
              )
            })}
            {/* Line */}
            <View style={Styles.seperator} />
          </>
        ) : null}
        {/* Account */}
        <View style={Styles.privacyContainer}>
          <Text style={Styles.textOption}>
            {'Manage your account details, username and password'}
          </Text>
          <View style={{ alignItems: 'center' }}>
            <Image source={Images.account} style={Styles.lockImage} />
            <Text style={Styles.checkText}>{'Account'}</Text>
          </View>
        </View>
        {/* Check Login */}
        <View style={Styles.privacyContainer}>
          <View>
            <Text style={Styles.sleepText}>{'Currently logged in as'}</Text>
            <View style={{ flexDirection: 'row', marginTop: hp(1) }}>
              <View style={Styles.circleActive} />
              <Text style={Styles.activeText}>{client?.name}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              logout()
              dec.close()
            }}
          >
            <Image source={Images.logoutButton} style={Styles.logoutStyle} />
          </TouchableOpacity>
        </View>
        {/* Bottom Wrapper */}
        <View style={Styles.privacyContainer}>
          <TouchableOpacity
            onPress={() => {
              dec.close()
            }}
          >
            <Flex rowCenter>
              <Image source={Images.back} style={Styles.settingImage} />
              <Text style={Styles.backText}>{'Back'}</Text>
            </Flex>
          </TouchableOpacity>
          <Flex rowCenter>
            <TouchableOpacity>
              <Image source={Images.settings} style={Styles.settingImage} />
            </TouchableOpacity>
            <Text style={Styles.activeText}>{'Settings'}</Text>
          </Flex>
        </View>
      </View>
    </Flex>
  )
}
export default Settings
