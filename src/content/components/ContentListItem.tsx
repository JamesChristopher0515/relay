import {
  faChevronRight,
  faDownload,
  faGlobeEurope,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons'
import useAssignedResourceOpener from 'assigned-resource/hooks/useAssignedResourceOpener'
import ScalingPressable from 'core/components/ScalingPressable'
import dayjs from 'dayjs'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import { FontAwesomeIcon } from '@mtyk/frontend/core/helpers/conditionalImportsNative'
import { shadow } from '@mtyk/frontend/styles/helpers/styles'
import React from 'react'
import fontAwesomeIconForFile from 'relay-shared/content/helpers/fontAwesomeIconForFile'
import { useGetStopForClientMilestoneStopQuery } from 'relay-shared/frontend/api/hooks/useApi'
import { AssignedResource } from 'relay-shared/RelayTypes'

const fileTypeMap = {
  // Media
  image: 'image',
  audio: 'audio',
  video: 'video',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/jpg': 'jpg',

  // Documents
  'application/pdf': 'pdf',
  'application/msword': 'word',
  'application/vnd.ms-word': 'word',
  'application/vnd.oasis.opendocument.text': 'word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml': 'word',
  'application/vnd.ms-excel': 'excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml': 'excel',
  'application/vnd.oasis.opendocument.spreadsheet': 'excel',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml': 'ppt',
  'application/vnd.oasis.opendocument.presentation': 'ppt',
  'text/plain': 'txt',
  'text/html': 'html',
  'application/json': 'json',
  // Archives
  'application/gzip': 'gzip',
  'application/zip': 'zip',
}

interface Props {
  // content: Content
  assignedResource: AssignedResource
}
export default function ContentListItem({ assignedResource }: Props) {
  const { createdAt: assignedAt } = assignedResource
  const { data: thinkingPointsStop } = useGetStopForClientMilestoneStopQuery(
    { clientMilestoneStopId: assignedResource.clientMilestoneStop },
    { skip: assignedResource.type !== 'thinking-points' }
  )

  const contentType = assignedResource.content?.type
  const contentName = assignedResource.content?.name
  const contentFile = assignedResource.content?.file
  const name = contentName ?? thinkingPointsStop?.data.title ?? ''

  const extensionIsh =
    assignedResource.type === 'thinking-points'
      ? 'tp'
      : contentType === 'file'
      ? fileTypeMap[contentFile!.file.mimetype] || 'file'
      : 'href'
  const opener = useAssignedResourceOpener({ resource: assignedResource })

  return (
    <Flex
      padding={[15, 20]}
      as={ScalingPressable}
      style={{
        ...shadow(0, 4, 2, 0.1),
        backgroundColor: 'white',
        borderRadius: 10,
      }}
      context={{ scale: 1, fontSize: 15 }}
      rowCenter
      onPress={opener.open}
    >
      <Flex center style={{ marginRight: 20 }}>
        <Flex columnCenter style={{ width: 25 }}>
          <FontAwesomeIcon
            style={{ color: '#9CBECD' }}
            icon={
              assignedResource.type === 'content'
                ? contentType === 'web'
                  ? faGlobeEurope
                  : fontAwesomeIconForFile(contentFile!.file)
                : faLightbulb
            }
          />
        </Flex>
        <Txt style={{ color: '#9CBECD' }}>{extensionIsh}</Txt>
      </Flex>
      <Flex grow>
        <Txt medium style={{ color: '#4A4A4A' }}>
          {name}
        </Txt>
        <Txt style={{ color: '#969696' }}>
          Shared {dayjs(assignedAt).format('d/M/YYYY')}
        </Txt>
      </Flex>
      <FontAwesomeIcon
        style={{ color: '#63B9C3' }}
        icon={
          contentType === 'web' || assignedResource.type === 'thinking-points'
            ? faChevronRight
            : faDownload
        }
      />
    </Flex>
  )
}
