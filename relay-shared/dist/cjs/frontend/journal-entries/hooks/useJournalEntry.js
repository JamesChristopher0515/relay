"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isObjectId_1 = __importDefault(require("../../../core/helpers/isObjectId"));
const useApi_1 = require("../../api/hooks/useApi");
const helpers_1 = require("@mtyk/frontend/core/helpers");
const useNewJournalEntry_1 = __importDefault(require("./useNewJournalEntry"));
function useJournalEntryOrNew(id) {
    const { data: apiEntry, ...rest } = (0, useApi_1.useGetJournalEntryQuery)(id, {
        skip: !(0, isObjectId_1.default)(id),
    });
    const [newJournalEntry, updateNewJournalEntry] = (0, useNewJournalEntry_1.default)();
    const [updateMut] = (0, useApi_1.useUpdateJournalEntryMutation)();
    const theEntry = id === 'new'
        ? newJournalEntry
        : (0, isObjectId_1.default)(id)
            ? (0, helpers_1.parseDates)(apiEntry)
            : null;
    const [remove] = (0, useApi_1.useDeleteJournalEntryMutation)();
    const [create] = (0, useApi_1.useCreateJournalEntryMutation)();
    return [
        theEntry,
        {
            ...rest,
            create,
            update: async (update) => {
                console.log('update called with id', id);
                if (id === 'new') {
                    updateNewJournalEntry(draft => {
                        console.log(`updating draft with ${JSON.stringify(update)}`);
                        Object.assign(draft, update);
                    });
                }
                else {
                    await updateMut({ id, update }).unwrap();
                }
            },
            remove: async () => remove(id),
        },
    ];
}
exports.default = useJournalEntryOrNew;
//# sourceMappingURL=useJournalEntry.js.map