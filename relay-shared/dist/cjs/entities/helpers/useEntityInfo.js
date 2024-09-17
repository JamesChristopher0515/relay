"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
// import getStopTypeInfo from 'features/journeys/helpers/getStopTypeInfo'
const lodash_1 = require("lodash");
const react_1 = require("react");
const tiny_invariant_1 = __importDefault(require("tiny-invariant"));
const useApi_1 = require("../../frontend/api/hooks/useApi");
const findJourneyStop_1 = __importDefault(require("../../journeys/helpers/findJourneyStop"));
// import JourneySvg from '../components/svgs/JourneySvg'
// import MilestoneStopSvg from '../components/svgs/MilestoneStopSvg'
// import MilestoneSvg from '../components/svgs/MilestoneSvg'
// TODO temporary, move elsewhere, duplicated in practitioner-app
function clientShortName(client) {
    return (client?.name ?? '').split(' ')[0];
}
const useFile_1 = require("../../files/hooks/useFile");
const RelayIcons_1 = __importDefault(require("../../frontend/icons/RelayIcons"));
const getStopTypeInfo_1 = __importDefault(require("../../journeys/helpers/getStopTypeInfo"));
function useEntityInfo(entity, id) {
    const prevEntity = (0, react_1.useRef)(entity);
    (0, tiny_invariant_1.default)(!prevEntity.current || entity === prevEntity.current, `useEntityInfo entity cannot change at runtime. Previously: ${prevEntity.current} Now: ${entity}`);
    const queryHookWrapper = (queryHook, args) => queryHook(args ?? id, { skip: !id })?.data;
    const queryHookManyWrapper = (queryHook, args) => queryHook(args, { skip: !id })?.data?.data?.[0];
    /* eslint-disable react-hooks/rules-of-hooks */
    const clientMilestoneStop = entity !== 'client-milestone-stop'
        ? null
        : queryHookWrapper(useApi_1.useGetClientMilestoneStopQuery);
    const questionnaireResult = entity !== 'questionnaire-result'
        ? null
        : queryHookWrapper(useApi_1.useGetQuestionnaireResultQuery);
    const questionnaireResultQuestionnaire = entity !== 'questionnaire-result'
        ? null
        : queryHookWrapper(useApi_1.useGetQuestionnaireQuery, questionnaireResult?.questionnaire);
    const clientMilestoneStopAssignedJourney = entity !== 'client-milestone-stop'
        ? null
        : queryHookWrapper(useApi_1.useGetAssignedJourneyQuery, clientMilestoneStop?.assignedJourney);
    const clientWorksheet = entity !== 'client-worksheet'
        ? null
        : queryHookWrapper(useApi_1.useGetClientWorksheetQuery);
    const clientWorksheetWorksheet = entity !== 'client-worksheet'
        ? null
        : queryHookWrapper(useApi_1.useGetWorksheetQuery, clientWorksheet?.worksheet);
    const clientMilestoneStopStop = clientMilestoneStopAssignedJourney && clientMilestoneStop
        ? (0, findJourneyStop_1.default)({
            journey: clientMilestoneStopAssignedJourney.journey,
            ...clientMilestoneStop,
        }).stop
        : null;
    const stopDeleted = clientMilestoneStopAssignedJourney &&
        clientMilestoneStop &&
        !clientMilestoneStopStop;
    const info = {
        client: {
            name: 'Client',
            url: '/clients',
            getShortName: (doc) => clientShortName(doc),
            icon: free_solid_svg_icons_1.faCircle,
            hook: useApi_1.useGetClientQuery,
            hookMultiple: useApi_1.useGetClientsQuery,
        },
        category: {
            name: 'Category',
            getShortName: (doc) => doc.name,
            icon: free_solid_svg_icons_1.faCircle,
            hook: useApi_1.useGetCategoryQuery,
            hookMultiple: useApi_1.useGetCategorysQuery,
        },
        practitioner: {
            name: 'Practitioner',
            url: '/practitioners',
            icon: free_solid_svg_icons_1.faCircle,
            getImageUrl: (doc) => (0, useFile_1.fileUrl)(doc.profilePicture),
            hook: useApi_1.useGetPractitionerQuery,
            hookMultiple: useApi_1.useGetPractitionersQuery,
        },
        questionnaire: {
            canOpenInResourceManager: true,
            name: 'Questionnaire',
            url: '/questionnaires/edit',
            icon: free_solid_svg_icons_1.faClipboard,
            hook: useApi_1.useGetQuestionnaireQuery,
            hookMultiple: useApi_1.useGetQuestionnairesQuery,
        },
        journey: {
            canOpenInResourceManager: true,
            name: 'Journey',
            url: '/journeys/edit',
            // icon: JourneySvg,
            hook: useApi_1.useGetJourneyQuery,
            hookMultiple: useApi_1.useGetJourneyQuery,
        },
        'journey-milestone': {
            name: 'Journey-milestone',
            url: '/journey-milestone/',
            // icon: MilestoneSvg,
        },
        'client-milestone-stop': {
            name: 'Client-milestone-stop',
            // icon: MilestoneStopSvg,
            hook: useApi_1.useGetClientMilestoneStopQuery,
            // Just links to the assigned journey for the client
            url: (doc) => `clients/${doc.client}/journeys/${doc.assignedJourney}`,
            getShortName: (doc) => clientMilestoneStopStop?.name ??
                (clientMilestoneStopStop
                    ? (0, getStopTypeInfo_1.default)(clientMilestoneStopStop.type)?.name
                    : null) ??
                (stopDeleted ? 'Stop deleted' : ''),
        },
        'journey-stop': {
            name: 'Journey Stop',
            url: '/journey-stop',
            // icon: MilestoneStopSvg,
        },
        'assigned-journey': {
            name: 'Assigned Journey',
            getShortName: (doc) => doc?.journey.name || '',
            // icon: JourneySvg,
            url: (assignedJourney) => `/clients/${assignedJourney.client}/journeys/${assignedJourney._id}`,
            hook: useApi_1.useGetAssignedJourneyQuery,
            hookMultiple: useApi_1.useGetAssignedJourneysQuery,
        },
        'assigned-resource': {
            name: 'Assigned resource',
            url: '/assigned-resource',
            // icon: JourneySvg,
            hook: useApi_1.useGetAssignedResourceQuery,
            hookMultiple: useApi_1.useGetAssignedResourcesQuery,
        },
        todo: {
            name: 'todo',
            url: (todo) => `/clients/${todo.client}/todos/${todo._id}`,
            icon: free_solid_svg_icons_1.faCheckSquare,
            hook: useApi_1.useGetTodoQuery,
            hookMultiple: useApi_1.useGetTodosQuery,
        },
        content: {
            name: 'content',
            url: (_content) => `/content`,
            plural: 'content',
            icon: free_solid_svg_icons_1.faPhotoVideo,
            hook: useApi_1.useGetContentQuery,
            hookMultiple: useApi_1.useGetContentsQuery,
        },
        worksheet: {
            name: 'worksheet',
            url: `/worksheets/edit`,
            canOpenInResourceManager: true,
            icon: RelayIcons_1.default.worksheet,
            hook: useApi_1.useGetWorksheetQuery,
            hookMultiple: useApi_1.useGetWorksheetsQuery,
        },
        'client-worksheet': {
            name: 'client-worksheet',
            getShortName: (doc) => clientWorksheetWorksheet?.name || '',
            url: (document) => `/clients/${document.client}/worksheets/${document._id}`,
            icon: free_solid_svg_icons_1.faFileExcel,
            hook: useApi_1.useGetClientWorksheetQuery,
            hookMultiple: useApi_1.useGetClientWorksheetsQuery,
        },
        'questionnaire-result': {
            name: 'QuestionnaireResult',
            icon: free_solid_svg_icons_1.faClipboard,
            getShortName: (doc) => questionnaireResultQuestionnaire?.name || '',
            url: (document) => `/clients/${document.client}/questionnaires/${document.questionnaire}/${document._id}`,
            hook: useApi_1.useGetQuestionnaireResultQuery,
            hookMultiple: useApi_1.useGetQuestionnaireResultsQuery,
        },
        appointment: {
            name: 'Appointment',
            icon: free_solid_svg_icons_1.faCalendar,
            url: (document) => `/clients/${document.client}`,
            hook: useApi_1.useGetAppointmentQuery,
            hookMultiple: useApi_1.useGetAppointmentsQuery,
        },
    };
    const values = (0, lodash_1.mapValues)(info, (val) => {
        return {
            plural: val.name + 's',
            ...val,
        };
    });
    (0, tiny_invariant_1.default)(entity in values, `Unknown entity type: ${entity}`);
    return values[entity];
}
exports.default = useEntityInfo;
//# sourceMappingURL=useEntityInfo.js.map