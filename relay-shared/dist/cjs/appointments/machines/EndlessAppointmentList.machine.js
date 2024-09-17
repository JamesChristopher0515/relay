"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const machine_1 = require("@mtyk/machine");
const machineReducer_1 = __importDefault(require("../../machines/helpers/machineReducer"));
const endlessAppointmentList = (0, machine_1.createMachine)({
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
    loadEarlier: (0, machineReducer_1.default)((ctx, opts, handle) => {
        return handle.transition('loadDirection', { direction: -1 });
    }),
    loadLater: (0, machineReducer_1.default)((ctx, opts, handle) => {
        return handle.transition('loadDirection', { direction: 1 });
    }),
});
exports.default = endlessAppointmentList;
//# sourceMappingURL=EndlessAppointmentList.machine.js.map