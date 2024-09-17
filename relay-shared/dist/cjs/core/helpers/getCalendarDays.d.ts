export declare function getAllDaysInMonth(month: Date): Date[];
export default function getCalendarDays(month: Date, filter?: (day: Date) => boolean): {
    isToday: (day: Date) => boolean;
    isCurrentMonth: (day: Date) => boolean;
    isWithinMonth: (day: Date, month: Date) => boolean;
    daysInMonth: Date[];
};
//# sourceMappingURL=getCalendarDays.d.ts.map