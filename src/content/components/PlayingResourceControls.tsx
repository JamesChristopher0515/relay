import isHelpfulAudioStatus from 'content/helpers/isHelpfulAudioStatus'
import msToString from 'content/helpers/msToString'
import useMediaPlayer from 'content/hooks/useMediaPlayer'
import { add } from 'date-fns'
import { isNumber } from 'lodash'
import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import { AnimatedFlex } from '@mtyk/frontend/native/animation/components/AnimatedComponents'
import useDimensions from '@mtyk/frontend/styles/hooks/useDimensions'
import { useInterval } from '@mtyk/frontend/timing/hooks/useInterval'
import React, { useState } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import Actionable from 'relay-shared/core/components/Actionable'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'
import MediaPlayerControls from './MediaPlayerControls'

export interface PlayingResourceControlsProps {}

function TimeString({ children }) {
  return (
    <Txt medium color="#6d6767" size={12}>
      {children}
    </Txt>
  )
}

export default function PlayingResourceControls(
  props: PlayingResourceControlsProps
) {
  const {} = props
  const [expanded, setExpanded] = useState<Date | false>(false)
  useInterval(() => {
    if (expanded && new Date().getTime() - expanded.getTime() > 5000) {
      // set to max safe integer
      setExpanded(false)
    }
  }, 1000)

  const [msLeft, setMsLeft] = useState(0)
  const [msIn, setMsIn] = useState(0)
  const wrapStyles = useAnimatedStyle(() => {
    return {
      height: withTiming(expanded ? 60 : 50, { duration: 250 }),
    }
  }, [expanded])
  const bgStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(expanded ? 1 : 0, { duration: 250 }),
    }
  }, [expanded])
  const mediaPlayer = useMediaPlayer((status) => {
    if (isHelpfulAudioStatus(status)) {
      if (isNumber(status.durationMillis)) {
        const left = Math.max(status.durationMillis - status.positionMillis)
        setMsLeft(left)
        setMsIn(status.positionMillis)
      }
    }
  })
  const { height } = useDimensions()
  if (!mediaPlayer.resource) {
    return null
  }
  const { resource } = mediaPlayer

  const content = resource.content!
  return (
    <AnimatedFlex style={[{ backgroundColor: '#F8F4F4' }, wrapStyles]}>
      {expanded ? (
        <Animated.View
          onTouchStart={() => {
            setExpanded(false)
          }}
          pointerEvents={expanded ? 'auto' : 'none'}
          style={[
            {
              position: 'absolute',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              bottom: '100%',
              left: 0,
              right: 0,
              height,
            },
            bgStyles,
          ]}
        />
      ) : null}
      <Actionable
        style={{ flex: 1 }}
        action={() => {
          setExpanded(new Date())
        }}
      >
        <Flex grow>
          <MediaPlayerControls expanded={expanded} />
          <Flex b rc grow padding={[0, 40]} style={{ paddingBottom: 10 }}>
            {expanded ? (
              <Actionable
                action={() => {
                  mediaPlayer.loadResource(undefined)
                }}
              >
                <Txt medium color="#656565">
                  Close
                </Txt>
              </Actionable>
            ) : (
              <TimeString>{msToString(msIn)}</TimeString>
            )}
            <Flex rc gap={8}>
              <Actionable action={() => mediaPlayer.togglePlay()}>
                <Icon
                  size={expanded ? 18 : 9}
                  color="#D7CACA"
                  icon={
                    mediaPlayer.isPlaying ? RelayIcons.pause : RelayIcons.play
                  }
                />
              </Actionable>
              {!expanded ? (
                <Txt color="#6f6969" size={16} medium>
                  {content.name}
                </Txt>
              ) : null}
            </Flex>
            <TimeString>-{msToString(msLeft)}</TimeString>
          </Flex>
        </Flex>
      </Actionable>
    </AnimatedFlex>
  )
}
