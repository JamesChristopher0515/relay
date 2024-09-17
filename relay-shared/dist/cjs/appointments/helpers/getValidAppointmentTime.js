"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAppointmentValid = void 0;
const date_fns_1 = require("date-fns");
function getValidAppointmentTime(appointment) {
    const date = new Date(appointment.date);
    return {
        start: (0, date_fns_1.add)(date, { minutes: -15 }),
        end: (0, date_fns_1.add)(date, { minutes: 60 }),
    };
}
exports.default = getValidAppointmentTime;
function isAppointmentValid(appointment) {
    if (appointment.endedAt)
        return false;
    const interval = getValidAppointmentTime(appointment);
    const now = new Date();
    return (0, date_fns_1.isWithinInterval)(now, interval);
}
exports.isAppointmentValid = isAppointmentValid;
//# sourceMappingURL=getValidAppointmentTime.js.map