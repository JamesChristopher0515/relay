import { CheckInCard } from 'check-in/components/CheckInCard'
import PageLayout from 'core/components/layout/PageLayout'
import TabButton from 'core/components/TabButton'
import { format } from 'date-fns'
import JournalEntryPage from 'journal-entries/components/JournalEntryPage'
import {
  Flex,
  TabProvider,
  TabSwitcher,
  Txt,
} from '@mtyk/frontend/core/components'
import { TabSpy } from '@mtyk/frontend/core/components/TabProvider'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects'
import React, { useState } from 'react'
import { Image, SectionList, Text, TouchableOpacity, View } from 'react-native'
import EntriesController from 'relay-shared/entries/controllers/EntriesController'
import { ResourcesContentList } from 'resources/components/ResourcesContentList'
import Goals from '../AddGoal'
import AddGoal from '../AddGoal/NewGoalAdd'
import Images from '../Images/Images'
import { EntriesMonth } from './EntriesMonth'
import Styles from './Styles'

type IProps = {
  navigation: any
}

const EntriesPage: React.FC<IProps> = (props) => {
  const entriesController = EntriesController.use({})

  const history = useHistory()
  const [openGoals, setOpenGoals] = useState(false)
  const [addGoals, setAddGoals] = useState(false)

  const openCheck = () => {
    history.push('/check-in')
  }
  const openGoalsModel = () => {
    setOpenGoals(!openGoals)
  }
  const openAddGoalsModel = () => {
    setOpenGoals(false)
    // Have to add a timeout here otherwise the animation for
    // adding a goal doesn't work properly - bug with react-native-modal?
    setTimeout(() => {
      setAddGoals(true)
    }, 500)
  }
  const closeAddGoalsModel = () => {
    setAddGoals(false)
    setTimeout(() => {
      setOpenGoals(true)
    }, 500)
  }

  return (
    <TabProvider tabs={['Calendar', 'Entries']}>
      <PageLayout hideSettings>
        <Flex rowCenter between>
          <TabSwitcher
            renderButton={(props) => <TabButton {...props} />}
            style={[]}
          />
          <TouchableOpacity onPress={openGoalsModel}>
            <Flex center gap={4}>
              <Image source={Images.goals} style={{ ...makeSize(20) }} />
              <Txt color="#5C8870" bold size={13}>
                {'My Goals'}
              </Txt>
            </Flex>
          </TouchableOpacity>
        </Flex>
        <TabSpy>
          {({ activeTab }) => {
            if (activeTab.label === 'Calendar') {
              return (
                <SectionList
                  inverted
                  sections={entriesController.months
                    .map((month) => {
                      return {
                        title: format(month, 'MMMM'),
                        data: [month],
                      }
                    })
                    .concat({ title: 'today', data: ['today'] })
                    .reverse()}
                  keyExtractor={(item, index) => item.toString()}
                  renderSectionFooter={({ section: { title } }) => {
                    const isToday = title === 'today'
                    return (
                      <Txt
                        capitalize
                        bold
                        color={'#967864'}
                        style={{
                          marginTop: isToday ? 50 : 30,
                          marginBottom: 11,
                        }}
                        size={isToday ? 14 : 17}
                      >
                        {title}
                      </Txt>
                    )
                  }}
                  renderItem={({ item, index }) => {
                    const isToday = item === 'today'
                    if (isToday) {
                      return entriesController.checkInToday ? (
                        <CheckInCard today canGoFullscreen />
                      ) : (
                        <View style={[Styles.checkGoalsActivity]}>
                          <Text style={Styles.notCheckText}>
                            {"You haven't checked in yet today"}
                          </Text>
                          <TouchableOpacity onPress={openCheck}>
                            <Text style={Styles.checkText}>
                              {'Check in now?'}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )
                    }
                    return (
                      <EntriesMonth
                        entriesController={entriesController}
                        month={item}
                        isToday
                      />
                    )
                  }}
                  style={{ flexGrow: 1 }}
                  contentContainerStyle={{ paddingTop: 60 }}
                />
              )
            } else {
              return <JournalEntryPage style={{ flexGrow: 1 }} />
            }
          }}
        </TabSpy>

        {openGoals ? (
          <Goals close={openGoalsModel} addAnother={openAddGoalsModel} />
        ) : null}
        {addGoals ? <AddGoal close={closeAddGoalsModel} /> : null}
      </PageLayout>
    </TabProvider>
  )
}
export default EntriesPage
