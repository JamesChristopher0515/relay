import { Optional } from '@mtyk/types'
import { ConversationResponse } from 'conversations/RelayConversationTypes'
import RelayButton from 'core/components/RelayButton'
import React from 'react'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'
import {
  ClientWorksheet,
  ClientWorksheetResponse,
  QuestionnaireQuestion,
  Todo,
  Worksheet,
  WorksheetItem,
} from 'relay-shared/RelayTypes'
import getAllWorksheetItems from 'relay-shared/worksheets/helpers/getAllWorksheetItems'
import getNextWorksheetItem from 'relay-shared/worksheets/helpers/getNextWorksheetItem'
import ClientWorksheetItemRenderer from 'worksheets/components/ClientWorksheetRenderers/ClientWorksheetItemRenderer'
import RelayConversation from '../../conversations/RelayConversation'

export interface WorksheetItemConversationOpts {
  todo: Todo
  clientWorksheet?: ClientWorksheet
  useClientWorksheet: () => ClientWorksheet
  worksheet: Worksheet
  axios: any
  onResponse: (
    itemId: string,
    response: ClientWorksheetResponse
  ) => Promise<void>
}

export default class WorksheetItemConversation extends RelayConversation<
  any,
  {}
> {
  clientWorksheet?: ClientWorksheet
  updateClientWorksheet(clientWorksheet: ClientWorksheet) {
    this.clientWorksheet = clientWorksheet
  }
  constructor(private readonly opts2: WorksheetItemConversationOpts) {
    super({ responders: {} })
    const responders = {}
    let client: string
    const { todo, clientWorksheet, worksheet, onResponse } = opts2
    this.clientWorksheet = clientWorksheet
    const allItems = getAllWorksheetItems(worksheet)
    for (const item of allItems) {
      const [id, responder] = this.makeItemResponder(item)
      responders[id] = responder
    }

    this._responders = responders
  }
  get defaultState() {
    return {}
  }
  defaultResponder
  makeItemResponder(item: WorksheetItem) {
    const {
      onResponse,
      useClientWorksheet,
      todo,
      axios,
      worksheet,
      clientWorksheet,
    } = this.opts2
    const thisQuestionId = item._id
    return [
      thisQuestionId,
      async (
        _response: /* we ignore the response from the internal conversation */ Optional<{
          data: any
          complete: boolean
        }>,
        options
      ) => {
        const next = getNextWorksheetItem(worksheet, item)?._id
        const hasCompleteResponse =
          this.clientWorksheet?.responses[thisQuestionId]?.complete
        return {
          advance:
            // These types always auto-advance, no response needed
            item.type === 'message' ||
            item.type === 'section-start' ||
            item.type === 'image' ||
            hasCompleteResponse
              ? next
              : null,
          component: ({ isLast }) => {
            const clientWorksheet = useClientWorksheet()
            return (
              <ClientWorksheetItemRenderer
                response={clientWorksheet?.responses?.[thisQuestionId]}
                worksheet={worksheet}
                item={item}
                onResponse={async (response, complete) => {
                  // Update response on server
                  await onResponse(thisQuestionId, { data: response, complete })

                  if (complete && !hasCompleteResponse) {
                    // Only progress conversation if we don't already have a response.
                    // Saves us from having to do the check in each component
                    options.conversationManager.respond(() => {
                      const nextItem = getNextWorksheetItem(worksheet, item)
                      if (nextItem) {
                        return { advance: nextItem._id }
                      } else {
                        return {
                          component: () => {
                            return (
                              <RelayButton
                                icon={RelayIcons.check}
                                style={{
                                  alignSelf: 'flex-end',
                                }}
                                action={() => {
                                  options.conversationManager.respond(() => ({
                                    finish: true,
                                  }))
                                }}
                              >
                                Back to Today
                              </RelayButton>
                            )
                          },
                        }
                      }
                    })
                  }
                }}
              />
            )
          },
        }
      },
    ] as const
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
