"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@mtyk/frontend/core/components");
const react_1 = require("@mtyk/frontend/react");
const styleObjects_1 = require("@mtyk/frontend/styles/helpers/styleObjects");
const react_2 = __importDefault(require("react"));
const useWrappedAxiosShared_1 = __importDefault(require("../../core/hooks/useWrappedAxiosShared"));
const useMachine_1 = require("../../machines/hooks/useMachine");
const VideoCallMachine_1 = __importDefault(require("../machines/VideoCallMachine"));
function VideoAppointmentController(props) {
    const { appointmentId, Component } = props;
    const machine = (0, useMachine_1.useMachine)(VideoCallMachine_1.default);
    const axios = (0, useWrappedAxiosShared_1.default)();
    (0, react_1.useAsyncEffect)(async () => {
        if (appointmentId) {
            await VideoCallMachine_1.default.transition('got_token', { appointmentId, axios });
        }
    }, [appointmentId]);
    if (machine.is('got_token')) {
        const { roomName, token } = machine.context;
        return (react_2.default.createElement(Component, { roomName: roomName, token: token, appointmentId: appointmentId }));
    }
    else {
        if (machine.error) {
            return (react_2.default.createElement(components_1.Flex, { style: { ...(0, styleObjects_1.absoluteFill)() }, center: true },
                react_2.default.createElement(components_1.Txt, null, "This appointment cannot be joined at this time.")));
        }
        return null;
    }
}
exports.default = VideoAppointmentController;
//# sourceMappingURL=VideoAppointmentController.js.map