import { Optional } from '@mtyk/types'
import { createContext } from 'react'

export const ConversationViewContext = createContext<
  Optional<{
    height: number
  }>
>(undefined)
