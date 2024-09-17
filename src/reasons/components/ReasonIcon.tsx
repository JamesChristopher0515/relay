import { Txt } from '@mtyk/frontend/core/components'
import React, { memo } from 'react'
import { Image } from 'react-native'

interface ReasonIconProps {
  reason: string
}

const reasonsMap = [
  { name: 'family', image: require('assets/images/feelings/family.png') },
  { name: 'friends', image: require('assets/images/feelings/friends.png') },
  { name: 'sleep', image: require('assets/images/feelings/sleep.png') },
  { name: 'food', image: require('assets/images/feelings/food.png') },
  { name: 'health', image: require('assets/images/feelings/health.png') },
  { name: 'exercise', image: require('assets/images/feelings/exercise.png') },
  { name: 'finances', image: require('assets/images/feelings/finances.png') },
  { name: 'home', image: require('assets/images/feelings/home.png') },
  { name: 'hobbies', image: require('assets/images/feelings/hobbies.png') },
  { name: 'myself', image: require('assets/images/feelings/myself.png') },
  { name: 'work', image: require('assets/images/feelings/work.png') },
  {
    name: 'relationships',
    image: require('assets/images/feelings/relationships.png'),
  },
]

function ReasonIcon(props: ReasonIconProps) {
  const { reason, ...rest } = props
  const reasonInfo = reasonsMap.find((f) => f.name === reason)
  if (!reasonInfo) {
    console.log({ props, reasonInfo })
    return <Txt>Not found</Txt>
  }
  return <Image source={reasonInfo.image} resizeMode="contain" {...rest} />
}

export default memo(ReasonIcon, (prev, next) => prev.reason === next.reason)
