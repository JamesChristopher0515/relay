import { useClient } from 'core/hooks/useUser'
import { useWrappedAxios } from 'core/hooks/useWrappedAxios'
import AppleHealthKit, {
  HealthKitPermissions,
  HealthPermission,
  HealthValue,
} from 'react-native-health'
import { statCollectionForHealth } from 'relay-shared/reporting-stats/helpers/reportingStatCollectionId'

const {
  Constants: { Permissions },
} = AppleHealthKit

export { Permissions }

const types: HealthPermission[] = [
  Permissions.Steps,
  Permissions.SleepAnalysis,
  Permissions.DistanceWalkingRunning,
]

/* Permission options */
const permissions = {
  permissions: {
    read: types,
    write: [],
  },
} as HealthKitPermissions

function isExpoGo() {
  return typeof AppleHealthKit?.initHealthKit !== 'function'
}

let initCompleted = false
function init() {
  if (isExpoGo()) {
    console.warn('HealthKit is not available on ExpoGo')
    return Promise.resolve()
  }
  return new Promise<void>((res, rej) => {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      if (error) {
        rej(error)
        console.log('[ERROR] Cannot grant permissions!')
        return
      } else {
        initCompleted = true
        res()
        /* Can now read or write to HealthKit */
      }
    })
  })
}

export default function useHealth() {
  const axios = useWrappedAxios()
  const [client] = useClient()
  const enabled = client.settings?.health ?? {}

  async function createMissingStats(
    healthType,
    statFetcher: (dateFrom: Date) => Promise<{ date: Date; value: number }[]>
  ) {
    if (!enabled[healthType]) {
      console.log(`${healthType} is not enabled`)
      return []
    }
    try {
      const collectionId = statCollectionForHealth({
        client: client._id,
        health: healthType,
      })
      const {
        data: { latestCreatedDate },
      } = await axios.post(`/reporting-stats/latest`, {
        collectionId,
      })
      // console.info(
      //   `Latest created date for ${healthType} is ${latestCreatedDate}`
      // )
      const stats = await statFetcher(new Date(latestCreatedDate))
      // console.info(`Got ${stats.length} stats for ${healthType}`)
      for (const stat of stats) {
        const toCreate = { ...stat, collectionId }
        await axios.post('/reporting-stats', toCreate)
      }
      return stats
    } catch (e) {
      console.error(e)
      return []
    }
  }

  return {
    async fetchStats(extraOpts: { limit?: number; startDate?: Date } = {}) {
      if (isExpoGo()) {
        console.warn('Cannot fetch stats on ExpoGo')
        return []
      }
      if (!initCompleted) {
        await init()
      }

      const optsFromDate = (date: Date) => {
        const opts = {
          startDate: date.toISOString(),
          ascending: true,
          ...extraOpts,
        }
        if ('startDate' in extraOpts) {
          opts.startDate = extraOpts.startDate!.toISOString()
        }
        return opts
      }

      function promisifyFn(fn, opts) {
        return new Promise<{ date: Date; value: number }[]>((res, reject) => {
          fn(opts, function (error: string, results: HealthValue[]) {
            if (error) {
              reject(error)
            } else {
              res(
                results.flatMap((result) => {
                  if (fn === AppleHealthKit.getSleepSamples) {
                    if (result.value === 'INBED') {
                      return {
                        date: new Date(result.startDate),
                        value:
                          new Date(result.endDate).getTime() -
                          new Date(result.startDate).getTime(),
                      }
                    } else {
                      return []
                    }
                  }
                  return [
                    {
                      date: new Date(result.startDate),
                      value: result.value,
                    },
                  ]
                })
              )
            }
          })
        })
      }

      const map = {
        sleep: 'getSleepSamples',
        steps: 'getDailyStepCountSamples',
        distance: 'getDailyDistanceWalkingRunningSamples',
      }
      let allStats: any[] = []
      for (const [healthType, fn] of Object.entries(map)) {
        const statFetcher = async (fromDate: Date) =>
          promisifyFn(AppleHealthKit[fn], optsFromDate(fromDate))
        allStats = allStats.concat(
          await createMissingStats(healthType, statFetcher)
        )
      }
      return allStats
    },
    init,

    /**
     * @deprecated Not possible to tell if authorized for 'read' permissions,
     *   but keeping the comment here to prevent future confusion
     * @see https://developer.apple.com/documentation/healthkit/hkhealthstore/1614154-authorizationstatusfortype?language=objc
     */
    isAuthorized: async () => true,
  }
}
