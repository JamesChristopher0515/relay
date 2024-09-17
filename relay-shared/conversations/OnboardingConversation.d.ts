import { WrappedAxios } from 'core/hooks/useWrappedAxios';
import { Todo } from '../RelayTypes';
import RelayConversationManager from './RelayConversationManager';
export default class OnboardingConversationManager extends RelayConversationManager<any> {
    readonly assignedQuestionnaireTodos: Todo[];
    constructor(assignedQuestionnaireTodos: Todo[], axios: WrappedAxios);
}
//# sourceMappingURL=OnboardingConversation.d.ts.map