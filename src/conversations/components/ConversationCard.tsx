import { Flex, Txt } from '@mtyk/frontend/core/components'
import React, { CSSProperties } from 'react'
import { QuestionnaireQuestion } from 'relay-shared/RelayTypes'

export interface ConversationCardProps {
  question: QuestionnaireQuestion
  style?: CSSProperties
}

export default function ConversationCard(props: ConversationCardProps) {
  const { question, style } = props
  return (
    <Flex
      center
      style={{
        backgroundColor: 'white',
        borderRadius: 20,
        maxWidth: '100%',
        width: 230,
        height: 210,
        paddingHorizontal: 30,
        ...style,
      }}
      gap={15}
    >
      <Txt semibold center>
        {question.question}
      </Txt>
      <Txt medium center>
        {question.help}
      </Txt>
    </Flex>
  )
}
