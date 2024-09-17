import React, { useEffect, useState, ComponentProps } from 'react'
import { useGetClientContentsQuery } from 'relay-shared/frontend/api/hooks/useApi'
import wrapArrayHook from 'relay-shared/core/helpers/wrapArrayHook'
import { useClient } from 'core/hooks/useUser'

export default function useFavouritedContent() {
  const [client] = useClient()
  const { data: clientFavourites, isLoading } = wrapArrayHook(
    useGetClientContentsQuery({ isFavourite: true, client: client._id })
  )

  return { data: clientFavourites, isLoading }
}
