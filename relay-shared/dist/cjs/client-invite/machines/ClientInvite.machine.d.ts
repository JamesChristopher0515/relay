export type UIAppointmentEdit = {
    time: Date;
    repeat?: string;
};
declare const ClientInviteMachine: import("@bbuild/machine2/StateMachineTransitions").StateMachine<unknown, "onAppReady" | "onEnterPassword" | "onLogin" | "inviteSent" | "onSubmitEmail" | "onSetLoggedInWithTokens" | "onContinueWithUser" | "onContinueWithEmail" | "onContinueWithVerifyToken" | "onSetPassword" | "onLoginScreen", {}>;
export default ClientInviteMachine;
//# sourceMappingURL=ClientInvite.machine.d.ts.map