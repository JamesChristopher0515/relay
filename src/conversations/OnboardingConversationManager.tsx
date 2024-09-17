import { WrappedAxios } from 'core/hooks/useWrappedAxios'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'
import { Todo } from 'relay-shared/RelayTypes'
import BasicConversation from './BasicConversation'
import QuestionnaireConversationManager from './QuestionnaireConversationManager'
import { conversationUtils } from './wrapResponderWithIds'

export default class OnboardingConversationManager extends QuestionnaireConversationManager {
  constructor(
    public readonly assignedQuestionnaireTodos: Todo[],
    axios: WrappedAxios
  ) {
    super(axios)
    this.addQuestionnaireConversations(assignedQuestionnaireTodos)
    this.addResponders({
      ...conversationUtils.createTextResponders(
        'intro',
        [
          'Hello!',
          `We're about to take you through our onboarding process.`,
          `This usually takes around 20 minutes and the process has been designed to gain a meaningful understanding of your current welfare position.`,
        ],
        conversationUtils.okButton('getStarted')
      ),
      ...conversationUtils.createTextResponders(
        'getStarted',
        [
          `Okay, let's get started. The first step is to look at your Wellbeing.`,
        ],
        conversationUtils.okButton(() => ({
          finish: true,
        }))
      ),
    })

    this.addConversation(
      new BasicConversation({
        name: 'onboarding-finished',
        icon: RelayIcons.puzzlePiece,
        responders: {
          ...conversationUtils.createTextResponders(
            'onboarding-finished',
            [
              `Okay, all done! We'll take you to the settings page where you can choose your daily check-in time and more.`,
              `We hope you enjoy using Relay!`,
            ],
            conversationUtils.button(
              { children: `Go to settings`, icon: RelayIcons.check },
              () => ({ finish: true })
            )
          ),
        },
      })
    )

    this.initialResponder = 'intro'
    // this.initialResponder = 'motivationImportance'
  }
}
