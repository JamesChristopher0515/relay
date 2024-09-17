import { config as mtykConfig } from "@mtyk/frontend/core/helpers/config";
import axios, { AxiosError } from "axios";

const triedRefresh = new Set<string>();
export async function checkTokens(tokens, attempts = 0) {
  const accessToken = tokens?.access?.token;
  const refreshToken = tokens?.refresh?.token;

  console.log({ accessToken, refreshToken });

  try {
    const result = await axios({
      url: mtykConfig.apiUrl + "/users/me",
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (result?.data) {
      return { tokens, user: result.data };
    }
  } catch (err) {
    const axiosError = err as AxiosError;

    // If error is timeout-ish
    if (axiosError.code === AxiosError.ETIMEDOUT || axiosError.code === AxiosError.ECONNABORTED || axiosError.code === AxiosError.ERR_NETWORK) {
      return new Promise((resolve) => {
        // Try again in 5 secs, keep attempts the same
        setTimeout(() => {
          resolve(checkTokens(tokens, attempts));
        }, 1000 * 5);
      });
    }

    if (axiosError.response?.status === 401 && (!triedRefresh.has(refreshToken) || attempts > 0) && attempts < 3) {
      try {
        // at least try refreshing the token first
        const { data: newTokens } = await axios.post(mtykConfig.apiUrl + `/auth/refresh-tokens`, { refreshToken });
        return checkTokens(newTokens, attempts + 1);
      } catch (e) {
        console.error(e);
        return { tokens: null, user: null };
      }
    }
  }
}
