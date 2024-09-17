import { Journey, Id } from '../../RelayTypes';
export default function findJourneyStop({ journey, milestone: milestoneId, stop: stopId, }: {
    journey: Pick<Journey, 'milestones'>;
    milestone: Id;
    stop: Id;
}): {
    milestone: import("../../RelayTypes").JourneyMilestone;
    milestoneIndex: number;
    stop: import("../../RelayTypes").JourneyStop;
    stopIndex: number;
};
//# sourceMappingURL=findJourneyStop.d.ts.map