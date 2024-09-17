import { Flex, Txt } from '@mtyk/frontend/core/components'
import { circle } from '@mtyk/frontend/styles/helpers/styleObjects'
import { makeSize } from '@mtyk/frontend/styles/helpers/styles'
import React, { memo } from 'react'
import { Image } from 'react-native'

interface FeelingIconProps {
  size?: number
  feeling: string
}

const feelingsMap = [
  {
    image: require('assets/images/feelings/grateful.png'),
    name: 'grateful',
    valence: 0.5,
  },
  {
    image: require('assets/images/feelings/happy.png'),
    name: 'happy',
    valence: 0.7,
  },
  {
    image: require('assets/images/feelings/excited.png'),
    name: 'excited',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/proud.png'),
    name: 'proud',
    valence: 0.9,
  },
  {
    image: require('assets/images/feelings/energized.png'),
    name: 'energized',
    valence: 1,
  },
  {
    image: require('assets/images/feelings/motivated.png'),
    name: 'motivated',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/loving.png'),
    name: 'loving',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/content.png'),
    name: 'content',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/relaxed.png'),
    name: 'relaxed',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/stressed.png'),
    name: 'stressed',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/tired.png'),
    name: 'tired',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/notSure.png'),
    name: 'not sure',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/down.png'),
    name: 'down',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/anxious.png'),
    name: 'anxious',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/annoyed.png'),
    name: 'annoyed',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/unmotivated.png'),
    name: 'unmotivated',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/worried.png'),
    name: 'worried',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/angry.png'),
    name: 'angry',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/hopeless.png'),
    name: 'hopeless',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/exhausted.png'),
    name: 'exhausted',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/panicked.png'),
    name: 'panicked',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/frustrated.png'),
    name: 'frustrated',
    valence: 0.8,
  },
  {
    image: require('assets/images/feelings/sad.png'),
    name: 'sad',
    valence: 0.8,
  },
  { image: require('assets/images/feelings/bad.png'), name: 'bad', valence: 0 },
  {
    image: require('assets/images/feelings/notGreat.png'),
    name: 'not great',
    valence: 0.25,
  },
  { image: require('assets/images/feelings/ok.png'), name: 'ok', valence: 0.5 },
  {
    image: require('assets/images/feelings/good.png'),
    name: 'good',
    valence: 0.75,
  },
  {
    image: require('assets/images/feelings/great.png'),
    name: 'great',
    valence: 1,
  },
]

function FeelingIcon(props: FeelingIconProps) {
  const { feeling, ...rest } = props
  const feelingInfo = feelingsMap.find((f) => f.name === feeling)
  if (!feelingInfo) {
    return (
      <Flex
        {...rest}
        style={{
          ...circle(10),
          background: '#aaa',
          ...rest.style,
        }}
      />
    )
  }
  return (
    <Image
      source={feelingInfo.image}
      resizeMode="contain"
      {...rest}
      style={[
        {
          ...(typeof props.size === 'number' ? makeSize(props.size) : {}),
        },
        rest.style,
      ]}
    />
  )
}

export default memo(FeelingIcon, (prevProps, nextProps) => {
  return prevProps.feeling === nextProps.feeling
})
