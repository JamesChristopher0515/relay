import FeelingsModal from 'core/components/pages/today/FeelingsModal'
import useUser from 'core/hooks/useUser'
import { Flex } from '@mtyk/frontend/core/components'
import { Redirect } from '@mtyk/frontend/core/hooks/routerHooks'
import { absoluteFill } from '@mtyk/frontend/styles/helpers/styleObjects'
import MixedQuestionnaire from 'questionnaires/components/MixedQuestionnaire'
import React, { useMemo, useState } from 'react'
import { useGetTodayTodos } from 'relay-shared/frontend/api/hooks/useApi'
import CheckInProgress from './CheckInProgress'

export default function CheckInModal({ close }) {
  const { user } = useUser()
  const { data: result, isLoading } = useGetTodayTodos(
    { client: user.id },
    {
      pollingInterval: 1000 * 5,
    }
  )

  const questionnaireTodos = (result?.data ?? []).filter((t) => t.questionnaire)

  const [partIndex, setPartIndex] = useState(0)
  const parts = useMemo(
    () => [
      FeelingsModal,
      ...(questionnaireTodos.length
        ? [
            (props) => (
              <MixedQuestionnaire
                todoIds={questionnaireTodos.map((t) => t._id)}
                {...props}
              />
            ),
          ]
        : []),
    ],
    [isLoading]
  )
  if (isLoading) {
    return null
  }
  const Part = parts[partIndex]
  if (!Part) {
    return <Redirect to="/" />
  }

  return (
    <Flex style={{ ...absoluteFill() }} flex={1}>
      <Part
        back={() => {
          const prevPartIndex = partIndex - 1

          if (prevPartIndex === -1) {
            close()
          } else {
            setPartIndex(prevPartIndex)
          }
        }}
        close={() => {
          const nextPartIndex = partIndex + 1
          console.log('close called????????', parts, nextPartIndex)
          if (!parts[nextPartIndex]) {
            console.log(nextPartIndex, 'trying to close...')
            close()
          } else {
            setPartIndex(partIndex + 1)
          }
        }}
      />
      {Part === FeelingsModal ? <CheckInProgress value={0} /> : null}
    </Flex>
  )
}
