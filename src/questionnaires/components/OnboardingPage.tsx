import CheckInHeader from "check-in/components/CheckInLayout";
import { Flex, Txt } from "@mtyk/frontend/core/components";
import React, { useEffect, useState } from "react";
import ConversationView from "conversations/ConversationView";
import RelayConversation from "conversations/RelayConversation";
import useLogout from "relay-shared/frontend/api/hooks/useLogout";
import RelayIcons from "relay-shared/frontend/icons/RelayIcons";
import OnboardingController from "onboarding/controllers/OnboardingController";

export default function OnboardingPage() {
  const controller = OnboardingController.use({});
  const { conversationManager } = controller;
  const [logout] = useLogout();
  const [currentConversation, setCurrentConversation] = useState<RelayConversation<any> | undefined>(undefined);
  useEffect(() => {
    conversationManager?.listen("conversation-changed", () => {
      setCurrentConversation(conversationManager.currentConversation);
    });
  }, [conversationManager]);

  console.log({ conversationManager });

  const headerProps = {
    MotivationConversation: {
      titleIcon: RelayIcons.motivation,
      title: "Motivation",
      titleProps: { color: "#584546" },
      titleIconProps: { color: "#584546" },
    },
    WellbeingConversation: {
      titleIcon: RelayIcons.wellbeing,
      title: "Wellbeing",
      titleProps: { color: "#DEABAB" },
      titleIconProps: { color: "#DEABAB" },
    },
  }[currentConversation?.constructor.name ?? ""] ?? {
    titleIcon: RelayIcons.puzzlePiece,
    title: "Get Started",
    titleProps: { color: "#584546" },
    titleIconProps: { color: "#DEABAB" },
  };

  return (
    <CheckInHeader
      {...headerProps}
      menuOptions={[
        {
          title: "Start again",
          action: () => {
            controller.conversationManager?.reset();
            controller.conversationManager?.start();
          },
        },
        {
          title: "Logout",
          action: () => {
            logout();
          },
        },
      ]}
    >
      <Flex center style={{ height: "100%", flex: 1 }} grow>
        {conversationManager ? <ConversationView conversationManager={conversationManager} /> : <Txt>Loading...</Txt>}
      </Flex>
    </CheckInHeader>
  );
}
