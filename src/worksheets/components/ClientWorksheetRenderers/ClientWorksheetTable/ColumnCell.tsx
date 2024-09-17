import { Flex, Txt } from '@mtyk/frontend/core/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { worksheetEditStore } from 'worksheets/controllers/WorksheetTableEditStore'
import { columnWidth } from './columnWidth'

export const ColumnCell = observer(function ColumnCell({
  isHeader,
  question,
  key,
  rowIndex,
  itemresponse,
  columnIndex,
  placeholder,
}: {
  isHeader: boolean
  question: string
  itemresponse?: any
  key: string
  placeholder?: string
  rowIndex: number
  columnIndex: number
}) {
  const editStore = worksheetEditStore
  const isEditingThisCell =
    itemresponse?.complete || worksheetEditStore.editingColumn === columnIndex
  const response = editStore.getResponse(rowIndex, columnIndex)
  const showPlaceholder = false // response === undefined || String(response).trim() === ''

  return (
    <Flex
      padding={[20, 20]}
      grow
      style={{
        opacity: isEditingThisCell ? 1 : 0.5,
        width: columnWidth,
      }}
      key={key}
    >
      {isHeader ? (
        <Txt semibold>{question}</Txt>
      ) : (
        <Txt
          numberOfLines={isHeader ? 3 : 5}
          color={showPlaceholder ? '#888' : '#444'}
        >
          {showPlaceholder ? placeholder : response}
        </Txt>
      )}
      {/* <Txt>
        {rowIndex},{columnIndex} */}
      {/* </Txt> */}
    </Flex>
  )
})
