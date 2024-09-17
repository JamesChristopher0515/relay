"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useApi_1 = require("../../frontend/api/hooks/useApi");
function useAssignedJourneyClientStops({ assignedJourneyId, }, opts = {}) {
    const { data: stopsData, isLoading, isFetching, } = (0, useApi_1.useGetClientMilestoneStopsQuery)({
        assignedJourney: assignedJourneyId,
    }, opts);
    if (isLoading) {
        return [];
    }
    return (stopsData?.data ?? []);
}
exports.default = useAssignedJourneyClientStops;
//# sourceMappingURL=useAssignedJourneyClientStops.js.map