"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const useClientShared_1 = __importDefault(require("../../clients/hooks/useClientShared"));
const useApi_1 = require("../../frontend/api/hooks/useApi");
function useTodayCheckIn() {
    const [client] = (0, useClientShared_1.default)();
    const { data: checkIns, isLoading } = (0, useApi_1.useGetCheckInsQuery)({
        client: client._id,
        createdAt: {
            $gte: (0, date_fns_1.startOfDay)(new Date()).toString(),
            $lt: (0, date_fns_1.endOfDay)(new Date()).toString(),
        },
    });
    const latestCheckIn = checkIns?.data[0];
    return latestCheckIn;
}
exports.default = useTodayCheckIn;
//# sourceMappingURL=useTodayCheckIn.js.map