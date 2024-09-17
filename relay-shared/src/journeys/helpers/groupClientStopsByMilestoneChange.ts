import { sortBy } from 'lodash'
import { ClientMilestoneStop, Journey } from '../../RelayTypes'
import idEq, { findId } from '../../models/helpers/idEq'

export default function groupClientStopsByMilestoneChange({
  journey,
  clientStops: stops,
}: {
  journey: Journey
  clientStops: ClientMilestoneStop[]
}) {
  const stopsWMilestoneIndex = stops.map(s => ({
    ...s,
    milestoneIndex: findId(journey.milestones, s.milestone)[1],
  }))

  const sortedNewestFirst = sortBy(stopsWMilestoneIndex, stop =>
    new Date(stop.createdAt).getTime()
  ).reverse()

  const groupedByMilestoneChanges: typeof sortedNewestFirst[] = []
  let lastMilestoneId: string | null = null
  for (const stop of sortedNewestFirst) {
    if (!idEq(stop.milestone, lastMilestoneId)) {
      groupedByMilestoneChanges.push([])
      lastMilestoneId = stop.milestone
    }
    groupedByMilestoneChanges[groupedByMilestoneChanges.length - 1].push(stop)
  }

  return { groupedByMilestoneChanges, sortedNewestFirst }
}
