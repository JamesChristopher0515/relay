import React from 'react'
import { WrappedAxios } from 'relay-shared/core/hooks/useWrappedAxiosShared'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'
import { Questionnaire, Todo } from 'relay-shared/RelayTypes'
import { MotivationCardSlider } from './MotivationImportanceSlider'
import RelayConversation from './RelayConversation'

export default class MotivationConversation extends RelayConversation<
  any,
  any
> {
  defaultResponder
  get defaultState(): any {
    return {}
  }
  answers: { [question: string]: number } = {}

  async sendAnswers({ happiness = false, importance = false }) {
    console.log(
      `Sending answers for happiness: ${happiness} importance ${importance}`
    )
    try {
      await this.motivationOpts.axios.post(
        `/questionnaire-result/answers`,
        {
          answers: this.getFilteredQuestions({ happiness, importance }).map(
            (question) => ({
              question: question._id,
              todo: this.motivationOpts.todo._id,
              value: this.answers[question._id],
            })
          ),
        },
        {
          headers: {
            impersonate: this.motivationOpts.todo.client,
          },
        }
      )
    } catch (e) {
      console.error(e)
    }
  }

  onAnswered(questionId, answer) {
    this.answers[questionId] = answer
  }

  getFilteredQuestions({ happiness, importance }) {
    const { motivationQuestionnaire } = this.motivationOpts
    return motivationQuestionnaire.sections[0].questions.filter((q) =>
      importance
        ? q.id!.indexOf('importance') !== -1
        : q.id!.indexOf('importance') === -1
    )
  }

  hasAnsweredAllForSection({ happiness = false, importance = false }) {
    const filteredQuestions = this.getFilteredQuestions({
      happiness,
      importance,
    })
    return filteredQuestions.every(
      (q) => typeof this.answers[q._id] === 'number'
    )
  }

  renderCardSlider({ onAnswered, title, ...rest }) {
    return (
      <MotivationCardSlider
        answers={this.answers}
        questionnaire={this.motivationOpts.motivationQuestionnaire}
        onAnswered={onAnswered}
        title={title}
        {...rest}
      />
    )
  }

  constructor(
    private readonly motivationOpts: {
      axios: WrappedAxios
      motivationQuestionnaire: Questionnaire
      todo: Todo
    }
  ) {
    super({
      responders: {},
      name: 'motivation',
      icon: RelayIcons.motivation,
    })
    const _this = this
    const responders = {
      motivationImportance: function MotivationImportance(response, opts) {
        return {
          text: `We're now going to ask you some questions about your motivation.`,
          advance: (response, opts) => ({
            text: `First, let's get an idea of what you find important in your life.`,
            advance: (response, opts) => ({
              text: `How important would you rate the following?`,
              component: function MotivationImportance() {
                return _this.renderCardSlider({
                  importance: true,
                  title: 'Importance',
                  onAnswered: async (question, answer) => {
                    _this.onAnswered(question, answer)
                    if (_this.hasAnsweredAllForSection({ importance: true })) {
                      opts.conversationManager.respond(async () => {
                        await _this.sendAnswers({ importance: true })
                        return {
                          advance: 'motivationHappiness',
                        }
                      })
                    }
                  },
                })
              },
            }),
          }),
        }
      },
      motivationHappiness: function MotivationHappiness(resopnse, opts) {
        return {
          text: `Thanks! Now let's take a moment to think about your happiness.`,
          advance: (response, opts) => ({
            text: `How happy do you feel about the following aspects you ranked as important?`,
            component: function MotivationHappiness() {
              return _this.renderCardSlider({
                happiness: true,
                title: 'Happiness',
                onAnswered: async (question, answer) => {
                  _this.onAnswered(question, answer)
                  if (_this.hasAnsweredAllForSection({ happiness: true })) {
                    opts.conversationManager.respond(async () => {
                      await _this.sendAnswers({ happiness: true })
                      return {
                        finish: 'true',
                      }
                    })
                  }
                },
              })
            },
          }),
        }
      },
    }

    this._responders = responders
  }
}
