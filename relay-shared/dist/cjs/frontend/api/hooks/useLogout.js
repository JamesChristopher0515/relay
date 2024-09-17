"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const useClientShared_1 = __importDefault(require("../../../clients/hooks/useClientShared"));
const config_1 = require("../../core/helpers/config");
const authReducer_1 = require("../reducers/authReducer");
const useApi_1 = require("./useApi");
const isPractitionerApp = typeof window !== 'undefined' && typeof window.location?.pathname === 'string';
/** Note that this is shared between both client and practitioner apps */
function useLogoutShared() {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [clear] = (0, useApi_1.useClearAllMutation)();
    const [updateUser] = (0, useApi_1.useUpdateClientMutation)();
    const [client] = (0, useClientShared_1.default)();
    const logoutFunc = async function () {
        const { localStorage } = config_1.config;
        if (!isPractitionerApp) {
            updateUser({
                id: client._id,
                update: {
                    expoPushToken: null,
                },
            }).catch((e) => console.error(e));
        }
        await localStorage.removeItem('tokens');
        await localStorage.removeItem('user');
        (0, react_redux_1.batch)(() => {
            dispatch((0, authReducer_1.setTokens)());
            dispatch((0, authReducer_1.setUser)());
            clear().catch((e) => console.error(e));
        });
        if (isPractitionerApp) {
            if (window.location.pathname === '/') {
                window.location.reload();
            }
            else {
                window.location.href = '/login';
            }
        }
    };
    return [logoutFunc];
}
exports.default = useLogoutShared;
//# sourceMappingURL=useLogout.js.map