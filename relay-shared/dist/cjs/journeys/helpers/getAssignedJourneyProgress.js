"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssignedJourneyProgressFromSingleStop = void 0;
const groupClientStopsByMilestoneChange_1 = __importDefault(require("./groupClientStopsByMilestoneChange"));
const idEq_1 = require("../../models/helpers/idEq");
const lodash_1 = require("lodash");
const findJourneyStop_1 = __importDefault(require("./findJourneyStop"));
function getAssignedJourneyProgressFromSingleStop({ journey, assignedJourney, clientStop, }) {
    if (assignedJourney.completedAt) {
        return 1;
    }
    const { stopIndex, milestoneIndex, milestone } = (0, findJourneyStop_1.default)({
        journey,
        milestone: clientStop.milestone,
        stop: clientStop.stop,
    });
    const milestoneFrac = Math.max(milestoneIndex / journey.milestones.length, 0);
    const stopFrac = stopIndex / milestone.stops.length;
    const stopContribution = stopFrac / journey.milestones.length;
    return Math.min(stopContribution + milestoneFrac);
}
exports.getAssignedJourneyProgressFromSingleStop = getAssignedJourneyProgressFromSingleStop;
function getAssignedJourneyProgress({ journey, assignedJourney, clientStops, }) {
    if (assignedJourney.completedAt) {
        return 1;
    }
    const { groupedByMilestoneChanges } = (0, groupClientStopsByMilestoneChange_1.default)({
        journey,
        clientStops,
    });
    const latestMilestoneClientStops = groupedByMilestoneChanges[0] ?? [];
    if (!latestMilestoneClientStops.length) {
        return 0;
    }
    const [milestone] = (0, idEq_1.findId)(journey.milestones, latestMilestoneClientStops[0].milestone);
    if (!milestone) {
        console.warn(`Couldn't find milestone ${latestMilestoneClientStops[0].milestone} in journey ${journey.name}`);
        return 0;
    }
    // How many stops from the this milestone have we progressed past (skipping repeats)
    const latestMilestoneProgress = (0, lodash_1.uniqBy)(latestMilestoneClientStops, 'stop').filter(m => m.completedAt)
        .length / milestone.stops.length;
    const mCount = journey.milestones.length;
    const milestonesCovered = (0, lodash_1.uniqBy)(clientStops, 'milestone').length / mCount;
    return (milestonesCovered * ((mCount - 1) / mCount) +
        latestMilestoneProgress * (1 / mCount));
}
exports.default = getAssignedJourneyProgress;
//# sourceMappingURL=getAssignedJourneyProgress.js.map