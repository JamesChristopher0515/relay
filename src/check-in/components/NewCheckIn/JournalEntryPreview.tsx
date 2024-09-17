import { Flex, Txt } from '@mtyk/frontend/core/components'
import { borderBottom, shadow } from '@mtyk/frontend/styles/helpers/styles'
import React from 'react'
import { ScrollView } from 'react-native'
import { JournalEntry } from 'relay-shared/RelayTypes'

export function JournalEntryPreview({
  journalEntry,
}: {
  journalEntry: JournalEntry
}) {
  return (
    <Flex style={{ marginTop: 50, marginBottom: 15 }}>
      <Flex
        padding={[13, 20]}
        style={{
          ...borderBottom(1, '#eee'),
          ...shadow(),
          backgroundColor: 'white',
          borderRadius: 20,
        }}
      >
        <Txt medium>{journalEntry.title ?? 'Untitled'}</Txt>
        <ScrollView style={{ height: 100 }}>
          <Txt style={{ marginTop: 5, color: '#555' }}>{journalEntry.body}</Txt>
        </ScrollView>
      </Flex>
    </Flex>
  )
}
