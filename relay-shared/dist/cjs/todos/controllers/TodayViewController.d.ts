import { Todo } from '../../RelayTypes';
declare const _default: {
    (props: {
        Renderer: import("react").ComponentType<{}>;
    }): JSX.Element;
    use: ({ day, noPoll, }: {
        day?: Date | undefined;
        noPoll?: boolean | undefined;
    }) => {
        todos: Todo[];
        assignedJourney: Todo[];
        todosByType: (Todo | {
            group: "content" | "questionnaire" | "appointment" | "generic";
            items: Todo[];
        })[];
        message: string;
        title: string;
        completeFraction: number;
        completeCount: any;
        isLoading: any;
    };
};
export default _default;
//# sourceMappingURL=TodayViewController.d.ts.map