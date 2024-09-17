export interface EntriesControllerProps {
}
declare const _default: {
    (props: {
        Renderer: import("react").ComponentType<{}>;
    }): JSX.Element;
    use: (props: EntriesControllerProps) => {
        checkInToday: any;
        loadMore: () => void;
        months: Date[];
        getInfoForDay: (day: Date) => {
            checkInsForDay: any[];
            latestCheckIn: any;
            hasCheckIn: number;
            hasMultipleCheckIns: boolean;
            hasJournalEntry: boolean;
            hasFeeling: boolean;
            feeling: any;
        };
        getInfoForMonth: (month: Date) => {
            entries: any[];
            formattedMonth: string;
            formattedYear: string;
            month: Date;
        };
    };
};
export default _default;
//# sourceMappingURL=EntriesController.d.ts.map