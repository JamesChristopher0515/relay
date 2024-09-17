import { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { config as mtykConfig } from "@mtyk/frontend/core/helpers/config";
import { batch } from "react-redux";
import { config } from "../../core/helpers/config";
import { setTokens, setUser } from "../reducers/authReducer";

let refreshingTokenAttemptI = 0;
// eslint-disable-next-line @typescript-eslint/no-empty-function, no-constant-condition
const c = true ? console : { log: () => {}, error: () => {} };

export const makeApiBaseQuery = (relayApiGetter) => {
  const axiosBaseQuery: BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
    },
    unknown,
    unknown
  > = async ({ url, method, data, ...rest }, { signal, dispatch, getState }) => {
    const tryHavingMaybeRefreshedToken = async (refreshed = false) => {
      const { auth } = getState() as any;

      const accessToken = auth.tokens?.access?.token;
      const refreshToken = auth.tokens?.refresh?.token;
      const axiosUrl = mtykConfig.apiUrl + url;

      console.log({ refreshToken, accessToken });

      try {
        c.log(`Calling ${method.toUpperCase()} ${axiosUrl}`);
        const result = await axios({
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
      } catch (err) {
        c.error(`Error calling ${method.toUpperCase()} ${axiosUrl}`, err);
        const axiosError = err as AxiosError;
        if (axiosError.response?.status === 401 && !refreshed && url.indexOf("login") === -1) {
          const thisAttempt = ++refreshingTokenAttemptI;
          try {
            // at least try refreshing the token first
            c.log("trying to use refresh token");
            const { data: tokens } = await axios.post(mtykConfig.apiUrl + `/auth/refresh-tokens`, { refreshToken });
            dispatch(setTokens(tokens));
            config.localStorage.setItem("tokens", JSON.stringify(tokens));

            // Try again with new tokens
            return tryHavingMaybeRefreshedToken(true);
          } catch (e) {
            c.error("failed using refresh token", e);
            // Nope, couldn't refresh token, reset to undefined

            const { auth } = getState() as RootState;
            if (!auth.tokens) {
              // user has already logged out, no need to reset state
            } else if (thisAttempt === refreshingTokenAttemptI) {
              // Only logout if we're not actively trying to
              // refresh the token in another timeout somewhere
              batch(() => {
                dispatch(setTokens());
                dispatch(setUser());
                dispatch(relayApiGetter().endpoints.clearAll.initiate());
              });
              config.localStorage.removeItem("tokens");
              config.localStorage.removeItem("user");
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
