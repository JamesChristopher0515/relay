import { ReactNative } from '@mtyk/frontend/core/helpers/conditionalImports'
import { config } from '@mtyk/frontend/core/helpers/config'
import type { DefaultNativeProps } from '@mtyk/frontend/native/MTYKNativeTypes'
import React, { Children, cloneElement } from 'react'

const Actionable = React.forwardRef(function Actionable(
  {
    children,
    action,
    style,
    ...rest
  }: DefaultNativeProps & {
    action: () => void
  },
  ref: any
) {
  const onlyChild = Children.only(children)
  if (config.isNative) {
    const { Pressable } = ReactNative
    return (
      <Pressable ref={ref} onPress={action} style={{ ...style }}>
        {cloneElement(children, { ...rest, ref })}
      </Pressable>
    )
  } else {
    return (
      <>
        {cloneElement(onlyChild, {
          ...rest,
          ref,
          style,
          onClick: action,
        })}
      </>
    )
  }
})

export default Actionable
