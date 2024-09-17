import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import PageLayout from 'core/components/layout/PageLayout'
import TabButton from 'core/components/TabButton'
import {
  Flex,
  Icon,
  TabProvider,
  TabSwitcher,
} from '@mtyk/frontend/core/components'
import { TabSpy } from '@mtyk/frontend/core/components/TabProvider'
import { allCorners } from '@mtyk/frontend/styles/helpers/styleObjects'
import React, { useState } from 'react'
import { ActivityIndicator, TextInput, TouchableOpacity } from 'react-native'
import { ViewControllerProps } from '@mtyk/frontend/controllers/helpers/makeController'
import ResourcesController from 'resources/controllers/ResourcesController'
import { shadow } from '@mtyk/frontend/styles/helpers/styles'
import { ResourcesContentList } from './ResourcesContentList'
import ResourcesRecent from './ResourcesRecent'

interface ResourcesPageProps {}

function ResourcesSearch({
  controller,
  setSearchOpen,
}: {
  controller: ViewControllerProps<typeof ResourcesController>
  setSearchOpen: (open: boolean) => void
}) {
  return (
    <Flex rowCenter>
      <TextInput
        autoFocus
        onBlur={() => {
          if (!controller.hasSearchValue) {
            setSearchOpen(false)
          }
        }}
        {...controller.searchValue}
        placeholder="Search for resources..."
        placeholderTextColor="#979797"
        style={{
          height: 44,
          backgroundColor: '#F8F4F4',
          color: '#535353',
          width: '100%',
          borderRadius: 999,
          fontSize: 15,
          textAlign: 'center',
        }}
      />
      <ActivityIndicator
        size="small"
        color="#94847C"
        animating={controller.loadingSearch}
        style={{ position: 'absolute', right: 13, top: 12 }}
      />
      {controller.hasSearchValue ? (
        <TouchableOpacity
          onPress={() => {
            setSearchOpen(false)
          }}
          hitSlop={{ ...allCorners(15) }}
          style={{ position: 'absolute', left: 17, top: 13 }}
        >
          <Icon size={17} color={'#888'} icon={faTimes} />
        </TouchableOpacity>
      ) : null}
    </Flex>
  )
}

export default function ResourcesPage(props: ResourcesPageProps) {
  const {} = props

  const controller = ResourcesController.use()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <TabProvider tabs={controller.tabs}>
      <PageLayout
        pageInsets={[50, 0, 0, 0]}
        style={{ ...shadow() }}
        avoidKeyboard={false}
      >
        <ResourcesRecent />
        <Flex
          style={{
            borderRadius: 30,
            backgroundColor: 'white',
            flex: 1,
            marginHorizontal: -20,
            paddingHorizontal: 20,
            paddingVertical: 10,
            marginBottom: 20,
            justifyContent: 'center',
          }}
          grow={1}
        >
          {searchOpen ? (
            <ResourcesSearch
              controller={controller}
              setSearchOpen={setSearchOpen}
            />
          ) : (
            <Flex rowCenter between>
              <TabSwitcher
                renderButton={(props) => <TabButton {...props} />}
                style={[]}
              />
              <TouchableOpacity onPress={() => setSearchOpen(true)}>
                <Icon color={'#B4B4B4'} icon={faSearch} />
              </TouchableOpacity>
            </Flex>
          )}
          <TabSpy>
            {({ activeTab }) => {
              return (
                <ResourcesContentList
                  isFavourites={activeTab.label === 'Favourites'}
                  isSearching={searchOpen}
                  controller={controller}
                />
              )
            }}
          </TabSpy>
        </Flex>
      </PageLayout>
    </TabProvider>
  )
}
