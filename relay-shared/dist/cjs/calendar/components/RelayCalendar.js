"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const components_1 = require("@mtyk/frontend/core/components");
const useInputAdapter_1 = __importDefault(require("@mtyk/frontend/forms/hooks/useInputAdapter"));
const strings_1 = require("@mtyk/frontend/strings");
const styleObjects_1 = require("@mtyk/frontend/styles/helpers/styleObjects");
const HoverableThing_1 = __importDefault(require("@mtyk/frontend/tooltips/components/HoverableThing"));
const date_fns_1 = require("date-fns");
const dayjs_1 = __importDefault(require("dayjs"));
const lodash_1 = require("lodash");
const react_1 = __importStar(require("react"));
const RelayIconButton_1 = __importDefault(require("../../core/components/RelayIconButton"));
const FormattedDate_1 = __importDefault(require("../../frontend/core/components/FormattedDate"));
const RelayIcons_1 = __importDefault(require("../../frontend/icons/RelayIcons"));
const Ratioed_1 = __importDefault(require("./Ratioed"));
function RelayCalendar(props) {
    const { onChange, dayProps, dayStyles, selectedTimeRange, style, ...rest } = props;
    const selectedMonth = (0, useInputAdapter_1.default)((0, dayjs_1.default)().startOf('month'));
    const selectedDay = (0, useInputAdapter_1.default)((0, dayjs_1.default)().startOf('day'));
    (0, react_1.useEffect)(() => {
        if (selectedTimeRange?.end) {
            if (!(0, date_fns_1.isSameDay)(selectedTimeRange.end, selectedDay.value.toDate())) {
                selectedDay.onChange((0, dayjs_1.default)(selectedTimeRange.end).startOf('day'));
                selectedMonth.onChange((0, dayjs_1.default)(selectedTimeRange.end).startOf('month'));
            }
        }
        else {
            if (!(0, date_fns_1.isSameDay)(selectedDay.value.toDate(), new Date())) {
                selectedDay.onChange((0, dayjs_1.default)().startOf('day'));
                selectedMonth.onChange((0, dayjs_1.default)().startOf('month'));
            }
        }
    }, [selectedTimeRange?.end, selectedDay]);
    /** Includes some days outside beginning and end */
    const daysToShowForMonth = (0, react_1.useMemo)(() => {
        const countDaysInMonth = selectedMonth.value.daysInMonth();
        const firstDayOfMonth = (0, dayjs_1.default)(selectedMonth.value).startOf('month');
        const daysInMonth = (0, lodash_1.times)(countDaysInMonth, (i) => {
            return firstDayOfMonth.clone().add(i, 'days');
        });
        const dayOfFirstInMonth = daysInMonth[0].day();
        if (dayOfFirstInMonth !== 1) {
            // If monday isn't the first day, gotta add some days to the beginning
            let daysToAdd = dayOfFirstInMonth - 1;
            if (daysToAdd === -1) {
                daysToAdd = 6;
            }
            const firstDay = daysInMonth[0];
            // console.log({ dayOfFirstInMonth, daysToAdd, firstDay })
            daysInMonth.unshift(...(0, lodash_1.times)(daysToAdd, (i) => {
                // console.log({ i })
                return firstDay.clone().subtract(daysToAdd - i, 'days');
            }));
        }
        return daysInMonth;
    }, [selectedMonth.value]);
    const selectDay = (day) => {
        if (!day.isSame(selectedMonth.value, 'month')) {
            selectedMonth.onChange(day.clone().startOf('month'));
        }
        selectedDay.onChange(day);
        if (!day.isSame(selectedDay.value.startOf('day'))) {
            onChange(day);
        }
    };
    const isSelected = (day) => {
        return day.isSame(selectedDay.value);
    };
    const isToday = (day) => {
        return day.isSame((0, dayjs_1.default)(), 'day');
    };
    const isCurrentMonth = (day) => {
        return day.isSame(selectedMonth.value, 'month');
    };
    const selectedMonthIsCurrent = (0, date_fns_1.isSameMonth)(selectedMonth.value.toDate(), new Date());
    const iconProps = {
        color: `rgb(100, 99, 99)`,
    };
    return (react_1.default.createElement(components_1.Flex, { ...rest, gap: '.7em', style: { height: '24em', width: '88%', ...style } },
        props.hideMonth ? null : (react_1.default.createElement(components_1.Flex, { rowCenter: true, between: true },
            react_1.default.createElement(components_1.Txt, { color: 'rgb(100, 99, 99)', semibold: true, size: '.9em' },
                react_1.default.createElement(components_1.Flex, { rowCenter: true },
                    react_1.default.createElement(FormattedDate_1.default, { format: "MMMM yyyy" }, selectedMonth.value.toDate()))),
            react_1.default.createElement(components_1.Flex, { rowCenter: true },
                selectedMonthIsCurrent ? null : (react_1.default.createElement(RelayIconButton_1.default, { iconProps: iconProps, style: {
                        backgroundColor: 'transparent',
                        transform: `scale(.84)`,
                    }, label: "Back to today", icon: RelayIcons_1.default.clockRotateLeft, action: () => {
                        selectDay((0, dayjs_1.default)());
                    } })),
                react_1.default.createElement(RelayIconButton_1.default, { iconProps: iconProps, label: "Previous Month", style: {
                        backgroundColor: 'transparent',
                        transform: `scale(.84)`,
                    }, icon: free_solid_svg_icons_1.faCaretLeft, action: () => {
                        selectedMonth.onChange(selectedMonth.value.clone().subtract(1, 'month'));
                    } }),
                react_1.default.createElement(RelayIconButton_1.default, { label: "Next Month", style: {
                        backgroundColor: 'transparent',
                        transform: `scale(.84)`,
                    }, iconProps: iconProps, icon: free_solid_svg_icons_1.faCaretRight, action: () => {
                        selectedMonth.onChange(selectedMonth.value.clone().add(1, 'month'));
                    } })))),
        react_1.default.createElement("div", { className: "CalendarDaysWrap", css: `
          width: 110%;
          position: relative;
          left: -10px;
          margin: 0 auto;
        ` },
            react_1.default.createElement(components_1.Flex, { row: true, style: {
                    width: '100%',
                    padding: '0 1.15em',
                    fontSize: '.95em',
                    position: 'relative',
                    left: '-.3em',
                    justifyContent: 'space-between',
                    fontWeight: 600,
                    marginBottom: '1em',
                    color: 'rgb(100, 99, 99)',
                    opacity: 0.8,
                } },
                react_1.default.createElement(components_1.Txt, null, "MON"),
                react_1.default.createElement(components_1.Txt, null, "TUE"),
                react_1.default.createElement(components_1.Txt, null, "WED"),
                react_1.default.createElement(components_1.Txt, null, "THU"),
                react_1.default.createElement(components_1.Txt, null, "FRI"),
                react_1.default.createElement(components_1.Txt, null, "SAT"),
                react_1.default.createElement(components_1.Txt, null, "SUN")),
            daysToShowForMonth.map((day) => {
                const selected = isSelected(day);
                const inTimeRange = selectedTimeRange &&
                    (0, date_fns_1.isWithinInterval)(day.toDate(), selectedTimeRange);
                const isInFuture = (0, date_fns_1.isAfter)(day.toDate(), new Date());
                const currMonth = isCurrentMonth(day);
                const isInPast = day.toDate().getTime() < new Date().getTime();
                const isToday = (0, date_fns_1.isSameDay)(new Date(), day.toDate());
                const disabled = (isInFuture && props.disableFuture) ||
                    (isInPast && props.disablePast);
                const size = 1 / 7;
                return (react_1.default.createElement(HoverableThing_1.default, { tooltip: "Double-click to create appointment" },
                    react_1.default.createElement(Ratioed_1.default, { component: components_1.Flex, key: day.toString(), className: "CalendarDay", center: true, onClick: () => {
                            if (!disabled) {
                                selectDay(day);
                            }
                        }, css: disabled
                            ? `
                    cursor: not-allowed;
                  `
                            : `
                &:hover {
                  transform: scale(1.1);
                }
              `, ...dayProps, style: {
                            float: 'left',
                            margin: '-0.28em auto',
                            userSelect: 'none',
                            cursor: disabled ? 'default' : 'pointer',
                            width: (0, strings_1.percentage)(size),
                            borderRadius: '1000px',
                            textAlign: 'center',
                            opacity: disabled ? 0.5 : selected || currMonth ? 1 : 0.5,
                            ...dayStyles,
                        } },
                        react_1.default.createElement("div", { style: {
                                position: 'absolute',
                                ...(0, styleObjects_1.makeSize)('2.5em'),
                                borderRadius: '1000px',
                                transition: 'background .2s',
                                backgroundColor: selected
                                    ? '#dee9f2'
                                    : isToday
                                        ? '#e9ded8'
                                        : 'transparent',
                            } }),
                        react_1.default.createElement(components_1.Txt, { semibold: selected || inTimeRange, color: selected ? '#76818C' : isToday ? '#866453' : '#76818C', size: '.85em', style: { position: 'relative' } }, day.date()))));
            }))));
}
exports.default = RelayCalendar;
//# sourceMappingURL=RelayCalendar.js.map