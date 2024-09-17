import React, { ContextType } from 'react'
import { ComponentType } from 'react'
import { Client, Practitioner } from '../../RelayTypes'

const RContext = React.createContext<{
  practitioner?: Practitioner
  client?: Client
  platformComponents: {
    loading: ComponentType<any>
    FeelingIcon: ComponentType<any>
    Button: ComponentType<{
      label: string
      action: any
      secondary?: boolean
    }>
    Input: ComponentType<{}>
    IconButton: ComponentType<{}>
    Spinner: ComponentType<{}>
  }
  platformHooks: {
    useClient: () => [Client, any]
    useWrappedAxios: () => any
  }
  sharedActions: Record<string, any>
}>({} as any)

export default RContext

export type RContextType = ContextType<typeof RContext>
