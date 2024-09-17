import React from 'react'
import { Image } from 'react-native'

export default function RelayLogo({ ...rest }) {
  return (
    <Image
      source={require('assets/images/logo.png')}
      width={1227}
      height={305}
      resizeMode="contain"
      {...rest}
      style={{ alignSelf: 'center', height: 25, ...rest.style }}
    />
  )
}
