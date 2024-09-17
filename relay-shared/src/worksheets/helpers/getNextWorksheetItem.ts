import { Worksheet, WorksheetItem } from '../../RelayTypes'
import getAllWorksheetItems from './getAllWorksheetItems'

export default function getNextWorksheetItem(
  worksheet: Worksheet,
  currentItem: WorksheetItem
) {
  const items = getAllWorksheetItems(worksheet)
  const index = items.findIndex(i => i._id === currentItem._id)
  return items[index + 1]
}
