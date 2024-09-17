"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.omitYearForLast12Months = exports.getTimeTo = exports.safeFormat = void 0;
const components_1 = require("@mtyk/frontend/core/components");
const date_fns_1 = require("date-fns");
const react_1 = __importDefault(require("react"));
const defaultFormat = 'MMM do yy';
function safeFormat(formatStr, date, fallback = '') {
    try {
        if (date) {
            return (0, date_fns_1.format)(date, formatStr);
        }
        else {
            throw date;
        }
    }
    catch (e) {
        return fallback;
    }
}
exports.safeFormat = safeFormat;
function getTimeTo(d) {
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
exports.getTimeTo = getTimeTo;
function FormattedDate({ date: _date, format, children, prefix, suffix, showToday, keepCurrentYear, relative, ...rest }) {
    const date = new Date(children ?? _date);
    const isToday = (0, date_fns_1.isSameDay)(new Date(), date);
    const isYesterday = (0, date_fns_1.isSameDay)((0, date_fns_1.add)(new Date(), { days: -1 }), date);
    function getText() {
        if (!(0, date_fns_1.isValid)(date)) {
            return '-';
        }
        if (relative) {
            return getTimeTo(date);
        }
        if (showToday) {
            if (isToday) {
                const fiveMinutesAgo = (0, date_fns_1.add)(new Date(), { minutes: -5 });
                if (date.getTime() > fiveMinutesAgo.getTime()) {
                    return 'Just now';
                }
                return 'Today';
            }
            if (isYesterday) {
                return 'Yesterday';
            }
        }
        return (0, date_fns_1.format)(date, keepCurrentYear
            ? format ?? defaultFormat
            : omitYearForLast12Months(date, format ?? defaultFormat));
    }
    const text = getText();
    return (react_1.default.createElement(components_1.Txt, { ...rest },
        prefix,
        text,
        suffix));
}
exports.default = FormattedDate;
function omitYearForLast12Months(date, format) {
    const sameYear = (0, date_fns_1.isSameYear)(new Date(), date);
    return sameYear ? format.replace(/\/?y+/, '').replace(',', '') : format;
}
exports.omitYearForLast12Months = omitYearForLast12Months;
function formatDate(date, format, smartStuff = true) {
    if ((0, date_fns_1.isSameWeek)(date, new Date(), { weekStartsOn: 1 })) {
        return `this ${(0, date_fns_1.format)(date, 'EEEE')}`;
    }
    else if ((0, date_fns_1.isSameWeek)(date, (0, date_fns_1.add)(new Date(), { weeks: -1 }))) {
        return `last ${(0, date_fns_1.format)(date, 'EEEE')}`;
    }
    return smartStuff
        ? (0, date_fns_1.format)(date, omitYearForLast12Months(date, format))
        : (0, date_fns_1.format)(date, format);
}
exports.formatDate = formatDate;
//# sourceMappingURL=FormattedDate.js.map