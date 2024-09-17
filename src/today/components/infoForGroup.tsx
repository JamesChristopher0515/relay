import { faCheckSquare, faSmile } from '@fortawesome/free-solid-svg-icons'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'

export function infoForGroup(
  type: 'questionnaire' | 'content' | 'generic' | 'appointment' | 'check-in'
) {
  return {
    questionnaire: {
      iconColor: '#C0DAC8',
      color: '#8FA897',
      icon: RelayIcons.questionnaire,
    },
    content: {
      iconColor: '#E2C8C8',
      color: '#C28D8D',
      icon: RelayIcons.content,
    },
    appointment: {
      iconColor: '#B3CCBA',
      color: '#B3CCBA',
      icon: RelayIcons.videoAppointment,
    },
    generic: {
      iconColor: '#BFD7D9',
      color: '#7AACAF',
      icon: faCheckSquare,
    },
    'check-in': {
      iconColor: '#B2CCBA',
      color: '#8FA897',
      icon: faSmile,
    },
  }[type]
}
