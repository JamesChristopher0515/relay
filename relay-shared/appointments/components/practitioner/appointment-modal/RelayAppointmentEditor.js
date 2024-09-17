import { Flex } from '@mtyk/frontend/core/components';
import { clone } from 'remeda';
import React, { useState } from 'react';
import RelayTextButton from 'src/core/components/RelayTextButton';
import FormattedDate from 'src/frontend/core/components/FormattedDate';
import { useMachine } from '../../machines/hooks/useMachine';
import PracitionerAppointmentCalenderMachine from '../machines/PracitionerAppointmentCalender.machine';
import TimeSelector from './TimeSelector';
export function RelayAppointmentEditor(props) {
    const { appointment } = props;
    const modal = useMachine(PracitionerAppointmentCalenderMachine);
    const [edit, setEdit] = useState(clone(appointment));
    return (React.createElement(Flex, { center: true },
        React.createElement(FormattedDate, { date: appointment.time, format: "do MMM" }),
        React.createElement(TimeSelector, { time: appointment.time, onChange: (e) => {
                setEdit({
                    ...edit,
                    time: e,
                });
            } }),
        React.createElement(RelayTextButton, { action: async () => {
                await modal.transition('finishEditing', {
                    edit,
                });
            } }, "Save")));
}
//# sourceMappingURL=RelayAppointmentEditor.js.map