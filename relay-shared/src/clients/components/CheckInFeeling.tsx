import { Flex, Txt } from '@mtyk/frontend/core/components'
import { isNative } from '@mtyk/frontend/core/helpers'
import nativeProps from '@mtyk/frontend/react/nativeProps'
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects'
import React from 'react'
import { RC } from '../../core/components/RC'
import {
  getFeelingColor,
  getFeelingName,
} from '../../feelings/helpers/getAllFeelings'

function WrapForPlatform({ children }) {
  if (isNative) {
    return (
      <Flex rowCenter padding={[0, 6]}>
        {children}
      </Flex>
    )
  } else {
    return (
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          margin: '0 .3em',
          position: 'relative',
          top: '2px',
        }}>
        {children}
      </div>
    )
  }
}
export function CheckInFeeling({ checkInObj }) {
  if (checkInObj?.feelings[0]) {
    const theFeeling = checkInObj.feelings[0]
    return (
      <Txt>
        Feeling
        <WrapForPlatform>
          <RC
            name="FeelingIcon"
            feeling={theFeeling.name}
            style={{ ...nativeProps({ ...makeSize(18) }), marginRight: 5 }}
          />
          <Txt
            {...nativeProps({ size: 18 })}
            bold
            color={getFeelingColor(theFeeling)}>
            {getFeelingName(theFeeling)}
          </Txt>
        </WrapForPlatform>
      </Txt>
    )
  }
  return null
}
