import { useState } from 'react';
import useInterval from 'react-use/esm/useInterval';
import { Id } from '../../RelayTypes';
import { useGetAppointmentQuery } from '../../frontend/api/hooks/useApi';
import getValidAppointmentTime from '../helpers/getValidAppointmentTime';
import { IRelayAppointment } from '../types/IRelayAppointment';

export default function useAppointmentInfo(appointmentId: Id) {
  const appointment = useGetAppointmentQuery(appointmentId)?.data as IRelayAppointment
  const validTime = appointment ? getValidAppointmentTime(appointment) : null
  const [msRemaining, setMsRemaining] = useState(-1)
  useInterval(() => {
    if (!validTime) {
      return setMsRemaining(-1)
    } else {
      setMsRemaining(Math.max(validTime.end.getTime() - Date.now(), 0))
    }
  }, 1000)

  return {
    msRemaining,
  }
}