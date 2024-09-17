import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import assert from '@mtyk/frontend/core/helpers/assertDefined'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import compose from '@mtyk/frontend/react/helpers/compose'
import {
  border,
  borderTop,
  circle,
} from '@mtyk/frontend/styles/helpers/styleObjects'
import CheckInHeader from 'check-in/components/CheckInLayout'
import ConversationView from 'conversations/ConversationView'
import Error404Page from 'core/components/errors/Error404Page'
import React, { useEffect, useRef } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
  useGetClientWorksheetsQuery,
  useGetTodoQuery,
} from 'relay-shared/frontend/api/hooks/useApi'
import getWorksheetCompletableItems from 'relay-shared/worksheets/helpers/getWorksheetCompletableItems'
import CompleteWorksheetController from 'worksheets/controllers/CompleteWorksheetController'
import { WorksheetItemConversationOpts } from 'worksheets/conversations/WorksheetConversation'

import useAssignedJourney from 'relay-shared/assigned-journeys/hooks/useAssignedJourney'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'
import getAllWorksheetItems from 'relay-shared/worksheets/helpers/getAllWorksheetItems'
import TextButton from 'core/components/TextButton'
import { useKeyboard } from '@react-native-community/hooks'
export interface CompleteWorksheetProps
  extends Pick<
    WorksheetItemConversationOpts,
    'worksheet' | 'clientWorksheet' | 'todo'
  > {}

export interface CompleteWorksheetRefHandle {}

function findLastIndex(arr: any[], predicate: (item: any) => boolean) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) {
      return i
    }
  }
  return -1
}

function CompleteWorksheetPageInner(props: CompleteWorksheetProps) {
  const { worksheet, todo } = props
  const conversationViewRef = useRef()
  const controller = CompleteWorksheetController.use(props)
  const assignedJourney = useAssignedJourney(todo.assignedJourney)
  const history = useHistory()

  const clientWorksheetDoc = controller.useClientWorksheet()
  const allItems = getAllWorksheetItems(worksheet)
  const completable = allItems.filter((i) => /response|worksheet/.test(i.type))
  const checkInHeader = useRef()
  const keyboard = useKeyboard()

  const firstIncompleteItem = completable.find(
    (item) => clientWorksheetDoc?.responses[item._id]?.complete !== true
  )
  const indexOfFirstIncomplete = allItems.findIndex(
    (item) => item._id === firstIncompleteItem?._id
  )
  const sectionBefore = findLastIndex(
    allItems.slice(0, indexOfFirstIncomplete),
    (i) => i.type === 'section-start'
  )
  const prevScrollOffset = useRef(0)

  useEffect(() => {
    if (conversationViewRef.current) {
      const conversationView = conversationViewRef.current
      conversationView.onScroll((event) => {
        if (keyboard.keyboardShown) {
          return
        }
        const newY = event.nativeEvent.contentOffset.y
        if (newY < prevScrollOffset.current) {
          checkInHeader.current?.setHideHeader(false)
        }
        prevScrollOffset.current = newY
      })
    }
  }, [conversationViewRef.current, keyboard.keyboardShown])

  useEffect(() => {
    if (keyboard.keyboardShown) {
      checkInHeader.current?.setHideHeader(true)
    }
  }, [keyboard.keyboardShown])
  const section = allItems[sectionBefore]

  return (
    <CheckInHeader
      ref={checkInHeader}
      hideLogo
      title={worksheet.name}
      extra={
        <Flex>
          <Flex
            rowCenter
            gap={10}
            style={{ position: 'absolute', top: -33, right: 0 }}
          >
            {getWorksheetCompletableItems(worksheet)
              .filter((i) => i.type === 'worksheet')
              .map((item) => {
                const itemResponseComplete =
                  clientWorksheetDoc?.responses[item._id]?.complete
                const itemInProgress =
                  clientWorksheetDoc?.responses[item._id]?.data
                if (!itemResponseComplete && !itemInProgress) {
                  return null
                }
                return (
                  <TouchableOpacity
                    key={item._id}
                    onPress={() => {
                      // Jump to item in the conversation
                      const indexInAllItems = allItems.findIndex(
                        (i) => i._id === item._id
                      )
                      if (indexInAllItems !== -1) {
                        conversationViewRef.current?.scrollToIndex(
                          indexInAllItems
                        )
                      }
                    }}
                  >
                    <Flex
                      center
                      style={{
                        marginTop: 10,
                        marginBottom: 5,
                        backgroundColor: itemResponseComplete
                          ? 'rgba(0, 0, 0, 0.05)'
                          : 'transparent',
                        ...border(
                          1,
                          itemResponseComplete ? 'transparent' : '#ccc'
                        ),
                        ...circle(27),
                      }}
                    >
                      {itemInProgress || itemResponseComplete ? (
                        <Txt bold size={15} color="#444">
                          {item.letter}
                        </Txt>
                      ) : null}
                    </Flex>
                  </TouchableOpacity>
                )
              })}
          </Flex>
          <Flex
            rowCenter
            between
            style={{
              marginTop: 15,
              paddingTop: 5,

              ...borderTop(1, 'rgba(0, 0, 0, 0.05)'),
            }}
          >
            {section ? (
              <Flex rowCenter gap={6}>
                <Icon
                  icon={RelayIcons.building}
                  size={20}
                  color="black"
                  style={{ transform: [{ scale: 1 }] }}
                />
                <Txt>{section.name}</Txt>
              </Flex>
            ) : null}
            <Flex>
              <TextButton
                action={() => {
                  history.replace(`/assigned-journey/${assignedJourney?._id}`)
                }}
              >
                Back
              </TextButton>
            </Flex>
          </Flex>
        </Flex>
      }
    >
      {controller.conversationManager ? (
        <ConversationView
          ref={conversationViewRef}
          conversationManager={controller.conversationManager}
        />
      ) : null}
    </CheckInHeader>
  )
}

export default compose()(function CompleteWorksheetPage({ match }) {
  const worksheetTodoId = match.params.id
  const { data: todo, isLoading: isTodoLoading } =
    useGetTodoQuery(worksheetTodoId)
  const { data: clientWorksheet, isLoading: isClientWorksheetLoading } =
    useGetClientWorksheetsQuery({
      todo: worksheetTodoId,
    })
  const isLoading = isTodoLoading || isClientWorksheetLoading
  if (isLoading) {
    return null
  }
  if (todo && clientWorksheet) {
    assert(todo.worksheet, 'todo.worksheet is not defined')
    return (
      <CompleteWorksheetPageInner
        worksheet={todo.worksheet}
        clientWorksheet={clientWorksheet}
        todo={todo}
      />
    )
  } else {
    return <Error404Page />
  }
})
