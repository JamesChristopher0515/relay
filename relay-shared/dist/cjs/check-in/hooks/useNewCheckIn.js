"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useMemoryImmer_1 = __importDefault(require("@mtyk/frontend/react/hooks/useMemoryImmer"));
const useNewJournalEntry_1 = __importDefault(require("../../frontend/journal-entries/hooks/useNewJournalEntry"));
const newCheckIn_1 = __importDefault(require("../helpers/newCheckIn"));
function useNewCheckIn() {
    const [newCheckInDoc, updateNewCheckIn] = (0, useMemoryImmer_1.default)('partialCheckIn', (0, newCheckIn_1.default)());
    const [newJournalEntryDoc, updateNewJournalEntry] = (0, useNewJournalEntry_1.default)();
    return {
        updateNewJournalEntry,
        updateNewCheckIn,
        newJournalEntryDoc,
        newCheckInDoc,
    };
}
exports.default = useNewCheckIn;
//# sourceMappingURL=useNewCheckIn.js.map