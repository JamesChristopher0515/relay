import { faCheck, faUndo } from '@fortawesome/free-solid-svg-icons'
import CircularButton from 'core/components/CircularButton'
import Slider from 'core/components/forms/Slider'
import ScalingPressable from 'core/components/ScalingPressable'
import { keyBy, times } from 'lodash'
import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import assert from '@mtyk/frontend/core/helpers/assertDefined'
import React, { useRef, useState } from 'react'
import Actionable from 'relay-shared/core/components/Actionable'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'
import mapQuestionAnswers from 'relay-shared/questionnaires/helpers/mapQuestionAnswers'
import { Questionnaire } from 'relay-shared/RelayTypes'
import { QuestionnaireQuestion } from 'relay-shared/RelayTypes'
import ConversationCard from './components/ConversationCard'
import WellbeingFeeling from './components/WellbeingFeeling'
import { OurMessage } from './ConversationMessage'

const rawId = (id) => id.replace(/importance|happiness/, '')
export function MotivationCardSlider({
  questionnaire,
  answers,
  importance,
  happiness,
  onAnswered,
  title,
}: {
  questionnaire: Questionnaire
  happiness?: boolean
  answers: { [key: string]: number }
  importance?: boolean
  title: string
  onAnswered: (question: string, answer: number) => void
}) {
  const allQuestions = questionnaire.sections[0].questions
  assert(
    questionnaire.sections[0].questions.every((q) => typeof q.id === 'string'),
    `Every question in the motivation questionnaire should have an id`
  )
  const filteredQuestions = questionnaire.sections[0].questions.filter((q) =>
    importance
      ? q.id!.indexOf('importance') !== -1
      : q.id!.indexOf('importance') === -1
  )

  const [ratedCards, setRatedCards] = useState<string[]>(Object.keys(answers))
  const ratedCardsById = keyBy(ratedCards)
  const findCorrespondingQ = (card): QuestionnaireQuestion =>
    allQuestions.find((q) => {
      return (
        rawId(q.id) === rawId(card.id) &&
        q.id.includes(
          card.id.includes('happiness') ? 'importance' : 'happiness'
        )
      )
    })!

  const cardsLeft = filteredQuestions.filter(
    (q) =>
      !ratedCardsById[q._id] &&
      (importance ||
        q.id.includes('importance') ||
        answers[findCorrespondingQ(q)._id] > 0)
  )
  const currentCard = cardsLeft[0]
  const sliderRef = useRef<typeof Slider>(null)

  async function finishRatingCurrentCard(value) {
    if (importance) {
      const { current: slider } = sliderRef
      assert(slider, 'Slider ref had no current value')
      await onAnswered(currentCard._id, value)

      if (value === 0) {
        // If we marked as not important, just rate the happiness card as 0 (the answer doesn't matter)
        const question = findCorrespondingQ(currentCard)
        assert(
          question,
          'Could not find happiness question for importance card'
        )
        await onAnswered(question._id, 0)
      }

      slider?.setRawFraction(0.5)
    } else {
      await onAnswered(currentCard._id, value)
    }
    setRatedCards([...ratedCards, currentCard._id])
  }

  function renderCurrentCard() {
    if (!currentCard) {
      return (
        <OurMessage>
          <Icon icon={RelayIcons.check} color="rgba(0, 0, 0, 0.55)" />
        </OurMessage>
      )
    }

    return (
      <Flex center style={{ paddingVertical: 50 }}>
        <Flex style={{}}>
          <Actionable
            action={() => {
              const lastRated = ratedCards[ratedCards.length - 1]
              if (lastRated) {
                setRatedCards(ratedCards.slice(0, ratedCards.length - 1))
                if (importance) {
                  const { current: slider } = sliderRef
                  assert(slider, 'Slider ref had no current value')
                  slider.resetToDefault()
                }
              }
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: -25,
            }}
          >
            <Icon icon={faUndo} color={'#CEC6C6'} />
          </Actionable>
          <ConversationCard question={currentCard} />
        </Flex>
        {importance ? (
          <>
            <Slider
              defaultValue={0.5}
              ref={sliderRef}
              labels={mapQuestionAnswers(questionnaire, currentCard).map(
                (q) => q.text
              )}
              onDragEnd={({ stepIndex: value }) =>
                finishRatingCurrentCard(value)
              }
              style={{ width: '80%', marginBottom: 20, marginTop: 50 }}
            />
            <Flex rowCenter between style={{ width: '80%' }}>
              {['Not important', 'Very important'].map((text) => {
                return (
                  <Txt size={14} color={'#857C7C'} key={text}>
                    {text}
                  </Txt>
                )
              })}
            </Flex>
          </>
        ) : (
          <Flex rowCenter>
            {times(4, (i) => {
              return (
                <ScalingPressable
                  action={() => finishRatingCurrentCard(i)}
                  key={i}
                  style={{
                    width: '25%',
                    alignItems: 'center',
                    height: importance ? 150 : 80,
                    marginTop: importance ? 0 : 25,
                    flexGrow: 1,
                    justifyContent: 'center',
                  }}
                >
                  <Flex center gap={7}>
                    <WellbeingFeeling size={35} index={i + 1} />
                    <Txt semibold center>
                      {['Not at all', 'Slightly', 'Happy', 'Very happy'][i]}
                    </Txt>
                  </Flex>
                </ScalingPressable>
              )
            })}
          </Flex>
        )}
      </Flex>
    )
  }

  return <Flex>{renderCurrentCard()}</Flex>
}
