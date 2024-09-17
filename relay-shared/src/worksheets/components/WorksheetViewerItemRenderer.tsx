import { Txt } from '@mtyk/frontend/core/components'
import React from 'react'
import { ClientWorksheet, Worksheet, WorksheetItem } from '../../RelayTypes'
import { RenderWorksheetItem } from './ColumnsWrap'

export default function WorksheetViewerItemRenderer({
  worksheet,
  clientWorksheet,
  item,
}: {
  item: WorksheetItem
  worksheet: Worksheet
  clientWorksheet: ClientWorksheet
}) {
  const { type } = item
  switch (type) {
    case 'message':
      return <Txt>{item.data.message}</Txt>
    case 'worksheet':
      return (
        <RenderWorksheetItem item={item} clientWorksheet={clientWorksheet} />
      )
    default:
      throw new Error(`Unknown worksheet item type: ${type}`)
  }
}
