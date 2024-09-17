import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {
  RoomErrorEventCb,
  RoomEventCb,
  TrackEventCb,
  TwilioVideo,
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
} from 'react-native-twilio-video-webrtc'

const ClientVideoCall = (props: { roomName: string; token: string }) => {
  const { roomName, token } = props
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [status, setStatus] = useState('disconnected')
  const [videoTracks, setVideoTracks] = useState(new Map())
  const twilioRef = useRef<TwilioVideo>(null)

  useEffect(() => {
    twilioRef.current?.connect({ accessToken: token })
  }, [roomName, token])

  const _onEndButtonPress = () => {
    twilioRef.current?.disconnect()
  }

  const _onMuteButtonPress = () => {
    twilioRef.current
      ?.setLocalAudioEnabled(!isAudioEnabled)
      .then((isEnabled) => setIsAudioEnabled(isEnabled))
  }

  const _onFlipButtonPress = () => {
    twilioRef.current?.flipCamera()
  }

  const _onRoomDidConnect: RoomEventCb = (obj) => {
    if (obj) {
      console.log('onRoomDidConnect: ', obj?.roomName)
      setStatus('connected')
    }
  }

  const _onRoomDidDisconnect: RoomErrorEventCb = ({ roomName, error }) => {
    console.log('[Disconnect]ERROR: ', error)

    setStatus('disconnected')
  }

  const _onRoomDidFailToConnect: RoomErrorEventCb = (error) => {
    console.log('[FailToConnect]ERROR: ', error)

    setStatus('disconnected')
  }

  const _onParticipantAddedVideoTrack: TrackEventCb = ({
    participant,
    track,
  }) => {
    console.log('onParticipantAddedVideoTrack: ', participant, track)

    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ])
    )
  }

  const _onParticipantRemovedVideoTrack: TrackEventCb = ({
    participant,
    track,
  }) => {
    console.log('onParticipantRemovedVideoTrack: ', participant, track)

    const videoTracksLocal = videoTracks
    videoTracksLocal.delete(track.trackSid)

    setVideoTracks(videoTracksLocal)
  }

  return (
    <View style={{}}>
      {(status === 'connected' || status === 'connecting') && (
        <View>
          {status === 'connected' && (
            <View>
              {Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                return (
                  <TwilioVideoParticipantView
                    style={{}}
                    key={trackSid}
                    trackIdentifier={trackIdentifier}
                  />
                )
              })}
            </View>
          )}
          <View style={{}}>
            <TouchableOpacity onPress={_onEndButtonPress}>
              <Text style={{ fontSize: 12 }}>End</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_onMuteButtonPress}>
              <Text style={{ fontSize: 12 }}>
                {isAudioEnabled ? 'Mute' : 'Unmute'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={_onFlipButtonPress}>
              <Text style={{ fontSize: 12 }}>Flip</Text>
            </TouchableOpacity>
            <TwilioVideoLocalView enabled={true} style={{}} />
          </View>
        </View>
      )}

      <TwilioVideo
        ref={twilioRef}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={_onRoomDidDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
      />
    </View>
  )
}

export default ClientVideoCall
