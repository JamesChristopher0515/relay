import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons'
import PractitionerName from 'core/components/PractitionerName'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import React from 'react'
import { SectionList } from 'react-native'
import ResourcesController from 'resources/controllers/ResourcesController'
import { ViewControllerProps } from '@mtyk/frontend/controllers/helpers/makeController'
import groupContentAZSections from '../helpers/groupContentAZ'
import ResourceItemRow from './ResourceItemRow'
import ResourcesNoContent from './ResourcesNoContent'

export function ResourcesContentList({
  isFavourites,
  isSearching,
  controller,
}: {
  isFavourites: boolean
  isSearching: boolean
  controller: ViewControllerProps<typeof ResourcesController>
}) {
  const data = isSearching
    ? controller.searchResults
    : isFavourites
    ? controller.favouritedContent
    : controller.assignedContent
  const sections = isSearching
    ? [{ title: 'Search Results', data }]
    : groupContentAZSections(data, 'content.name')
  if (isSearching) {
    if (!controller.hasSearchValue) {
      return (
        <ResourcesNoContent
          icon={faSearch}
          iconProps={{ color: '#ddd' }}
          message={'Start typing to search for resources...'}
        />
      )
    }
  }
  if (data.length === 0) {
    const { isLoading } = controller
    if (isSearching || isLoading) {
      if (controller.loadingSearch || isLoading) {
        return <Flex grow />
      }
      return (
        <ResourcesNoContent
          message={`We couldn’t find any resources for "${controller.searchValue.value}"`}
        />
      )
    }
    if (isFavourites) {
      return (
        <ResourcesNoContent
          message={
            'Tap the star icon next to any resource to add it to your favourites'
          }
          icon={faStar}
          iconProps={{ color: '#EFDDB1' }}
        />
      )
    } else {
      return (
        <ResourcesNoContent
          message={
            <>
              <PractitionerName /> hasn't shared any resources with you yet.
              Once they do, they'll show up here.
            </>
          }
        />
      )
    }
  }

  return (
    <SectionList
      style={{ flex: 1 }}
      sections={sections}
      keyExtractor={(item, index) => item._id}
      renderItem={({ item }) => <ResourceItemRow clientContent={item} />}
      stickySectionHeadersEnabled={false}
      renderSectionHeader={({ section: { title, data } }) => {
        if (isSearching) {
          return <Flex style={{ height: 40 }} />
        }
        return (
          <Flex
            rowCenter
            style={{
              marginBottom: data.length > 0 ? 15 : -10,
              marginTop: 20,
            }}
          >
            <Txt
              bold
              style={{
                color: `#222`,
                marginBottom: -10,
                fontSize: 17,
              }}
            >
              {title}
            </Txt>
          </Flex>
        )
      }}
    />
  )
}
