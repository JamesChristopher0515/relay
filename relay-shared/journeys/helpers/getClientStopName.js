export default function getClientFacingStopName(stop) {
    switch (stop.type) {
        case 'review':
            return 'Review';
        case 'questionnaire':
            return 'Questionnaire';
        default:
            return stop?.name ?? '';
    }
}
//# sourceMappingURL=getClientStopName.js.map