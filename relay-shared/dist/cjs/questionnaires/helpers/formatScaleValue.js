"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatScaleValue(value) {
    if (String(value) === String(parseInt(String(value)))) {
        return value;
    }
    const fixed = value.toFixed(2);
    if (fixed.endsWith('00')) {
        return Math.round(value);
    }
    else {
        return fixed;
    }
}
exports.default = formatScaleValue;
//# sourceMappingURL=formatScaleValue.js.map