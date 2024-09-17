import { add, startOfDay } from 'date-fns'
import { times } from 'lodash'
import { Client } from '../../RelayTypes'
export default function getCheckInTimes(client: Client) {
  return times(client.checkInOptions.dailyCount, i => {
    const notifyTime =
      client.checkInOptions.notifyAt[i] ??
      add(startOfDay(new Date()), { hours: 9 })
    return notifyTime
  })
}
