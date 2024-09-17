import { useEffect, useRef } from 'react'
import { Track } from 'twilio-video'

export const usePractitionerCallTrackConnector = (
  tracks: Track[],
  type: 'video' | 'audio'
) => {
  const ref = useRef<HTMLVideoElement | HTMLAudioElement>(null)
  useEffect(() => {
    if (ref.current) {
      const element = ref.current as HTMLVideoElement | HTMLAudioElement
      tracks.forEach((track) => {
        if (track.kind === type) {
          element.srcObject = new MediaStream([track.mediaStreamTrack ?? track])
        }
      })
    }
  }, [tracks?.length])

  return {
    ref,
  }
}
