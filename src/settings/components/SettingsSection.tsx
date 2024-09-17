import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import { makeSize } from '@mtyk/frontend/styles/helpers/styles'
import React from 'react'
export function SettingsTitleSvg({ svg: SvgComponent }: { svg: any }) {
  // return <Txt>akjsdhakjsdhasdasd</Txt>
  return (
    <SvgComponent fill={['#CBE9DE', 'white']} style={{ ...makeSize(23) }} />
  )
}
export function SettingsTitleFA({ icon: fontAwesomeIcon }) {
  return <Icon icon={fontAwesomeIcon} style={{ color: '#CBE9DE' }} size={28} />
}

export default function SettingsSection({
  icon,
  title,
  children,
  style,
  ...rest
}) {
  return (
    <Flex center fullWidth style={{ ...style }} {...rest}>
      <Flex rowCenter gap={15}>
        {icon}
        <Txt medium style={{ fontSize: 19, color: '#333' }}>
          {title}
        </Txt>
      </Flex>
      {children}
    </Flex>
  )
}
