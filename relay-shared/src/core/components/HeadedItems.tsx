import { Flex, Txt } from '@mtyk/frontend/core/components'
import React from 'react'

export interface HeadedItemsProps {
  title: any
  children: any
}
export interface HeadedItemsRefHandle {}

export default function HeadedItems(props: HeadedItemsProps) {
  const { title, children } = props
  return (
    <Flex gap="1em" style={{ marginBottom: '2.5em' }}>
      <Txt
        style={{ marginLeft: '2.7rem' }}
        medium
        size="1.05em"
        color="#726868"
      >
        {title}
      </Txt>
      <Flex>{children}</Flex>
    </Flex>
  )
}
