import { Flex } from '@mtyk/frontend/core/components'
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import ReasonIcon from 'reasons/components/ReasonIcon'
import getReasonName from 'relay-shared/reasons/helpers/getReasonName'
import Images from '../Images/Images'
import Styles from './Styles'

export function renderReason(item: any, index: any, props: any) {
  const isSelected = props.isReasonSelected(item)
  const isCustom = props.getSelectedReason()?.name === 'custom'
  return (
    <>
      {item.name == 'custom' ? (
        <TouchableOpacity
          onPress={() => {
            if (isCustom) {
              props.setReason(null)
            } else {
              props.setReason({ name: 'custom', custom: '' })
            }
          }}
        >
          <Flex center>
            <Image
              source={Images.custom}
              style={[
                { ...makeSize(30), marginTop: 10, marginBottom: 15 },
                {
                  tintColor: isCustom ? 'black' : 'rgba(0, 0, 0, 0.4)',
                },
              ]}
            />
            <Text
              style={[
                Styles.emojiSecondItemText,
                { color: isCustom ? 'black' : 'rgba(0, 0, 0, 0.4)' },
              ]}
            >
              Other
            </Text>
          </Flex>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => props.setReason(item)}>
          <Flex center style={{ marginBottom: 20 }}>
            <ReasonIcon reason={item.name} style={{ ...makeSize(55) }} />
            <Text
              style={[
                Styles.emojiSecondItemText,
                {
                  color: isSelected ? 'black' : 'rgba(0, 0, 0, 0.4)',
                },
              ]}
            >
              {getReasonName(item)}
            </Text>
          </Flex>
        </TouchableOpacity>
      )}
    </>
  )
}
