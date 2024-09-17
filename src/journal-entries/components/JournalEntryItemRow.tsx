import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { Flex, Icon, Svg, Txt } from '@mtyk/frontend/core/components'
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects'
import FeelingIcon from 'feelings/components/FeelingIcon'
import viewEditJournalEntry from 'journal-entries/actions/viewEditJournalEntry'
import React from 'react'
import { Alert, StyleSheet, TouchableOpacity } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Toast from 'react-native-root-toast'
import { useDeleteJournalEntryMutation } from 'relay-shared/frontend/api/hooks/useApi'
import useCheckIn from 'relay-shared/frontend/check-ins/hooks/useCheckIn'
import FormattedDate from 'relay-shared/frontend/core/components/FormattedDate'
import useRelayActionDispatch from 'relay-shared/frontend/core/hooks/useRelayActions'
import { JournalEntry } from 'relay-shared/RelayTypes'
import getJournalEntryTitle from '../helpers/getJournalEntryTitle'

interface JournalEntryItemRowProps {
  journalEntry: JournalEntry
}

export default function JournalEntryItemRow(props: JournalEntryItemRowProps) {
  const { journalEntry: journalEntryDoc } = props
  const [associatedCheckIn] = useCheckIn(journalEntryDoc?.checkIn)
  const patch = useRelayActionDispatch(viewEditJournalEntry)
  const [deleteJournalEntryMutation] = useDeleteJournalEntryMutation()

  function TheIcon() {
    if (associatedCheckIn) {
      return (
        <FeelingIcon
          feeling={associatedCheckIn.feelings[0].name}
          style={{ ...makeSize(17) }}
        />
      )
    } else {
      return <Icon icon={faPencilAlt} size={13} color="#736868" />
    }
  }

  const DeleteButton = () => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() =>
        Alert.alert(
          'Delete Journal Entry',
          `Are you sure you want to delete this journal entry?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: async () => {
                try {
                  await deleteJournalEntryMutation(journalEntryDoc._id).unwrap()
                  Toast.show('Journal Entry Deleted')
                } catch (e) {
                  Toast.show('Error deleting journal entry')
                }
              },
            },
          ]
        )
      }
    >
      <Txt color="white" semibold>
        Delete
      </Txt>
    </TouchableOpacity>
  )

  return (
    <Swipeable renderRightActions={DeleteButton}>
      <TouchableOpacity
        onPress={patch(viewEditJournalEntry, {
          journalEntry: journalEntryDoc._id,
        })}
      >
        <Flex style={{ height: 120 }} padding={[20, 0]}>
          <Flex rowCenter between>
            <Flex rowCenter gap={8} shrink>
              <TheIcon />
              <Txt
                numberOfLines={1}
                bold
                ellipsisAt={50}
                color={'#575351'}
                style={{ flexShrink: 1 }}
              >
                {getJournalEntryTitle(journalEntryDoc)}
              </Txt>
            </Flex>
            <FormattedDate
              color="#7E6B62"
              bold
              style={{ paddingLeft: 8 }}
              size={12}
              date={journalEntryDoc?.createdAt}
            />
          </Flex>
          <Txt
            numberOfLines={3}
            color={'#7A5959'}
            ellipsizeMode="tail"
            size={13}
            style={{ marginTop: 10 }}
          >
            {journalEntryDoc?.body || 'No content'}
          </Txt>
          <Svg
            width={320}
            height={2}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
            }}
            viewBox="0 0 229 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-152.633 1.24854H228.047"
              stroke="#E0CECE"
              strokeWidth="1.1392"
              strokeDasharray="2.28 2.28"
            />
          </Svg>
        </Flex>
      </TouchableOpacity>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  deleteText: {
    color: 'white',
    fontSize: 18,
  },
})
