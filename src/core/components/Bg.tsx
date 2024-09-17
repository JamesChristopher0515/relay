import { Flex } from '@mtyk/frontend/core/components'
import { absoluteFill } from '@mtyk/frontend/styles/helpers/styleObjects'
import React from 'react'

export default function Bg() {
  return <Flex style={{ ...absoluteFill(), backgroundColor: '#F8F4F4' }}></Flex>
}
