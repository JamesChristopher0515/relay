"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useNewCheckIn_1 = __importDefault(require("../../../check-in/hooks/useNewCheckIn"));
const useApi_1 = require("../../api/hooks/useApi");
function useCheckInOrNew(id) {
    const { data: apiCheckIn } = (0, useApi_1.useGetCheckInQuery)(id, {
        skip: !id || id === 'new',
    });
    const { newCheckInDoc: newCheckIn, updateNewJournalEntry } = (0, useNewCheckIn_1.default)();
    const theCheckIn = id === 'new' ? newCheckIn : apiCheckIn;
    const [updateMut] = (0, useApi_1.useUpdateCheckInMutation)();
    const [remove] = (0, useApi_1.useDeleteCheckInMutation)();
    const [create] = (0, useApi_1.useCreateCheckInMutation)();
    return [
        theCheckIn,
        {
            create,
            update: async (update) => {
                if (id === 'new') {
                    updateNewJournalEntry(draft => {
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
exports.default = useCheckInOrNew;
//# sourceMappingURL=useCheckIn.js.map