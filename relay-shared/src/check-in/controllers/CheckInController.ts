import { useClient } from 'core/hooks/useUser'
import { useState } from 'react'
import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import useTimeOfDay from '../../core/hooks/useTimeOfDay'
import getAllFeelings, {
  getSimpleFeelings,
  RelayFeeling,
} from '../../feelings/helpers/getAllFeelings'
import { useCreateCheckInMutation } from '../../frontend/api/hooks/useApi'
import newJournalEntry from '../../journal-entries/helpers/newJournalEntry'
import getAllReasons from '../../reasons/helpers/getAllReasons'
import newCheckIn from '../helpers/newCheckIn'
import useNewCheckIn from '../hooks/useNewCheckIn'

export default makeController(() => {
  const timeOfDay = useTimeOfDay()
  const newCheckInProps = useNewCheckIn()
  const [user] = useClient()
  const { newJournalEntryDoc: journalEntry } = newCheckInProps
  const [createCheckInMutation] = useCreateCheckInMutation()
  const [initialFeeling, setInitialFeeling] = useState(getSimpleFeelings()[2])

  function getSecondGreeting() {
    const feeling = initialFeeling
    const { name } = feeling

    if (name === 'great') {
      return `It's great to hear you are feeling good!`
    } else if (name === 'good') {
      return `Glad to hear you are feeling good.`
    } else if (name === 'ok') {
      return `Hopefully things will look better soon.`
    } else if (name === 'not great') {
      return `Sorry to hear you aren't feeling great.`
    } else if (name === 'bad') {
      return `Sorry to hear you are feeling bad.`
    } else {
      return name
    }
  }

  return {
    greeting: `How are you feeling this ${timeOfDay}?`,
    finish: `Here's your check-in for this ${timeOfDay}?`,
    secondGreeting: getSecondGreeting(),
    feelings: getAllFeelings(),
    initialFeeling,
    reset: () => {
      newCheckInProps.updateNewCheckIn(newCheckIn())
      newCheckInProps.updateNewJournalEntry(newJournalEntry())
    },
    setInitialFeeling,
    reasons: getAllReasons(),
    isFeelingSelected: (feeling: RelayFeeling) => {
      return newCheckInProps.newCheckInDoc.feelings.find(
        f => f.name === feeling.name
      )
    },
    isReasonSelected: (reason: any) => {
      return newCheckInProps.newCheckInDoc.reasons.find(
        r => r.name === reason.name
      )
    },
    getSelectedFeeling: () => {
      return newCheckInProps.newCheckInDoc.feelings[0]
    },
    getSelectedReason: () => {
      return newCheckInProps.newCheckInDoc.reasons[0]
    },
    setFeeling: (feeling: RelayFeeling) => {
      newCheckInProps.updateNewCheckIn(checkIn => {
        checkIn.feelings = [{ name: feeling.name }]
      })
    },
    setReason: (reason: any) => {
      newCheckInProps.updateNewCheckIn(checkIn => {
        if (reason === null) {
          checkIn.reasons = [{ name: getAllReasons()[0].name }]
        } else {
          checkIn.reasons = [{ name: reason.name }]
        }
      })
    },
    setCustomReason: (reason: string) => {
      newCheckInProps.updateNewCheckIn(checkIn => {
        checkIn.reasons = [{ name: 'custom', custom: reason }]
      })
    },
    ...newCheckInProps,
  }
})
