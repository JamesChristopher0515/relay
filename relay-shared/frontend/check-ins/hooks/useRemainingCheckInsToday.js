import getCheckInTimesToday from '../../../clients/helpers/getCheckInTimes';
import { useGetClientQuery } from '../../api/hooks/useApi';
/**
 * Note that this doesn't check whether a check-in has been completed
 * successfully, just whether the time has passed
 */
export default function useRemainingCheckInsToday({ client }) {
    const { data: clientDoc } = useGetClientQuery(client, { skip: !client });
    const checkInTimes = clientDoc ? getCheckInTimesToday(clientDoc) : [];
    return checkInTimes.filter(t => t > new Date());
}
//# sourceMappingURL=useRemainingCheckInsToday.js.map