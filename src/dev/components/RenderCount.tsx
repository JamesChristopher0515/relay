import React from 'react'
import WHText from '../../core/wh-components/WHText'

export default function RenderCount() {
  const renders = React.useRef(0)
  return <WHText>Render count: {++renders.current}</WHText>
}
