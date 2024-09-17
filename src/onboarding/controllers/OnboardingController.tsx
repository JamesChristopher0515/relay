import ConversationController from "conversations/controllers/ConversationController";
import { add, startOfDay } from "date-fns";
import { useHistory } from "@mtyk/frontend/core/hooks/routerHooks";
import { useEffect, useState } from "react";
import useClientShared from "relay-shared/clients/hooks/useClientShared";
import makeController from "@mtyk/frontend/controllers/helpers/makeController";
import wrapArrayHook from "relay-shared/core/helpers/wrapArrayHook";
import useWrappedAxiosShared from "relay-shared/core/hooks/useWrappedAxiosShared";
import { useGetTodosQuery } from "relay-shared/frontend/api/hooks/useApi";
import OnboardingConversationManager from "../../conversations/OnboardingConversationManager";

export interface OnboardingControllerProps {}

export default makeController(function OnboardingController(props: OnboardingControllerProps) {
  const {} = props;
  const today = startOfDay(new Date());
  const [client, { update }] = useClientShared();
  const tomorrow = add(today, { days: 1 });
  const history = useHistory();
  const wrappedAxios = useWrappedAxiosShared();
  const { data: todos, isLoading: todosLoading } = wrapArrayHook(
    useGetTodosQuery(
      {
        client: client._id,
        assigned: {
          $lt: tomorrow.toISOString() as any,
        },
      },
      {
        refetchOnMountOrArgChange: true,
      }
    )
  );

  const [conversationManager, setConversationManager] = useState<OnboardingConversationManager | undefined>(undefined);
  const conversationController = ConversationController.use({
    conversationManager,
  });

  useEffect(() => {
    if (!todosLoading) {
      if (todos.length) {
        const incompleteTodos = todos.filter((t) => !t.complete && t.questionnaire);
        const conversationManager = new OnboardingConversationManager(incompleteTodos, wrappedAxios);
        setConversationManager(conversationManager);
        conversationManager.listen("is-finished", async (finished) => {
          if (finished) {
            await update({ onboardingComplete: true }).unwrap();
            setTimeout(() => {
              history.replace("/?settingsOpen=true");
            }, 2000);
          }
        });
        conversationManager.start();
      } else {
        console.warn(`No todos found for ${client._id}`);
      }
    }
  }, [todosLoading]);

  return {
    conversationManager,
    conversationController,
  };
});
