import ProgressBar from 'core/components/ProgressBar'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import { useQuestionnaireContext } from 'questionnaires/contexts/QuestionnaireContext'
import getQuestionnaireColorScheme, {
  questionnaireColorSchemes,
} from 'questionnaires/helpers/getQuestionnaireColorScheme'
import React from 'react'

export default function CheckInProgress({
  isOnboarding,
  value,
}: {
  isOnboarding?: boolean
  value: number
}) {
  const questionnaireContext = useQuestionnaireContext()
  const colorScheme = questionnaireContext.questionnaire
    ? getQuestionnaireColorScheme(questionnaireContext)
    : questionnaireColorSchemes.blue
  return (
    <Flex
      gap={7}
      style={{ position: 'absolute', top: 60, right: 20 }}
      alignItems="flex-end"
    >
      <Txt semibold style={{ color: colorScheme.text }}>
        {isOnboarding ? 'Introduction' : 'Daily check-in'}
      </Txt>
      <ProgressBar
        backgroundColor={'#d4dfdc'}
        color={colorScheme.buttons[0]}
        value={value}
        style={{ width: 60 }}
      />
    </Flex>
  )
}
