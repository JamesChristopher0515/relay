import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects'
import React from 'react'
import { RC } from '../../core/components/RC'

export default function WellbeingFeeling({
  index,
  size,
  ...rest
}: {
  size?: number
  index: number
}) {
  if (index > 0) {
    const feeling = ['not great', 'ok', 'good', 'great'][index - 1]
    return (
      <RC
        name="FeelingIcon"
        feeling={feeling}
        {...rest}
        style={{ ...makeSize(size ?? 30) }}
      />
    )
  } else {
    return null
  }
}
