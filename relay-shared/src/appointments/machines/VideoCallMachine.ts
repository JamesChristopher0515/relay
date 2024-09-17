import { createMachine } from '@mtyk/machine'

export type UIAppointmentEdit = {
  time: Date
  repeat?: string
}

const machine = createMachine({
  got_token: async (opts: { appointmentId: string; axios: any }) => {
    const { axios, appointmentId } = opts
    const {
      data: { token, roomName },
    } = await axios.get('/appointments/token', {
      params: {
        appointment: appointmentId,
      },
    })
    return {
      token,
      roomName,
    }
  },
})

export default machine
