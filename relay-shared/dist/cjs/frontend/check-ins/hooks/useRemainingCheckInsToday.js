"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getCheckInTimes_1 = __importDefault(require("../../../clients/helpers/getCheckInTimes"));
const useApi_1 = require("../../api/hooks/useApi");
/**
 * Note that this doesn't check whether a check-in has been completed
 * successfully, just whether the time has passed
 */
function useRemainingCheckInsToday({ client }) {
    const { data: clientDoc } = (0, useApi_1.useGetClientQuery)(client, { skip: !client });
    const checkInTimes = clientDoc ? (0, getCheckInTimes_1.default)(clientDoc) : [];
    return checkInTimes.filter(t => t > new Date());
}
exports.default = useRemainingCheckInsToday;
//# sourceMappingURL=useRemainingCheckInsToday.js.map