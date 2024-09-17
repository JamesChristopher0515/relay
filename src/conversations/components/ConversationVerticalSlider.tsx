import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import VerticalSlider from 'core/components/forms/VerticalSlider'
import RelayButton from 'core/components/RelayButton'
import { times } from 'lodash'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import React, { useRef, useState } from 'react'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import mapQuestionAnswers from 'relay-shared/questionnaires/helpers/mapQuestionAnswers'
import { Questionnaire, QuestionnaireQuestion } from 'relay-shared/RelayTypes'

export interface ConversationVerticalSliderProps {
  questionnaire: Questionnaire
  question: QuestionnaireQuestion
  onNext?: () => void
}

export default function ConversationVerticalSlider(
  props: ConversationVerticalSliderProps
) {
  const { questionnaire, question, onNext } = props
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1)
  const sliderRef = useRef<typeof VerticalSlider>(null)
  const totalAnswers = mapQuestionAnswers(questionnaire, question).length
  // We only support up to 10 answers for now, has to be a hard limit as the number of hook calls can't change dynamically
  const animatedTextStyles = times(10, (i) => {
    const iScaled = i / totalAnswers
    return useAnimatedStyle(() => {
      const { current: slider } = sliderRef
      const knobValue = slider?.knobValue.value ?? 0
      const proximity = Math.abs(knobValue - iScaled)
      return {
        transform: [{ scale: 1 + Math.max(proximity, 0) * 0.1 }],
        opacity: 0.6 * proximity,
      }
    }, [sliderRef.current, totalAnswers])
  })

  return (
    <Flex style={{ paddingVertical: 15 }}>
      <Flex row>
        <Flex gap={15} columnCenter style={{ marginBottom: 25 }}>
          {mapQuestionAnswers(questionnaire, question).map((info, index) => {
            return (
              <Animated.View
                key={index}
                style={animatedTextStyles[index] ?? {}}
              >
                <Txt
                  action={() => {
                    setSelectedAnswerIndex(index)
                  }}
                />
              </Animated.View>
            )
          })}
        </Flex>
        <VerticalSlider ref={sliderRef} />
      </Flex>
      <RelayButton
        action={onNext}
        icon={faChevronRight}
        iconOnRight
        style={{ alignSelf: 'flex-end' }}
      >
        Next
      </RelayButton>
    </Flex>
  )
}
