// import PagerView from 'react-native-pager-view';
import { CheckInViewController } from 'check-in/controllers/CheckInViewController'
import React from 'react'
import { ViewControllerProps } from '@mtyk/frontend/controllers/helpers/makeController'
import CheckInItemPicker from './CheckInItemPicker'

const DailySecondCheckIn: React.FC<
  ViewControllerProps<typeof CheckInViewController>
> = (props) => {
  return <CheckInItemPicker {...props} select="reasons" />
}
export default DailySecondCheckIn
