import { unifyStyle } from '@mtyk/frontend/react'
import React, { ComponentProps } from 'react'
import RelayButton from './RelayButton'

interface TextButtonProps extends ComponentProps<typeof RelayButton> {
  color?: string
}

export default function TextButton(props: TextButtonProps) {
  const color = props.color ?? '#777'

  return (
    <RelayButton
      {...props}
      style={[
        {
          backgroundColor: 'transparent',
          paddingLeft: 0,
          paddingRight: 0,
        },
        unifyStyle(props.style),
      ]}
      textStyle={{
        color,
        fontSize: 16,
        ...props.textStyle,
      }}
      iconStyle={{
        color,
        ...props.iconStyle,
      }}
    />
  )
}
