import { faBook, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useClient } from 'core/hooks/useUser'
import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import React from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import wrapArrayHook from 'relay-shared/core/helpers/wrapArrayHook'
import { useGetJournalEntrysQuery } from 'relay-shared/frontend/api/hooks/useApi'
import JournalEntryItemRow from './JournalEntryItemRow'
import JournalEntryModal from './JournalEntryModal'

interface JournalEntryPageProps {}

function NewEntry() {
  const dec = useDecorationsContext()
  // return null
  return (
    <TouchableOpacity
      style={{
        width: '90%',
        alignSelf: 'center',
        // height: 180,
        backgroundColor: '#F0EBEB',
        paddingVertical: 25,
        borderRadius: 20,
        marginTop: 35,
      }}
      onPress={() => dec.openModal(JournalEntryModal, { journalEntry: 'new' })}
    >
      <Flex center grow>
        <Icon icon={faBook} size={25} color={'#D8C7C7'} />
        <Txt
          medium
          color={'#846D6D'}
          style={{ maxWidth: 200, marginTop: 9, marginBottom: 9 }}
          size={13}
          center
        >
          Use your journal to record your thoughts as often as you like.
        </Txt>
        <Flex
          rowCenter
          gap={7}
          style={{
            marginTop: 7,
            backgroundColor: 'white',
            borderRadius: 999,
            paddingHorizontal: 12,
            paddingVertical: 6,
          }}
        >
          <Icon color={'#B5A3A3'} icon={faPlus} size={13} />
          <Txt bold color="#776767" size={12}>
            New Entry
          </Txt>
        </Flex>
      </Flex>
    </TouchableOpacity>
  )
}

export default function JournalEntryPage(props: JournalEntryPageProps) {
  const { style } = props
  const [client] = useClient()
  const { data: entries } = wrapArrayHook(
    useGetJournalEntrysQuery({ client: client._id })
  )

  return (
    <Flex>
      <FlatList
        inverted
        data={['new'].concat(entries)}
        contentContainerStyle={{ paddingBottom: 30, paddingTop: 80 }}
        renderItem={({ item }) =>
          item === 'new' ? (
            <NewEntry />
          ) : (
            <JournalEntryItemRow journalEntry={item} />
          )
        }
        keyExtractor={(item) => item._id}
        style={{ ...style }}
      />
    </Flex>
  )
}
