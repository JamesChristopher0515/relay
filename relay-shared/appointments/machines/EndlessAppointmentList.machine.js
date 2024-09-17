import { createMachine } from '@mtyk/machine';
import mReducer from '../../machines/helpers/machineReducer';
const endlessAppointmentList = createMachine({
    init: async (opts) => {
        const startDate = opts.startDate ?? new Date();
        return {
            startDate,
            items: [],
            loaded: { from: null, to: null },
            ...opts,
        };
    },
    loadDirection: async (opts, handle) => {
        return {};
    },
    loadEarlier: mReducer((ctx, opts, handle) => {
        return handle.transition('loadDirection', { direction: -1 });
    }),
    loadLater: mReducer((ctx, opts, handle) => {
        return handle.transition('loadDirection', { direction: 1 });
    }),
});
export default endlessAppointmentList;
//# sourceMappingURL=EndlessAppointmentList.machine.js.map