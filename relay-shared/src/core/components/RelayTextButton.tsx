import { Txt } from '@mtyk/frontend/core/components'
import React from 'react'

export interface RelayTextButtonProps {
  children: React.ReactNode
  action: any
}
export interface RelayTextButtonRefHandle {}

export default function RelayTextButton(props: RelayTextButtonProps) {
  const { children, action } = props
  return <Txt onClick={action}>{children}</Txt>
}
