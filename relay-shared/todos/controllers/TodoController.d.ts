import { ClientTodo } from '../../RelayTypes';
declare const _default: {
    (props: {
        Renderer: import("react").ComponentType<{}>;
    }): JSX.Element;
    use: ({ todo: _todo, useAssignedResourceOpener, todoDoc, poll, }: {
        useAssignedResourceOpener?: any;
        todo: string;
        poll?: boolean | undefined;
        /**
         * @deprecated Should only use for the special "check-in" todo on native, but
         *   we need to find a less confusing way of doing this
         */
        todoDoc?: ClientTodo & any;
    }) => {
        complete: (complete: boolean) => Promise<void>;
        action: () => Promise<any>;
        isComplete: any;
        isQuestionnaire: import("../../RelayTypes").Questionnaire | undefined;
        isWorksheet: string | undefined;
        isContent: import("../../RelayTypes").Content | undefined;
        isBasic: boolean;
        isAppointment: import("../../appointments/types/IRelayAppointment").IRelayAppointment;
        todo: ClientTodo & {
            onClick: any;
        };
    };
};
export default _default;
//# sourceMappingURL=TodoController.d.ts.map