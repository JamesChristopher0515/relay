"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function timeRangeMs(timeRange) {
    const { start, end } = timeRange;
    return end.getTime() - start.getTime();
}
exports.default = timeRangeMs;
//# sourceMappingURL=timeRangeMs.js.map