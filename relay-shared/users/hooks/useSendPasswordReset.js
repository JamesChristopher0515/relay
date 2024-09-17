import useWrappedAxiosShared from '../../core/hooks/useWrappedAxiosShared';
export default function useSendPasswordReset() {
    const axios = useWrappedAxiosShared();
    const sendForgotPasswordEmail = async (emailOrUsername) => {
        return axios.post(`/users/forgot-password`, {
            email: emailOrUsername,
        });
    };
    return sendForgotPasswordEmail;
}
//# sourceMappingURL=useSendPasswordReset.js.map