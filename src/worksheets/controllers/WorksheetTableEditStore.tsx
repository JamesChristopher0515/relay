import { times } from 'lodash'
import { makeAutoObservable } from 'mobx'
import { WorksheetItemType } from 'relay-shared/RelaySchema'
import {
  ClientWorksheet,
  ClientWorksheetResponse,
  WorksheetItem,
} from 'relay-shared/RelayTypes'

export interface WorksheetTableEditStoreProps {}
class WorksheetTableEditStore {
  constructor() {
    makeAutoObservable(this)
  }
  clientWorksheet?: ClientWorksheet
  worksheetItem!: WorksheetItemType<'worksheet'>

  response?: ClientWorksheetResponse
  private _editingRow = 0
  public get editingRow() {
    return this._editingRow
  }
  public set editingRow(value) {
    this._editingRow = value
  }
  private _editingColumn = 0
  public get editingColumn() {
    return this._editingColumn
  }
  public set editingColumn(value) {
    this._editingColumn = value
  }
  private _editingResponse = ''
  public get editingResponse() {
    return this._editingResponse
  }
  public set setEditingResponse(value) {
    if (typeof value !== 'string') {
      throw new Error('Value must be a string')
    }
    this._editingResponse = value
  }

  update({
    worksheetItem,
    response,
  }: {
    worksheetItem: WorksheetItem
    response?: ClientWorksheetResponse
  }) {
    this.response = response
    if (this.worksheetItem?._id !== worksheetItem._id) {
      // Reset state (ish)
      this.worksheetItem = worksheetItem
      const { row, column } = this.findFirstBlankColumnRow()
      this.editingRow = row
      this.editingColumn = column
      this.setEditingResponse = this.getResponse(row, column, false)
    }
  }

  findFirstBlankColumnRow() {
    const rows = this.getRowsFromResponse()
    const rowIndex = Math.max(0, rows.length - 1)
    const lastRow = rows[rowIndex] ?? []
    const columnBlankIndex = lastRow.findIndex((row) => row.length === 0)
    const columnIndex =
      columnBlankIndex === -1 ? lastRow.length : columnBlankIndex
    return {
      column: columnIndex,
      row: rowIndex,
    }
  }

  get columns() {
    return this.worksheetItem?.data.columns ?? []
  }

  sanitizeColumns(_input: string[] = []) {
    const input = _input ?? []
    while (input.length < this.columns.length) {
      input.push('')
    }
    return input.map((str, index) => {
      if (typeof str !== 'string') {
        console.log({ str })
        return ''
      }
      return String(str ?? '').trim()
    })
  }

  getRowsFromResponse(row = this.editingRow) {
    const { response, worksheetItem } = this
    const rows = response?.data ?? [[]]
    return rows.map(this.sanitizeColumns.bind(this))
  }

  getResponse(
    row = this.editingRow,
    column = this.editingColumn,
    showLiveResponse = true
  ) {
    const rows = this.getRowsFromResponse(row)
    if (
      row === this.editingRow &&
      column === this.editingColumn &&
      showLiveResponse
    ) {
      return this.editingResponse
    }
    const theColumn = rows[row][column]
    return theColumn ?? ''
  }
}

export const worksheetEditStore = new WorksheetTableEditStore()
