import Video, { Participant as P, Track } from 'twilio-video';
export type EnahcnedParticipant = P & {
    activeTracks?: Track[];
};
export declare const makePractitionerTwilioObservable: (opts: {
    token: string;
    roomName: string;
}) => import("rxjs").Observable<{
    room?: Video.Room | undefined;
    participants: EnahcnedParticipant[];
}>;
//# sourceMappingURL=makePractitionerTwilioObservable.d.ts.map