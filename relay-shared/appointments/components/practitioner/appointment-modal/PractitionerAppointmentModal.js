import { Flex } from '@mtyk/frontend/core/components';
import { format } from 'date-fns';
import R from 'remeda';
import React from 'react';
import RelayCalendar from 'src/calendar/components/RelayCalendar';
import HeadedItems from 'src/core/components/HeadedItems';
import HorizontalSplit from 'src/layout/components/HorizontalSplit';
import idEq from 'src/models/helpers/idEq';
import { useMachine } from '../../../../machines/hooks/useMachine';
import endlessAppointmentList from '../../../machines/EndlessAppointmentList.machine';
import PracitionerAppointmentCalenderMachine from '../../../machines/PracitionerAppointmentCalender.machine';
import { AppointmentRowItem } from './AppointmentRowItem';
import { RelayAppointmentEditor } from './RelayAppointmentEditor';
export default function PractitionerAppointmentModal(props) {
    const {} = props;
    const modal = useMachine(PracitionerAppointmentCalenderMachine);
    const list = useMachine(endlessAppointmentList);
    const { items } = list.context;
    const { newAppointment, selectedDate, selectedEventId } = modal.context;
    const groupedByDay = R.pipe(items, R.groupBy((x) => format(x.time, 'do MMM')));
    const selectedAppointment = newAppointment ?? items.find((i) => idEq(i._id, selectedEventId));
    return (React.createElement(HorizontalSplit, null,
        Object.entries(groupedByDay).map(([day, appointments]) => {
            return (React.createElement(HeadedItems, { key: day, title: day }, appointments.map((appointment) => {
                return (React.createElement(AppointmentRowItem, { key: appointment._id, appointment: appointment }));
            })));
        }),
        React.createElement(Flex, null,
            selectedAppointment && (React.createElement(RelayAppointmentEditor, { appointment: selectedAppointment })),
            React.createElement(RelayCalendar, { selectedTimeRange: {
                    start: selectedDate,
                    end: selectedDate,
                }, value: selectedDate, onChange: (value) => {
                    modal.update({ ...modal.context, selectedDate: value.toDate() });
                } }))));
}
//# sourceMappingURL=PractitionerAppointmentModal.js.map