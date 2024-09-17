import PageLayout from 'core/components/layout/PageLayout'
import PractitionerName from 'core/components/PractitionerName'
import TabButton from 'core/components/TabButton'
import useUser from 'core/hooks/useUser'
import dayjs from 'dayjs'
import _, { groupBy, orderBy } from 'lodash'
import {
  Flex,
  TabProvider,
  TabSwitcher,
  Txt,
} from '@mtyk/frontend/core/components'
import { TabSpy } from '@mtyk/frontend/core/components/TabProvider'
import { parseDates } from '@mtyk/frontend/core/helpers'
import { Redirect } from '@mtyk/frontend/core/hooks/routerHooks'
import { AnimatedFlex } from '@mtyk/frontend/native/animation/components/AnimatedComponents'
import React from 'react'
import { SectionList } from 'react-native'
import { useGetAssignedResourcesQuery } from 'relay-shared/frontend/api/hooks/useApi'
import ContentListItem from './ContentListItem'

function ContentInner({ tab }) {
  const opts = {
    pollingInterval: 1000 * 10,
  }
  const { data: _assignedContent1, isLoading: isLoadingAssigned } =
    useGetAssignedResourcesQuery({ type: 'content', limit: 100 }, opts)
  const { data: _assignedContent2, isLoading: isLoadingAssigned2 } =
    useGetAssignedResourcesQuery({ type: 'thinking-points', limit: 100 }, opts)

  const allData = (_assignedContent1?.data ?? [])?.concat(
    _assignedContent2?.data ?? []
  )

  const assignedContent = parseDates(allData).map((item) => {
    if (item.type === 'thinking-points') {
      return { ...item, name: 'Thinking Points' }
    } else {
      return { ...item, name: item.content.name }
    }
  })

  const sortedContent = orderBy(
    assignedContent,
    tab === 'recent' ? ['createdAt', -1] : ['name', 1]
  )

  if (isLoadingAssigned || isLoadingAssigned2) {
    return null
  }

  if (sortedContent.length === 0) {
    return (
      <Flex center flex={1}>
        <Txt
          medium
          style={{ fontSize: 16, lineHeight: 25, color: '#4E696C' }}
          center
        >
          <PractitionerName /> hasn't shared any resources with you yet. Once
          they do, they'll show up here.
        </Txt>
      </Flex>
    )
  }

  const grouped = groupBy(sortedContent, (d) => {
    if (tab === 'recent') {
      const mo = dayjs(d.createdAt)
      return mo.startOf('month').format(mo.month() === 11 ? 'YYYY' : 'MMMM')
    } else {
      return d.name.toUpperCase()[0]
    }
  })

  const sections = _(grouped)
    .toPairs()
    .map(([k, v]) => {
      return {
        title: k,
        data: v,
      }
    })
    .value()

  return (
    <Flex style={{ flex: 1 }}>
      <SectionList
        style={{ flex: 1 }}
        sections={sections}
        keyExtractor={(item, index) => item._id}
        renderItem={({ item }) => (
          <Flex style={{ marginBottom: 10 }}>
            <ContentListItem assignedResource={item} />
          </Flex>
        )}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title, data } }) => {
          return (
            <Flex
              rowCenter
              style={{
                marginBottom: data.length > 0 ? 15 : -10,
                marginTop: 20,
              }}
            >
              <Txt
                medium
                style={{
                  color: `#6B6B6B`,
                  fontSize: 21,
                }}
              >
                {title}
              </Txt>
            </Flex>
          )
        }}
      />
    </Flex>
  )
}

function ContentPage() {
  const { user } = useUser()
  if (!user.onboardingComplete) {
    return <Redirect to="/onboarding" />
  }

  return (
    <TabProvider tabs={['Recent', 'A-Z']}>
      <PageLayout>
        <AnimatedFlex
          column
          style={[
            {
              flexGrow: 1,
            },
          ]}
        >
          <TabSwitcher
            renderButton={(props) => <TabButton {...props} />}
            style={[]}
          />
          <TabSpy>
            {({ activeTab }) => (
              <ContentInner tab={activeTab.label.toLowerCase()} />
            )}
          </TabSpy>
        </AnimatedFlex>
      </PageLayout>
    </TabProvider>
  )
}

export default ContentPage
