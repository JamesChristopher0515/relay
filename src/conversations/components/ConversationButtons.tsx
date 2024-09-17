import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import CircularButton from 'core/components/CircularButton'
import RelayButton from 'core/components/RelayButton'
import { Flex } from '@mtyk/frontend/core/components'
import React, { useState } from 'react'
import mapQuestionAnswers from 'relay-shared/questionnaires/helpers/mapQuestionAnswers'
import { Questionnaire, QuestionnaireQuestion } from 'relay-shared/RelayTypes'

export interface ConversationButtonsProps {
  questionnaire: Questionnaire
  question: QuestionnaireQuestion
  onAnswer: (answer: number) => Promise<void>
}

export default function ConversationButtons(props: ConversationButtonsProps) {
  const { questionnaire, question, onAnswer } = props
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1)

  return (
    <Flex style={{ paddingVertical: 15 }}>
      <Flex gap={15} columnCenter style={{ marginBottom: 25 }}>
        {mapQuestionAnswers(questionnaire, question).map((info, index) => {
          const isSelected = selectedAnswerIndex === index
          return (
            <RelayButton
              style={{ opacity: isSelected ? 1 : 0.7 }}
              key={index}
              action={() => {
                setSelectedAnswerIndex(index)
              }}
            >
              {info.text}
            </RelayButton>
          )
        })}
      </Flex>
      <CircularButton
        disabled={selectedAnswerIndex < 0}
        action={() => {
          onAnswer(selectedAnswerIndex)
        }}
        icon={faChevronRight}
        // iconOnRight
        style={{ alignSelf: 'flex-end' }}
      >
        {/* Next */}
      </CircularButton>
    </Flex>
  )
}
