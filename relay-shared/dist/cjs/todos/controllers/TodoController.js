"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const makeController_1 = __importDefault(require("@mtyk/frontend/controllers/helpers/makeController"));
const date_fns_1 = require("date-fns");
const helpers_1 = require("@mtyk/frontend/core/helpers");
const routerHooks_1 = require("@mtyk/frontend/core/hooks/routerHooks");
const lodash_1 = require("lodash");
const react_native_root_toast_1 = __importDefault(require("react-native-root-toast"));
const useTodo_1 = __importDefault(require("../../frontend/todos/hooks/useTodo"));
const idOrFromObj_1 = __importDefault(require("../../models/helpers/idOrFromObj"));
const getValidAppointmentTime_1 = require("../../appointments/helpers/getValidAppointmentTime");
exports.default = (0, makeController_1.default)(function TodoController({ todo: _todo, useAssignedResourceOpener, todoDoc, poll, }) {
    const todo = _todo ?? (0, idOrFromObj_1.default)(todoDoc);
    (0, helpers_1.assert)(typeof todo === 'string', 'expected todo to be string');
    const queryOptions = {
        pollingInterval: poll ? 5000 : undefined,
    };
    const [_doc, { update }] = (0, useTodo_1.default)(todo, queryOptions);
    const doc = _doc;
    // Pass todo doc directly because transforms to get `file` object
    // don't appear to run when fetching a single todo
    const history = (0, routerHooks_1.useHistory)();
    const resource = {
        ...(doc?.assignedResource ?? {}),
        ...(0, lodash_1.pick)(doc ?? {}, ['content']),
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
            const canJoin = (0, getValidAppointmentTime_1.isAppointmentValid)(doc.appointment);
            if (!canJoin) {
                const inPast = new Date(doc.appointment.date).getTime() < new Date().getTime();
                react_native_root_toast_1.default.show(inPast
                    ? `This appointment can no longer be joined`
                    : `This appointment doesn't start until ${(0, date_fns_1.format)(new Date(doc.appointment.date), 'H:mm a')}`);
                return;
            }
            return history.push(`/appointment/${(0, idOrFromObj_1.default)(doc)}`);
        }
        if (doc.questionnaire) {
            if (doc.complete) {
                // return
            }
            return history.replace(`/questionnaire/${(0, idOrFromObj_1.default)(doc)}`);
        }
        if (doc.worksheet) {
            return history.replace(`/worksheet/${(0, idOrFromObj_1.default)(doc)}`);
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