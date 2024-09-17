import { faChevronRight, faStar } from '@fortawesome/free-solid-svg-icons'
import ContentController from 'content/controllers/ContentController'
import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'
import { Resource } from 'relay-shared/RelayTypes'
import { useUpdateClientContentMutation } from 'relay-shared/frontend/api/hooks/useApi'
import NHSIcon from './NHSIcon'
import ReadIcon from './ReadIcon'

interface ResourceItemRowProps {
  textProps?: ComponentProps<typeof Txt>
  clientContent: any
  appearance?: 'recent'
}

function ResourceIcon({ content: resource, ...rest }: { content: Resource }) {
  if (resource.type === 'web') {
    return <NHSIcon {...rest} />
  } else {
    if (resource.file?.file?.mimetype?.startsWith('audio')) {
      return (
        <Icon {...rest} size={12} icon={RelayIcons.audio} color={'#E2C8C8'} />
      )
    }
    return <ReadIcon color={'#E2C8C8'} {...rest} />
  }
}

export default function ResourceItemRow(props: ResourceItemRowProps) {
  const { clientContent, appearance, style, textProps } = props
  const [updateClientContent] = useUpdateClientContentMutation()
  const contentController = ContentController.use({
    clientContent,
  })
  const { name } = clientContent.content
  const [localIsFavourite, setLocalIsFavourite] = useState(
    clientContent.isFavourite
  )

  return (
    <TouchableOpacity onPress={contentController.open}>
      <Flex
        rowCenter
        gap={15}
        style={{
          marginTop: 6,
          ...style,
        }}
      >
        <ResourceIcon
          size={appearance === 'recent' ? 26 : 23}
          content={clientContent.content}
        />
        <Txt
          size={16}
          {...textProps}
          style={{ flexShrink: 1, ...textProps?.style }}
        >
          {name}
        </Txt>
        <Flex grow />
        {appearance === 'recent' ? null : (
          <TouchableOpacity
            onPress={() => {
              updateClientContent({
                id: clientContent._id,
                update: { isFavourite: !localIsFavourite },
              })
              setLocalIsFavourite(!localIsFavourite)
            }}
          >
            <Icon
              icon={faStar}
              color={localIsFavourite ? '#EFDDB1' : '#eee'}
              size={20}
            />
          </TouchableOpacity>
        )}
        <Flex>
          <Icon icon={faChevronRight} color={'#676767'} />
        </Flex>
      </Flex>
    </TouchableOpacity>
  )
}
