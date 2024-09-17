import { useFonts } from '@expo-google-fonts/manrope'
import { config as mtykConfig } from '@mtyk/frontend/core/helpers/config'
import {
  Route,
  useHistory,
  useLocation,
} from '@mtyk/frontend/core/hooks/routerHooks'
import DecorationsRenderer from '@mtyk/frontend/decorations/components/DecorationsRenderer'
import DevExperience from '@mtyk/frontend/dev/components/DevExperience'
import useDeepLinkHandler from '@mtyk/frontend/linking/hooks/useDeepLinkHandler'
import AppointmentPage from 'appointments/components/AppointmentPage'
import NewCheckInPage from 'check-in/pages/NewCheckInPage'
import NewBg from 'core/components/NewBg'
import ChatPage from 'core/components/pages/chat'
import JournalPage from 'core/components/pages/journal'
import LoginPage from 'core/components/pages/login'
import EntriesPage from 'core/components/pages/new/Entries'
import RelayContext from 'core/context/RelayContext'
import { useAppDispatch } from 'core/hooks/coreHooks'
import usePushNotifications from 'core/hooks/usePushNotifications'
import { StatusBar } from 'expo-status-bar'
import AssignedJourneyPage from 'journeys/components/AssignedJourneyPage'
import OnboardingPage from 'questionnaires/components/OnboardingPage'
import QuestionnairePage from 'questionnaires/components/QuestionnairePage'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import 'react-native-gesture-handler'
import 'react-native-reanimated'
import useClientShared from 'relay-shared/clients/hooks/useClientShared'
import {
  useGetPractitionerQuery,
  useMeQuery,
} from 'relay-shared/frontend/api/hooks/useApi'
import { setTokens } from 'relay-shared/frontend/api/reducers/authReducer'
import { config } from 'relay-shared/frontend/core/helpers/config'
import ResourcesPage from 'resources/components/ResourcesPage'
import TodayPage from 'today/components/TodayPage'
import useAsyncEffect from 'use-async-effect'
import CompleteWorksheetPage from 'worksheets/components/CompleteWorksheet/CompleteWorksheetPage'

// if (__DEV__) {
//   // in development, prevent red box from coming up for every error. just print to console instead
//   // const c = console as any
//   // c.reportErrorsAsExceptions = false
//   LogBox.ignoreAllLogs()
// }

function LoggedInRoutes() {
  const [client] = useClientShared()

  const location = useLocation()
  if (location.pathname === '/') {
    // Change this to redirect to your new route automatically
    // return <Redirect to="/worksheet/62da9f4a480c87daf69a6e86" />
    // return <Redirect to="/assigned-journey/62d9c95262b298e30040a7f5" />
  }
  return (
    <>
      <Route exact path="/" component={TodayPage} />
      <Route exact path="/check-in" component={NewCheckInPage} />
      <Route exact path="/journal" component={JournalPage} />
      <Route exact path="/entries" component={EntriesPage} />
      <Route exact path="/resources" component={ResourcesPage} />
      <Route exact path="/chat" component={ChatPage} />

      <Route path="/appointment/:id" component={AppointmentPage} />
      <Route path="/worksheet/:id" component={CompleteWorksheetPage} />
      <Route path="/questionnaire/:ids" component={QuestionnairePage} />
      <Route path="/onboarding" component={OnboardingPage} />
      <Route path="/assigned-journey/:id" component={AssignedJourneyPage} />
    </>
  )
}

function LoggedOutRoutes() {
  return (
    <>
      <Route component={LoginPage} />
    </>
  )
}

function AllRoutes() {
  return <></>
}

function PushNotifications() {
  usePushNotifications()
  return null
}

function AppInner() {
  const [fontsLoaded] = useFonts(mtykConfig.fonts)

  const { data: user, isLoading: isUserLoading } = useMeQuery({})
  const { data: practitioner, isLoading: isPractitionerLoading } =
    useGetPractitionerQuery(user?.practitioner, {
      skip: !user || !user.practitioner,
    })

  const loading = !fontsLoaded || isUserLoading || isPractitionerLoading
  const history = useHistory()

  if (loading) {
    return null
  } else {
    return (
      <DevExperience disabled={false}>
        <RelayContext.Provider value={{ user, practitioner }}>
          <NewBg />
          <View style={{ flex: 1 }}>
            <DecorationsRenderer>
              <AllRoutes />
              {user ? <LoggedInRoutes /> : <LoggedOutRoutes />}
            </DecorationsRenderer>
            <StatusBar style="dark" />
          </View>
          <PushNotifications />
        </RelayContext.Provider>
      </DevExperience>
    )
  }
}

function AppAfterSetup({ ...rest }) {
  const [ready, setReady] = useState(false)
  const dispatch = useAppDispatch()

  useDeepLinkHandler()

  useAsyncEffect(async (isMounted) => {
    if (!ready) {
      const { localStorage } = config
      let tokens
      if (typeof window !== 'undefined') {
        // Don't try to populate from localStorage when SSR
        try {
          tokens = JSON.parse(await localStorage.getItem('tokens')!)
          dispatch(setTokens(tokens))
          if (isMounted()) {
            setReady(true)
          }
        } catch (e) {
          console.error(e)
        }
      }
    }
  }, [])
  return ready ? <AppInner {...rest} /> : null
}

export default AppAfterSetup
