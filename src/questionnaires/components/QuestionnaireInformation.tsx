import { Flex, Txt } from '@mtyk/frontend/core/components'
import { SingleQuestionnaireQ } from 'questionnaires/helpers/QuestionnaireTypes'
import React from 'react'

export default function QuestionnaireInformation({
  question,
}: {
  question: SingleQuestionnaireQ
}) {
  return (
    <Flex>
      <Txt>{question.questionId.question}</Txt>
    </Flex>
  )
}
