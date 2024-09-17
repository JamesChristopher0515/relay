import { isPlainObject } from 'lodash'
import assertDefined from '@mtyk/frontend/core/helpers/assertDefined'
import assert from '@mtyk/frontend/core/helpers/assertDefined'
import React from 'react'
import { WrappedAxios } from 'relay-shared/core/hooks/useWrappedAxiosShared'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'
import getAllQuestionnaireQuestions from 'relay-shared/questionnaires/helpers/getAllQuestionnaireQuestions'
import getQuestionnaireAnswerText from 'relay-shared/questionnaires/helpers/getQuestionnaireAnswerText'
import { Questionnaire, QuestionnaireQuestion } from 'relay-shared/RelayTypes'
import { QuestionnaireResultAnswer, Todo } from 'relay-shared/RelayTypes'
import ConversationButtons from './components/ConversationButtons'
import ConversationVerticalSlider from './components/ConversationVerticalSlider'
import RelayConversation from './RelayConversation'
import {
  ConversationResponse,
  ConversationResponseManual,
  ResponderFunctionManual,
} from './RelayConversationTypes'

function QuestionnaireQuestionComponent({
  question,
  questionnaire,
  onAnswer,
}: {
  question: QuestionnaireQuestion
  questionnaire: Questionnaire
  onAnswer: (answer: number) => Promise<void>
}) {
  const renderers = {
    'question-buttons': ConversationButtons,
    'question-slider': ConversationVerticalSlider,
  }
  const Renderer = renderers[question.type]
  assert(Renderer, `No renderer for type ${question.type}`)

  return (
    <Renderer
      question={question}
      questionnaire={questionnaire}
      onAnswer={onAnswer}
    />
  )
}

export default class QuestionnaireConversation extends RelayConversation<
  any,
  { existingAnswers: QuestionnaireResultAnswer[] }
> {
  defaultResponder
  constructor(public readonly todo: Todo, axios: WrappedAxios) {
    assertDefined(
      todo.questionnaire,
      `Todo ${todo._id} is missing questionnaire`
    )
    super({
      responders: {},
      name: todo.questionnaire.name,
      icon: RelayIcons.questionnaire,
    })
    let client: string
    const { assignedResource } = todo
    const questionnaire = todo.questionnaire!
    client = todo.client
    const { shuffle } = assignedResource!
    assert(
      isPlainObject(questionnaire),
      `Assigned resource ${todo._id} missing questionnaire object`
    )

    console.log(todo.assignedResource)
    if (todo.assignedResource?.showBefore) {
      this.addResponder('show-before', async () => ({
        text: todo.assignedResource!.showBefore,
        advance: true,
      }))
    }

    const questions = getAllQuestionnaireQuestions(questionnaire, false)

    let orderedQuestions: QuestionnaireQuestion[] = []
    let randomizedQuestions: QuestionnaireQuestion[] = []

    for (const question of questions) {
      if (shuffle) {
        randomizedQuestions.push(question)
      } else {
        orderedQuestions.push(question)
      }
    }

    const hasShowAfter = todo.assignedResource?.showAfter
    const allQuestions = [...randomizedQuestions, ...orderedQuestions]
    const makeQuestionId = (question) => question._id + question.question
    for (let i = 0; i < allQuestions.length; i++) {
      const question = allQuestions[i]
      const nextQuestion = allQuestions[i + 1]
      const thisQuestionId = makeQuestionId(question)
      this.addResponder(thisQuestionId, async (response: any, opts) => {
        if (typeof response === 'number') {
          console.log(`Got response ${response}`)
          await axios.post(`/questionnaire-result/answers`, {
            answers: [
              {
                question: question._id,
                todo: todo._id,
                value: response,
              },
            ],
          })
          const answerText = getQuestionnaireAnswerText(
            questionnaire,
            question,
            response
          )
          if (nextQuestion || hasShowAfter) {
            return { response: answerText, advance: true }
          } else {
            return { response: answerText, finish: true }
          }
        } else {
          return {
            text: question.question,
            advance: question.type === 'information' ? true : undefined,
            component: ({ isLast }) => {
              return !isLast || question.type === 'information' ? null : (
                <QuestionnaireQuestionComponent
                  question={question}
                  questionnaire={questionnaire}
                  onAnswer={async (answer) => {
                    opts.conversationManager.respond(thisQuestionId, answer)
                  }}
                />
              )
            },
          }
        }
      })
    }

    if (hasShowAfter) {
      this.addResponder('show-after', async () => ({
        text: todo.assignedResource!.showAfter,
        finish: true,
      }))
    }
  }

  get defaultState(): { existingAnswers: QuestionnaireResultAnswer[] } {
    return { existingAnswers: [] }
  }

  questionToItem(question: QuestionnaireQuestion) {
    return {
      question: question._id,
    }
  }

  rehydrateItemsFromState(
    state = this.defaultState
  ): ConversationResponse<any>[] {
    return []
  }
}
