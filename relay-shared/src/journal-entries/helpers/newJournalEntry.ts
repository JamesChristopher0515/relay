import { JournalEntry } from '../../RelayTypes'

export default function newJournalEntry(): Omit<
  JournalEntry,
  'client' | 'createdAt'
> {
  return {
    _id: 'new',
    title: '',
    body: '',
  }
}
