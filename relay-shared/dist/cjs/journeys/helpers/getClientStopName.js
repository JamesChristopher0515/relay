"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getClientFacingStopName(stop) {
    switch (stop.type) {
        case 'review':
            return 'Review';
        case 'questionnaire':
            return 'Questionnaire';
        default:
            return stop?.name ?? '';
    }
}
exports.default = getClientFacingStopName;
//# sourceMappingURL=getClientStopName.js.map