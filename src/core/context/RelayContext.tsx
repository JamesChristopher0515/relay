import React from 'react'
import { Practitioner } from 'relay-shared/RelayTypes'
import { Client } from 'relay-shared/RelayTypes'

export default React.createContext<{
  user: Client
  practitioner?: Practitioner
}>({} as any)
