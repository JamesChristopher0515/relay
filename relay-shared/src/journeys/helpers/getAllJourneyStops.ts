import { Journey, JourneyStop } from '../../RelayTypes'
import { flattenDeep } from 'lodash'

export default function getAllJourneyStops(journey: Journey): JourneyStop[] {
  return flattenDeep(journey.milestones.map((milestone) => milestone.stops))
}
