import { ClientWorksheet, Worksheet } from '../../RelayTypes'
import getAllWorksheetItems from './getAllWorksheetItems'

export default function getClientWorksheetReentryPoint(
  worksheet: Worksheet,
  clientWorksheet: ClientWorksheet
) {
  const items = getAllWorksheetItems(worksheet)
  const firstIncomplete = items.findIndex(
    item => !clientWorksheet.responses[item._id].complete
  )
  return Math.max(firstIncomplete - 1, 0)
}
