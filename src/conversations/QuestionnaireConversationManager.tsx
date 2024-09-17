import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { WrappedAxios } from 'core/hooks/useWrappedAxios'
import { Todo } from 'relay-shared/RelayTypes'
import BasicConversation from './BasicConversation'
import MotivationConversation from './MotivationConversation'
import QuestionnaireConversation from './QuestionnaireConversation'
import RelayConversation from './RelayConversation'
import RelayConversationManager from './RelayConversationManager'
import WellbeingConversation from './WellbeingConversation'

export default class QuestionnaireConversationManager extends RelayConversationManager<any> {
  addQuestionnaireConversations(assignedQuestionnaireTodos: Todo[]) {
    const axios = this.axios
    const convosGrouped = assignedQuestionnaireTodos.reduce<{
      [key: string]: RelayConversation[]
    }>(
      (prev, todo) => {
        const { questionnaire } = todo
        // Place wellbeing/motivation at the start of the array
        if (questionnaire?.id === 'wellbeing') {
          return {
            ...prev,
            wellbeing: [
              new WellbeingConversation({
                axios,
                wellbeingQuestionnaire: questionnaire,
                todo: todo,
              }),
            ],
          }
        } else if (questionnaire?.id === 'motivation') {
          return {
            ...prev,
            motivation: [
              new MotivationConversation({
                axios,
                motivationQuestionnaire: questionnaire,
                todo: todo,
              }),
            ],
          }
        }
        return {
          ...prev,
          others: [...prev.others, new QuestionnaireConversation(todo, axios)],
        }
      },
      { motivation: [], wellbeing: [], others: [] }
    )

    const questionnaireConvos = [
      ...convosGrouped.wellbeing,
      ...convosGrouped.motivation,
      ...convosGrouped.others,
    ]

    if (questionnaireConvos.length > 2) {
      questionnaireConvos.splice(
        2,
        0,
        new BasicConversation({
          icon: faInfoCircle,
          name: `Additional resources`,
          responders: {
            intro: (response, opts) =>
              opts.conversationManager.respondObj({
                text: `Your practitioner has asked if you can complete a few more resources before you continue`,
                finish: true,
              }),
          },
        })
      )
    }

    for (const conversation of questionnaireConvos) {
      this.addConversation(conversation)
    }

    return questionnaireConvos
  }

  constructor(public readonly axios: WrappedAxios) {
    super({ conversations: [] })
  }
}
