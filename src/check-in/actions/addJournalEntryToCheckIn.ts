import JournalEntryModal from 'journal-entries/components/JournalEntryModal'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import { Id } from 'relay-shared/RelayTypes'

export default function addJournalEntryToCheckIn() {
  const dec = useDecorationsContext()

  return function addJournalEntryToCheckInAction({ checkIn }: { checkIn: Id }) {
    dec.openModal(JournalEntryModal, { checkIn })
  }
}
