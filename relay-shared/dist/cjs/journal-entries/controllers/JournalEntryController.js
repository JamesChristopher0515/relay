"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const newId_1 = __importDefault(require("../../core/helpers/newId"));
const isObjectId_1 = __importDefault(require("../../core/helpers/isObjectId"));
const makeController_1 = __importDefault(require("@mtyk/frontend/controllers/helpers/makeController"));
const useCheckIn_1 = __importDefault(require("../../frontend/check-ins/hooks/useCheckIn"));
const useJournalEntry_1 = __importDefault(require("../../frontend/journal-entries/hooks/useJournalEntry"));
const useClientShared_1 = __importDefault(require("../../clients/hooks/useClientShared"));
exports.default = (0, makeController_1.default)(function JournalEntryController(props) {
    let journalEntry = 'new';
    if ('journalEntry' in props && (0, isObjectId_1.default)(props.journalEntry)) {
        journalEntry = props.journalEntry;
    }
    const [client] = (0, useClientShared_1.default)();
    const [checkInDoc] = (0, useCheckIn_1.default)('checkIn' in props ? props.checkIn : undefined);
    if ((0, isObjectId_1.default)(checkInDoc?.journalEntry)) {
        // Show journal entry associated with this check-in
        journalEntry = checkInDoc.journalEntry;
    }
    const [doc, { create, update, remove, ...journalEntryRest }] = (0, useJournalEntry_1.default)(journalEntry);
    const createOrUpdate = async (newEntry) => {
        console.log('createOrUpdate', { props, newEntry });
        if ((0, isObjectId_1.default)(journalEntry) || props.checkIn === 'new') {
            await update(newEntry);
        }
        else {
            const toCreate = {
                _id: (0, newId_1.default)(),
                ...newEntry,
                client: client._id,
            };
            if ('checkIn' in props) {
                toCreate.checkIn = props.checkIn;
            }
            await create(toCreate);
        }
    };
    return {
        journalEntry: doc,
        ...journalEntryRest,
        createOrUpdate,
        create,
        update,
        remove,
    };
});
//# sourceMappingURL=JournalEntryController.js.map