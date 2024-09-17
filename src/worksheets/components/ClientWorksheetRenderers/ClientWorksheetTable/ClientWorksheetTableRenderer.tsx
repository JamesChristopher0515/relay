import compose from '@mtyk/frontend/react/helpers/compose'
import React from 'react'
import { WorksheetItemType } from 'relay-shared/RelaySchema'
import { ClientWorksheetItemRendererProps } from '../ClientWorksheetItemRendererProps'
import CompleteTableItem from './CompleteTableItem'

export interface ClientWorksheetTableRendererProps
  extends ClientWorksheetItemRendererProps {
  item: WorksheetItemType<'worksheet'>
}
export interface ClientWorksheetTableRefHandle {}

export default compose()(function ClientWorksheetTableRenderer(
  props: ClientWorksheetTableRendererProps
) {
  const { item } = props
  return <CompleteTableItem {...props} />
})
