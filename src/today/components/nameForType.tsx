import { startCase } from 'lodash'

export function nameForType(type?: 'questionnaire' | 'content' | 'generic') {
  if (!type) return 'Todo'
  return (
    {
      questionnaire: 'Answer',
      content: 'Content',
      generic: 'Todo',
      appointment: 'Call',
    }[type] ?? startCase(type)
  )
}
