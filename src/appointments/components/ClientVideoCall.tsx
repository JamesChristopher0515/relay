import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import VideoCallTimer from 'relay-shared/appointments/components/VideoCallTimer'

import { useRouter } from '@mtyk/frontend/core/hooks/routerHooks'
import React, { useEffect, useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import ContextMenu from 'react-native-context-menu-view'
import {
  RoomErrorEventCb,
  RoomEventCb,
  TrackEventCb,
  TwilioVideo,
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
} from 'react-native-twilio-video-webrtc'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'

const CallIcon = ({ onPress, ...iconProps }: any) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon {...iconProps} color="white" size={25} />
    </TouchableOpacity>
  )
}

const ClientVideoCall = (props: {
  appointmentId: string
  roomName: string
  token: string
}) => {
  const { roomName, token, appointmentId } = props
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const router = useRouter()
  const [isVideoEnabled, setIsVideoEnabled] = useState(true)

  const [setStatus] = useState('disconnected')
  const [videoTracks, setVideoTracks] = useState(new Map())
  const twilioRef = useRef<TwilioVideo>(null)

  useEffect(() => {
    try {
      twilioRef.current?.connect({
        accessToken: token,
        enableVideo: isVideoEnabled,
        enableAudio: isAudioEnabled,
        roomName,
        cameraType: 'front',
      })
    } catch (e) {
      console.error(e)
    }
  }, [roomName, token])

  const _onEndButtonPress = () => {
    twilioRef.current?.disconnect()
  }

  const _onMuteButtonPress = async () => {
    await twilioRef.current
      ?.setLocalAudioEnabled(!isAudioEnabled)
      .then((isEnabled) => setIsAudioEnabled(isEnabled))
  }

  const onVideoButtonPress = async () => {
    await twilioRef.current
      ?.setLocalVideoEnabled(!isVideoEnabled)
      .then((isEnabled) => setIsVideoEnabled(isEnabled))
  }

  const _onFlipButtonPress = () => {
    twilioRef.current?.flipCamera()
  }

  const _onRoomDidConnect: RoomEventCb = (obj) => {
    // if (obj) {
    //   console.log('onRoomDidConnect: ', obj?.roomName)
    //   setStatus('connected')
    // }
  }

  const onRoomDisconnect: RoomErrorEventCb = ({ roomName, error }) => {
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
  const menuOptions = [
    {
      title: 'Exit',
      action: () => {
        _onEndButtonPress()
        router.replace('/')
      },
    },
  ]

  const videotracks = Array.from(videoTracks)

  return (
    <Flex
      style={{
        backgroundColor: '#2C2C2C',
      }}
      grow
      gap={10}
      padding={[50, 30]}
    >
      <Flex justifyContent="flex-end" row>
        <ContextMenu
          actions={menuOptions}
          onPress={(e) => {
            menuOptions[e.nativeEvent.index].action()
          }}
          dropdownMenuMode
        >
          <Txt color="white">Options</Txt>
        </ContextMenu>
      </Flex>

      <Flex center grow>
        {videotracks.length === 0 ? (
          <Txt style={{ color: 'white', opacity: 0.25 }} size={13}>
            Waiting for your practitioner to join...
          </Txt>
        ) : (
          Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
            return (
              <TwilioVideoParticipantView
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: '100%',
                }}
                scaleType="fit"
                key={trackSid}
                trackIdentifier={trackIdentifier}
              />
            )
          })
        )}
      </Flex>
      <TwilioVideo
        ref={twilioRef}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={onRoomDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
      />
      <Flex rc between>
        <CallIcon
          icon={isAudioEnabled ? RelayIcons.micOn : RelayIcons.micOff}
          onPress={_onMuteButtonPress}
        />
        <Flex grow />
        <Flex rc>
          <CallIcon
            icon={isVideoEnabled ? RelayIcons.cameraOn : RelayIcons.cameraOff}
            onPress={onVideoButtonPress}
          />
          <Flex style={{ width: 20 }} />
          <CallIcon icon={RelayIcons.cameraFlip} onPress={_onFlipButtonPress} />
        </Flex>
      </Flex>
      <VideoCallTimer
        appointmentId={appointmentId}
        style={{
          position: 'absolute',
          top: 17,
          left: 3,
        }}
      />

      <TwilioVideoLocalView
        enabled={true}
        scaleType="fit"
        style={{
          position: 'absolute',
          top: 17,
          left: 3,
          width: 120,
          height: 120,
        }}
      />
    </Flex>
  )
}

export default ClientVideoCall
