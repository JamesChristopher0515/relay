import { Flex } from '@mtyk/frontend/core/components';
import { times } from 'remeda';
import React from 'react';
import { Select } from './Select';
export default function TimeSelector(props) {
    const { time, onChange } = props;
    const onHourChange = (e) => {
        const hour = parseInt(e.target.value, 10);
        const date = new Date(time);
        date.setHours(hour);
        onChange(date);
    };
    const onMinuteChange = (e) => {
        const minute = parseInt(e.target.value, 10);
        const date = new Date(time);
        date.setMinutes(minute);
        onChange(date);
    };
    return (React.createElement(Flex, null,
        React.createElement(Select, { options: times(24, (i) => String(i).padStart(2, '0')), onChange: onHourChange, value: time.getHours().toString().padStart(2, '0') }),
        React.createElement(Select, { options: times(60, (i) => String(i).padStart(2, '0')), onChange: onMinuteChange, value: time.getHours().toString().padStart(2, '0') })));
}
//# sourceMappingURL=TimeSelector.js.map