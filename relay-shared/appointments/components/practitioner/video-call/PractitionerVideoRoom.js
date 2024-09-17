import React, { useMemo } from 'react';
import { useObservable } from 'react-use';
import { makePractitionerTwilioObservable } from '../../helpers/makePractitionerTwilioObservable';
import { PractitionerVideoCallParticipant } from './PractitionerVideoCallParticipant';
const PractitionerVideoRoom = ({ roomName, token, }) => {
    const observable = useMemo(() => makePractitionerTwilioObservable({ roomName, token }), [roomName, token]);
    const { participants, room } = useObservable(observable, {
        participants: [],
        room: undefined,
    });
    const remoteParticipants = participants.map((participant) => (React.createElement(PractitionerVideoCallParticipant, { key: participant.sid, participant: participant })));
    return (React.createElement("div", { className: "room" },
        React.createElement("h2", null,
            "Room: ",
            roomName),
        React.createElement("div", { className: "local-participant" }, room ? (React.createElement(React.Fragment, null,
            React.createElement("h3", null, "Local Participant"),
            React.createElement(PractitionerVideoCallParticipant, { isLocal: true, key: room.localParticipant.sid, participant: room.localParticipant }))) : ('')),
        React.createElement("h3", null, "Remote Participants"),
        React.createElement("div", { className: "remote-participants" }, remoteParticipants)));
};
export default PractitionerVideoRoom;
//# sourceMappingURL=PractitionerVideoRoom.js.map