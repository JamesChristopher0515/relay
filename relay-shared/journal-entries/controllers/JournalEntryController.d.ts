export type JournalEntryOrCheckIn = {
    journeyEntry: string;
} | {
    checkIn: string;
};
declare const _default: {
    (props: {
        Renderer: import("react").ComponentType<{}>;
    }): JSX.Element;
    use: (props: JournalEntryOrCheckIn) => any;
};
export default _default;
//# sourceMappingURL=JournalEntryController.d.ts.map