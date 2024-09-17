import assert from '@mtyk/frontend/core/helpers/assertDefined'
import React from 'react'
import type { WrappedAxios } from 'relay-shared/core/hooks/useWrappedAxiosShared'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'
import getQuestionnaireAnswerText from 'relay-shared/questionnaires/helpers/getQuestionnaireAnswerText'
import {
  Questionnaire,
  QuestionnaireQuestion,
  Todo,
} from 'relay-shared/RelayTypes'
import { OurMessage } from './ConversationMessage'
import RelayConversation from './RelayConversation'
import { WellbeingCardImageGrid } from './WellbeingCardImageGrid'
import { conversationUtils, wrapResponderWithIds } from './wrapResponderWithIds'
export default class WellbeingConversation extends RelayConversation<any, any> {
  defaultResponder = 'wellbeing0-intro'
  get defaultState(): any {
    return {}
  }
  wellbeingQuestionnaire: Questionnaire
  answers: { [answerId: string]: number } = {}

  hasAnswerForQuestion(questionId: string): boolean {
    return this.answers[questionId] !== undefined
  }

  constructor({
    axios,
    wellbeingQuestionnaire,
    todo,
  }: {
    axios: WrappedAxios
    wellbeingQuestionnaire: Questionnaire
    todo: Todo
  }) {
    super({
      responders: {},
      name: 'wellbeing',
      icon: RelayIcons.wellbeing,
    })
    this.wellbeingQuestionnaire = wellbeingQuestionnaire

    const responders = {}
    for (const [
      sectionI,
      section,
    ] of wellbeingQuestionnaire.sections.entries()) {
      Object.assign(
        responders,
        this.addRespondersForSection({
          sectionI,
          wellbeingQuestionnaire,
          section,
          axios,
          todo,
        })
      )
    }

    this._responders = responders
  }

  getQuestionAnswerText(question: QuestionnaireQuestion) {
    return getQuestionnaireAnswerText(
      this.wellbeingQuestionnaire,
      question,
      this.answers[question._id]
    )
  }

  private addRespondersForSection({
    sectionI,
    wellbeingQuestionnaire,
    section,
    axios,
    todo,
  }: {
    sectionI: number
    wellbeingQuestionnaire: Questionnaire
    section: Questionnaire['sections'][number]
    axios: WrappedAxios
    todo: Todo
  }) {
    const _this = this
    const [introIntro, ...sectionQuestions] = [
      section.questions[0],
      ...section.questions.slice(1),
    ]
    const isLastSection =
      sectionI === wellbeingQuestionnaire.sections.length - 1
    const contentBefore = introIntro.question
    const generateSectionId = (i) => `wellbeing${i}-intro`
    const generateSectionQuestionId = (i) => `wellbeing${sectionI}-cards-${i}`

    // Responder for intro
    const introAndEnd = {
      [generateSectionId(sectionI)]: function (response, opts) {
        return {
          text: contentBefore,
          advance: generateSectionQuestionId(0),
        }
      },
      'wellbeing-end': () => ({ finish: true }),
    }

    // Responders for individual questions
    const questions = conversationUtils.messageReducer({
      items: sectionQuestions,
      generateId: generateSectionQuestionId,
      fn: (question, { respond }) => {
        return async function wellbeingCardsResponder(this, response, opts) {
          console.log(question.question)
          return {
            isFullScreen: true,
            text: question.question,
            component: ({ isLast }) =>
              isLast ? (
                <WellbeingCardImageGrid
                  question={question}
                  onConfirmAnswer={(answer) => {
                    _this.answers[question._id] = answer
                    respond(true)
                  }}
                  questionnaire={wellbeingQuestionnaire}
                />
              ) : (
                <OurMessage _id={question._id}>
                  {_this.getQuestionAnswerText(question)}
                </OurMessage>
              ),
          }
        }
      },
      next: wrapResponderWithIds(async function (response) {
        try {
          await _this.saveQuestionnaireSectionAnswers({ section, axios, todo })
        } catch (e) {
          console.error(e)
          return { text: 'Something went wrong' }
        }

        const advance = isLastSection
          ? 'wellbeing-end'
          : generateSectionId(sectionI + 1)

        return {
          advance,
        }
      }),
    })

    return { ...introAndEnd, ...questions }
  }

  private async saveQuestionnaireSectionAnswers({
    section,
    axios,
    todo,
  }: {
    section: Questionnaire['sections'][number]
    axios: WrappedAxios
    todo: Todo
  }) {
    let answers: any[] = []
    for (const question of section.questions) {
      if (question.type !== 'information') {
        assert(
          typeof this.answers[question._id] === 'number',
          `No answer for question ${question._id}: ${question.question}`
        )
        answers.push({
          question: question._id,
          value: this.answers[question._id],
          todo: todo._id,
        })
      }

      await axios.post(
        `/questionnaire-result/answers`,
        {
          answers,
        },
        {
          headers: {
            impersonate: todo.client,
          },
        }
      )
    }
  }
}
