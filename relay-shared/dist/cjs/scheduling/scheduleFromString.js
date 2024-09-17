"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const later = __importStar(require("@breejs/later"));
function scheduleFromString(str) {
    try {
        const replaced = (`every ` +
            str
                .trim()
                .replace(/fortnight/, `2 weeks`)
                .replace(/midnight/, `0:00`)
                .replace(/midday/, `12:00`)
                .replace(/^day/, `1 day`)
                .replace(/^week/, `1 week`)
                .replace(/^month/, `1 month`)
                // convert am/pm to 24 hour
                .replace(/([0-9:]+)(pm|am)/, (match, p1, p2) => {
                return match
                    .split(':')
                    .map((part, i, arr) => {
                    if (i === 0 && p2 === 'pm') {
                        return (12 + parseInt(p1, 10) + (i === arr.length - 1 ? `:00` : ''));
                    }
                    return part;
                })
                    .join(':')
                    .replace(/pm|am/, '');
            })).replace(/^every ([a-z]+day)/i, 'on $1');
        //
        const s = later.parse.text(replaced);
        if (s.error === -1) {
            return later.schedule(s);
        }
    }
    catch (e) {
        console.error(e);
    }
    return null;
}
exports.default = scheduleFromString;
//# sourceMappingURL=scheduleFromString.js.map