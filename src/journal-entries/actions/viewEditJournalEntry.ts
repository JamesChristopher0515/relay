import JournalEntryModal from 'journal-entries/components/JournalEntryModal'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'

export default function viewEditJournalEntry() {
  const dec = useDecorationsContext()
  return async ({ journalEntry }) => {
    dec.openModal(JournalEntryModal, { journalEntry })
  }
}
