import useAssignedResourceOpener from 'assigned-resource/hooks/useAssignedResourceOpener'
import makeController from '@mtyk/frontend/controllers/helpers/makeController'
import {
  useGetContentQuery,
  useUpdateClientContentMutation,
} from 'relay-shared/frontend/api/hooks/useApi'
import { ClientContent } from 'relay-shared/RelayTypes'

interface ContentController {
  clientContent: ClientContent
}

export default makeController(function ContentController(
  props: ContentController
) {
  const { clientContent } = props
  const [updateClientContent] = useUpdateClientContentMutation()
  const { data: contentDoc } = useGetContentQuery(clientContent.content._id, {
    skip: typeof clientContent === 'undefined',
  })

  const opener = useAssignedResourceOpener({
    resource: { type: 'content', content: contentDoc },
  })

  return {
    open: async () => {
      await opener.open()
      await updateClientContent({
        id: clientContent._id,
        update: { lastViewed: new Date().toISOString() },
      }).unwrap()
    },
  }
})
