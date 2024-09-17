import React, { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { TwilioVideo, TwilioVideoLocalView, TwilioVideoParticipantView, } from 'react-native-twilio-video-webrtc';
const ClientVideoCall = (props) => {
    const { roomName, token } = props;
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [status, setStatus] = useState('disconnected');
    const [videoTracks, setVideoTracks] = useState(new Map());
    const twilioRef = useRef(null);
    useEffect(() => {
        twilioRef.current?.connect({ accessToken: token });
    }, [roomName, token]);
    const _onEndButtonPress = () => {
        twilioRef.current?.disconnect();
    };
    const _onMuteButtonPress = () => {
        twilioRef.current
            ?.setLocalAudioEnabled(!isAudioEnabled)
            .then((isEnabled) => setIsAudioEnabled(isEnabled));
    };
    const _onFlipButtonPress = () => {
        twilioRef.current?.flipCamera();
    };
    const _onRoomDidConnect = (obj) => {
        if (obj) {
            console.log('onRoomDidConnect: ', obj?.roomName);
            setStatus('connected');
        }
    };
    const _onRoomDidDisconnect = ({ roomName, error }) => {
        console.log('[Disconnect]ERROR: ', error);
        setStatus('disconnected');
    };
    const _onRoomDidFailToConnect = (error) => {
        console.log('[FailToConnect]ERROR: ', error);
        setStatus('disconnected');
    };
    const _onParticipantAddedVideoTrack = ({ participant, track, }) => {
        console.log('onParticipantAddedVideoTrack: ', participant, track);
        setVideoTracks(new Map([
            ...videoTracks,
            [
                track.trackSid,
                { participantSid: participant.sid, videoTrackSid: track.trackSid },
            ],
        ]));
    };
    const _onParticipantRemovedVideoTrack = ({ participant, track, }) => {
        console.log('onParticipantRemovedVideoTrack: ', participant, track);
        const videoTracksLocal = videoTracks;
        videoTracksLocal.delete(track.trackSid);
        setVideoTracks(videoTracksLocal);
    };
    return (React.createElement(View, { style: {} },
        (status === 'connected' || status === 'connecting') && (React.createElement(View, null,
            status === 'connected' && (React.createElement(View, null, Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                return (React.createElement(TwilioVideoParticipantView, { style: {}, key: trackSid, trackIdentifier: trackIdentifier }));
            }))),
            React.createElement(View, { style: {} },
                React.createElement(TouchableOpacity, { onPress: _onEndButtonPress },
                    React.createElement(Text, { style: { fontSize: 12 } }, "End")),
                React.createElement(TouchableOpacity, { onPress: _onMuteButtonPress },
                    React.createElement(Text, { style: { fontSize: 12 } }, isAudioEnabled ? 'Mute' : 'Unmute')),
                React.createElement(TouchableOpacity, { onPress: _onFlipButtonPress },
                    React.createElement(Text, { style: { fontSize: 12 } }, "Flip")),
                React.createElement(TwilioVideoLocalView, { enabled: true, style: {} })))),
        React.createElement(TwilioVideo, { ref: twilioRef, onRoomDidConnect: _onRoomDidConnect, onRoomDidDisconnect: _onRoomDidDisconnect, onRoomDidFailToConnect: _onRoomDidFailToConnect, onParticipantAddedVideoTrack: _onParticipantAddedVideoTrack, onParticipantRemovedVideoTrack: _onParticipantRemovedVideoTrack })));
};
export default ClientVideoCall;
//# sourceMappingURL=ClientVideoCall.js.map