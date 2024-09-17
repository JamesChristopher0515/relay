"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkTokens = void 0;
const config_1 = require("@mtyk/frontend/core/helpers/config");
const axios_1 = __importStar(require("axios"));
const triedRefresh = new Set();
async function checkTokens(tokens, attempts = 0) {
    const accessToken = tokens.access.token;
    const refreshToken = tokens.refresh.token;

    console.log({ refreshToken, accessToken })


    try {
        const result = await (0, axios_1.default)({
            url: config_1.config.apiUrl + '/users/me',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (result?.data) {
            return { tokens, user: result.data };
        }
    }
    catch (err) {
        const axiosError = err;
        // If error is timeout-ish
        if (axiosError.code === axios_1.AxiosError.ETIMEDOUT || axiosError.code === axios_1.AxiosError.ECONNABORTED || axiosError.code === axios_1.AxiosError.ERR_NETWORK) {
            return new Promise((resolve) => {
                // Try again in 5 secs, keep attempts the same
                setTimeout(() => {
                    resolve(checkTokens(tokens, attempts));
                }, 1000 * 5);
            });
        }
        if (axiosError.response?.status === 401 &&
            (!triedRefresh.has(refreshToken) || attempts > 0) &&
            attempts < 3) {
            try {
                // at least try refreshing the token first
                const { data: newTokens } = await axios_1.default.post(config_1.config.apiUrl + `/auth/refresh-tokens`, { refreshToken });
                return checkTokens(newTokens, attempts + 1);
            }
            catch (e) {
                console.error(e);
                return { tokens: null, user: null };
            }
        }
    }
}
exports.checkTokens = checkTokens;
//# sourceMappingURL=checkTokens.js.map