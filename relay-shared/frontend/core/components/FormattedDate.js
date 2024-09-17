import { Txt } from '@mtyk/frontend/core/components';
import { add, format as formatFn, isSameYear, isSameDay, isSameWeek, isValid, } from 'date-fns';
import React from 'react';
const defaultFormat = 'MMM do yy';
export function safeFormat(formatStr, date, fallback = '') {
    try {
        if (date) {
            return formatFn(date, formatStr);
        }
        else {
            throw date;
        }
    }
    catch (e) {
        return fallback;
    }
}
export function getTimeTo(d) {
    const now = new Date();
    const diff = d.getTime() - now.getTime();
    const day = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const second = Math.floor((diff % (1000 * 60)) / 1000);
    const isNegative = diff < 0;
    // Find the largest non-zero value
    const largest = [{ day }, { hour }, { minute }, { second }].find((v) => {
        if (isNegative) {
            return Object.values(v)[0] < 0;
        }
        else {
            return Object.values(v)[0] > 0;
        }
    }) ?? { seconds: 0 };
    const plural = Math.abs(Object.values(largest)[0]) === 1 ? '' : 's';
    if (isNegative) {
        return `${Math.abs(Object.values(largest)[0])} ${Object.keys(largest)[0]}${plural} ago`;
    }
    else {
        return `in ${Math.abs(Object.values(largest)[0])} ${Object.keys(largest)[0]}${plural}`;
    }
}
export default function FormattedDate({ date: _date, format, children, prefix, suffix, showToday, keepCurrentYear, relative, ...rest }) {
    const date = new Date(children ?? _date);
    const isToday = isSameDay(new Date(), date);
    const isYesterday = isSameDay(add(new Date(), { days: -1 }), date);
    function getText() {
        if (!isValid(date)) {
            return '-';
        }
        if (relative) {
            return getTimeTo(date);
        }
        if (showToday) {
            if (isToday) {
                const fiveMinutesAgo = add(new Date(), { minutes: -5 });
                if (date.getTime() > fiveMinutesAgo.getTime()) {
                    return 'Just now';
                }
                return 'Today';
            }
            if (isYesterday) {
                return 'Yesterday';
            }
        }
        return formatFn(date, keepCurrentYear
            ? format ?? defaultFormat
            : omitYearForLast12Months(date, format ?? defaultFormat));
    }
    const text = getText();
    return (React.createElement(Txt, { ...rest },
        prefix,
        text,
        suffix));
}
export function omitYearForLast12Months(date, format) {
    const sameYear = isSameYear(new Date(), date);
    return sameYear ? format.replace(/\/?y+/, '').replace(',', '') : format;
}
export function formatDate(date, format, smartStuff = true) {
    if (isSameWeek(date, new Date(), { weekStartsOn: 1 })) {
        return `this ${formatFn(date, 'EEEE')}`;
    }
    else if (isSameWeek(date, add(new Date(), { weeks: -1 }))) {
        return `last ${formatFn(date, 'EEEE')}`;
    }
    return smartStuff
        ? formatFn(date, omitYearForLast12Months(date, format))
        : formatFn(date, format);
}
//# sourceMappingURL=FormattedDate.js.map