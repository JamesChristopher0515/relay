import React from 'react';
import { usePractitionerCallTrackConnector } from '../../../hooks/practitioner/usePractitionerCallTrackConnector';
export const PractitionerVideoCallParticipant = ({ participant, isLocal, }) => {
    const video = usePractitionerCallTrackConnector(participant.activeTracks ??
        Array.from(participant.tracks.values()).map((t) => t.track), 'video');
    const audio = usePractitionerCallTrackConnector(participant.activeTracks ??
        Array.from(participant.tracks.values()).map((t) => t.track), 'audio');
    console.log({ participant });
    return (React.createElement("div", { className: "participant" },
        React.createElement("h3", null, participant.identity),
        React.createElement("video", { ...video, autoPlay: true }),
        isLocal ? null : React.createElement("audio", { ...audio, autoPlay: true, muted: true })));
};
//# sourceMappingURL=PractitionerVideoCallParticipant.js.map