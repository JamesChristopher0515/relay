import { capitalize } from 'lodash'

export default function getReasonName(reason: any) {
  if (reason.custom) {
    return reason.custom || 'Custom'
  }
  return capitalize(reason.name)
}
