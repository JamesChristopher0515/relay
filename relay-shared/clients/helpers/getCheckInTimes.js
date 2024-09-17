import { add, startOfDay } from 'date-fns';
import { times } from 'lodash';
export default function getCheckInTimes(client) {
    return times(client.checkInOptions.dailyCount, i => {
        const notifyTime = client.checkInOptions.notifyAt[i] ??
            add(startOfDay(new Date()), { hours: 9 });
        return notifyTime;
    });
}
//# sourceMappingURL=getCheckInTimes.js.map