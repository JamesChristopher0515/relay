import React from 'react'
import { TextInput, View } from 'react-native'
import { unifyStyles } from '@mtyk/frontend/react/helpers/unifyStyle'
import { border } from '@mtyk/frontend/styles/helpers/styleObjects'

function LabelledField({ label, name, ...rest }) {
  return (
    <TextInput
      autoCorrect={false}
      autoCapitalize={'none'}
      placeholder={label}
      placeholderTextColor="#444"
      secureTextEntry={name.toLowerCase().indexOf('password') >= 0}
      {...rest}
      style={[
        ...unifyStyles(
          {
            fontFamily: 'Manrope_400Regular',
            ...border(1, '#D2D2D2'),
            paddingVertical: 8,
            backgroundColor: 'white',
            paddingHorizontal: 15,
            borderRadius: 8,
            fontSize: 15,
          },
          rest.style
        ),
      ]}
    />
  )
}

export default LabelledField
