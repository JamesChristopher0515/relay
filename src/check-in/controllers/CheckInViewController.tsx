import NewCheckInSummary from 'check-in/components/NewCheckIn/NewCheckInSummary'
import CheckInFeelingPage from 'core/components/pages/new/DailyCheckIn/CheckInFeelingPage'
import DailyCheckIn from 'core/components/pages/new/DailyCheckIn/CheckInMood'
import CheckInReason from 'core/components/pages/new/DailyCheckIn/CheckInReason'
import CompleteCheckIn from 'core/components/pages/new/DailyCheckIn/CompleteCheckIn'
import { assert } from '@mtyk/frontend/core/helpers'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import useCallbacks from '@mtyk/frontend/react/hooks/useCallbacks'
import React, { useEffect, useState } from 'react'
import CheckInController from 'relay-shared/check-in/controllers/CheckInController'
import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import TodayViewController from 'relay-shared/todos/controllers/TodayViewController'

export const CheckInViewController = makeController(() => {
  const [checkInStep, setCheckInStepIndex] = useState(0)
  const checkInController = CheckInController.use()
  const history = useHistory()
  const todayController = TodayViewController.use({ noPoll: true })
  const pendingQuestionnaireTodos = todayController.todos.filter(
    (t) => !t.complete && t.questionnaire
  )

  useEffect(() => {
    if (checkInStep === 0) {
      checkInController.reset()
    }
  }, [checkInStep])
  const dec = useDecorationsContext()
  const steps: {
    name: string
    Component: React.ComponentType<any>
    componentProps?: any
    canProgress?: (controller: typeof checkInController) => boolean | number
  }[] = [
    {
      name: 'mood',
      Component: DailyCheckIn,
      canProgress: (controller) => {
        return controller.feelings.length > 0
      },
    },
    {
      name: 'feeling',
      Component: CheckInFeelingPage,
    },
    {
      name: 'reason',
      Component: CheckInReason,
      canProgress: (controller) => {
        return !!controller.getSelectedReason()
      },
    },
    {
      name: 'summary',
      Component: NewCheckInSummary,
    },
    {
      name: 'wrap-up',
      Component: CompleteCheckIn,
      componentProps: { assignedQuestionnaireTodos: pendingQuestionnaireTodos },
      canProgress: (controller) => {
        return false
      },
    },
  ]

  const currentStep = steps[checkInStep]
  const cbs = useCallbacks(
    {
      setCheckInStepByName: (name: string) => {
        const index = steps.findIndex((step) => step.name === name)
        assert(index >= 0, `Step ${name} not found`)
        setCheckInStepIndex(index)
      },
      canProgress() {
        const currentStep = steps[checkInStep]
        return currentStep.canProgress?.(checkInController) ?? true
      },
      goBack() {
        if (checkInStep === 0) {
          history.push('/')
        } else {
          setCheckInStepIndex(Math.max(0, checkInStep - 1))
        }
      },
      canGoBack() {
        return true
        // return checkInStep > 0
      },
      goToNextStep() {
        const nextStepMaybe = cbs.canProgress()
        if (cbs.canProgress() !== false) {
          if (typeof nextStepMaybe === 'string') {
            cbs.setCheckInStepByName(nextStepMaybe)
          } else {
            setCheckInStepIndex(checkInStep + 1)
          }
        }
      },
    },
    [checkInStep, checkInController]
  )

  return {
    ...cbs,
    ...checkInController,
    currentStep,
  }
})
