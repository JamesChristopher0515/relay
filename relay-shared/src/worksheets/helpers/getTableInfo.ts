import assert from '@mtyk/frontend/core/helpers/assertDefined'
import { ClientWorksheet, WorksheetItem } from '../../RelayTypes'

export default function getTableInfo<ResponseType>(
  worksheetItem: WorksheetItem,
  clientWorksheet: ClientWorksheet
) {
  assert(worksheetItem.type === 'worksheet', 'Expected worksheet item')
  const { type, data } = worksheetItem
  const responses = clientWorksheet.responses as ResponseType[][]

  const rawRows = (responses[worksheetItem._id] ?? []) as ResponseType[][]
  const headerColumns = [
    ...data.columns.map(column => {
      return { text: column.question }
    }),
  ]
  function getResponse(row: number, column: number): ResponseType {
    const response = responses[worksheetItem._id][row]?.[
      column
    ] as any as ResponseType
    return response
  }

  const rows = rawRows.map((rawColumnValue, rowIndex) => {
    return rawColumnValue.map((colVal, colIndex) => {
      const response = getResponse(rowIndex, colIndex)
      const columnInfo = data.columns[colIndex]
      return {
        ...columnInfo,
        text: colVal,
        response,
      }
    })
  })

  return {
    headerColumns,
    rawRows,
    rows,
    getResponse,
    isNew: !rawRows,
  }
}
