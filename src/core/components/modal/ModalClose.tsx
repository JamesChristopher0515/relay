import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { Icon, Txt } from '@mtyk/frontend/core/components'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import { makeSize } from '@mtyk/frontend/styles/helpers/styles'
import React from 'react'
import ScalingPressable from '../ScalingPressable'

export default function ModalClose() {
  const decorationsContext = useDecorationsContext()
  return (
    <ScalingPressable
      style={{ position: 'absolute', top: 40, left: 20 }}
      onPress={() => {
        decorationsContext.close()
      }}
    >
      <Icon
        icon={faTimes}
        size={20}
        style={{ color: '#bbb', ...makeSize(20) }}
      />
    </ScalingPressable>
  )
}
