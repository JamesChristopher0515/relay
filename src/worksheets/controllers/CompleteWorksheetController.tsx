import { BasicConversationManager } from 'conversations/BasicConversationManager'
import RelayConversationManager from 'conversations/RelayConversationManager'
import { useEffect, useState } from 'react'
import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import wrapArrayHook from 'relay-shared/core/helpers/wrapArrayHook'
import useWrappedAxiosShared from 'relay-shared/core/hooks/useWrappedAxiosShared'
import { useGetClientWorksheetsQuery } from 'relay-shared/frontend/api/hooks/useApi'
import WorksheetConversation, {
  WorksheetItemConversationOpts,
} from 'worksheets/conversations/WorksheetConversation'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'

export interface CompleteWorksheetControllerProps
  extends Pick<
    WorksheetItemConversationOpts,
    'todo' | 'worksheet' | 'clientWorksheet'
  > {}

export default makeController(function CopmleteWorksheetController(
  props: CompleteWorksheetControllerProps
) {
  const {} = props
  const axios = useWrappedAxiosShared()
  const history = useHistory()
  const { data: clientWorksheets, refetch } = wrapArrayHook(
    useGetClientWorksheetsQuery({
      todo: props.todo._id,
    })
  )

  const useClientWorksheet = () =>
    wrapArrayHook(
      useGetClientWorksheetsQuery({
        todo: props.todo._id,
      })
    ).data?.[0]
  const clientWorksheet = clientWorksheets?.[0]
  const [conversationManager, setConversationManager] = useState<
    RelayConversationManager | undefined
  >()

  useEffect(() => {
    const manager = new BasicConversationManager({ conversations: [] })
    const worksheetConvo = new WorksheetConversation({
      ...props,
      axios,
      clientWorksheet,
      useClientWorksheet,
      onResponse: async (id, response) => {
        const { data } = await axios.post(`/worksheets/answers`, {
          responses: [
            {
              item: id,
              todo: props.todo._id,
              value: response,
            },
          ],
        })
        await refetch()
        worksheetConvo.updateClientWorksheet(data)
      },
    })
    manager.addConversation(worksheetConvo)
    setConversationManager(manager)
    manager.start()
    manager.listen('is-finished', () => {
      history.replace('/')
    })
  }, [])

  return {
    useClientWorksheet,
    conversationManager,
  }
})
