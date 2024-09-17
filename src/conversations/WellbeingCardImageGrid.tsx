import ScalingPressable from 'core/components/ScalingPressable'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import React from 'react'
import Actionable from 'relay-shared/core/components/Actionable'
import mapQuestionAnswers from 'relay-shared/questionnaires/helpers/mapQuestionAnswers'
import { Questionnaire, QuestionnaireQuestion } from 'relay-shared/RelayTypes'
import WellbeingFeeling from './components/WellbeingFeeling'

export function WellbeingCardImageGrid({
  question,
  questionnaire,
  onConfirmAnswer,
}: {
  question: QuestionnaireQuestion
  questionnaire: Questionnaire
  onConfirmAnswer: (answer: number) => void
}) {
  return (
    <Flex center fw style={{}}>
      <Flex row style={{ flexWrap: 'wrap', paddingVertical: 25 }} grow>
        {mapQuestionAnswers(questionnaire, question)
          .slice(1)
          .map((answer, i) => {
            return (
              <ScalingPressable
                action={() => onConfirmAnswer(i + 1)}
                key={i}
                style={{
                  width: '50%',
                  alignItems: 'center',
                  height: 130,
                  flexGrow: 1,
                  justifyContent: 'center',
                }}
              >
                <Flex center gap={7}>
                  <WellbeingFeeling index={i + 1} />
                  <Txt semibold center>
                    {answer.text}
                  </Txt>
                </Flex>
              </ScalingPressable>
            )
          })}
      </Flex>
      <Actionable action={() => onConfirmAnswer(0)}>
        <Txt color={'rgba(0, 0, 0, 0.7)'}>This is not important to me</Txt>
      </Actionable>
    </Flex>
  )
}
