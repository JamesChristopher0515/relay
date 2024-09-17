"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("@mtyk/frontend/core/helpers");
function wrapArrayHook(apiHookResult) {
    const { data: data2, ...rest } = apiHookResult;
    return { data: (0, helpers_1.parseDates)(data2?.data ?? []), ...rest };
}
exports.default = wrapArrayHook;
//# sourceMappingURL=wrapArrayHook.js.map