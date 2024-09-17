import {
  ClientWorksheetResponse,
  Worksheet,
  WorksheetItem,
} from 'relay-shared/RelayTypes'

export interface ClientWorksheetItemRendererProps {
  item: WorksheetItem
  worksheet: Worksheet
  response?: ClientWorksheetResponse
  onResponse: (response: any, complete: boolean) => void
}
