import DecorationsRenderer from '@mtyk/frontend/decorations/components/DecorationsRenderer'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import TransitionManager, {
  Transitions,
} from '@mtyk/frontend/native/animation/components/TransitionManager'
import { absoluteFill } from '@mtyk/frontend/styles/helpers/styleObjects'
import useDimensions from '@mtyk/frontend/styles/hooks/useDimensions'
import React from 'react'
import { Pressable } from 'react-native'
import NewsSettings from '../../core/components/pages/new/Settings/index'

export default function SettingsModal({
  pageLayout,
}: {
  // Prevents the need for a require cycle
  pageLayout: React.ComponentType<any>
}) {
  const { height } = useDimensions()
  const dec = useDecorationsContext()
  return (
    <Pressable
      onPress={() => {
        // Close when user taps background
        dec.close()
      }}
      style={{ ...absoluteFill(), backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
    >
      <TransitionManager
        style={{
          ...absoluteFill(),
          // backgroundColor: `rgba(0, 0, 0, 0.6)`,
          justifyContent: 'flex-end',
        }}
        {...Transitions.slideUp(height, 500)}
      >
        <Pressable onPress={() => {}}>
          <DecorationsRenderer>
            <NewsSettings navigation={undefined} />
          </DecorationsRenderer>
        </Pressable>
      </TransitionManager>
    </Pressable>
  )
}
