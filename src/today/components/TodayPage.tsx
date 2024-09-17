import { Flex, Txt } from '@mtyk/frontend/core/components'
import { useUrlParams } from '@mtyk/frontend/core/hooks'
import { Redirect, useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import PageLayout from 'core/components/layout/PageLayout'
import { useClient } from 'core/hooks/useUser'
import TodayJourney from 'journeys/components/TodayJourney'
import React, { useEffect } from 'react'
import { ScrollView, Text } from 'react-native'
import wrapArrayHook from 'relay-shared/core/helpers/wrapArrayHook'
import { useGetAssignedJourneysQuery } from 'relay-shared/frontend/api/hooks/useApi'
import { Todo } from 'relay-shared/RelayTypes'
import TodayViewController from 'relay-shared/todos/controllers/TodayViewController'
import SettingsModal from 'settings/components/SettingsModal'
import { TodoGroup } from './TodoGroup'

interface TodayPageProps {}

export default function TodayPage(props: TodayPageProps) {
  const {} = props
  const controller = TodayViewController.use({})

  // Onboarding stuff
  const dec = useDecorationsContext()
  const history = useHistory()
  const { params } = useUrlParams()
  const [user] = useClient()

  useEffect(() => {
    if ('settingsOpen' in params && !dec.modal) {
      dec.openModal(SettingsModal, { pageLayout: PageLayout })
      history.replace('/')
    }
  }, [params.settingsOpen])

  if (!user.onboardingComplete) {
    return <Redirect to="/onboarding" />
  }

  const { data: ajs } = wrapArrayHook(
    useGetAssignedJourneysQuery({ client: user._id }, { pollingInterval: 5000 })
  )
  const activeAssignedJourneys = ajs.filter((aj) => !aj.completedAt)

  return (
    <PageLayout>
      <ScrollView>
        <Flex grow={1} style={{ paddingTop: 50 }}>
          <Txt black color={'#967864'} size={24}>
            {controller.title}
          </Txt>


          <Txt
            semibold
            color={'#B09595'}
            size={16}
            style={{ marginTop: 12, marginBottom: 25 }}
          >
            {controller.message}
          </Txt>

          {controller.todosByType.map(
            (todos: { group: any; items: Todo[] }) => {
              return (
                <TodoGroup
                  key={todos.group}
                  group={todos.group}
                  items={todos.items}
                />
              )
            }
          )}
          {activeAssignedJourneys.map((aj) => {
            return <TodayJourney assignedJourney={aj._id} key={aj._id} />
          })}
        </Flex>
      </ScrollView>
    </PageLayout>
  )
}
