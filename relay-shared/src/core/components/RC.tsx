import { assert, isNative } from '@mtyk/frontend/core/helpers'
import React, { cloneElement, ComponentProps, forwardRef } from 'react'
import { RContextType } from '../contexts/RContext'
import useRContext from '../hooks/useRContext'

export type WHPlatformComponentProps<
  T extends keyof RContextType['platformComponents']
> = {
  name: T
  disabled?: boolean
  native?: ComponentProps<RContextType['platformComponents'][T]>
  web?: ComponentProps<RContextType['platformComponents'][T]>
} & ComponentProps<RContextType['platformComponents'][T]>

function RelaySharedComponent<
  T extends keyof RContextType['platformComponents']
>(props: WHPlatformComponentProps<T>, ref) {
  const { name: _name, disabled, native, web, ...rest } = props
  const componentOrName = (isNative ? native : web) ?? _name
  const context = useRContext()
  const Component =
    context.platformComponents[
      typeof componentOrName === 'string' ? componentOrName : ''
    ] ?? componentOrName
  if (disabled) {
    return null
  }
  assert(
    typeof Component !== 'undefined',
    `Couldn't find shared component named "${componentOrName}"`
  )
  return React.createElement(Component, { ref, ...rest })
}

export function PassDown({ children, ...rest }) {
  return <>{cloneElement(children, rest)}</>
}

export const RC = forwardRef(RelaySharedComponent)
