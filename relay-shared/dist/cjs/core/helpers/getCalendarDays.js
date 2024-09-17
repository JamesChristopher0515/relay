"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDaysInMonth = void 0;
const date_fns_1 = require("date-fns");
const lodash_1 = require("lodash");
function getAllDaysInMonth(month) {
    return (0, date_fns_1.eachDayOfInterval)({
        start: (0, date_fns_1.startOfMonth)(month),
        end: (0, date_fns_1.endOfMonth)(month),
    });
}
exports.getAllDaysInMonth = getAllDaysInMonth;
function getCalendarDays(month, filter) {
    function getDaysInMonthLocal(month) {
        return getAllDaysInMonth(month).filter(filter ?? (() => true));
    }
    const daysInMonth = getDaysInMonthLocal(month);
    const dayOfFirstInMonth = (0, date_fns_1.getDay)(daysInMonth[0]);
    if (dayOfFirstInMonth !== 1) {
        // If monday isn't the first day, gotta add some days to the beginning
        let daysToAdd = dayOfFirstInMonth - 1;
        if (daysToAdd === -1) {
            daysToAdd = 6;
        }
        const firstDay = daysInMonth[0];
        daysInMonth.unshift(...(0, lodash_1.times)(daysToAdd, i => {
            return (0, date_fns_1.add)(firstDay, { days: -(daysToAdd - i) });
        }));
    }
    const isToday = (day) => {
        return (0, date_fns_1.isSameDay)(day, new Date());
    };
    const isCurrentMonth = (day) => {
        return isWithinMonth(day, new Date());
    };
    const isWithinMonth = (day, month) => {
        return (0, date_fns_1.startOfMonth)(day).getTime() === (0, date_fns_1.startOfMonth)(month).getTime();
    };
    return {
        isToday,
        isCurrentMonth,
        isWithinMonth,
        daysInMonth,
    };
}
exports.default = getCalendarDays;
//# sourceMappingURL=getCalendarDays.js.map