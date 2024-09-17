import makeController from '@mtyk/frontend/controllers/helpers/makeController';
import useEventToState from '../helpers/useEventToState';
export default makeController(function ConversationController(props) {
    const { conversationManager } = props;
    const [isFinished] = useEventToState(conversationManager, 'is-finished', undefined, false);
    const [isLoading] = useEventToState(conversationManager, 'is-loading', undefined, true);
    const [items] = useEventToState(conversationManager, 'conversation-changed', undefined, []);
    return {
        conversationManager,
        isLoading,
        items,
        isFinished,
    };
});
//# sourceMappingURL=ConversationController.js.map