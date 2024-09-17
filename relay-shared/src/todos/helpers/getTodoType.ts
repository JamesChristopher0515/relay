import { Todo } from '../../RelayTypes'

export default function getTodoType(todo: Todo) {
  if (todo.questionnaire) {
    return 'questionnaire'
  } else if (todo.content) {
    return 'content'
  } else if (todo.appointmentId) {
    return 'appointment'
  } else {
    return 'generic'
  }
}
