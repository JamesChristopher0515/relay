import { Journey } from '../../RelayTypes'

export default function getMilestoneLabel(journey: Journey, milestoneIndex: number): string {
  const milestone = journey.milestones[milestoneIndex]
  return `${milestoneIndex + 1}. ${milestone.name}`
}
