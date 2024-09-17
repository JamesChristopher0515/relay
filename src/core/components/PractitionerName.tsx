import usePractitioner from 'core/hooks/usePractitioner'
import React from 'react'

export default function PractitionerName() {
  const { practitioner } = usePractitioner()
  return <>{practitioner?.name ?? 'Your practitioner'}</>
}
