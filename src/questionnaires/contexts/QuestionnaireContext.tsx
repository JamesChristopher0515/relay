import createMutableContext from '@mtyk/frontend/react/helpers/createMutableContext'
import { Questionnaire } from 'relay-shared/RelayTypes'
import { boolean } from 'zod'

export const {
  context: QuestionnaireContext,
  useContext: useQuestionnaireContext,
  provider: QuestionnaireContextProvider,
} = createMutableContext<
  {
    questionnaire: Questionnaire
    question: Questionnaire['sections'][number]['questions'][number]
    onAnswer: ({ value }: { value: number }) => void
    canGoBack: boolean
    goBack: () => void
  },
  { selectedAnswer: number }
>({
  questionnaire: undefined as any,
  question: undefined as any,
  onAnswer: undefined as any,
  canGoBack: false,
  goBack: undefined as any,
})
