import { Goal } from '../../RelayTypes'

export default function newGoal({ client, ...rest }: { client: string }): Goal {
  return {
    _id: 'new',
    client,
    goal: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...rest,
  }
}
