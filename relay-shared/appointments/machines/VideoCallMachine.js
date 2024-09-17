import { createMachine } from '@mtyk/machine';
const machine = createMachine({
    got_token: async (opts) => {
        const { axios, appointmentId } = opts;
        const { data: { token, roomName }, } = await axios.get('/appointments/token', {
            params: {
                appointment: appointmentId,
            },
        });
        return {
            token,
            roomName,
        };
    },
});
export default machine;
//# sourceMappingURL=VideoCallMachine.js.map