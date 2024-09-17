import { AVPlaybackStatus } from 'expo-av'
import React from 'react'
import { AssignedResource } from 'relay-shared/RelayTypes'

export interface MediaPlayerContextType {
  loadResource: (resource?: AssignedResource, opts?: any) => void
  resource?: AssignedResource
  isPlaying: boolean
  isFinished: boolean
  togglePlay: () => void
  latestStatus: { current?: AVPlaybackStatus }
  position: { current: number }
  setPosition: (ms: number) => void
  addStatusListener: (
    listener: (status: AVPlaybackStatus) => void
  ) => () => void
}

const MediaPlayerContext = React.createContext<MediaPlayerContextType>({
  isPlaying: false,
  isFinished: false,
  position: { current: 0 },
  addStatusListener: () => () => {},
  loadResource: (uri) => {},
  setPosition: (ms: number) => {},
  togglePlay: () => {},
  latestStatus: { current: undefined },
})
export default MediaPlayerContext
