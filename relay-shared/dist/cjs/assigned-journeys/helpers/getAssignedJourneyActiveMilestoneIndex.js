"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignedJourneyActiveMilestoneIndex = void 0;
const findJourneyStop_1 = __importDefault(require("../../journeys/helpers/findJourneyStop"));
const lodash_1 = require("lodash");
function getAssignedJourneyActiveMilestoneIndex({ journey, assignedJourney, clientStop, }) {
    if (assignedJourney.completedAt) {
        return {
            progress: 1,
            milestoneIndex: journey.milestones.length - 1,
            stopIndex: (0, lodash_1.last)(journey.milestones).stops.length - 1,
            milestone: (0, lodash_1.last)(journey.milestones),
        };
    }
    const { stopIndex, milestoneIndex, milestone } = (0, findJourneyStop_1.default)({
        journey,
        milestone: clientStop.milestone,
        stop: clientStop.stop,
    });
    const milestoneFrac = Math.max(milestoneIndex / journey.milestones.length, 0);
    const stopFrac = stopIndex / milestone.stops.length;
    const stopContribution = stopFrac / journey.milestones.length;
    return {
        progress: Math.min(stopContribution + milestoneFrac),
        milestoneIndex,
        stopIndex,
        milestone,
    };
}
exports.getAssignedJourneyActiveMilestoneIndex = getAssignedJourneyActiveMilestoneIndex;
//# sourceMappingURL=getAssignedJourneyActiveMilestoneIndex.js.map