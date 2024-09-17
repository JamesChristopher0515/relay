import { JournalEntry } from 'relay-shared/RelayTypes'

export default function getJournalEntryTitle(journalEntry: JournalEntry) {
  if ((journalEntry.title ?? '').trim().length > 0) {
    return journalEntry.title
  }
  return `Untitled Entry`
}
