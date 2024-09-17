import useMediaPlayer from 'content/hooks/useMediaPlayer'
import { useAppDispatch } from 'core/hooks/coreHooks'
import * as WebBrowser from 'expo-web-browser'
import assert from '@mtyk/frontend/core/helpers/assertDefined'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import {
  getRelayApi,
  useGetStopForClientMilestoneStopQuery,
} from 'relay-shared/frontend/api/hooks/useApi'
import { AssignedResource } from 'relay-shared/RelayTypes'
import ThinkingPoints from 'thinking-points/components/ThinkingPoints'

const requiredSeconds = 8
export default function useAssignedResourceOpener({
  resource,
}: {
  resource?: AssignedResource
}) {
  const dec = useDecorationsContext()
  const dispatch = useAppDispatch()
  const { type: resourceType } = resource ?? {}
  const relayApi = getRelayApi()
  const mediaPlayer = useMediaPlayer()

  const { data: stop } = useGetStopForClientMilestoneStopQuery(
    { clientMilestoneStopId: resource?.clientMilestoneStop! },
    { skip: resource?.type !== 'thinking-points' }
  )
  const triggerViewed = () => {
    // Part of a journey, let backend know we've seen the resource
    assert(resource)
    dispatch(
      relayApi.endpoints.viewAssignedResource.initiate({
        assignedResource: resource._id,
      })
    )
    return true
  }
  async function triggerViewedIfViewedFor(
    seconds: number,
    cb: () => Promise<void>
  ) {
    const openedAt = new Date()
    await cb()
    const secondsViewedFor = (new Date().getTime() - openedAt.getTime()) / 1000
    console.log({ secondsViewedFor })
    if (secondsViewedFor > seconds) {
      return triggerViewed()
    }
    return false
  }

  return {
    async open(): Promise<boolean> {
      if (!resource) {
        return false
      }

      if (resourceType === 'content') {
        const { type: contentType, web } = resource.content!
        if (contentType === 'file') {
          // Extra fields added by route
          // TODO fix this confusing mess
          const { download } =
            (resource as any).links ?? (resource.content as any).links
          const isAudio =
            resource.content!.file!.file.mimetype.indexOf('audio') >= 0
          if (isAudio) {
            mediaPlayer.loadResource(resource)
            return triggerViewed()
          } else {
            return triggerViewedIfViewedFor(requiredSeconds, async () => {
              await WebBrowser.openBrowserAsync(download)
            })
          }
        } else if (contentType === 'web') {
          return triggerViewedIfViewedFor(requiredSeconds, async () => {
            await WebBrowser.openBrowserAsync(web!.href, {
              showTitle: false,
              dismissButtonStyle: 'close',
              readerMode: true,
            })
          })
        }
      } else if (resourceType === 'thinking-points' && stop) {
        dec.openModal(ThinkingPoints, {
          ...stop.data,
        })
        return triggerViewed()
      }

      return true
    },
  }
}
