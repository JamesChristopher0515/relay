import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import TransitionManager, {
  Transitions,
} from '@mtyk/frontend/native/animation/components/TransitionManager'
import SVGLinearGradient from '@mtyk/frontend/native/core/components/SVGLinearGradient'
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects'
import useDimensions from '@mtyk/frontend/styles/hooks/useDimensions'
import CircularButton from 'core/components/CircularButton'
import dayjs from 'dayjs'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { FlatList, KeyboardAvoidingView } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import ChatMessage from 'relay-shared/frontend/chat/components/ChatMessage'

export function ChatView({
  practitioner,
  client,
  user,
  messages,
  unavailable,
  setShowOverlay,
  loading,
  newMessage,
  setNewMessage,
  loadMore,
  canSend,
  send,
}) {
  const { smaller } = useDimensions()
  const flatListRef = useRef<FlatList>(null)
  const [sentAMessage, setSentAMessage] = useState(false)

  useLayoutEffect(() => {
    if (
      messages.length &&
      dayjs(messages[0].createdAt).isAfter(dayjs().subtract(2.5, 'seconds'))
    ) {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
    }
  }, [messages.length])
  return (
    <Flex flex={1}>
      <TransitionManager
        {...Transitions.fade}
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >
        <FlatList
          ref={flatListRef}
          data={(unavailable
            ? [{ content: practitioner?.name, notice: true }]
            : []
          ).concat(messages)}
          inverted
          onEndReachedThreshold={0.9}
          onEndReached={() => {
            loadMore()
          }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.notice ? (
              <Flex
                padding={[10, 20]}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, .1)',
                  width: '100%',
                  marginTop: 10,
                  borderRadius: 10,
                }}
              >
                <Txt medium>
                  {practitioner?.name} isn't available right now but will see
                  your message when their schedule resumes.
                </Txt>
              </Flex>
            ) : (
              <ChatMessage message={item} user={user} />
            )
          }
          contentContainerStyle={{
            paddingVertical: 50 + (canSend ? 70 : 0),
          }}
        />
      </TransitionManager>

      <SVGLinearGradient
        stops={[
          {
            stopColor: '#F8F4F4',
            stopOpacity: 1,
          },
          {
            stopColor: '#F8F4F4',
            offset: '50%',
            stopOpacity: 1,
          },
          {
            stopColor: '#F8F4F4',
            stopOpacity: 0,
          },
        ]}
        style={{
          top: 0,
          left: 0,
          right: 0,
          height: 150,
          position: 'absolute',
          zIndex: 500,
          // backgroundColor: 'red',
        }}
      />
      <Flex>
        {canSend ? (
          <CircularButton
            icon={faPaperPlane}
            onPress={() => {
              send()
              setSentAMessage(true)
            }}
            iconProps={{ size: 24 }}
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              bottom: '100%',
              ...makeSize(70),
              marginVertical: 20,
            }}
          />
        ) : null}
        <TextInput
          autoFocus={sentAMessage}
          multiline
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type your message here"
          placeholderTextColor="#B6A2A2"
          textAlignVertical="center"
          style={{
            backgroundColor: 'white',
            marginHorizontal: 8,
            marginBottom: 60 - smaller * 40,
            borderRadius: 7,
            fontFamily: 'Manrope_400Regular',
            alignItems: 'center',
            justifyContent: 'center',
            textAlignVertical: 'center',
            paddingTop: 14,
            paddingBottom: 14,
            paddingLeft: 25,
            paddingRight: 25,
          }}
        />
      </Flex>
      <KeyboardAvoidingView behavior="padding" />
    </Flex>
  )
}
