import { JournalEntry } from 'relay-shared/RelayTypes'

export default function isJournalEntryNonEmpty(journalEntry?: JournalEntry) {
  return (journalEntry?.body?.trim().length ?? 0) > 0
}
