import { add, startOfDay } from 'date-fns';
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks';
import { useEffect, useState } from 'react';
import useClientShared from '../../clients/hooks/useClientShared';
import makeController from '../../core/helpers/makeController';
import wrapArrayHook from '../../core/helpers/wrapArrayHook';
import useWrappedAxiosShared from '../../core/hooks/useWrappedAxiosShared';
import { useGetTodosQuery } from '../../frontend/api/hooks/useApi';
import OnboardingConversationManager from '../../conversations/OnboardingConversationManager';
export default makeController(function OnboardingController(props) {
    const {} = props;
    const today = startOfDay(new Date());
    const [client, { update }] = useClientShared();
    const tomorrow = add(today, { days: 1 });
    const history = useHistory();
    const wrappedAxios = useWrappedAxiosShared();
    const { data: todos, isLoading: todosLoading } = wrapArrayHook(useGetTodosQuery({
        client: client._id,
        assigned: {
            $gte: today.toISOString(),
            $lt: tomorrow.toISOString(),
        },
    }, {
        refetchOnMountOrArgChange: true,
    }));
    const [conversationManager, setConversationManager] = useState(null);
    useEffect(() => {
        if (!todosLoading) {
            if (todos.length) {
                const conversationManager = new OnboardingConversationManager(todos, wrappedAxios);
                setConversationManager(conversationManager);
                conversationManager.listen('is-finished', async (finished) => {
                    if (finished) {
                        await update({ onboardingComplete: true }).unwrap();
                        setTimeout(() => {
                            history.replace('/');
                        }, 2000);
                    }
                });
                conversationManager.start();
            }
            else {
                console.warn(`No todos found for ${client._id}`);
            }
        }
    }, [todosLoading]);
    return {
        conversationManager,
    };
});
//# sourceMappingURL=OnboardingController.js.map