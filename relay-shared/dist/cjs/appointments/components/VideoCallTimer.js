"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = __importDefault(require("react"));
const useAppointmentInfo_1 = __importDefault(require("../hooks/useAppointmentInfo"));
function formatHHMMSS(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600).toString();
    if (hours === '0') {
        hours = '';
    }
    const minutes = Math.floor((totalSeconds % 3600) / 60)
        .toString()
        .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours ? hours + ':' : ''}${minutes}:${seconds}`;
}
function VideoCallTimer(props) {
    const { appointmentId, ...rest } = props;
    const info = (0, useAppointmentInfo_1.default)(appointmentId);
    const { msRemaining } = info;
    const formattedTime = msRemaining < 0 ? formatHHMMSS(0) : formatHHMMSS(msRemaining);
    return (react_1.default.createElement(components_1.Flex, { center: true, style: {
            ...rest.style,
        } },
        react_1.default.createElement(components_1.Txt, { center: true, color: "white" }, formattedTime)));
}
exports.default = VideoCallTimer;
//# sourceMappingURL=VideoCallTimer.js.map