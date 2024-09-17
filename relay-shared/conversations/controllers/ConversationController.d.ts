import RelayConversationManager from '../RelayConversationManager';
export interface ConversationControllerProps {
    conversationManager: RelayConversationManager<any>;
}
declare const _default: {
    (props: {
        Renderer: import("react").ComponentType<{}>;
    }): JSX.Element;
    use: (props: ConversationControllerProps) => {
        conversationManager: RelayConversationManager<any>;
        isLoading: boolean | undefined;
        items: never[] | undefined;
        isFinished: boolean | undefined;
    };
};
export default _default;
//# sourceMappingURL=ConversationController.d.ts.map