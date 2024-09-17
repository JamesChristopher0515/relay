import useMemoryImmer from '@mtyk/frontend/react/hooks/useMemoryImmer';
import newJournalEntry from '../../../journal-entries/helpers/newJournalEntry';
export default function useNewJournalEntry() {
    const [newJournalEntryDoc, updateNewJournalEntry] = useMemoryImmer('partialJournalEntry', newJournalEntry());
    return [newJournalEntryDoc, updateNewJournalEntry];
}
//# sourceMappingURL=useNewJournalEntry.js.map