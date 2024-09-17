import { AVPlaybackStatus } from 'expo-av'
import { isObjectLike } from '@mtyk/frontend/types/helpers/isX'

export default function isHelpfulAudioStatus(
  status?: AVPlaybackStatus
): status is {
  isLoaded: true
  androidImplementation?: string
  uri: string
  progressUpdateIntervalMillis: number
  durationMillis?: number
  positionMillis: number
  playableDurationMillis?: number
  seekMillisToleranceBefore?: number
  seekMillisToleranceAfter?: number
  shouldPlay: boolean
  isPlaying: boolean
  isBuffering: boolean
  rate: number
  shouldCorrectPitch: boolean
  volume: number
  isMuted: boolean
  isLooping: boolean
  didJustFinish: boolean
} {
  return isObjectLike(status) && 'durationMillis' in status
}
