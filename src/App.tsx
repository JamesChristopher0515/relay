import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope'
import configMTYKShared from '@mtyk/frontend/core/helpers/config'
import Router from '@mtyk/frontend/core/hooks/routerHooks'
import {
  Transitions,
  setDefaultTransition,
} from '@mtyk/frontend/native/animation/components/TransitionManager'
import PasswordStrengthMeter from '@mtyk/frontend/native/auth/components/PasswordStrengthMeter'
import { absoluteFill } from '@mtyk/frontend/styles/helpers/styleObjects'
import MediaPlayerContextProvider from 'content/components/MediaPlayerContextProvider'
import Bg from 'core/components/Bg'
import fixConfig from 'core/helpers/fixes'
import { useClient } from 'core/hooks/useUser'
import { useWrappedAxios } from 'core/hooks/useWrappedAxios'
import { store } from 'core/store'
import 'expo-dev-client'
import FeelingIcon from 'feelings/components/FeelingIcon'
import React from 'react'
import { ActivityIndicator, Keyboard, View, Text } from 'react-native'
import 'react-native-get-random-values'
import {} from 'react-native-reanimated'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import 'react-native-url-polyfill/auto'
import { Provider } from 'react-redux'
import RContext from 'relay-shared/core/contexts/RContext'
import config from 'relay-shared/frontend/core/helpers/config'
import AppRouter from './AppRouter'
import TabButton from './core/components/TabButton'
import TextButton from './core/components/TextButton'
const { RootSiblingParent } = require('react-native-root-siblings')

//! David Charles
// const API_URL = 'http://localhost:4000/v1'
const API_URL = 'https://api.relayapp.co.uk/v1'
const API_URL_2 = 'https://api.relayapp.co.uk/v1'

configMTYKShared({
  isNative: true,
  fonts: {
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  },
  apiUrl: API_URL,
  rootUrl: '',
  environment: __DEV__ ? 'development' : 'production',
})
config({
  localStorage: require('@mtyk/frontend/data/helpers/getLocalStorage').default,
})
setDefaultTransition({ ...Transitions.fade, duration: 1000 })

export default function App() {
  return (
    <RootSiblingParent>
      <Router>
        <Provider store={store}>
          <MediaPlayerContextProvider>
            <RContext.Provider
              value={{
                platformHooks: {
                  useClient: useClient,
                  useWrappedAxios: useWrappedAxios,
                },
                platformComponents: {
                  loading: () => (
                    <ActivityIndicator size="small" color="#ccc" />
                  ),
                  FeelingIcon,
                  PasswordMeter: PasswordStrengthMeter,
                  Button: TabButton,
                  TextButton: TextButton,
                  Spinner: () => (
                    <ActivityIndicator size="small" color="#ccc" />
                  ),
                },
                sharedActions: {},
              }}
            >
              <View
                onTouchStart={() => {
                  if (fixConfig.autoKeyboardDismiss) {
                    Keyboard.dismiss()
                  }
                }}
                style={{ flex: 1 }}
              >
                <SafeAreaProvider>
                  <Bg />
                  <View style={{ ...absoluteFill() }}>
                    <AppRouter />
                  </View>
                </SafeAreaProvider>
              </View>
            </RContext.Provider>
          </MediaPlayerContextProvider>
        </Provider>
      </Router>
    </RootSiblingParent>
  )
}
