import React, { ComponentProps, ReactNode } from 'react'
import { Txt, Flex, Icon } from '@mtyk/frontend/core/components'
import { MTYKIcon } from '@mtyk/frontend/core/components/Icon'

interface ResourcesNoContentProps {
  message: ReactNode
  icon?: MTYKIcon
  iconProps?: ComponentProps<typeof Icon>
}

export default function ResourcesNoContent(props: ResourcesNoContentProps) {
  const { message, icon, iconProps } = props
  return (
    <Flex columnCenter gap={20} grow={1} style={{ justifyContent: 'center' }}>
      {icon ? <Icon icon={icon} size={44} {...iconProps} /> : null}
      <Txt color={'#7B7575'} center bold size={16} style={{ maxWidth: 210 }}>
        {message}
      </Txt>
    </Flex>
  )
}
