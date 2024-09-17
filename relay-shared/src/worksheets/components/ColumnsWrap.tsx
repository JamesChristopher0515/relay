import { Flex, Txt } from '@mtyk/frontend/core/components'
import React from 'react'
import { ClientWorksheet, WorksheetItem } from '../../RelayTypes'
import getTableInfo from '../helpers/getTableInfo'

function ColumnsWrap({ children }: { children: React.ReactNode }) {
  return <Flex>{children}</Flex>
}
const columnWidth = 150
export function RenderWorksheetItem({
  item,
  clientWorksheet,
}: {
  item: WorksheetItem
  clientWorksheet: ClientWorksheet
}) {
  const info = getTableInfo<string>(item, clientWorksheet)
  const { headerColumns, rows } = info
  function renderColumnCell({
    isHeader,
    question,
    key,
    rowIndex,
    columnIndex,
  }: {
    isHeader: boolean
    question: string
    key: string
    rowIndex: number
    columnIndex: number
  }) {
    const cellResponse = info.getResponse(rowIndex, columnIndex)
    return (
      <Flex style={{ width: columnWidth }} key={key}>
        <Txt medium={isHeader}>{isHeader ? question : cellResponse}</Txt>
      </Flex>
    )
  }

  return (
    <Flex column>
      <ColumnsWrap>
        {headerColumns.map((column, rowIndex) => {
          return renderColumnCell({
            ...column,
            isHeader: true,
            key: column._id,
            rowIndex,
            columnIndex: rowIndex,
          })
        })}
      </ColumnsWrap>

      {rows.map((columns, rowIndex) => {
        return columns.map((column, columnIndex) => {
          return (
            <ColumnsWrap key={rowIndex}>
              {renderColumnCell({
                ...column,
                isHeader: false,
                key: column._id,
                rowIndex,
                columnIndex,
              })}
            </ColumnsWrap>
          )
        })
      })}
    </Flex>
  )
}
