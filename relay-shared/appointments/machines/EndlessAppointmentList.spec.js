import endlessAppointmentList from './EndlessAppointmentList.machine';
describe('EndlessAppointmentList', () => {
    it('should return an empty list when there are no appointments', async () => {
        await endlessAppointmentList.transition('init', { startDate: new Date() });
    });
    it('should fetch more appointments when the user scrolls down', async () => {
        await endlessAppointmentList.transition('loadDirection', { direction: 1 });
    });
});
//# sourceMappingURL=EndlessAppointmentList.spec.js.map