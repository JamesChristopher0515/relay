import isObjectId from '../../../core/helpers/isObjectId';
import { useCreateJournalEntryMutation, useDeleteJournalEntryMutation, useGetJournalEntryQuery, useUpdateJournalEntryMutation, } from '../../api/hooks/useApi';
import { parseDates } from '@mtyk/frontend/core/helpers';
import useNewJournalEntry from './useNewJournalEntry';
export default function useJournalEntryOrNew(id) {
    const { data: apiEntry, ...rest } = useGetJournalEntryQuery(id, {
        skip: !isObjectId(id),
    });
    const [newJournalEntry, updateNewJournalEntry] = useNewJournalEntry();
    const [updateMut] = useUpdateJournalEntryMutation();
    const theEntry = id === 'new'
        ? newJournalEntry
        : isObjectId(id)
            ? parseDates(apiEntry)
            : null;
    const [remove] = useDeleteJournalEntryMutation();
    const [create] = useCreateJournalEntryMutation();
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
//# sourceMappingURL=useJournalEntry.js.map