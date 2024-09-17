import MediaPlayerContext from 'content/contexts/MediaPlayerContext'
import { AVPlaybackStatus } from 'expo-av'
import { useContext, useEffect } from 'react'

export default function useMediaPlayer(
  statusListener?: (status: AVPlaybackStatus) => void
) {
  const context = useContext(MediaPlayerContext)

  useEffect(() => {
    if (statusListener) {
      return context.addStatusListener(statusListener)
    }
  }, [statusListener])

  return context
}
