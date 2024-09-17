import type { ApiTags } from './tagTypes'

export const resourceToUrl = (resource: ApiTags) => {
  const map = {
    QuestionnaireResult: 'questionnaire-result',
    ClientMilestoneStop: 'client-milestone-stop',
    ClientInsightsPreset: 'client-insights-preset',
    LoggedEvent: 'logged-event',
    AssignedJourney: 'clients/journey',
    AssignedResource: 'clients/resource',
    CheckIn: 'check-in',
    JournalEntry: 'journal-entry',
    ClientContent: 'client-content',
    CaseNote: 'case-note',
    ClientWorksheet: 'client-worksheet',
    RecurringAppointment: 'recurring-appointment',
  }
  if (resource in map) {
    return map[resource]
  }
  return resource.toLowerCase()
}

export const plural = (path: string) => {
  if (path === 'category') {
    return 'categories'
  } else if (path === 'journal-entry') {
    return 'journal-entries'
  }
  const staySame = new Set(['content', 'client-content'])
  if (staySame.has(path)) {
    return path
  }
  return path + 's'
}
