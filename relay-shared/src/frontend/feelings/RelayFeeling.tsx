import { Flex, Txt } from '@mtyk/frontend/core/components'
import React from 'react'

interface RelayFeelingProps {
  feeling: string
}

function SvgForFeeling({ feeling }) {
  return null
}

export default function RelayFeeling(props: RelayFeelingProps) {
  const { feeling } = props
  return (
    <Flex>
      <SvgForFeeling {...props} />
      <Txt>{feeling}</Txt>
    </Flex>
  )
}
