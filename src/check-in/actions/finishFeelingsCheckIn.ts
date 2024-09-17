import newId from 'core/helpers/newId'
import { useClient } from 'core/hooks/useUser'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import newCheckIn from 'relay-shared/check-in/helpers/newCheckIn'
import useNewCheckIn from 'relay-shared/check-in/hooks/useNewCheckIn'
import { useCreateCheckInMutation } from 'relay-shared/frontend/api/hooks/useApi'
import newJournalEntry from 'relay-shared/journal-entries/helpers/newJournalEntry'

export default function finishFeelingsCheckIn() {
  const dec = useDecorationsContext()
  const [user] = useClient()
  const [createCheckInMutation] = useCreateCheckInMutation()
  const newCheckInData = useNewCheckIn()
  const history = useHistory()
  return async () => {
    // Create the check inq
    const toCreate = {
      _id: newId(),
      client: user._id,
      ...newCheckInData.newCheckInDoc,
    }

    if (newCheckInData.newJournalEntryDoc.body.trim().length) {
      toCreate.journalEntry = {
        ...newCheckInData.newJournalEntryDoc,
        client: user._id,
        _id: newId(),
      }
    } else {
      delete toCreate.journalEntry
    }

    try {
      await createCheckInMutation(toCreate).unwrap()

      // Reset check-in and journal entry after creation
      console.log('Resetting check-in and journal entry')
      newCheckInData.updateNewJournalEntry(newJournalEntry())
      newCheckInData.updateNewCheckIn(newCheckIn())
      dec.close()
    } catch (e) {
      console.error(e)
    }
  }
}
