"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeApiBaseQuery = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("@mtyk/frontend/core/helpers/config");
const react_redux_1 = require("react-redux");
const config_2 = require("../../core/helpers/config");
const authReducer_1 = require("../reducers/authReducer");
let refreshingTokenAttemptI = 0;
// eslint-disable-next-line @typescript-eslint/no-empty-function, no-constant-condition
const c = true ? console : { log: () => { }, error: () => { } };
const makeApiBaseQuery = relayApiGetter => {
    const axiosBaseQuery = async ({ url, method, data, ...rest }, { signal, dispatch, getState }) => {
        const tryHavingMaybeRefreshedToken = async (refreshed = false) => {
            const { auth } = getState();
            const accessToken = auth.tokens?.access?.token;
            const refreshToken = auth.tokens?.refresh?.token;

            const axiosUrl = config_1.config.apiUrl + url;
            try {
                c.log(`Calling ${method.toUpperCase()} ${axiosUrl}`);
                const result = await (0, axios_1.default)({
                    url: axiosUrl,
                    method,
                    data,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                    ...rest,
                });
                const toRet = { data: result.data };
                return toRet;
            }
            catch (err) {
                c.error(`Error calling ${method.toUpperCase()} ${axiosUrl}`, err);
                const axiosError = err;
                if (axiosError.response?.status === 401 &&
                    !refreshed &&
                    url.indexOf('login') === -1) {
                    const thisAttempt = ++refreshingTokenAttemptI;
                    try {
                        // at least try refreshing the token first
                        c.log('trying to use refresh token');
                        const { data: tokens } = await axios_1.default.post(config_1.config.apiUrl + `/auth/refresh-tokens`, { refreshToken });
                        dispatch((0, authReducer_1.setTokens)(tokens));
                        config_2.config.localStorage.setItem('tokens', JSON.stringify(tokens));
                        // Try again with new tokens
                        return tryHavingMaybeRefreshedToken(true);
                    }
                    catch (e) {
                        c.error('failed using refresh token', e);
                        // Nope, couldn't refresh token, reset to undefined
                        const { auth } = getState();
                        if (!auth.tokens) {
                            // user has already logged out, no need to reset state
                        }
                        else if (thisAttempt === refreshingTokenAttemptI) {
                            // Only logout if we're not actively trying to
                            // refresh the token in another timeout somewhere
                            (0, react_redux_1.batch)(() => {
                                dispatch((0, authReducer_1.setTokens)());
                                dispatch((0, authReducer_1.setUser)());
                                dispatch(relayApiGetter().endpoints.clearAll.initiate());
                            });
                            config_2.config.localStorage.removeItem('tokens');
                            config_2.config.localStorage.removeItem('user');
                        }
                    }
                }
                return {
                    error: {
                        status: axiosError.response?.status,
                        data: axiosError.response?.data,
                    },
                };
            }
        };
        return tryHavingMaybeRefreshedToken(false);
    };
    return axiosBaseQuery;
};
exports.makeApiBaseQuery = makeApiBaseQuery;
//# sourceMappingURL=apiBaseQuery.js.map