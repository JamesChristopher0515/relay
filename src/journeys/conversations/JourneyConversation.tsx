import { Flex } from '@mtyk/frontend/core/components'
import RelayConversation from 'conversations/RelayConversation'
import React from 'react'
import { Todo } from 'relay-shared/RelayTypes'
import TodoGroupBox from 'today/components/TodoGroupBox'
import { TodoRow } from 'today/components/TodoRow'

export default class JourneyConversation extends RelayConversation<any, {}> {
  defaultResponder = 'start'
  get defaultState() {
    return {}
  }

  constructor(journeyOpts: { journeyTodos: Todo[] }) {
    super({ responders: {} })
    const { journeyTodos } = journeyOpts

    if (journeyTodos.length) {
      this.addResponder('start', async () => {
        function getTodoDescription(todo: Todo) {
          if (todo.worksheet) {
            return `There's a new worksheet complete, would you like to start it now?`
          } else if (todo.questionnaire) {
            return `You have a new questionnaire to complete, would you like to start it now?`
          } else if (todo.content) {
            return `There's a new content to view, would you like to take a look now?`
          }
          return `There's a new task to complete, would you like to complete it now?`
        }
        return {
          text: 'Hello!',
          advance: () => ({
            text: getTodoDescription(journeyTodos[0]),
            advance: () => ({
              component: () => {
                return (
                  <TodoGroupBox padding={[10, 10]} fw>
                    <Flex fw>
                      <TodoRow item={journeyTodos[0]} />
                    </Flex>
                  </TodoGroupBox>
                )
              },
            }),
          }),
        }
      })
      // this.initialResponder = 'start'
    } else {
      this.addResponder('finish', async () => {
        return {
          text: `You're all caught up with this Journey. You can view your previous worksheets in the "History" section below.`,
          finish: true,
        }
      })
      // this.initialResponder = 'finish'
    }
  }
}
