import { IRelayAppointment } from '../types/IRelayAppointment';
export type UIAppointmentEdit = {
    time: Date;
    repeat?: string;
};
declare const machine: import("@mtyk/machine").IMachine<{
    init: (opts: {
        selectedDate: Date;
        selectedEventId?: string;
        editingAppointment?: IRelayAppointment;
        newAppointment?: boolean;
        edit: UIAppointmentEdit;
    }) => Promise<{
        selectedDate: Date;
        selectedEventId?: string | undefined;
        editingAppointment?: IRelayAppointment | undefined;
        newAppointment?: boolean | undefined;
        edit: UIAppointmentEdit;
        month: Date;
    }>;
    addAppointment: any;
    selectDate: any;
    updateEdit: any;
    selectAppointment: any;
    finishEditing: (_: any, handle: any) => Promise<any>;
    cancelAddAppointment: any;
}>;
export default machine;
//# sourceMappingURL=PracitionerAppointmentCalender.machine.d.ts.map