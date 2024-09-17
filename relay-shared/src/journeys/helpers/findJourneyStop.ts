import { Journey, Id } from '../../RelayTypes'
import { findId } from '../../models/helpers/idEq'

export default function findJourneyStop({
    journey,
    milestone: milestoneId,
    stop: stopId,
}: {
    journey: Pick<Journey, 'milestones'>
    milestone: Id
    stop: Id
}) {
    const [milestone, milestoneIndex] = findId(journey.milestones, milestoneId)
    const [stop, stopIndex] = findId(milestone?.stops ?? [], stopId)

    return {
        milestone,
        milestoneIndex,
        stop,
        stopIndex,
    }
}
