import { Txt } from '@mtyk/frontend/core/components'
import React from 'react'
import getReasonName from '../../reasons/helpers/getReasonName'

export function CheckInReason({ checkInObj }) {
  if (checkInObj?.reasons?.[0]) {
    const theReason = checkInObj.reasons[0]
    return (
      <>
        <Txt>
          because {checkInObj.reasons[0]?.name === 'custom' ? '' : 'of '}
          <Txt bold color={'#C0A789'}>
            {getReasonName(theReason).replace(/\.$/, '')}
          </Txt>
        </Txt>
      </>
    )
  }
  return null
}
