import { faBell, faClock } from '@fortawesome/free-solid-svg-icons'
import usePractitioner from 'core/hooks/usePractitioner'
import { useClient } from 'core/hooks/useUser'
import dayjs from 'dayjs'
import { cloneDeep, times } from 'lodash'
import makeController from '@mtyk/frontend/controllers/helpers/makeController'

export default makeController(function SettingsCheckInController({ ...rest }) {
  const [user, { update }] = useClient()
  const { practitioner } = usePractitioner()

  if (!user) {
    return null
  }

  const draftUser = cloneDeep(user)
  const freqToString =
    ['once a day', 'twice a day'][user.checkInOptions.dailyCount - 1] ??
    `${user.checkInOptions.dailyCount} times a day`
  const checkInMsg = `${practitioner?.name} has asked if you can check-in at least ${freqToString}`

  return {
    checkInMessage: checkInMsg,
    remindMeOptions: times(user.checkInOptions.dailyCount, (i) => {
      const label = ['Remind me at', 'And then later at'][i] ?? 'And again at'
      const icon = [faBell][i] ?? faClock
      const single = user.checkInOptions.dailyCount === 1
      const color = ['#CCC'][i] ?? '#7BC4AD'
      return {
        label,
        icon,
        single,
        color,
        timePickerProps: {
          value:
            user.checkInOptions.notifyAt[i] ??
            dayjs()
              .startOf('day')
              .hour(i === 0 ? 9 : 18)
              .toDate(),
          onChange: (date) => {
            const { checkInOptions } = draftUser
            checkInOptions.notifyAt[i] = date
            update({ checkInOptions })
          },
        },
      }
    }),
  }
})
