import { Flex, Txt } from '@mtyk/frontend/core/components'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import React from 'react'
import RelayButton from '../RelayButton'

export default function Error404Page() {
  const history = useHistory()
  return (
    <Flex center grow gap={15}>
      <Txt size={16} color={'rgba(0, 0, 0, 0.6)'} medium>
        Hmm, we couldn't find that page...
      </Txt>
      <RelayButton
        action={() => {
          history.replace('/')
        }}
      >
        Go back
      </RelayButton>
    </Flex>
  )
}
