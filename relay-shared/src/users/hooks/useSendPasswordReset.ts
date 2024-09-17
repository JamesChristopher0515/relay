import useWrappedAxiosShared from '../../core/hooks/useWrappedAxiosShared'

export default function useSendPasswordReset() {
  const axios = useWrappedAxiosShared()

  const sendForgotPasswordEmail = async (emailOrUsername: string) => {
    return axios.post(`/users/forgot-password`, {
      email: emailOrUsername,
    })
  }
  return sendForgotPasswordEmail
}
