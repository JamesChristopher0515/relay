import RelayContext from 'core/context/RelayContext'
import { useContext } from 'react'

function usePractitioner() {
  const relayContext = useContext(RelayContext)
  return { practitioner: relayContext.practitioner, isLoading: false }
}

export default usePractitioner
