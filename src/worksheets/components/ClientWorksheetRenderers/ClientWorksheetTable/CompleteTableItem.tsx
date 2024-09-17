import {
  faCaretDown,
  faCaretUp,
  faMinus,
  faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import { isAndroid } from '@mtyk/frontend/native/helpers/platform'
import compose from '@mtyk/frontend/react/helpers/compose'
import { borderTop } from '@mtyk/frontend/styles/helpers/styleObjects'
import { borderBottom, shadow } from '@mtyk/frontend/styles/helpers/styles'
import useDimensions from '@mtyk/frontend/styles/hooks/useDimensions'
import CircularButton from 'core/components/CircularButton'
import TextButton from 'core/components/TextButton'
import { setAutoKeyboardDismiss } from 'core/helpers/fixes'
import { clamp } from 'core/helpers/math'
import { debounce } from 'lodash'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import useClientShared from 'relay-shared/clients/hooks/useClientShared'
import ChatMessage from 'relay-shared/frontend/chat/components/ChatMessage'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'
import { WorksheetItemType } from 'relay-shared/RelaySchema'
import getWorksheetCompletableItems from 'relay-shared/worksheets/helpers/getWorksheetCompletableItems'
import ClientWorksheetResponseInput from 'worksheets/components/ClientWorksheetResponseInput'
import WorksheetTableEditController from '../../../controllers/WorksheetTableEditController'
import ClientWorksheetFullscreen from '../ClientWorksheetFullscreen'
import { ClientWorksheetItemRendererProps } from '../ClientWorksheetItemRendererProps'
import { ColumnCell } from './ColumnCell'
import { ColumnsWrap } from './ColumnsWrap'
import { columnWidth } from './columnWidth'

export interface CompleteWorksheetItemProps
  extends ClientWorksheetItemRendererProps {
  item: WorksheetItemType<'worksheet'>
}

export interface CompleteWorksheetItemRefHandle {}

const rowHeight = 180
export default compose(observer)(function CompleteWorksheetItem(
  props: CompleteWorksheetItemProps
) {
  const { item, worksheet, response, onResponse } = props
  const [client] = useClientShared()
  const controller = WorksheetTableEditController.use({
    item,
    response,
    worksheet,
    onResponse,
  })

  const { isEditing, worksheetEditStore } = controller
  const isComplete = !isEditing
  const scrollViewRef = React.useRef<ScrollView>(null)
  const { data: itemData } = item
  const dimensions = useDimensions()
  const { columns } = itemData
  const scrollStart = useRef({ x: 0, y: 0 })
  const scrollStartDate = useRef(new Date(0))
  const debouncedScroll = useCallback(
    debounce((date, scrollView, row, column) => {
      if (scrollStartDate.current.getTime() > date.getTime()) {
        // If we started scrolling since we sent this request to scroll, ignore it
        return
      }
      const scrollToStuff = {
        x: column * columnWidth,
        y: row * rowHeight,
        animated: true,
      }
      scrollView.scrollTo(scrollToStuff)
    }, 50),
    []
  )

  function onScrollEnd(x, y, velocityX, velocityY) {
    const diffY = y - scrollStart.current.y
    const rowIndex = clamp(
      Math.round(y / rowHeight),
      0,
      controller.rows.length - 1
    )
    const columnIndex = clamp(
      Math.round(x / columnWidth),
      0,
      (item.data.columns ?? []).length - 1
    )

    if (
      columnIndex !== worksheetEditStore.editingColumn ||
      rowIndex !== worksheetEditStore.editingRow
    ) {
      // Make sure we save the curr response before changing columns
      controller.addOrUpdateResponse(
        worksheetEditStore.editingResponse,
        worksheetEditStore.editingRow,
        worksheetEditStore.editingColumn,
        [rowIndex, columnIndex]
      )
    } else {
      if (Math.abs(diffY) === 0) {
        // If we scrolled vertically, snap to the nearest vertical cell
        debouncedScroll(
          new Date(),
          scrollViewRef.current,
          rowIndex,
          columnIndex
        )
      }
    }
  }

  useEffect(() => {
    if (scrollViewRef.current) {
      debouncedScroll(
        new Date(),
        scrollViewRef.current,
        worksheetEditStore.editingRow,
        worksheetEditStore.editingColumn
      )
    }
  }, [worksheetEditStore.editingRow, worksheetEditStore.editingColumn])

  const editingColumn = controller.getEditingColumn()
  const allItems = getWorksheetCompletableItems(worksheet)
  const thisItem = allItems.find((i) => i._id === item._id)
  const buttonProps = {
    size: 25,
  }
  useEffect(() => {
    setAutoKeyboardDismiss(false)
    return () => {
      setAutoKeyboardDismiss(true)
    }
  }, [])

  return (
    <ClientWorksheetFullscreen
      collapse={isComplete}
      top={
        <Flex>
          <Flex
            style={{
              backgroundColor: 'white',
              marginHorizontal: -20,
              ...borderTop(1, 'rgba(0, 0, 0, 0.22)'),
              ...borderBottom(1, 'rgba(0, 0, 0, 0.22)'),
            }}
          >
            <Flex rowCenter between padding={[7, 20]}>
              <Txt medium size={14} style={{ width: '67%' }}>
                {thisItem?.nameWithLetter}
              </Txt>
              <Flex rowCenter gap={15}>
                {!isComplete ? (
                  <TextButton
                    textStyle={{ fontSize: 13 }}
                    icon={isComplete ? RelayIcons.edit : RelayIcons.check}
                    action={() => {
                      controller.finish()
                    }}
                  >
                    Done
                  </TextButton>
                ) : null}
              </Flex>
            </Flex>
            <ScrollView
              scrollEventThrottle={16}
              directionalLockEnabled
              overScrollMode="always"
              nestedScrollEnabled
              horizontal={isAndroid()}
              persistentScrollbar
              onMomentumScrollEnd={(event) => {
                onScrollEnd(
                  event.nativeEvent.contentOffset.x,
                  event.nativeEvent.contentOffset.y,
                  event.nativeEvent.velocity?.x ?? 0,
                  event.nativeEvent.velocity?.y ?? 0
                )
              }}
              onScrollBeginDrag={(event) => {
                scrollStart.current = {
                  x: event.nativeEvent.contentOffset.x,
                  y: event.nativeEvent.contentOffset.y,
                }
                scrollStartDate.current = new Date()
              }}
              onScrollEndDrag={(event) => {
                if (
                  event.nativeEvent.velocity?.y === 0 &&
                  event.nativeEvent.velocity?.x === 0
                ) {
                  // Only process when there's no momentum, so we handle stationary
                  // drags and ones with motion
                  onScrollEnd(
                    event.nativeEvent.contentOffset.x,
                    event.nativeEvent.contentOffset.y,
                    event.nativeEvent.velocity?.x ?? 0,
                    event.nativeEvent.velocity?.y ?? 0
                  )
                }
              }}
              snapToInterval={columnWidth}
              maximumZoomScale={2}
              minimumZoomScale={1}
              snapToAlignment="start"
              decelerationRate={'fast'}
              contentContainerStyle={{
                height: rowHeight * controller.rows.length,
                width: columns.length * columnWidth,
              }}
              style={{
                height: rowHeight,
                width: '100%',
                overflow: 'hidden',
              }}
              ref={scrollViewRef}
            >
              <Flex>
                {controller.rows.map((rowColumns, rowIndex) => {
                  return (
                    <Flex
                      style={{
                        height: rowHeight,
                        ...borderTop(1, '#ccc'),
                        paddingRight: dimensions.width - columnWidth - 40,
                      }}
                    >
                      <ColumnsWrap>
                        {columns.map((column, columnIndex) => {
                          return (
                            <ColumnCell
                              {...{
                                ...column,
                                itemresponse: response,
                                isHeader: true,
                                key: column._id,
                                rowIndex,
                                columnIndex,
                              }}
                            />
                          )
                        })}
                      </ColumnsWrap>
                      <ColumnsWrap grow={1} style={{}}>
                        {columns.map((column, columnIndex) => {
                          return (
                            <ColumnCell
                              {...{
                                ...column,
                                isHeader: false,
                                key: column._id,
                                itemresponse: response,
                                columnIndex,
                                rowIndex,
                              }}
                            />
                          )
                        })}
                      </ColumnsWrap>
                    </Flex>
                  )
                })}
              </Flex>
            </ScrollView>
          </Flex>
          <Flex row gap={10} justifyContent="center" style={{ marginTop: 15 }}>
            <CircularButton
              disabled={!controller.hasPreviousRow}
              icon={faCaretUp}
              action={() => {
                controller.previousRow()
              }}
              {...buttonProps}
            />
            <CircularButton
              disabled={!controller.hasNextRow}
              icon={faCaretDown}
              action={() => {
                controller.nextRow()
              }}
              {...buttonProps}
            />
            <Txt semibold size={13} style={{ marginTop: 5 }} color={'#333'}>
              {worksheetEditStore.editingRow + 1}/
              {Math.max(
                controller.rows.length,
                1,
                worksheetEditStore.editingRow + 1
              )}
            </Txt>
            <Flex grow />
            {!isComplete ? (
              <Flex rowCenter gap={10}>
                <CircularButton
                  disabled={!controller.canDeleteRow()}
                  icon={faMinus}
                  iconProps={{ style: { transform: [{ scale: 0.8 }] } }}
                  action={() => {
                    controller.deleteRow()
                    // Add a new row
                  }}
                  {...buttonProps}
                />
                <CircularButton
                  disabled={controller.hasReachedMaxRows()}
                  iconProps={{ style: { transform: [{ scale: 0.8 }] } }}
                  icon={faPlus}
                  action={() => {
                    controller.addNewRow()
                    // Add a new row
                  }}
                  {...buttonProps}
                />
              </Flex>
            ) : null}
          </Flex>
          {isComplete ? null : (
            <ChatMessage
              style={{ marginTop: 20 }}
              message={{
                content: editingColumn.placeholder || editingColumn.question,
              }}
              user={client}
            />
          )}
        </Flex>
      }
      bottom={
        isComplete ? null : (
          <Flex column style={{}}>
            <ClientWorksheetResponseInput
              buttonIcon={
                controller.isLastColumn() ? RelayIcons.check : RelayIcons.next
              }
              key={`${worksheetEditStore.editingColumn}${worksheetEditStore.editingRow}`}
              value={controller.worksheetEditStore.editingResponse}
              live
              onChangeText={(text, submit) => {
                const { worksheetEditStore } = controller
                worksheetEditStore.setEditingResponse = text
                if (submit) {
                  controller.addOrUpdateResponse(
                    text,
                    worksheetEditStore.editingRow,
                    worksheetEditStore.editingColumn,
                    true
                  )
                }
              }}
            />
          </Flex>
        )
      }
    />
  )
})
