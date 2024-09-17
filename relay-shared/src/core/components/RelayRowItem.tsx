import { Flex } from '@mtyk/frontend/core/components'
import React from 'react'

export interface RelayRowItemProps {
  selected?: boolean
  empty?: boolean
  children?: any
}
export interface RelayRowItemRefHandle {}

export default function RelayRowItem(props: RelayRowItemProps) {
  const { selected, children, empty, ...rest } = props
  return (
    <Flex
      justifyContent="center"
      {...rest}
      style={{
        height: '5.3em',
        border: `1px solid ${selected ? '#00A1FF' : '#F5F1F1'}`,
        backgroundColor: `${selected ? '#F2F6F9' : '#FFFFFF'}`,
        color: `${selected ? '#419FFD' : '#000000'}`,
        cursor: 'pointer',
        padding: '0.3em 1.4em',
        fontSize: '.9em',
        ...rest.style,
      }}
    >
      {children}
    </Flex>
  )
}
