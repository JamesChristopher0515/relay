"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EndlessAppointmentList_machine_1 = __importDefault(require("./EndlessAppointmentList.machine"));
describe('EndlessAppointmentList', () => {
    it('should return an empty list when there are no appointments', async () => {
        await EndlessAppointmentList_machine_1.default.transition('init', { startDate: new Date() });
    });
    it('should fetch more appointments when the user scrolls down', async () => {
        await EndlessAppointmentList_machine_1.default.transition('loadDirection', { direction: 1 });
    });
});
//# sourceMappingURL=EndlessAppointmentList.spec.js.map