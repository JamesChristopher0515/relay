import { WrappedAxios } from 'core/hooks/useWrappedAxios'
import QuestionnaireConversationManager from 'conversations/QuestionnaireConversationManager'
import { conversationUtils } from 'conversations/wrapResponderWithIds'
import { Todo } from 'relay-shared/RelayTypes'
import BasicConversation from 'conversations/BasicConversation'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'

export default class PostCheckInConversationManager extends QuestionnaireConversationManager {
  constructor(
    public readonly assignedQuestionnaireTodos: Todo[],
    axios: WrappedAxios,
    onFinish: () => void
  ) {
    super(axios)
    const questionnaireConversations = this.addQuestionnaireConversations(
      assignedQuestionnaireTodos
    )
    this.addResponders({
      intro: (response, opts) => {
        return {
          text: `You have some other tasks today, let’s run through them quickly.`,
          advance: conversationUtils.button({ children: `Let's go` }, () => ({
            finish: true,
          })),
        }
      },
    })

    this.addConversation(
      new BasicConversation({
        name: 'End',
        icon: RelayIcons.puzzlePiece,
        responders: {
          end: (response, opts) => {
            return {
              text: `That’s all for now. See you at the next check-in!`,
              advance: conversationUtils.button({ children: `Finish` }, () => {
                onFinish()
                return { finish: true }
              }),
            }
          },
        },
      })
    )

    if (assignedQuestionnaireTodos.length > 0) {
      this.initialResponder = 'intro'
    } else {
      this.initialResponder = 'end'
    }
  }
}
