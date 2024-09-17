import React from 'react'
import { CheckInViewController } from '../controllers/CheckInViewController'

interface NewCheckInPageProps {}

export default function NewCheckInPage(props: NewCheckInPageProps) {
  const {} = props

  const viewController = CheckInViewController.use()
  const {
    currentStep: { Component: CurrentStepComponent, componentProps },
  } = viewController

  return (
    <CurrentStepComponent {...viewController} {...props} {...componentProps} />
  )
}
