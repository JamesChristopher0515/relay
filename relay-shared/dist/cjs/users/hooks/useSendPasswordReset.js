"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useWrappedAxiosShared_1 = __importDefault(require("../../core/hooks/useWrappedAxiosShared"));
function useSendPasswordReset() {
    const axios = (0, useWrappedAxiosShared_1.default)();
    const sendForgotPasswordEmail = async (emailOrUsername) => {
        return axios.post(`/users/forgot-password`, {
            email: emailOrUsername,
        });
    };
    return sendForgotPasswordEmail;
}
exports.default = useSendPasswordReset;
//# sourceMappingURL=useSendPasswordReset.js.map