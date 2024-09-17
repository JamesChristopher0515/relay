"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const groupClientStopsByMilestoneChange_1 = __importDefault(require("../../journeys/helpers/groupClientStopsByMilestoneChange"));
const idEq_1 = require("../../models/helpers/idEq");
const useAssignedJourney_1 = __importDefault(require("./useAssignedJourney"));
const useAssignedJourneyClientStops_1 = __importDefault(require("./useAssignedJourneyClientStops"));
function useAssignedJourneyHistory(assignedJourneyId) {
    const qOptions = { refetchOnFocus: true, refetchOnReconnect: true };
    const stops = (0, useAssignedJourneyClientStops_1.default)({ assignedJourneyId }, qOptions);
    const assignedJourney = (0, useAssignedJourney_1.default)(assignedJourneyId);
    if (assignedJourney) {
        const { journey } = assignedJourney;
        const { groupedByMilestoneChanges, sortedNewestFirst } = (0, groupClientStopsByMilestoneChange_1.default)({
            journey,
            clientStops: stops,
        });
        return groupedByMilestoneChanges.flatMap((milestoneStops, milestoneChangeIndex, arr) => {
            const firstClientStop = milestoneStops[0];
            const [milestone, milestoneIndex] = (0, idEq_1.findId)(journey.milestones, firstClientStop.milestone);
            if (!milestone) {
                // Couldn't find milestone?
                return [];
            }
            return [
                {
                    milestone,
                    milestoneIndex,
                    stops: milestoneStops,
                },
            ];
        });
    }
    else {
        return [];
    }
}
exports.default = useAssignedJourneyHistory;
//# sourceMappingURL=useAssignedJourneyHistory.js.map