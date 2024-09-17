import { IRelayAppointment } from '../types/IRelayAppointment';
declare const endlessAppointmentList: import("@mtyk/machine").IMachine<{
    init: (opts: {
        startDate?: Date;
    }) => Promise<{
        startDate: Date;
        items: IRelayAppointment[];
        loaded: {
            from: null;
            to: null;
        };
    }>;
    loadDirection: (opts: {
        direction: 1 | -1;
    }, handle: import("@mtyk/machine").TransitionHandle<any, string | number | symbol>) => Promise<{}>;
    loadEarlier: any;
    loadLater: any;
}>;
export default endlessAppointmentList;
//# sourceMappingURL=EndlessAppointmentList.machine.d.ts.map