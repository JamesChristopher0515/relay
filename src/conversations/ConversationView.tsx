import { Flex } from '@mtyk/frontend/core/components'
import useLayoutReceiver from '@mtyk/frontend/native/layout/hooks/useLayoutReceiver'
import React, {
  ComponentType,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { FlatList } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { ConversationViewContext } from './contexts/ConversationViewContext'
import ConversationController from './controllers/ConversationController'
import ConversationFlatList from './ConversationFlatList'
import ConversationMessage from './ConversationMessage'
import { ProgressBar } from './ProgressBar'
import RelayConversationManager from './RelayConversationManager'

export interface ConversationComponentProps {
  conversationManager: RelayConversationManager<any>
  prepend?: ComponentType
}

function ItemWrapper({ children }) {
  const animateIn = useSharedValue(0)

  useEffect(() => {
    animateIn.value = 1
  }, [])

  const wrapStyle = useAnimatedStyle(() => {
    const yAmount = 20
    return {
      transform: [
        {
          translateY: withTiming(yAmount - animateIn.value * yAmount, {
            duration: 500,
          }),
        },
      ],
      opacity: withTiming(animateIn.value, { duration: 500 }),
    }
  }, [])
  return <Animated.View style={wrapStyle}>{children}</Animated.View>
}

function Loader({ loading }) {
  if (!loading) {
    return null
  } else {
    return <ProgressBar />
  }
}

export default forwardRef(function ConversationView(
  props: ConversationComponentProps,
  ref
) {
  const { conversationManager, prepend } = props
  const controller = ConversationController.use({
    conversationManager: conversationManager,
  })
  useEffect(() => {
    return controller.conversationManager?.listen(
      'conversation-changed',
      () => {
        const { items } = controller
      }
    )
  }, [controller.conversationManager])

  const [scrollEnabled, setScrollEnabled] = useState(true)
  const flatListRef = useRef<FlatList<any>>(null)
  const onContentSizeChange = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd()
    }, 250)
  }
  const refOnScroll = useRef<any>()

  const layout = useLayoutReceiver()
  useImperativeHandle(ref, () => {
    return {
      scrollEnabled,
      setScrollEnabled,
      onScroll: (cb) => {
        refOnScroll.current = cb
      },
      scrollToIndex: (index: number) => {
        try {
          flatListRef.current?.scrollToIndex({ index, animated: true })
        } catch (e) {
          console.error(e)
        }
      },
    }
  })

  const flatList = (
    <ConversationFlatList
      keyboardShouldPersistTaps="handled"
      onScroll={(e) => {
        refOnScroll.current?.(e)
      }}
      flatListRef={flatListRef}
      scrollEnabled={scrollEnabled}
      onContentSizeChange={onContentSizeChange}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        // paddingVertical: 36,
        paddingHorizontal: 20,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
      data={[
        ...controller.items,
        ...(prepend ? [{ element: prepend, id: 'prepend' }] : []),
      ]}
      keyExtractor={(item, index) => item.id}
      renderItem={({ item, index }) => {
        const isLast = controller.items.length - 1 === index
        const child =
          'element' in item ? (
            item.element
          ) : (
            <ConversationMessage response={item} isLast={isLast}>
              {item.text}
            </ConversationMessage>
          )
        return <ItemWrapper>{child}</ItemWrapper>
      }}
    />
  )

  return (
    <ConversationViewContext.Provider
      value={{
        ...layout.layout,
      }}
    >
      <Flex fw onLayout={layout.onLayout}>
        <Loader loading={controller.isLoading} />
        <Flex>{flatList}</Flex>
      </Flex>
    </ConversationViewContext.Provider>
  )
})
