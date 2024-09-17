import { add, eachDayOfInterval, endOfMonth, getDay, isSameDay, startOfMonth, } from 'date-fns';
import { times } from 'lodash';
export function getAllDaysInMonth(month) {
    return eachDayOfInterval({
        start: startOfMonth(month),
        end: endOfMonth(month),
    });
}
export default function getCalendarDays(month, filter) {
    function getDaysInMonthLocal(month) {
        return getAllDaysInMonth(month).filter(filter ?? (() => true));
    }
    const daysInMonth = getDaysInMonthLocal(month);
    const dayOfFirstInMonth = getDay(daysInMonth[0]);
    if (dayOfFirstInMonth !== 1) {
        // If monday isn't the first day, gotta add some days to the beginning
        let daysToAdd = dayOfFirstInMonth - 1;
        if (daysToAdd === -1) {
            daysToAdd = 6;
        }
        const firstDay = daysInMonth[0];
        daysInMonth.unshift(...times(daysToAdd, i => {
            return add(firstDay, { days: -(daysToAdd - i) });
        }));
    }
    const isToday = (day) => {
        return isSameDay(day, new Date());
    };
    const isCurrentMonth = (day) => {
        return isWithinMonth(day, new Date());
    };
    const isWithinMonth = (day, month) => {
        return startOfMonth(day).getTime() === startOfMonth(month).getTime();
    };
    return {
        isToday,
        isCurrentMonth,
        isWithinMonth,
        daysInMonth,
    };
}
//# sourceMappingURL=getCalendarDays.js.map