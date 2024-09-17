"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const machine_1 = require("@mtyk/machine");
const date_fns_1 = require("date-fns");
const lodash_1 = require("lodash");
const newId_1 = __importDefault(require("../../core/helpers/newId"));
const machineReducer_1 = __importDefault(require("../../machines/helpers/machineReducer"));
const machine = (0, machine_1.createMachine)({
    init: async (opts) => {
        const month = (0, date_fns_1.startOfMonth)(opts.selectedDate);
        return {
            month,
            ...opts,
        };
    },
    addAppointment: (0, machineReducer_1.default)((ctx, _) => ({
        ...ctx,
        editingAppointment: {
            _id: (0, newId_1.default)(),
            date: (0, date_fns_1.add)(ctx.selectedDate, { hours: 15 }),
        },
        selectedEventId: null,
        newAppointment: true,
    })),
    selectDate: (0, machineReducer_1.default)((ctx, selectedDate) => ({
        ...ctx,
        selectedDate,
    })),
    updateEdit: (0, machineReducer_1.default)((ctx, update) => ({
        ...ctx,
        editingAppointment: { ...ctx.editingAppointment, ...update },
    })),
    selectAppointment: (0, machineReducer_1.default)((ctx, appointment) => ({
        ...ctx,
        editingAppointment: appointment,
        selectedEventId: appointment?._id,
        newAppointment: false,
    })),
    finishEditing: async (_, handle) => {
        return {
            ...handle.currentState.context,
            selectedEventId: null,
            newAppointment: null,
            editingAppointment: null,
        };
    },
    cancelAddAppointment: (0, machineReducer_1.default)((ctx) => (0, lodash_1.omit)(ctx, 'newAppointment')),
});
exports.default = machine;
//# sourceMappingURL=PracitionerAppointmentCalender.machine.js.map