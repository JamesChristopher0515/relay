const dayjs = require('dayjs')
import useClassicReducer from '@mtyk/frontend/react/hooks/useClassicReducer'
import React, { useEffect, useState } from 'react'
import { useMarkChatReadMutation } from '../../api/hooks/useApi'
import { Client, Practitioner } from '../../../RelayTypes'
import * as _ from 'lodash'
import {
  useCreateMessageMutation,
  useGetMessagesQuery,
} from '../../api/hooks/useApi'

export function ChatController({
  practitioner,
  client,
  user,
  component: Component,
  unavailable,
}: {
  client: Client
  practitioner: Practitioner
  user: Client | Practitioner
  component: any
  unavailable?: boolean
}) {
  const [allMessages, setAllMessages] = useState([])
  const [page, setPage] = useState(0)
  const [markChatRead] = useMarkChatReadMutation()

  const messagesQuery = {
    client: client.id,
    practitioner: practitioner.id,
    page: 0,
    sort: { createdAt: -1 },
  }

  const {
    data: result,
    isLoading,
    isFetching,
  } = useGetMessagesQuery(messagesQuery, {
    // Poll for changes on the first page only . When it changes, we remove all the other pages anyway
    pollingInterval: 3 * 1000,
  })
  const {
    data: pageResult,
    isLoading: pageIsLoading,
    isFetching: pageIsFetching,
  } = useGetMessagesQuery(
    { ...messagesQuery, page },
    {
      skip: page === 0,
    }
  )

  const [createMessage, { isLoading: isCreating }] = useCreateMessageMutation()
  useEffect(() => {
    if (result?.data[0]) {
      markChatRead({ chat: result.data[0].chat })
        .unwrap()
        .catch((e) => console.error(e))
    }
  }, [isLoading])

  // Reset all messages when first page changes
  useEffect(() => {
    let msgsLocal = [...allMessages]
    // First page
    if (result && !isFetching && result.data[0]?.id !== msgsLocal[0]?.id) {
      msgsLocal = result.data
    }
    // Current 'next page'
    if (!pageIsFetching && pageResult && !isFetching) {
      const {
        data: newMessages,
        meta: { upTo },
      } = pageResult
      if (msgsLocal.length < upTo) {
        msgsLocal = [...msgsLocal, ...newMessages]
      }
    }
    if (msgsLocal.length) {
      // uniq because we end up with duplicate messages,
      // still yet to figure that out. something to do with pagination
      setAllMessages(_.uniqBy(msgsLocal, 'id'))
    }
  }, [isFetching, result, pageIsFetching])

  let lastDay = dayjs(allMessages[0]?.createdAt ?? 0).startOf('day')
  const messages = allMessages.map((msg, i, arr) => {
    const nextMsg = arr[i + 1]
    const createdAt = dayjs(msg.createdAt)
    const lastInDay = !lastDay.isSame(createdAt.startOf('day'))
    if (lastInDay) {
      lastDay = createdAt.startOf('day')
    }
    return {
      ...msg,
      lastInDay: lastInDay || i === arr.length - 1 ? lastDay : null,
      lastInGroup: nextMsg?.from !== msg.from,
    }
  })

  const loadMore = () => {
    const nextPage = Math.floor((allMessages.length - 1) / 20) + 1
    //
    setPage(nextPage)
  }
  const [newMessage, setNewMessage] = useState('')

  // We need this because we can't batch setState updates and
  // updates initiated by RTK Query (afaik), so for one render
  // we und up with `isCreating` flickering while we wait for
  // eventual consistency. This fn lets us keep track of state
  // changes over time
  const { canSend, ...rest } = useClassicReducer<any>(
    (prev) => {
      if (!prev) {
        prev = {}
      }
      if (prev.creating && !isCreating) {
        return {
          waiting: true,
          canSend: false,
        }
      }
      return { canSend: newMessage.trim().length > 0, creating: isCreating }
    },
    [isCreating, newMessage]
  )

  const props = {
    practitioner,
    client,
    user,
    loadMore,
    messages,
    loading: isLoading,
    isCreating,
    newMessage,
    unavailable,
    setNewMessage,
    canSend,
    send: async () => {
      await createMessage({
        content: newMessage,
        client: client.id,
        practitioner: practitioner.id,
      })
      setNewMessage('')
    },
  }
  return <Component {...props} />
}
