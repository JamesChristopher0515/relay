import { Flex } from '@mtyk/frontend/core/components';
import React from 'react';
import RelayRowItem from 'src/core/components/RelayRowItem';
import FormattedDate from 'src/frontend/core/components/FormattedDate';
export function AppointmentRowItem(props) {
    const { appointment } = props;
    return (React.createElement(Flex, null,
        React.createElement(RelayRowItem, null,
            "Video Appointment",
            React.createElement(Flex, { between: true },
                React.createElement(FormattedDate, { date: appointment.time, format: "do MMM" }),
                React.createElement(FormattedDate, { date: appointment.time, format: "HH:mm" })))));
}
//# sourceMappingURL=AppointmentRowItem.js.map