import React, { ComponentProps } from 'react'
import TabButton from './TabButton'

function RelayButton({ ...rest }: ComponentProps<typeof TabButton>) {
  return (
    <TabButton
      isActive
      {...rest}
      style={[
        {
          fontSize: 17,
        },
        rest.style ?? {},
      ]}
    />
  )
}

export default RelayButton
