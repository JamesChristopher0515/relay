"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const machine_1 = require("@mtyk/machine");
const machine = (0, machine_1.createMachine)({
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
exports.default = machine;
//# sourceMappingURL=VideoCallMachine.js.map