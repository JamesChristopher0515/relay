import { CheckIn } from '../../RelayTypes'

export default function newCheckIn(): Omit<CheckIn, 'client'> {
  return {
    _id: 'new',
    feelings: [{ name: 'ok' }],
    journalEntry: 'new',
    reasons: [],
    tags: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}
