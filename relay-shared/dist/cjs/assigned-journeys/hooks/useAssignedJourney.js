"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const useApi_1 = require("../../frontend/api/hooks/useApi");
function useAssignedJourney(id) {
    const { data: aj } = (0, useApi_1.useGetAssignedJourneyQuery)(id, {
        skip: typeof id !== 'string',
    });
    return aj;
}
exports.default = useAssignedJourney;
//# sourceMappingURL=useAssignedJourney.js.map