import Constants from 'expo-constants'
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { useEffect } from 'react'
import { Platform } from 'react-native'
import useUser from './useUser'
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})
export default function usePushNotifications() {
  if (!Device.isDevice) {
    // No point running on simulator
    return
  }
  const { user, update } = useUser()

  useEffect(() => {
    if (!user) {
      // Can't register for push notifications when not logged in
      return
    }
    registerForPushNotificationsAsync()
  }, [user?._id])

  async function registerForPushNotificationsAsync() {
    let expoPushToken
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        console.warn('Failed to get push token for push notification!')
        return
      }
      expoPushToken = (
        await Notifications.getExpoPushTokenAsync({
          experienceId: '@mtyk/relay',
        })
      ).data
      update({ expoPushToken })
    } else {
      console.warn('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      })
    }

    return expoPushToken
  }
}
