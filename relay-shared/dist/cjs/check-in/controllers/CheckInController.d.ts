/// <reference types="react" />
import { RelayFeeling } from '../../feelings/helpers/getAllFeelings';
declare const _default: {
    (props: {
        Renderer: import("react").ComponentType<{}>;
    }): JSX.Element;
    use: () => {
        updateNewJournalEntry: any;
        updateNewCheckIn: any;
        newJournalEntryDoc: any;
        newCheckInDoc: any;
        greeting: string;
        finish: string;
        secondGreeting: string;
        feelings: RelayFeeling[];
        initialFeeling: {
            readonly name: "grateful";
            readonly valence: 1;
        } | {
            readonly name: "happy";
            readonly valence: 1;
        } | {
            readonly name: "excited";
            readonly valence: 1;
        } | {
            readonly name: "proud";
            readonly valence: 1;
        } | {
            readonly name: "energized";
            readonly valence: 1;
        } | {
            readonly name: "motivated";
            readonly valence: 1;
        } | {
            readonly name: "loving";
            readonly valence: 1;
        } | {
            readonly name: "content";
            readonly valence: 1;
        } | {
            readonly name: "relaxed";
            readonly valence: 0.8;
        } | {
            readonly name: "stressed";
            readonly valence: 0.6;
        } | {
            readonly name: "tired";
            readonly valence: 0.5;
        } | {
            readonly name: "not sure";
            readonly valence: 0.5;
        } | {
            readonly name: "down";
            readonly valence: 0.4;
        } | {
            readonly name: "anxious";
            readonly valence: 0.4;
        } | {
            readonly name: "annoyed";
            readonly valence: 0.4;
        } | {
            readonly name: "unmotivated";
            readonly valence: 0.4;
        } | {
            readonly name: "worried";
            readonly valence: 0.4;
        } | {
            readonly name: "angry";
            readonly valence: 0.2;
        } | {
            readonly name: "hopeless";
            readonly valence: 0.2;
        } | {
            readonly name: "exhausted";
            readonly valence: 0.2;
        } | {
            readonly name: "panicked";
            readonly valence: 0.4;
        } | {
            readonly name: "frustrated";
            readonly valence: 0.4;
        } | {
            readonly name: "sad";
            readonly valence: 0.2;
        } | {
            readonly name: "bad";
            readonly valence: 0;
        } | {
            readonly name: "not great";
            readonly valence: 0.2;
        } | {
            readonly name: "ok";
            readonly valence: 0.6;
        } | {
            readonly name: "good";
            readonly valence: 0.8;
        } | {
            readonly name: "great";
            readonly valence: 1;
        };
        reset: () => void;
        setInitialFeeling: import("react").Dispatch<import("react").SetStateAction<{
            readonly name: "grateful";
            readonly valence: 1;
        } | {
            readonly name: "happy";
            readonly valence: 1;
        } | {
            readonly name: "excited";
            readonly valence: 1;
        } | {
            readonly name: "proud";
            readonly valence: 1;
        } | {
            readonly name: "energized";
            readonly valence: 1;
        } | {
            readonly name: "motivated";
            readonly valence: 1;
        } | {
            readonly name: "loving";
            readonly valence: 1;
        } | {
            readonly name: "content";
            readonly valence: 1;
        } | {
            readonly name: "relaxed";
            readonly valence: 0.8;
        } | {
            readonly name: "stressed";
            readonly valence: 0.6;
        } | {
            readonly name: "tired";
            readonly valence: 0.5;
        } | {
            readonly name: "not sure";
            readonly valence: 0.5;
        } | {
            readonly name: "down";
            readonly valence: 0.4;
        } | {
            readonly name: "anxious";
            readonly valence: 0.4;
        } | {
            readonly name: "annoyed";
            readonly valence: 0.4;
        } | {
            readonly name: "unmotivated";
            readonly valence: 0.4;
        } | {
            readonly name: "worried";
            readonly valence: 0.4;
        } | {
            readonly name: "angry";
            readonly valence: 0.2;
        } | {
            readonly name: "hopeless";
            readonly valence: 0.2;
        } | {
            readonly name: "exhausted";
            readonly valence: 0.2;
        } | {
            readonly name: "panicked";
            readonly valence: 0.4;
        } | {
            readonly name: "frustrated";
            readonly valence: 0.4;
        } | {
            readonly name: "sad";
            readonly valence: 0.2;
        } | {
            readonly name: "bad";
            readonly valence: 0;
        } | {
            readonly name: "not great";
            readonly valence: 0.2;
        } | {
            readonly name: "ok";
            readonly valence: 0.6;
        } | {
            readonly name: "good";
            readonly valence: 0.8;
        } | {
            readonly name: "great";
            readonly valence: 1;
        }>>;
        reasons: {
            name: string;
        }[];
        isFeelingSelected: (feeling: RelayFeeling) => any;
        isReasonSelected: (reason: any) => any;
        getSelectedFeeling: () => any;
        getSelectedReason: () => any;
        setFeeling: (feeling: RelayFeeling) => void;
        setReason: (reason: any) => void;
        setCustomReason: (reason: string) => void;
    };
};
export default _default;
//# sourceMappingURL=CheckInController.d.ts.map