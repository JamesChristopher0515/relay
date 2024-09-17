import {
  Audio,
  AVPlaybackStatus,
  InterruptionModeAndroid,
  InterruptionModeIOS,
} from 'expo-av'

import React, { useEffect, useRef, useState } from 'react'
import { unstable_batchedUpdates } from 'react-native'
import { AssignedResource } from 'relay-shared/RelayTypes'
import MediaPlayerContext, {
  MediaPlayerContextType,
} from '../contexts/MediaPlayerContext'

function getResourceUri(resource: AssignedResource) {
  const { download, view } = resource.links ?? resource.content.links ?? {}
  return download ?? view ?? ''
}

Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  staysActiveInBackground: true,
  interruptionModeIOS: InterruptionModeIOS.DoNotMix,
  interruptionModeAndroid: InterruptionModeAndroid.DoNotMix, // do not mix
  shouldDuckAndroid: false,
})

let nextListenerId = 0

export default function MediaPlayerContextProvider({ children }) {
  const [sound, setSound] = useState<Audio.Sound | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFinished, setIsFinished] = useState(false)
  const [resource, setResource] = useState<AssignedResource | undefined>()
  const latestStatus = useRef<AVPlaybackStatus | undefined>()
  const currPos = useRef<number>(0)
  const listeners = useRef<
    { fn: (status: AVPlaybackStatus) => void; id: number }[]
  >([])
  const togglePlay = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync()
        setIsPlaying(false)
      } else {
        if (isFinished) {
          await sound.setPositionAsync(0)
        }
        await sound.playAsync()
        setIsPlaying(true)
      }
    }
  }

  const setPosition = async (ms: number) => {
    // console.log(ms)
    // console.log('trying to set position')
    sound?.playFromPositionAsync(Math.round(ms))
  }

  const loadResource = async ({
    positionMillis,
    ...resource
  }: AssignedResource & { positionMillis }) => {
    console.log(`Load resource called`)
    if (sound) {
      await sound.unloadAsync()
    }

    const source = { uri: getResourceUri(resource) }
    console.log(`trying to load source: ${source.uri}`)
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(source, {
        positionMillis,
      })

      setSound(newSound)
      console.log('loaded sound')
      newSound.setOnPlaybackStatusUpdate((status) => {
        listeners.current.forEach((listener) => {
          listener.fn(status)
        })
        latestStatus.current = status

        // Need to update our own playing status if the audio finishes
        setIsPlaying(!!status.isPlaying)

        currPos.current = status.positionMillis ?? 0
        setIsFinished(
          typeof status.positionMillis === 'number' &&
            Math.abs(status.positionMillis - status.durationMillis) < 1000
        )
      })
      await newSound.setProgressUpdateIntervalAsync(250)
      await newSound.playAsync()
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          // console.log('Unloading Sound')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  const providerValue: MediaPlayerContextType = {
    loadResource: async (newresource?: AssignedResource, opts?) => {
      console.log(`Load resource called`)
      if (!newresource) {
        await sound?.unloadAsync()
        unstable_batchedUpdates(() => {
          setIsPlaying(false)
          setIsFinished(false)
          setResource(undefined)
          setSound(null)
        })
      } else {
        if (
          newresource._id &&
          resource?._id &&
          resource?._id === newresource._id
        ) {
          // same resource, don't reset
          return
        }
        unstable_batchedUpdates(() => {
          setIsPlaying(false)
          loadResource({ ...newresource, ...opts })
          // console.log('setting resource', resource.title)
          setResource(newresource)
        })
      }
    },
    addStatusListener: (listener) => {
      const id = ++nextListenerId
      // console.log(`Added listener ${id}`)
      listeners.current.push({ id, fn: listener })
      // console.log(`Listeners`, listeners.current)
      return () => {
        // console.log(`Removed listener ${id}`)
        listeners.current = listeners.current.filter((l) => l.id === id)
      }
    },
    togglePlay,
    latestStatus,
    position: currPos,
    isPlaying,
    isFinished,
    setPosition,
    resource,
  }

  return (
    <MediaPlayerContext.Provider value={providerValue}>
      {children}
    </MediaPlayerContext.Provider>
  )
}
