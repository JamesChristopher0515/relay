import { useClient } from 'core/hooks/useUser'
import useMemoryImmer from '@mtyk/frontend/react/hooks/useMemoryImmer'
import useNewJournalEntry from '../../frontend/journal-entries/hooks/useNewJournalEntry'
import newCheckIn from '../helpers/newCheckIn'

export default function useNewCheckIn() {
  const [newCheckInDoc, updateNewCheckIn] = useMemoryImmer(
    'partialCheckIn',
    newCheckIn()
  )
  const [newJournalEntryDoc, updateNewJournalEntry] = useNewJournalEntry()
  return {
    updateNewJournalEntry,
    updateNewCheckIn,
    newJournalEntryDoc,
    newCheckInDoc,
  }
}
