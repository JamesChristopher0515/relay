import makeController from '@mtyk/frontend/controllers/helpers/makeController';
import { format } from 'date-fns';
import { assert } from '@mtyk/frontend/core/helpers';
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks';
import { pick } from 'lodash';
import Toast from 'react-native-root-toast';
import useTodo from '../../frontend/todos/hooks/useTodo';
import idOrFromObj from '../../models/helpers/idOrFromObj';
import { isAppointmentValid } from '../../appointments/helpers/getValidAppointmentTime';
export default makeController(function TodoController({ todo: _todo, useAssignedResourceOpener, todoDoc, poll, }) {
    const todo = _todo ?? idOrFromObj(todoDoc);
    assert(typeof todo === 'string', 'expected todo to be string');
    const queryOptions = {
        pollingInterval: poll ? 5000 : undefined,
    };
    const [_doc, { update }] = useTodo(todo, queryOptions);
    const doc = _doc;
    // Pass todo doc directly because transforms to get `file` object
    // don't appear to run when fetching a single todo
    const history = useHistory();
    const resource = {
        ...(doc?.assignedResource ?? {}),
        ...pick(doc ?? {}, ['content']),
    };
    const opener = useAssignedResourceOpener({ resource });
    const isQuestionnaire = doc?.questionnaire;
    const isWorksheet = doc?.worksheet;
    const isAppointment = doc?.appointment;
    const isContent = doc?.content;
    const isCheckIn = (todoDoc?._id ?? doc?._id) === 'dailyfeeling';
    const isBasic = !isQuestionnaire && !isWorksheet && !isContent;
    const action = async () => {
        if (todo === 'dailyfeeling') {
            history.push('/check-in');
            return;
        }
        if (doc.appointment) {
            const canJoin = isAppointmentValid(doc.appointment);
            if (!canJoin) {
                const inPast = new Date(doc.appointment.date).getTime() < new Date().getTime();
                Toast.show(inPast
                    ? `This appointment can no longer be joined`
                    : `This appointment doesn't start until ${format(new Date(doc.appointment.date), 'H:mm a')}`);
                return;
            }
            return history.push(`/appointment/${idOrFromObj(doc)}`);
        }
        if (doc.questionnaire) {
            if (doc.complete) {
                // return
            }
            return history.replace(`/questionnaire/${idOrFromObj(doc)}`);
        }
        if (doc.worksheet) {
            return history.replace(`/worksheet/${idOrFromObj(doc)}`);
        }
        if (doc.onClick) {
            doc.onClick();
        }
        else {
            const openable = doc.assignedResource?.type === 'content' ||
                doc.assignedResource?.type === 'thinking-points';
            let shouldComplete = false;
            if (openable) {
                const viewed = (await opener.open()) === true;
                shouldComplete = doc.complete || viewed;
            }
            else {
                shouldComplete = !doc.complete;
            }
            await update({
                complete: shouldComplete,
            });
        }
    };
    const api = {
        complete: async (complete) => {
            await update({ complete });
        },
        action,
        isComplete: isCheckIn ? todoDoc.complete : doc?.complete,
        isQuestionnaire,
        isWorksheet,
        isContent,
        isBasic,
        isAppointment,
        todo: doc,
    };
    return api;
});
//# sourceMappingURL=TodoController.js.map