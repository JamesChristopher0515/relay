"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useMemoryImmer_1 = __importDefault(require("@mtyk/frontend/react/hooks/useMemoryImmer"));
const newJournalEntry_1 = __importDefault(require("../../../journal-entries/helpers/newJournalEntry"));
function useNewJournalEntry() {
    const [newJournalEntryDoc, updateNewJournalEntry] = (0, useMemoryImmer_1.default)('partialJournalEntry', (0, newJournalEntry_1.default)());
    return [newJournalEntryDoc, updateNewJournalEntry];
}
exports.default = useNewJournalEntry;
//# sourceMappingURL=useNewJournalEntry.js.map