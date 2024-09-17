import { produce } from 'immer';
import { scan, startWith, Subject } from 'rxjs';
import Video from 'twilio-video';
export const makePractitionerTwilioObservable = (opts) => {
    const { token, roomName } = opts;
    const parts = new Subject();
    const defaultValue = { room: undefined, participants: [] };
    const reduced = parts.pipe(scan((s, action) => produce(s, (draft) => {
        console.log(action);
        if (action.type === 'connected') {
            draft.participants.push(action.participant);
        }
        else if (action.type === 'disconnected') {
            draft.participants = draft.participants.filter((p) => p !== action.participant);
        }
        else if (action.type === 'setRoom') {
            draft.room = action.room;
        }
        else if (action.type === 'newtrack') {
            draft.participants = draft.participants.map((p) => {
                if (p === action.participant) {
                    if (!p.activeTracks) {
                        p.activeTracks = [];
                    }
                    p.activeTracks.push(action.track);
                }
                return p;
            });
        }
        else if (action.type === 'untrack') {
            const { track, participant } = action;
            draft.participants = draft.participants.map((p) => {
                if (p === participant) {
                    if (p.activeTracks) {
                        p.activeTracks = p.activeTracks.filter((t) => t !== track);
                    }
                }
                return p;
            });
        }
        return draft;
    }), defaultValue), startWith(defaultValue));
    function onTrackSubscribed(participant, track) {
        parts.next({ type: 'newtrack', participant, track });
    }
    function onTrackUnsubscribed(participant, track) {
        parts.next({ type: 'untrack', participant, track });
    }
    const participantConnected = (participant) => {
        parts.next({ type: 'connected', participant });
        participant.on('trackSubscribed', (track) => {
            onTrackSubscribed(participant, track);
        });
        participant.on('trackUnsubscribed', (track) => {
            onTrackUnsubscribed(participant, track);
        });
    };
    const participantDisconnected = (participant) => {
        parts.next({ type: 'disconnected', participant });
        participant.removeAllListeners();
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Video.connect(token, {
        name: roomName,
        region: 'us1',
    }).then((room) => {
        parts.next({ type: 'setRoom', room });
        room.localParticipant.on('trackSubscribed', (track) => {
            console.log('trackSubscribed', track);
            // onTrackSubscribed(room.localParticipant, track)
        });
        console.log(room.localParticipant.tracks);
        // room.localParticipant.on('trackUnsubscribed', (track) => {
        //   onTrackUnsubscribed(room.localParticipant, track)
        // })
        room.on('participantConnected', participantConnected);
        room.on('participantDisconnected', participantDisconnected);
        room.participants.forEach(participantConnected);
    });
    return reduced;
};
//# sourceMappingURL=makePractitionerTwilioObservable.js.map