import useNewCheckIn from '../../../check-in/hooks/useNewCheckIn';
import { useCreateCheckInMutation, useDeleteCheckInMutation, useGetCheckInQuery, useUpdateCheckInMutation, } from '../../api/hooks/useApi';
export default function useCheckInOrNew(id) {
    const { data: apiCheckIn } = useGetCheckInQuery(id, {
        skip: !id || id === 'new',
    });
    const { newCheckInDoc: newCheckIn, updateNewJournalEntry } = useNewCheckIn();
    const theCheckIn = id === 'new' ? newCheckIn : apiCheckIn;
    const [updateMut] = useUpdateCheckInMutation();
    const [remove] = useDeleteCheckInMutation();
    const [create] = useCreateCheckInMutation();
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
//# sourceMappingURL=useCheckIn.js.map