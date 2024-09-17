import isJournalEntryNonEmpty from 'journal-entries/helpers/isJournalEntryNonEmpty'
import { Txt } from '@mtyk/frontend/core/components'
import React from 'react'
import { JournalEntryPreview } from './JournalEntryPreview'

export function PromptForJournalEntry({ journalEntry }) {
  if (isJournalEntryNonEmpty(journalEntry)) {
    return <JournalEntryPreview journalEntry={journalEntry} />
  } else {
    return (
      <Txt
        color={'#60534B'}
        semibold
        style={{ paddingTop: 70, paddingBottom: 20, maxWidth: 170 }}
      >
        Would you like to add any other thoughts?
      </Txt>
    )
  }
}
