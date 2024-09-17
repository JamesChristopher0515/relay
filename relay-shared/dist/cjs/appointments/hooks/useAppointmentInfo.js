"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const useInterval_1 = __importDefault(require("react-use/esm/useInterval"));
const useApi_1 = require("../../frontend/api/hooks/useApi");
const getValidAppointmentTime_1 = __importDefault(require("../helpers/getValidAppointmentTime"));
function useAppointmentInfo(appointmentId) {
    const appointment = (0, useApi_1.useGetAppointmentQuery)(appointmentId)?.data;
    const validTime = appointment ? (0, getValidAppointmentTime_1.default)(appointment) : null;
    const [msRemaining, setMsRemaining] = (0, react_1.useState)(-1);
    (0, useInterval_1.default)(() => {
        if (!validTime) {
            return setMsRemaining(-1);
        }
        else {
            setMsRemaining(Math.max(validTime.end.getTime() - Date.now(), 0));
        }
    }, 1000);
    return {
        msRemaining,
    };
}
exports.default = useAppointmentInfo;
//# sourceMappingURL=useAppointmentInfo.js.map