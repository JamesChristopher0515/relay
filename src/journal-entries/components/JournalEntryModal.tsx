import { Flex } from '@mtyk/frontend/core/components'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import useInputAdapter from '@mtyk/frontend/forms/hooks/useInputAdapter'
import MTYKSafeView from '@mtyk/frontend/native/layout/components/MTYKSafeView'
import useCallbacks from '@mtyk/frontend/react/hooks/useCallbacks'
import { borderTop } from '@mtyk/frontend/styles/helpers/styleObjects'
import { CheckInCard } from 'check-in/components/CheckInCard'
import ButtonRow from 'core/components/buttons/ButtonRow'
import RelayButton from 'core/components/RelayButton'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, TextInput } from 'react-native'
import JournalEntryController, {
  JournalEntryOrCheckIn,
} from 'relay-shared/journal-entries/controllers/JournalEntryController'
import JournalEntryPrivacyStatus from './JournalEntryPrivacyStatus'

export type JournalEntryModalProps = JournalEntryOrCheckIn & {}

/** Either edit or view a Journal Entry */
export default function JournalEntryModal(props: JournalEntryModalProps) {
  const { checkIn, journalEntry: journalEntryId } = props
  const journalEntryController = JournalEntryController.use({
    journalEntry: journalEntryId,
    checkIn,
  })

  const { journalEntry, createOrUpdate } = journalEntryController
  const body = useInputAdapter(journalEntry?.body)
  const dec = useDecorationsContext()
  const title = useInputAdapter(journalEntry?.title)
  const isPrivate = useInputAdapter(journalEntry?.private)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (journalEntry) {
      title.onChange(journalEntry.title)
      body.onChange(journalEntry.body)
      isPrivate.onChange(journalEntry.private)
      setLoading(false)
    }
  }, [journalEntry?._id])

  const cbs = useCallbacks(
    {
      onSave: async () => {
        await createOrUpdate({
          body: body.value,
          title: title.value,
          private: isPrivate.value,
        })
        dec.close()
      },
      onCancel: async () => {
        dec.close()
      },
    },
    [body.value, title.value, isPrivate.value]
  )

  if (loading) {
    return null
  }
  const paddingHorizontal = 25
  return (
    <MTYKSafeView style={{ width: '100%', backgroundColor: 'white' }}>
      <Flex center column fw style={{ flex: 1 }} grow={1}>
        {checkIn ? (
          <CheckInCard
            checkIn={checkIn}
            appearance="flat"
            style={{ width: '100%', paddingHorizontal }}
          />
        ) : null}

        <KeyboardAvoidingView
          behavior={'padding'}
          keyboardVerticalOffset={75}
          style={{
            flex: 1,
            ...borderTop(1, '#eee'),
            width: '100%',
            marginTop: 20,
          }}
        >
          <JournalEntryPrivacyStatus {...isPrivate} />
          <Flex
            grow={1}
            shrink={1}
            style={{
              paddingHorizontal,
            }}
          >
            <TextInput
              placeholder="Title (Optional)"
              autoFocus
              {...title}
              style={{
                width: '100%',
                fontSize: 30,
                marginTop: 20,
                color: '#777',
              }}
            />
            <TextInput
              placeholder="Tap to start writing..."
              multiline
              {...body}
              style={{
                width: '100%',
                fontSize: 24,
                paddingTop: 50,
                marginBottom: 70,
                color: '#999',
              }}
            />
          </Flex>
          <ButtonRow style={{ justifyContent: 'flex-end', paddingHorizontal }}>
            <RelayButton secondary action={cbs.onCancel}>
              Cancel
            </RelayButton>
            <RelayButton action={cbs.onSave}>Save</RelayButton>
          </ButtonRow>
        </KeyboardAvoidingView>
      </Flex>
    </MTYKSafeView>
  )
}
