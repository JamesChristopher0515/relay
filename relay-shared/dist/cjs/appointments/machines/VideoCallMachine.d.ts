export type UIAppointmentEdit = {
    time: Date;
    repeat?: string;
};
declare const machine: import("@mtyk/machine").IMachine<{
    got_token: (opts: {
        appointmentId: string;
        axios: any;
    }) => Promise<{
        token: any;
        roomName: any;
    }>;
}>;
export default machine;
//# sourceMappingURL=VideoCallMachine.d.ts.map