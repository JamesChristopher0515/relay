"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const toast_1 = require("../../../core/helpers/toast");
const config_1 = require("../../core/helpers/config");
const authReducer_1 = require("../reducers/authReducer");
const useApi_1 = require("./useApi");
function useLogin() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [error, setError] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [clear] = (0, useApi_1.useClearAllMutation)();
    const loginWithTokensUser = async function (tokens, user) {
        const { localStorage } = config_1.config;
        setLoading(true);
        setError(null);
        try {
            await localStorage.setItem('tokens', JSON.stringify(tokens));
            await localStorage.setItem('user', JSON.stringify(user));
            (0, react_redux_1.batch)(() => {
                dispatch((0, authReducer_1.setTokens)(tokens));
                dispatch((0, authReducer_1.setUser)(user));
                clear().catch((e) => console.error(e));
            });
        }
        catch (e) {
            console.error(e);
            (0, toast_1.toast)('error', (e instanceof Error ? e.message : null) ?? String(e));
            setError(e);
        }
        setLoading(false);
    };
    const loginFunc = async function ({ email, password, }) {
        const { localStorage } = config_1.config;
        setLoading(true);
        setError(null);
        try {
            const { data: { user, tokens }, } = await useApi_1.wrappedAxios.post('/auth/login', {
                email,
                password,
            });
            await loginWithTokensUser(tokens, user);
        }
        catch (e) {
            console.error(e);
            (0, toast_1.toast)('error', (e instanceof Error ? e.message : null) ?? String(e));
            setError(e);
        }
        setLoading(false);
    };
    const extra = {
        error,
        isLoading: loading,
        loginWithTokensUser,
    };
    return [loginFunc, extra];
}
exports.default = useLogin;
//# sourceMappingURL=useLogin.js.map