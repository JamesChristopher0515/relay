import {
  faChevronLeft,
  faChevronRight,
  faQuestionCircle,
} from '@fortawesome/free-solid-svg-icons'
import RelayButton from 'core/components/RelayButton'
import ScalingPressable from 'core/components/ScalingPressable'
import TextButton from 'core/components/TextButton'
import { isString, last } from 'lodash'
import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import { AnimatedFlexOnOff } from '@mtyk/frontend/native/animation/components/AnimatedComponents'
import TransitionManager, {
  Transitions,
} from '@mtyk/frontend/native/animation/components/TransitionManager'
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects'
import { useQuestionnaireContext } from 'questionnaires/contexts/QuestionnaireContext'
import getQuestionnaireColorScheme from 'questionnaires/helpers/getQuestionnaireColorScheme'
import React, { ComponentProps, useEffect, useRef, useState } from 'react'
import { Text } from 'react-native'
import getQuestionInfo from 'relay-shared/questionnaires/helpers/getQuestionInfo'

function InformationInnerContent({ context, nextButtonProps }) {
  const colorScheme = getQuestionnaireColorScheme(context)

  return (
    <Flex center flex={1} fullWidth>
      <AutoSizingText defaultFontSize={21}>
        {context.question.question}
      </AutoSizingText>
      <TextButton
        {...nextButtonProps}
        color={colorScheme.textButton}
        style={{ fontSize: 14, marginTop: 40 }}
      />
    </Flex>
  )
}

function AutoSizingText(
  textProps: ComponentProps<typeof Text> & { defaultFontSize: number }
) {
  const { defaultFontSize, ...rest } = textProps
  const context = useQuestionnaireContext()
  const colorScheme = getQuestionnaireColorScheme(context)

  // Need to remove new lines other auto adjusting font size doesn't work
  const textWithoutNewlines = React.Children.toArray(textProps.children)
    .reduce((prev, curr) => {
      return prev + (isString(curr) ? curr : '')
    }, '')
    .replaceAll('\n', ' ')
    .trim()

  const [lineHeight, setLineHeight] = useState(32)
  const lineHeightReady = useRef(true)

  useEffect(() => {
    // When text content changes, reset line height calculation
    lineHeightReady.current = false
  }, [textWithoutNewlines])

  return (
    <Txt
      center
      medium
      style={{
        fontSize: defaultFontSize ?? 20,
        maxWidth: 300,
        lineHeight,
        marginBottom: 80,
        color: colorScheme.text,
      }}
      {...rest}
    >
      {textWithoutNewlines}
    </Txt>
  )
}

function HelpModal({ help }) {
  return (
    <Flex
      padding={[20, 20]}
      style={{
        backgroundColor: 'white',
        borderRadius: 13,
        width: 280,
        maxWidth: '80%',
      }}
    >
      <Txt center style={{ fontSize: 17 }}>
        {help}
      </Txt>
    </Flex>
  )
}

function QuestionInnerContent({ context, nextButtonProps }) {
  const questionInfo = getQuestionInfo(
    context.questionnaire,
    context.question._id
  )
  const decContext = useDecorationsContext()
  const colorScheme = getQuestionnaireColorScheme(context)
  const buttonPadY = 7
  const buttonPadX = 27
  return (
    <Flex flex={1} column center fullWidth grow>
      <AutoSizingText>{context.question.question}</AutoSizingText>
      <Flex gap={16} center fullWidth>
        {questionInfo.scale.elements.map((element, elementI, arr) => {
          const isLast = elementI === arr.length - 1
          const thisButtonColor =
            colorScheme.buttons[elementI] ?? last(colorScheme.buttons)
          const isSelected = element.value === context.selectedAnswer

          return (
            <Flex rowCenter context={{ scale: 1.4 }} key={elementI}>
              <AnimatedFlexOnOff
                onStyle={{
                  ...makeSize(13),
                }}
                offStyle={{
                  ...makeSize(1),
                }}
                value={isSelected}
                style={{
                  position: 'absolute',
                  top: 14,
                  left: -22,
                  backgroundColor: thisButtonColor,
                  borderRadius: 1000,
                }}
              />
              <RelayButton
                textStyle={{
                  fontSize: 13,
                }}
                style={{
                  borderRadius: 1000,
                  paddingTop: buttonPadY,
                  paddingBottom: buttonPadY,
                  paddingLeft: buttonPadX,
                  paddingRight: buttonPadX,
                  backgroundColor: thisButtonColor,
                }}
                onPress={() => {
                  context.update((m) => {
                    m.selectedAnswer = element.value
                  })
                }}
              >
                <Txt>{element.name}</Txt>
              </RelayButton>
            </Flex>
          )
        })}
      </Flex>
      {context.question.help ? (
        <ScalingPressable
          style={{
            position: 'absolute',
            bottom: 20,
            left: 0,
          }}
          onPress={() => {
            decContext.openModal(
              HelpModal,
              {
                help: context.question.help,
              },
              { tapBackgroundToClose: true }
            )
          }}
        >
          <Icon
            icon={faQuestionCircle}
            size={30}
            style={{
              color: colorScheme.text,
            }}
          />
        </ScalingPressable>
      ) : null}
      {context.selectedAnswer !== -1 ? (
        <TextButton
          {...nextButtonProps}
          style={{
            position: 'absolute',
            bottom: 30,
            right: 0,
          }}
        />
      ) : null}
    </Flex>
  )
}

export default function QuestionnaireQuestion() {
  const context = useQuestionnaireContext()
  const colorScheme = getQuestionnaireColorScheme(context)
  const InnerContentComponent = context.question.type.startsWith('question')
    ? QuestionInnerContent
    : InformationInnerContent

  useEffect(() => {
    // Reset answer when receiving new question
    context.update((m) => {
      m.selectedAnswer = -1
    })
  }, [context.question._id])

  return (
    <Flex center flex={1} fullWidth>
      <TransitionManager {...Transitions.fade}>
        <InnerContentComponent
          key={context.question._id}
          context={context}
          nextButtonProps={{
            icon: faChevronRight,
            color: colorScheme.textButton,
            children: 'Next',
            iconOnRight: true,
            disabled:
              context.question.type.startsWith('question') &&
              context.selectedAnswer === -1,
            onPress: () => {
              context.onAnswer({ value: context.selectedAnswer })
            },
          }}
        />
      </TransitionManager>
      {context.canGoBack ? (
        <TextButton
          style={{
            position: 'absolute',
            top: 14,
            left: 20,
          }}
          color={'#aaa'}
          icon={faChevronLeft}
          children="Back"
          onPress={context.goBack}
        />
      ) : null}
    </Flex>
  )
}
