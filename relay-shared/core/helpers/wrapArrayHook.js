import { parseDates } from '@mtyk/frontend/core/helpers';
export default function wrapArrayHook(apiHookResult) {
    const { data: data2, ...rest } = apiHookResult;
    return { data: parseDates(data2?.data ?? []), ...rest };
}
//# sourceMappingURL=wrapArrayHook.js.map