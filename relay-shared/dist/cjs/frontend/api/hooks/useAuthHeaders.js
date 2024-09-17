"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const useAuthState = () => (0, react_redux_1.useSelector)(state => state.auth);
function useAuthHeaders() {
    const { tokens } = useAuthState();
    const accessToken = tokens?.access.token;

    console.log({ accessToken })


    // const refreshToken = auth.tokens?.refresh.token
    return {
        Authorization: `Bearer ${accessToken}`,
    };
}
exports.default = useAuthHeaders;
//# sourceMappingURL=useAuthHeaders.js.map