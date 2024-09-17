import { Worksheet } from '../../RelayTypes'
import getAllWorksheetItems from './getAllWorksheetItems'

// TODO change name here, actually just gets subworksheets, not all response types
export default function getWorksheetCompletableItems(worksheet: Worksheet) {
  const items = getAllWorksheetItems(worksheet)
  const subworksheets = items.filter(item => item.type === 'worksheet')
  return subworksheets.map((subworksheet, index) => {
    const letter = 'abcdefghijklmnopqrstuvwxyz'[index % 26].toUpperCase()
    return {
      ...subworksheet,
      nameWithLetter: `${letter}. ${subworksheet.name}`,
      letter,
    }
  })
}
