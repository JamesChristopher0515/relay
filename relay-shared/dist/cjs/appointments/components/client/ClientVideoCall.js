"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_twilio_video_webrtc_1 = require("react-native-twilio-video-webrtc");
const ClientVideoCall = (props) => {
    const { roomName, token } = props;
    const [isAudioEnabled, setIsAudioEnabled] = (0, react_1.useState)(true);
    const [status, setStatus] = (0, react_1.useState)('disconnected');
    const [videoTracks, setVideoTracks] = (0, react_1.useState)(new Map());
    const twilioRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
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
    return (react_1.default.createElement(react_native_1.View, { style: {} },
        (status === 'connected' || status === 'connecting') && (react_1.default.createElement(react_native_1.View, null,
            status === 'connected' && (react_1.default.createElement(react_native_1.View, null, Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                return (react_1.default.createElement(react_native_twilio_video_webrtc_1.TwilioVideoParticipantView, { style: {}, key: trackSid, trackIdentifier: trackIdentifier }));
            }))),
            react_1.default.createElement(react_native_1.View, { style: {} },
                react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: _onEndButtonPress },
                    react_1.default.createElement(react_native_1.Text, { style: { fontSize: 12 } }, "End")),
                react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: _onMuteButtonPress },
                    react_1.default.createElement(react_native_1.Text, { style: { fontSize: 12 } }, isAudioEnabled ? 'Mute' : 'Unmute')),
                react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: _onFlipButtonPress },
                    react_1.default.createElement(react_native_1.Text, { style: { fontSize: 12 } }, "Flip")),
                react_1.default.createElement(react_native_twilio_video_webrtc_1.TwilioVideoLocalView, { enabled: true, style: {} })))),
        react_1.default.createElement(react_native_twilio_video_webrtc_1.TwilioVideo, { ref: twilioRef, onRoomDidConnect: _onRoomDidConnect, onRoomDidDisconnect: _onRoomDidDisconnect, onRoomDidFailToConnect: _onRoomDidFailToConnect, onParticipantAddedVideoTrack: _onParticipantAddedVideoTrack, onParticipantRemovedVideoTrack: _onParticipantRemovedVideoTrack })));
};
exports.default = ClientVideoCall;
//# sourceMappingURL=ClientVideoCall.js.map