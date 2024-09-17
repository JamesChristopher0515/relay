import { Svg } from '@mtyk/frontend/core/components'
import React, { CSSProperties } from 'react'

export default function makeSharedSVG(
  svg: any,
  {
    useStroke,
    useBoth,
    autoHeight,
    autoWidth,
  }: {
    useBoth?: boolean
    useStroke?: boolean
    autoHeight?: boolean
    autoWidth?: boolean
  } = {
    useStroke: false,
    useBoth: false,
    autoHeight: false,
    autoWidth: false,
  }
) {
  return function SharedSVG({
    color,
    size: _size,
    style,
    ...rest
  }: {
    color?: string
    size?: CSSProperties['width']
    style?: any
  }) {
    const iconColor = color ?? style?.color ?? 'white'
    const size = _size ?? style?.fontSize ?? 16
    const widthHeight = style?.width ?? size
    const extraProps = {
      fill: iconColor,
    } as any
    extraProps.height = autoHeight ? null : widthHeight
    extraProps.width = autoWidth ? null : widthHeight
    if (useStroke || useBoth) {
      extraProps.fill = useBoth ? iconColor : 'none'
      extraProps.stroke = iconColor
    }
    return (
      <Svg {...rest} style={{ ...style }} {...extraProps}>
        {svg}
      </Svg>
    )
  }
}
