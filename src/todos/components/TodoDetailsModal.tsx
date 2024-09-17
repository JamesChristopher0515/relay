import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import { circle } from '@mtyk/frontend/styles/helpers/styleObjects'
import useDimensions from '@mtyk/frontend/styles/hooks/useDimensions'
import React from 'react'
import { ScrollView, TouchableOpacity } from 'react-native'
import { Id } from 'relay-shared/RelayTypes'
import useTodoControllerNative from 'todos/hooks/useTodoControllerNative'

export interface TodoDetailsModalProps {
  todoId: Id
}
export interface TodoDetailsModalRefHandle {}

export default function TodoDetailsModal(props: TodoDetailsModalProps) {
  const { todoId } = props
  const controller = useTodoControllerNative.use({ todoId })
  const dimensions = useDimensions()
  const { todo } = controller
  const dec = useDecorationsContext()

  return (
    <Flex
      center
      style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: '100%',
        width: '100%',
      }}
      onTouchEnd={() => {
        dec.close()
      }}
    >
      <Flex
        gap={5}
        style={{
          backgroundColor: 'white',
          maxHeight: dimensions.height * 0.8,
          width: dimensions.width * 0.8,
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
      >
        <Txt medium size={15}>
          {todo.name}
        </Txt>
        <ScrollView style={{ flexGrow: 1 }}>
          <Txt size={14}>{todo.description}</Txt>
        </ScrollView>
        <TouchableOpacity
          onPress={() => {
            controller.complete(!controller.isComplete)
            dec.close()
          }}
        >
          <Flex
            rc
            gap={5}
            justifyContent="center"
            style={{
              marginTop: 25,
            }}
          >
            <Flex
              center
              style={{
                ...circle(25),
                marginLeft: 10,
                backgroundColor: controller.isComplete ? '#8BAC94' : '#eee',
              }}
            >
              <Icon
                icon={faCheck}
                size={14}
                color={controller.isComplete ? 'white' : 'transparent'}
              />
            </Flex>
            <Txt size={16}>I've completed this task</Txt>
          </Flex>
        </TouchableOpacity>
      </Flex>
    </Flex>
  )
}
