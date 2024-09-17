declare const emotions: readonly [{
    readonly name: "grateful";
    readonly valence: 1;
}, {
    readonly name: "happy";
    readonly valence: 1;
}, {
    readonly name: "excited";
    readonly valence: 1;
}, {
    readonly name: "proud";
    readonly valence: 1;
}, {
    readonly name: "energized";
    readonly valence: 1;
}, {
    readonly name: "motivated";
    readonly valence: 1;
}, {
    readonly name: "loving";
    readonly valence: 1;
}, {
    readonly name: "content";
    readonly valence: 1;
}, {
    readonly name: "relaxed";
    readonly valence: 0.8;
}, {
    readonly name: "stressed";
    readonly valence: 0.6;
}, {
    readonly name: "tired";
    readonly valence: 0.5;
}, {
    readonly name: "not sure";
    readonly valence: 0.5;
}, {
    readonly name: "down";
    readonly valence: 0.4;
}, {
    readonly name: "anxious";
    readonly valence: 0.4;
}, {
    readonly name: "annoyed";
    readonly valence: 0.4;
}, {
    readonly name: "unmotivated";
    readonly valence: 0.4;
}, {
    readonly name: "worried";
    readonly valence: 0.4;
}, {
    readonly name: "angry";
    readonly valence: 0.2;
}, {
    readonly name: "hopeless";
    readonly valence: 0.2;
}, {
    readonly name: "exhausted";
    readonly valence: 0.2;
}, {
    readonly name: "panicked";
    readonly valence: 0.4;
}, {
    readonly name: "frustrated";
    readonly valence: 0.4;
}, {
    readonly name: "sad";
    readonly valence: 0.2;
}, {
    readonly name: "bad";
    readonly valence: 0;
}, {
    readonly name: "not great";
    readonly valence: 0.2;
}, {
    readonly name: "ok";
    readonly valence: 0.6;
}, {
    readonly name: "good";
    readonly valence: 0.8;
}, {
    readonly name: "great";
    readonly valence: 1;
}];
export declare function getSimpleFeelings(): ({
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
})[];
export declare function getFeelingColor(feeling: RelayFeeling): "#DEB6B6" | "#E1C7B0" | "#E4E0CA" | "#B3E1D6" | "#AFE5BF";
export type FeelingNames = typeof emotions[number]['name'];
export interface RelayFeeling {
    name: FeelingNames;
    isSimple?: boolean;
    valence: number;
}
export type FeelingSelection = {
    name: FeelingNames;
};
export default function getAllFeelings(): RelayFeeling[];
export declare function getFeelingsAverage(feelings: FeelingSelection[]): {
    valence: number;
    arousal: number;
} | {
    valence: number;
    arousal: FeelingSelection | undefined;
};
export declare const commaAnd: (strs: string[]) => string;
export declare function getFeelingName(feeling: RelayFeeling): string;
export declare function getFeelingDescription(feelings: FeelingSelection[], includeEmoji?: boolean): string;
export declare function getFeelingByName(name: string): RelayFeeling | undefined;
export {};
//# sourceMappingURL=getAllFeelings.d.ts.map