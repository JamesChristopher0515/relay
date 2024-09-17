import newId from '../../core/helpers/newId'
import isObjectId from '../../core/helpers/isObjectId'
import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import useCheckIn from '../../frontend/check-ins/hooks/useCheckIn'
import useJournalEntryOrNew from '../../frontend/journal-entries/hooks/useJournalEntry'
import useClientShared from '../../clients/hooks/useClientShared'

export type JournalEntryOrCheckIn =
  | { journeyEntry: string }
  | { checkIn: string }

export default makeController(function JournalEntryController(
  props: JournalEntryOrCheckIn
) {
  let journalEntry = 'new'
  if ('journalEntry' in props && isObjectId(props.journalEntry)) {
    journalEntry = props.journalEntry
  }

  const [client] = useClientShared()
  const [checkInDoc] = useCheckIn(
    'checkIn' in props ? props.checkIn : undefined
  )

  if (isObjectId(checkInDoc?.journalEntry)) {
    // Show journal entry associated with this check-in
    journalEntry = checkInDoc.journalEntry
  }

  const [doc, { create, update, remove, ...journalEntryRest }] =
    useJournalEntryOrNew(journalEntry)
  const createOrUpdate = async newEntry => {
    console.log('createOrUpdate', { props, newEntry })
    if (isObjectId(journalEntry) || props.checkIn === 'new') {
      await update(newEntry)
    } else {
      const toCreate = {
        _id: newId(),
        ...newEntry,
        client: client._id,
      }
      if ('checkIn' in props) {
        toCreate.checkIn = props.checkIn
      }
      await create(toCreate)
    }
  }
  return {
    journalEntry: doc,
    ...journalEntryRest,
    createOrUpdate,
    create,
    update,
    remove,
  }
})
