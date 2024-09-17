import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import {
  faBook,
  faCheckSquare,
  faClock,
  faLightbulb,
  faPhotoVideo,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons'
import RelayIcons from '../../frontend/icons/RelayIcons'

export interface JourneyMilestoneStopType {
  name: string
  fullName: string
  type: string
  icon: any
  incompleteText?: string | null
  completeText?: string | null
  description: string
}

export const stopTypes: JourneyMilestoneStopType[] = [
  {
    name: 'Content',
    fullName: 'Assign Content',
    type: 'content',
    icon: faPhotoVideo,
    incompleteText: 'Not yet viewed',
    completeText: 'Viewed',
    description: 'Adds content of your choice to your clients resources',
  },
  {
    name: 'Questionnaire',
    fullName: 'Assign Questionnaire',
    type: 'questionnaire',
    incompleteText: 'Not yet started',
    icon: faBook,
    description: 'Add a questionnaire for your client to complete',
  },
  {
    name: 'Worksheet',
    fullName: 'Assign Worksheet',
    type: 'worksheet',
    incompleteText: 'Not yet started',
    icon: RelayIcons.worksheet,
    description: `Add a worksheet for your client to complete`,
  },
  {
    name: 'Assign Todo',
    type: 'todo',
    icon: faCheckSquare,
    description: `Adds a todo to your client's list, required or mandatory`,
  },
  {
    name: 'Time delay',
    type: 'delay',
    icon: faClock,
    incompleteText: 'Waiting',
    completeText: null,
    description: 'Wait a minimum amount of time before progressing',
  },
  {
    name: 'Thinking points',
    type: 'thinking-points',
    incompleteText: 'Not yet viewed',
    completeText: 'Viewed',
    icon: faLightbulb,
    description:
      'Add prompts to help your client understand their situation better',
  },
  {
    name: 'Review point',
    incompleteText: 'Awaiting review',
    type: 'review',
    icon: faSpinner,
    description:
      'Notifies you to take action once a client reaches a set point',
  },
].map((stop) => ({ ...stop, fullName: stop.fullName ?? stop.name }))

export function stopTypeInfo(
  type: string
): JourneyMilestoneStopType | undefined {
  return stopTypes.find((stopType) => stopType.type === type)
}

export default function getStopTypeInfo(
  stopType: string
): JourneyMilestoneStopType {
  const info = stopTypeInfo(stopType)
  if (!info) {
    throw new Error('Invalid stop type (no info): ' + stopType)
  }
  return info
}
