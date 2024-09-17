import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Flex, Txt } from '@mtyk/frontend/core/components';
import useInputAdapter from '@mtyk/frontend/forms/hooks/useInputAdapter';
import { percentage } from '@mtyk/frontend/strings';
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects';
import HoverableThing from '@mtyk/frontend/tooltips/components/HoverableThing';
import { isAfter, isSameDay, isSameMonth, isWithinInterval } from 'date-fns';
import dayjs from 'dayjs';
import { times } from 'lodash';
import React, { useEffect, useMemo } from 'react';
import RelayIconButton from '../../core/components/RelayIconButton';
import FormattedDate from '../../frontend/core/components/FormattedDate';
import RelayIcons from '../../frontend/icons/RelayIcons';
import Ratioed from './Ratioed';
export default function RelayCalendar(props) {
    const { onChange, dayProps, dayStyles, selectedTimeRange, style, ...rest } = props;
    const selectedMonth = useInputAdapter(dayjs().startOf('month'));
    const selectedDay = useInputAdapter(dayjs().startOf('day'));
    useEffect(() => {
        if (selectedTimeRange?.end) {
            if (!isSameDay(selectedTimeRange.end, selectedDay.value.toDate())) {
                selectedDay.onChange(dayjs(selectedTimeRange.end).startOf('day'));
                selectedMonth.onChange(dayjs(selectedTimeRange.end).startOf('month'));
            }
        }
        else {
            if (!isSameDay(selectedDay.value.toDate(), new Date())) {
                selectedDay.onChange(dayjs().startOf('day'));
                selectedMonth.onChange(dayjs().startOf('month'));
            }
        }
    }, [selectedTimeRange?.end, selectedDay]);
    /** Includes some days outside beginning and end */
    const daysToShowForMonth = useMemo(() => {
        const countDaysInMonth = selectedMonth.value.daysInMonth();
        const firstDayOfMonth = dayjs(selectedMonth.value).startOf('month');
        const daysInMonth = times(countDaysInMonth, (i) => {
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
            daysInMonth.unshift(...times(daysToAdd, (i) => {
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
        return day.isSame(dayjs(), 'day');
    };
    const isCurrentMonth = (day) => {
        return day.isSame(selectedMonth.value, 'month');
    };
    const selectedMonthIsCurrent = isSameMonth(selectedMonth.value.toDate(), new Date());
    const iconProps = {
        color: `rgb(100, 99, 99)`,
    };
    return (React.createElement(Flex, { ...rest, gap: '.7em', style: { height: '24em', width: '88%', ...style } },
        props.hideMonth ? null : (React.createElement(Flex, { rowCenter: true, between: true },
            React.createElement(Txt, { color: 'rgb(100, 99, 99)', semibold: true, size: '.9em' },
                React.createElement(Flex, { rowCenter: true },
                    React.createElement(FormattedDate, { format: "MMMM yyyy" }, selectedMonth.value.toDate()))),
            React.createElement(Flex, { rowCenter: true },
                selectedMonthIsCurrent ? null : (React.createElement(RelayIconButton, { iconProps: iconProps, style: {
                        backgroundColor: 'transparent',
                        transform: `scale(.84)`,
                    }, label: "Back to today", icon: RelayIcons.clockRotateLeft, action: () => {
                        selectDay(dayjs());
                    } })),
                React.createElement(RelayIconButton, { iconProps: iconProps, label: "Previous Month", style: {
                        backgroundColor: 'transparent',
                        transform: `scale(.84)`,
                    }, icon: faCaretLeft, action: () => {
                        selectedMonth.onChange(selectedMonth.value.clone().subtract(1, 'month'));
                    } }),
                React.createElement(RelayIconButton, { label: "Next Month", style: {
                        backgroundColor: 'transparent',
                        transform: `scale(.84)`,
                    }, iconProps: iconProps, icon: faCaretRight, action: () => {
                        selectedMonth.onChange(selectedMonth.value.clone().add(1, 'month'));
                    } })))),
        React.createElement("div", { className: "CalendarDaysWrap", css: `
          width: 110%;
          position: relative;
          left: -10px;
          margin: 0 auto;
        ` },
            React.createElement(Flex, { row: true, style: {
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
                React.createElement(Txt, null, "MON"),
                React.createElement(Txt, null, "TUE"),
                React.createElement(Txt, null, "WED"),
                React.createElement(Txt, null, "THU"),
                React.createElement(Txt, null, "FRI"),
                React.createElement(Txt, null, "SAT"),
                React.createElement(Txt, null, "SUN")),
            daysToShowForMonth.map((day) => {
                const selected = isSelected(day);
                const inTimeRange = selectedTimeRange &&
                    isWithinInterval(day.toDate(), selectedTimeRange);
                const isInFuture = isAfter(day.toDate(), new Date());
                const currMonth = isCurrentMonth(day);
                const isInPast = day.toDate().getTime() < new Date().getTime();
                const isToday = isSameDay(new Date(), day.toDate());
                const disabled = (isInFuture && props.disableFuture) ||
                    (isInPast && props.disablePast);
                const size = 1 / 7;
                return (React.createElement(HoverableThing, { tooltip: "Double-click to create appointment" },
                    React.createElement(Ratioed, { component: Flex, key: day.toString(), className: "CalendarDay", center: true, onClick: () => {
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
                            width: percentage(size),
                            borderRadius: '1000px',
                            textAlign: 'center',
                            opacity: disabled ? 0.5 : selected || currMonth ? 1 : 0.5,
                            ...dayStyles,
                        } },
                        React.createElement("div", { style: {
                                position: 'absolute',
                                ...makeSize('2.5em'),
                                borderRadius: '1000px',
                                transition: 'background .2s',
                                backgroundColor: selected
                                    ? '#dee9f2'
                                    : isToday
                                        ? '#e9ded8'
                                        : 'transparent',
                            } }),
                        React.createElement(Txt, { semibold: selected || inTimeRange, color: selected ? '#76818C' : isToday ? '#866453' : '#76818C', size: '.85em', style: { position: 'relative' } }, day.date()))));
            }))));
}
//# sourceMappingURL=RelayCalendar.js.map