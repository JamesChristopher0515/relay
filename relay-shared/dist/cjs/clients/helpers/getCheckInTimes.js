"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const lodash_1 = require("lodash");
function getCheckInTimes(client) {
    return (0, lodash_1.times)(client.checkInOptions.dailyCount, i => {
        const notifyTime = client.checkInOptions.notifyAt[i] ??
            (0, date_fns_1.add)((0, date_fns_1.startOfDay)(new Date()), { hours: 9 });
        return notifyTime;
    });
}
exports.default = getCheckInTimes;
//# sourceMappingURL=getCheckInTimes.js.map