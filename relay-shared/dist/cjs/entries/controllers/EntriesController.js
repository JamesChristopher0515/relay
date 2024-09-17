"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useTodayCheckIn_1 = __importDefault(require("../../check-in/hooks/useTodayCheckIn"));
const date_fns_1 = require("date-fns");
const lodash_1 = __importStar(require("lodash"));
const react_1 = require("react");
const makeController_1 = __importDefault(require("@mtyk/frontend/controllers/helpers/makeController"));
const wrapArrayHook_1 = __importDefault(require("../../core/helpers/wrapArrayHook"));
const useApi_1 = require("../../frontend/api/hooks/useApi");
const useClientShared_1 = __importDefault(require("../../clients/hooks/useClientShared"));
exports.default = (0, makeController_1.default)(function EntriesController(props) {
    const {} = props;
    const checkInToday = (0, useTodayCheckIn_1.default)();
    const [client] = (0, useClientShared_1.default)();
    const [loadStartDate, setLoadStartDate] = (0, react_1.useState)((0, date_fns_1.startOfMonth)((0, date_fns_1.add)(new Date(), { months: -2 })));
    const { data: entries, isLoading, error, } = (0, wrapArrayHook_1.default)((0, useApi_1.useGetCheckInsQuery)({
        createdAt: { $gte: loadStartDate.toISOString() },
        client: client._id,
    }));
    // console.log({ entries, isLoading, error })
    const loadMore = () => setLoadStartDate((0, date_fns_1.add)(loadStartDate, { months: -1 }));
    const months = (0, date_fns_1.eachMonthOfInterval)({
        start: loadStartDate,
        end: (0, date_fns_1.endOfMonth)(new Date()),
    });
    const monthYearFormat = 'yyyy-MM';
    const byMonth = (0, lodash_1.default)(entries)
        .groupBy(entry => (0, date_fns_1.format)((0, date_fns_1.startOfMonth)(entry.createdAt), monthYearFormat))
        .value();
    return {
        checkInToday,
        loadMore,
        months,
        getInfoForDay: (day) => {
            const month = (0, date_fns_1.format)(day, monthYearFormat);
            const checkIns = byMonth[month] ?? [];
            const checkInsForDay = (0, lodash_1.orderBy)(checkIns?.filter(checkIn => (0, date_fns_1.isSameDay)(checkIn.createdAt, day)) ?? [], ['createdAt'], ['asc']);
            const latestCheckInForDay = checkInsForDay[checkInsForDay.length - 1];
            return {
                checkInsForDay,
                latestCheckIn: latestCheckInForDay,
                hasCheckIn: checkInsForDay?.length ?? 0 > 0,
                hasMultipleCheckIns: checkInsForDay.length > 1,
                hasJournalEntry: checkInsForDay.some(checkIn => checkIn.journalEntry),
                hasFeeling: !!latestCheckInForDay?.feelings?.[0]?.name,
                feeling: latestCheckInForDay?.feelings?.[0],
            };
        },
        getInfoForMonth: (month) => {
            const entries = byMonth[(0, date_fns_1.format)(month, monthYearFormat)];
            return {
                entries,
                formattedMonth: (0, date_fns_1.format)(month, 'MMMM'),
                formattedYear: (0, date_fns_1.format)(month, 'yyyy'),
                month: (0, date_fns_1.startOfMonth)(month),
            };
        },
    };
});
//# sourceMappingURL=EntriesController.js.map