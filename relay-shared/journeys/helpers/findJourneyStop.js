import { findId } from '../../models/helpers/idEq';
export default function findJourneyStop({ journey, milestone: milestoneId, stop: stopId, }) {
    const [milestone, milestoneIndex] = findId(journey.milestones, milestoneId);
    const [stop, stopIndex] = findId(milestone?.stops ?? [], stopId);
    return {
        milestone,
        milestoneIndex,
        stop,
        stopIndex,
    };
}
//# sourceMappingURL=findJourneyStop.js.map