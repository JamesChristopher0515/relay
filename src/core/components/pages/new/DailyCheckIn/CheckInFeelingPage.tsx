import { CheckInViewController } from 'check-in/controllers/CheckInViewController'
import React from 'react'
import { ViewControllerProps } from '@mtyk/frontend/controllers/helpers/makeController'
import CheckInItemPicker from './CheckInItemPicker'

const DailySecondCheckIn: React.FC<
  ViewControllerProps<typeof CheckInViewController>
> = (props) => {
  return <CheckInItemPicker {...props} select="feelings" />
}
export default DailySecondCheckIn
