import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import { useClient } from 'core/hooks/useUser'
import useHealth from 'health/hooks/useHealth'
import { get, startCase } from 'lodash'
import { Alert, Linking } from 'react-native'

export default makeController(function SettingsHealthController() {
  const [client, { update }] = useClient()
  const { isAuthorized, fetchStats, init: initHealth } = useHealth()

  return {
    toggles: ['sleep', 'distance', 'steps'].map((type) => {
      return {
        name:
          {
            distance: 'Distance walked',
          }[type] ?? startCase(type),
        onChange: (value) => {
          const afterPromptShown = () => {
            return update({
              settings: {
                ...(client.settings ?? {}),
                health: {
                  ...(client.settings?.health ?? {}),
                  [type]: value,
                },
              },
            }).unwrap()
          }
          if (value) {
            Alert.alert(
              'Confirm Permission',
              `After you have granted permission via your device settings, your practitioner will be able to view health information you choose to share.\n\nYou may disable sharing at any time by coming back to the settings page.`,
              [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Confirm',
                  onPress: () =>
                    initHealth()
                      .then(async () => {
                        await afterPromptShown()

                        // Try fetch some stats to see if maybe permission was granted, or if the user may need to go to settings to enable
                        fetchStats({ limit: 1, startDate: new Date(0) }).then(
                          (results) => {
                            if (results.length === 0) {
                              Alert.alert(
                                'No health data found',
                                `If you wish to enable health sharing, please check your device's privacy settings and ensure you have granted Health access to Relay.\n\nIf you have granted access and you are still seeing this message, your device may not have generated any data yet. You can safely ignore this message.`
                              )
                            }
                          }
                        )
                      })
                      .catch((e) => console.error(e)),
                },
              ]
            )
          } else {
            afterPromptShown()
          }
        },
        value: get(client.settings, `health.${type}`, false),
      }
    }),
  }
})
