import { Flex } from '@mtyk/frontend/core/components'
import compose from '@mtyk/frontend/react/helpers/compose'
import { shadow } from '@mtyk/frontend/styles/helpers/styles'
import React, { useState } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import ImageView from 'react-native-image-viewing'
import useClientShared from 'relay-shared/clients/hooks/useClientShared'
import useFile from 'relay-shared/files/hooks/useFile'
import { WorksheetItemType } from 'relay-shared/RelaySchema'
import { ClientWorksheetItemRendererProps } from './ClientWorksheetItemRendererProps'

export interface ClientWorksheetMessageProps
  extends ClientWorksheetItemRendererProps {
  item: WorksheetItemType<'image'>
}
export interface ClientWorksheetMessageRefHandle {}

export default compose()(function ClientWorksheetMessage(
  props: ClientWorksheetMessageProps
) {
  const { item, onResponse, worksheet, response } = props
  const { data } = item

  const [user] = useClientShared()
  const { url: uri, empty } = useFile(item.data.file)
  const [modalOpen, setModalOpen] = useState(false)

  if (empty) {
    return null
  }
  return (
    <Flex style={{ marginBottom: 10, borderRadius: 15, overflow: 'hidden' }}>
      <TouchableOpacity
        onPress={() => {
          setModalOpen(true)
        }}
      >
        <Image
          source={{ uri, height: 200 }}
          resizeMode="contain"
          style={{
            ...shadow(0, 2, 5, 0.15),
          }}
        />
      </TouchableOpacity>
      <ImageView
        images={[{ uri }]}
        imageIndex={0}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      />
    </Flex>
  )
})
