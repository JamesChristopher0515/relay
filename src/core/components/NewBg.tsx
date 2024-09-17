import { useLocation } from '@mtyk/frontend/core/hooks/routerHooks'
import { AnimatedFlex } from '@mtyk/frontend/native/animation/components/AnimatedComponents'
import { absoluteFill } from '@mtyk/frontend/styles/helpers/styleObjects'
import useDimensions from '@mtyk/frontend/styles/hooks/useDimensions'
import React from 'react'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { BgGrid } from './BgGrid'
import BGMoodMountain from './BgMoodMountain'

interface NewBgProps {}

export default function NewBg(props: NewBgProps) {
  const {} = props
  const { pathname } = useLocation()
  const dimensions = useDimensions()
  const duration = 800
  const bgStyles = useAnimatedStyle(() => {
    const onScreen = pathname === '/'
    return {
      transform: [
        {
          translateY: withTiming(onScreen ? 0 : -dimensions.height * 0.8, {
            duration,
          }),
        },
        { scale: withTiming(onScreen ? 1 : 1.3, { duration }) },
      ],
      opacity: withTiming(onScreen ? 1 : 0.7, { duration }),
    }
  }, [pathname])
  const gridAnimatedStyle = useAnimatedStyle(() => {
    const onToday = pathname === '/'
    const onChatOrHome = pathname === '/chat' || onToday
    return {
      transform: [
        { translateX: -315 },
        { scale: 0.95 },
        {
          translateY: withTiming(onToday ? 0 : 175, { duration }),
        },
      ],
      opacity: withTiming(onChatOrHome ? 1 : 0, { duration }),
    }
  }, [pathname])

  return (
    <AnimatedFlex
      style={[{ ...absoluteFill(), backgroundColor: '#F8F4F4' }, bgStyles]}
    >
      {/* <BGMoodMountain /> */}
      <AnimatedFlex
        style={[
          gridAnimatedStyle,
          {
            position: 'absolute',
            bottom: -165,
            left: '50%',
          },
        ]}
      >
        <BgGrid />
      </AnimatedFlex>
    </AnimatedFlex>
  )
}
