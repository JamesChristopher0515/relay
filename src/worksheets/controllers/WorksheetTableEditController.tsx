import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import assert from '@mtyk/frontend/core/helpers/assert'
import { clamp } from 'core/helpers/math'
import { times } from 'lodash'
import { WorksheetItemType } from 'relay-shared/RelaySchema'
import { ClientWorksheetItemRendererProps } from 'worksheets/components/ClientWorksheetRenderers/ClientWorksheetItemRendererProps'
import { worksheetEditStore as store } from './WorksheetTableEditStore'

export interface WorksheetEditControllerProps
  extends ClientWorksheetItemRendererProps {
  item: WorksheetItemType<'worksheet'>
}

export default makeController(function WorksheetTableEditController(
  props: WorksheetEditControllerProps
) {
  const { item: worksheetItem, response, onResponse } = props
  store.update({ worksheetItem, response })
  const sourceColumns = worksheetItem.data.columns ?? []
  const maxRowCount = worksheetItem.data.maxRowCount ?? 999
  const isEditing = response?.complete !== true

  const { data } = worksheetItem
  function getRows() {
    const { columns } = data
    const rows = response?.data ?? []
    if (rows.length === 0) {
      rows.push(times(columns.length, () => ''))
    }
    return rows
  }
  const rows = getRows()

  function switchColumns(column: number, row = store.editingRow) {
    // Ensure our editing response matches the cell we're switching to
    store.setEditingResponse = store.getResponse(row, column, false)
    // Update the editing column/row indexes
    store.editingColumn = column
    store.editingRow = row
    console.log(`Switching row, columns ${row},${column}`)
  }

  type Row = number
  type Column = number

  /** Automatically adds at least one required column or row to the response */
  function addOrUpdateResponse(
    response: string,
    rowI = store.editingRow,
    columnI = store.editingColumn,
    goToNext: Column | [Row, Column] | boolean = true
  ) {
    if (typeof response !== 'string') {
      throw new Error('Value must be a string')
    }
    console.log(`addOrUpdateResponse`, {
      row: rowI,
      column: columnI,
      value: response,
      goToNext,
    })

    while (rowI > rows.length - 1) {
      assert(rowI === rows.length, `Can't add more than one row at a time`)
      rows.push([])
    }

    const columns = rows[rowI] ?? times(sourceColumns.length, () => '')
    while (columns.length < sourceColumns.length) {
      columns.push('')
    }

    columns[columnI] = response
    if (isEditing) {
      onResponse(rows, false)
    }
    const nextColumn =
      typeof goToNext === 'number'
        ? goToNext
        : Array.isArray(goToNext)
        ? goToNext[1]
        : columnI + 1

    if (
      goToNext === true ||
      typeof goToNext === 'number' ||
      Array.isArray(goToNext)
    ) {
      console.log('In if')
      if (typeof goToNext === 'number') {
        switchColumns(goToNext)
      } else if (Array.isArray(goToNext)) {
        switchColumns(goToNext[1], goToNext[0])
      } else {
        if (nextColumn < columns.length) {
          switchColumns(store.editingColumn + 1)
        } else {
          addNewRow()
        }
      }
    }
  }

  const rowsCount = rows.length
  const hasNextRow = store.editingRow < rowsCount - 1
  const hasPreviousRow = store.editingRow > 0

  const previousRow = () => {
    if (hasPreviousRow) {
      store.editingRow--
    }
  }
  const nextRow = () => {
    if (hasNextRow) {
      store.editingRow++
    }
  }
  const addNewRow = () => {
    addOrUpdateResponse('', rows.length, 0, [rows.length, 0])
  }
  const deleteRow = () => {
    const newRows = rows.slice()
    assert(newRows.length > 1, `Can't delete row as there is only one left`)
    newRows.splice(store.editingRow, 1)
    switchColumns(store.editingColumn, store.editingRow - 1)
    onResponse(newRows, false)
  }
  const canDeleteRow = () => {
    return rowsCount > 1
  }
  const hasReachedMaxRows = () => {
    return maxRowCount !== 0 && store.editingRow >= (maxRowCount ?? 999)
  }
  function getEditingColumn() {
    const colIndex = clamp(store.editingColumn, 0, sourceColumns.length - 1)
    return sourceColumns[colIndex]
  }
  function isLastColumn() {
    return store.editingColumn === sourceColumns.length - 1
  }
  return {
    hasNextRow,
    hasPreviousRow,
    worksheetEditStore: store,
    rows,
    deleteRow,
    switchColumns,
    previousRow,
    nextRow,
    addNewRow,
    getEditingColumn,
    canDeleteRow,
    isEditing,
    isComplete: !isEditing,
    hasReachedMaxRows,
    isLastColumn,
    finish: () => {
      onResponse(response?.data ?? [], true)
    },
    canFinish: () => {
      return true
    },
    columns: sourceColumns,
    addOrUpdateResponse,
  }
})
