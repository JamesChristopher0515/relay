"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const groupByAsArray_1 = __importDefault(require("@mtyk/frontend/typescript/helpers/groupByAsArray"));
const react_1 = require("react");
const useTodayCheckIn_1 = __importDefault(require("../../check-in/hooks/useTodayCheckIn"));
const useClientShared_1 = __importDefault(require("../../clients/hooks/useClientShared"));
const makeController_1 = __importDefault(require("@mtyk/frontend/controllers/helpers/makeController"));
const wrapArrayHook_1 = __importDefault(require("../../core/helpers/wrapArrayHook"));
const useTimeOfDay_1 = __importDefault(require("../../core/hooks/useTimeOfDay"));
const useApi_1 = require("../../frontend/api/hooks/useApi");
const getTodoType_1 = __importDefault(require("../helpers/getTodoType"));
exports.default = (0, makeController_1.default)(function TodayViewController({ day, noPoll, }) {
    const [client] = (0, useClientShared_1.default)();
    const { data: todayTodos, isLoading, refetch, } = (0, wrapArrayHook_1.default)((0, useApi_1.useGetTodayTodos)({
        client: client._id,
        day,
    }, {}, noPoll));
    (0, react_1.useEffect)(() => {
        refetch();
    }, []);
    const todaysCheckIn = (0, useTodayCheckIn_1.default)();
    const checkInComplete = !!todaysCheckIn;
    const completeCount = todayTodos.filter((t) => t.complete).length;
    const completeFraction = completeCount / todayTodos.length;
    const timeOfDay = (0, useTimeOfDay_1.default)();
    const allComplete = todayTodos.every((t) => t.complete);
    const title = allComplete ? `You're done for today!` : `Good ${timeOfDay}!`;
    const message = allComplete
        ? `There are no tasks left to do, but you can always come back to record anything else.`
        : `There are some tasks waiting for you to complete...`;
    const noAssignedJourneyAndNotExpiredAppointment = todayTodos.filter((t) => !t.assignedJourney && !t.appointment?.endedAt);
    const assignedJourney = todayTodos.filter((t) => t.assignedJourney);
    const todosByType = [
        // A transient/fake todo for the check-in each day
        {
            group: 'check-in',
            items: [
                {
                    _id: 'dailyfeeling',
                    name: 'Complete daily check-in',
                    complete: checkInComplete,
                    completedAt: checkInComplete ? todaysCheckIn?.createdAt : undefined,
                    client: client._id,
                    assigned: (0, date_fns_1.startOfToday)(),
                },
            ],
        },
        ...(0, groupByAsArray_1.default)(
        // Show assigned journey todos as separate section
        noAssignedJourneyAndNotExpiredAppointment, getTodoType_1.default),
    ];
    return {
        todos: noAssignedJourneyAndNotExpiredAppointment,
        assignedJourney: assignedJourney,
        todosByType,
        message,
        title,
        completeFraction,
        completeCount,
        isLoading,
    };
});
//# sourceMappingURL=TodayViewController.js.map