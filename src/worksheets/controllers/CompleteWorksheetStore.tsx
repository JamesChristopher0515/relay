import { makeAutoObservable } from 'mobx'
import { WorksheetItemType } from 'relay-shared/RelaySchema'

export interface CompleteWorksheetStoreProps {}
class CompleteWorksheetStore {
  constructor() {
    makeAutoObservable(this)
  }

  editingItem?: WorksheetItemType<any>
  index?: number

  setEditingItem(worksheetItem?: WorksheetItemType<any>, index?: number) {
    this.editingItem = worksheetItem
    this.index = index
  }
}

export const completeWorksheetStore = new CompleteWorksheetStore()
