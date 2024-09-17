import { Worksheet } from '../../RelayTypes'

export default function getAllWorksheetItems(worksheet: Worksheet) {
  return worksheet.sections.flatMap(section =>
    section.items.map((item, index) => ({
      ...item,
      sectionIndex: index,
    }))
  )
}
