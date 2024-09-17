import { rest } from 'lodash'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import { unifyStyles } from '@mtyk/frontend/react/helpers/unifyStyle'
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects'
import React from 'react'

export interface IndicatorBadgeProps {
  count: number
  style?: React.CSSProperties
}

export default function IndicatorBadge(props: IndicatorBadgeProps) {
  const { count, style } = props
  if (count === 0) {
    return null
  }
  return (
    <Flex
      center
      style={unifyStyles(
        {
          position: 'absolute',
          backgroundColor: '#E75A5A',
          borderRadius: 1000,
          ...makeSize(18),
        },
        style ?? {}
      )}
      {...rest}
    >
      <Txt
        center
        semibold
        adjustsFontSizeToFit
        style={{ color: 'white', fontSize: 12.5 }}
      >
        {count}
      </Txt>
    </Flex>
  )
}
