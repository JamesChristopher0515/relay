"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getAllResourceTypes() {
    return [
        'questionnaire',
        'content',
        /**
         * Refers to a specific client milestone stop, which in turn refers to a
         * specific stop in a journey of type 'thinking-points'
         */
        'thinking-points',
    ];
}
exports.default = getAllResourceTypes;
//# sourceMappingURL=getAllResourceTypes.js.map