import FeelingIcon from 'feelings/components/FeelingIcon'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import nativeProps from '@mtyk/frontend/react/nativeProps'
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects'
import React from 'react'
import { TouchableOpacity } from 'react-native'

export function renderFeeling(feeling: any, index: any, props) {
  return (
    <>
      <TouchableOpacity
        onPress={() => props.setFeeling(feeling)}
        style={{ width: '25%', marginBottom: 10 }}
      >
        <Flex center gap={5}>
          <FeelingIcon
            feeling={feeling.name}
            style={{
              ...makeSize(30),
              borderRadius: 1000,
            }}
          />
          <Txt
            {...nativeProps({ adjustsFontSizeToFit: true })}
            numberOfLines={1}
            medium
            style={[
              {
                marginTop: 5,
                color: props.isFeelingSelected(feeling)
                  ? 'black'
                  : 'rgba(0, 0, 0, 0.4)',
              },
            ]}
          >
            {feeling.name}
          </Txt>
        </Flex>
      </TouchableOpacity>
    </>
  )
}
