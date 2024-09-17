import { useClient } from 'core/hooks/useUser';
import { useWrappedAxios } from 'core/hooks/useWrappedAxios';
import { add, startOfDay } from 'date-fns';
import { useEffect, useState } from 'react';
import makeController from '@mtyk/frontend/controllers/helpers/makeController';
import wrapArrayHook from '../../core/helpers/wrapArrayHook';
import { useGetTodosQuery } from '../../frontend/api/hooks/useApi';
import OnboardingConversationManager from '../OnboardingConversationManager';
export default makeController(function OnboardingController(props) {
    const { } = props;
    const today = startOfDay(new Date());
    const tomorrow = add(today, { days: 1 });
    const [user] = useClient();
    const wrappedAxios = useWrappedAxios();
    const { data: todos, isLoading } = wrapArrayHook(useGetTodosQuery({
        client: user._id,
        assigned: {
            $gte: today.toISOString(),
            $lt: tomorrow.toISOString(),
        },
    }, {
        refetchOnMountOrArgChange: true,
    }));



    const [conversationManager, setConversationManager] = useState(null);
    useEffect(() => {
        if (!isLoading) {
            const assignedResources = todos.map((todo) => todo.resource);
            const conversation = new OnboardingConversationManager(assignedResources, wrappedAxios);
            setConversationManager(conversation);
        }
    }, [isLoading]);

    return {
        conversationManager,
    };
});
//# sourceMappingURL=OnboardingController.js.map