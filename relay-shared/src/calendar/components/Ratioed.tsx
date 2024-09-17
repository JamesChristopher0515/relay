import { Flex } from '@mtyk/frontend/core/components'
import { config } from '@mtyk/frontend/core/helpers'
import { DefaultProps } from '@mtyk/frontend/native/MTYKNativeTypes'
import { unifyStyle } from '@mtyk/frontend/react'
import { percentage } from '@mtyk/frontend/strings'
import { absoluteFill } from '@mtyk/frontend/styles/helpers/styleObjects'
import React, { ComponentType, forwardRef, useState } from 'react'

/**
 * @deprecated Temporarily copied in from mtyk/frontend until we have a better
 *   packaging workflow
 */
function Ratioed(
  {
    widthToHeight: _widthToHeight,
    component: Component,
    childStyle,
    ...rest
  }: DefaultProps.Style & {
    /** Defaults to 1, equal height/width */
    widthToHeight?: number
    childStyle: DefaultProps.Style['style']
    component: ComponentType<any>
  },
  ref
) {
  const [layout, setLayout] = useState()
  const widthToHeight = _widthToHeight ?? 1
  if (config.isNative) {
    return (
      <Component
        onLayout={({ nativeEvent }) => {
          setLayout(nativeEvent.layout)
        }}
        {...rest}
        style={unifyStyle(
          layout
            ? {
                height: (1 / widthToHeight) * layout.width,
              }
            : {
                paddingBottom: (widthToHeight - 1) * 100 + '%',
              },
          rest.style ?? {}
        )}
        ref={ref}
      />
    )
  } else {
    const percentageToFrac = parseFloat(rest.style?.width ?? '100%') / 100

    return (
      <Flex
        className="Ratioed"
        center
        style={{
          paddingBottom: percentage(percentageToFrac / widthToHeight),
          width: percentage(percentageToFrac),
          position: 'relative',
          ...(rest.style ?? {}),
        }}
        ref={ref}
      >
        <Component
          {...rest}
          style={{ ...(childStyle ?? {}), width: undefined, ...absoluteFill() }}
        />
      </Flex>
    )
  }
}

export default forwardRef(Ratioed)
