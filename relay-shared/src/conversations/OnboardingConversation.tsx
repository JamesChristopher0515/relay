import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { WrappedAxios } from 'core/hooks/useWrappedAxios'
import RelayIcons from '../frontend/icons/RelayIcons'
import { Todo } from '../RelayTypes'
import BasicConversation from './BasicConversation'
import MotivationConversation from './MotivationConversation'
import QuestionnaireConversation from './QuestionnaireConversation'
import RelayConversation from './RelayConversation'
import RelayConversationManager from './RelayConversationManager'
import WellbeingConversation from './WellbeingConversation'
import { conversationUtils } from './wrapResponderWithIds'

export default class OnboardingConversationManager extends RelayConversationManager<any> {
  constructor(
    public readonly assignedQuestionnaireTodos: Todo[],
    axios: WrappedAxios
  ) {
    super({ conversations: [] })
    const questionnaireConvos = assignedQuestionnaireTodos.reduce<
      RelayConversation[]
    >((prev, todo) => {
      const { questionnaire } = todo
      // Place wellbeing/motivation at the start of the array
      if (questionnaire?.id === 'wellbeing') {
        return [
          new WellbeingConversation({
            axios,
            wellbeingQuestionnaire: questionnaire,
            todo: todo,
          }),
          ...prev,
        ]
      } else if (questionnaire?.id === 'motivation') {
        return [
          new MotivationConversation({
            axios,
            motivationQuestionnaire: questionnaire,
            todo: todo,
          }),
          ...prev,
        ]
      }
      // Put other questionnaires at the end
      return [...prev, new QuestionnaireConversation([todo], axios)]
    }, [])

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
            () => ({ finish: true })
          ),
        },
      })
    )

    // this.initialResponder = 'intro'
    this.initialResponder = 'motivationImportance'
  }
}
