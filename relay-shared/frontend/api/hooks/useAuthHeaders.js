import { useSelector } from 'react-redux';
const useAuthState = () => useSelector(state => state.auth);
export default function useAuthHeaders() {
    const { tokens } = useAuthState();
    const accessToken = tokens?.access.token;
    // const refreshToken = auth.tokens?.refresh.token
    return {
        Authorization: `Bearer ${accessToken}`,
    };
}
//# sourceMappingURL=useAuthHeaders.js.map