export default function getMilestoneLabel(journey, milestoneIndex) {
    const milestone = journey.milestones[milestoneIndex];
    return `${milestoneIndex + 1}. ${milestone.name}`;
}
//# sourceMappingURL=getMilestoneLabel.js.map