import React, { useEffect, useState, ComponentProps } from 'react'
import { useClient } from '../../core/hooks/useUser'
import { useGetClientContentQuery } from 'relay-shared/frontend/api/hooks/useApi'

export default function useClientContent(resourceId: string) {
  const [client] = useClient()
  const { data: ClientContentInfo } = useGetClientContentQuery({
    client: client._id,
    resource: resourceId,
  })
  return (
    ClientContentInfo ?? {
      lastViewed: null,
      isFavourite: false,
      client: client._id,
      resource: resourceId,
    }
  )
}
