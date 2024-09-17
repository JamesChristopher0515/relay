"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const idEq_1 = require("../../models/helpers/idEq");
function findJourneyStop({ journey, milestone: milestoneId, stop: stopId, }) {
    const [milestone, milestoneIndex] = (0, idEq_1.findId)(journey.milestones, milestoneId);
    const [stop, stopIndex] = (0, idEq_1.findId)(milestone?.stops ?? [], stopId);
    return {
        milestone,
        milestoneIndex,
        stop,
        stopIndex,
    };
}
exports.default = findJourneyStop;
//# sourceMappingURL=findJourneyStop.js.map