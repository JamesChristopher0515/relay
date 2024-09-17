"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getMilestoneLabel(journey, milestoneIndex) {
    const milestone = journey.milestones[milestoneIndex];
    return `${milestoneIndex + 1}. ${milestone.name}`;
}
exports.default = getMilestoneLabel;
//# sourceMappingURL=getMilestoneLabel.js.map