import { JourneyStop } from '../../RelayTypes'

export default function getClientFacingStopName(stop: JourneyStop) {
  switch (stop.type) {
    case 'review':
      return 'Review'
    case 'questionnaire':
      return 'Questionnaire'
    default:
      return stop?.name ?? ''
  }
}
