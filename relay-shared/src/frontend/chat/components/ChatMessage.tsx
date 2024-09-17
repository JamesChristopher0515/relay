import { Flex, Txt } from '@mtyk/frontend/core/components'
import isNative from '@mtyk/frontend/core/helpers/isNative'
import nativeProps, { webProps } from '@mtyk/frontend/react/nativeProps'
import React, { ReactNode } from 'react'
import { User } from '../../../RelayTypes'
const dayjs = require('dayjs')
const calendar = require('dayjs/plugin/calendar')
dayjs.extend(calendar)

export default function ChatMessage({
  message,
  user,
  messageBoxStyles,
  ...rest
}: {
  message: {
    lastInGroup?: boolean
    createdAt?: Date
    from?: string
    lastInDay?: Date
    content: ReactNode
  }
  messageBoxStyles?: React.CSSProperties
  user: User
  style?: any
}) {
  const own = message.from === user._id
  const createdAt = dayjs(message.createdAt)
  const colors = {
    oursText: '#41565B',
    theirsText: '#6C5656',
  }
  const ownColor = '#DAEAEE'
  const theirsColor = '#F1ECEC'

  return (
    <Flex
      {...rest}
      style={{
        ...webProps({
          margin: `.35em 0`,
        }),
        ...nativeProps({
          marginVertical: 4,
          marginTop: message.lastInGroup ? 36 : 4,
        }),
        ...rest.style,
      }}>
      {message.lastInDay ? (
        <Txt
          style={{
            fontSize: 12.5,
            color: 'rgba(0, 0, 0, 0.6)',
            marginBottom: 17,
            marginTop: 30,
            textAlign: own ? 'right' : 'left',
          }}>
          {createdAt.calendar()}
        </Txt>
      ) : null}
      <Flex
        padding={[7, 20]}
        rowCenter
        style={{
          maxWidth: '75%',
          alignItems: 'center',
          wordBreak: 'break-word',
          alignSelf: own ? 'flex-end' : 'flex-start',
          borderRadius: 5,
          backgroundColor: own ? ownColor : theirsColor,
          ...messageBoxStyles,
        }}>
        {typeof message.content === 'string' ? (
          <Txt
            medium
            size={isNative ? 14 : '.95em'}
            color={own ? colors.oursText : colors.theirsText}>
            {message.content}
          </Txt>
        ) : (
          message.content
        )}
      </Flex>
    </Flex>
  )
}
