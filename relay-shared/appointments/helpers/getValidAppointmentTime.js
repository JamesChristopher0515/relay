import { add, isWithinInterval } from 'date-fns';
export default function getValidAppointmentTime(appointment) {
    const date = new Date(appointment.date);
    return {
        start: add(date, { minutes: -15 }),
        end: add(date, { minutes: 60 }),
    };
}
export function isAppointmentValid(appointment) {
    if (appointment.endedAt)
        return false;
    const interval = getValidAppointmentTime(appointment);
    const now = new Date();
    return isWithinInterval(now, interval);
}
//# sourceMappingURL=getValidAppointmentTime.js.map