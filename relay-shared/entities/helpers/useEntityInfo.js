import { faCheckSquare, faCircle, faCalendar, faClipboard, faFileExcel, faPhotoVideo, } from '@fortawesome/free-solid-svg-icons';
// import getStopTypeInfo from 'features/journeys/helpers/getStopTypeInfo'
import { mapValues } from 'lodash';
import { useRef } from 'react';
import invariant from 'tiny-invariant';
import { useGetAppointmentQuery, useGetAppointmentsQuery, useGetAssignedJourneyQuery, useGetAssignedJourneysQuery, useGetAssignedResourceQuery, useGetAssignedResourcesQuery, useGetCategoryQuery, useGetCategorysQuery, useGetClientMilestoneStopQuery, useGetClientQuery, useGetClientsQuery, useGetClientWorksheetQuery, useGetClientWorksheetsQuery, useGetContentQuery, useGetContentsQuery, useGetJourneyQuery, useGetPractitionerQuery, useGetPractitionersQuery, useGetQuestionnaireQuery, useGetQuestionnaireResultQuery, useGetQuestionnaireResultsQuery, useGetQuestionnairesQuery, useGetTodoQuery, useGetTodosQuery, useGetWorksheetQuery, useGetWorksheetsQuery, } from '../../frontend/api/hooks/useApi';
import findJourneyStop from '../../journeys/helpers/findJourneyStop';
// import JourneySvg from '../components/svgs/JourneySvg'
// import MilestoneStopSvg from '../components/svgs/MilestoneStopSvg'
// import MilestoneSvg from '../components/svgs/MilestoneSvg'
// TODO temporary, move elsewhere, duplicated in practitioner-app
function clientShortName(client) {
    return (client?.name ?? '').split(' ')[0];
}
import { fileUrl } from '../../files/hooks/useFile';
import RelayIcons from '../../frontend/icons/RelayIcons';
import getStopTypeInfo from '../../journeys/helpers/getStopTypeInfo';
export default function useEntityInfo(entity, id) {
    const prevEntity = useRef(entity);
    invariant(!prevEntity.current || entity === prevEntity.current, `useEntityInfo entity cannot change at runtime. Previously: ${prevEntity.current} Now: ${entity}`);
    const queryHookWrapper = (queryHook, args) => queryHook(args ?? id, { skip: !id })?.data;
    const queryHookManyWrapper = (queryHook, args) => queryHook(args, { skip: !id })?.data?.data?.[0];
    /* eslint-disable react-hooks/rules-of-hooks */
    const clientMilestoneStop = entity !== 'client-milestone-stop'
        ? null
        : queryHookWrapper(useGetClientMilestoneStopQuery);
    const questionnaireResult = entity !== 'questionnaire-result'
        ? null
        : queryHookWrapper(useGetQuestionnaireResultQuery);
    const questionnaireResultQuestionnaire = entity !== 'questionnaire-result'
        ? null
        : queryHookWrapper(useGetQuestionnaireQuery, questionnaireResult?.questionnaire);
    const clientMilestoneStopAssignedJourney = entity !== 'client-milestone-stop'
        ? null
        : queryHookWrapper(useGetAssignedJourneyQuery, clientMilestoneStop?.assignedJourney);
    const clientWorksheet = entity !== 'client-worksheet'
        ? null
        : queryHookWrapper(useGetClientWorksheetQuery);
    const clientWorksheetWorksheet = entity !== 'client-worksheet'
        ? null
        : queryHookWrapper(useGetWorksheetQuery, clientWorksheet?.worksheet);
    const clientMilestoneStopStop = clientMilestoneStopAssignedJourney && clientMilestoneStop
        ? findJourneyStop({
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
            icon: faCircle,
            hook: useGetClientQuery,
            hookMultiple: useGetClientsQuery,
        },
        category: {
            name: 'Category',
            getShortName: (doc) => doc.name,
            icon: faCircle,
            hook: useGetCategoryQuery,
            hookMultiple: useGetCategorysQuery,
        },
        practitioner: {
            name: 'Practitioner',
            url: '/practitioners',
            icon: faCircle,
            getImageUrl: (doc) => fileUrl(doc.profilePicture),
            hook: useGetPractitionerQuery,
            hookMultiple: useGetPractitionersQuery,
        },
        questionnaire: {
            canOpenInResourceManager: true,
            name: 'Questionnaire',
            url: '/questionnaires/edit',
            icon: faClipboard,
            hook: useGetQuestionnaireQuery,
            hookMultiple: useGetQuestionnairesQuery,
        },
        journey: {
            canOpenInResourceManager: true,
            name: 'Journey',
            url: '/journeys/edit',
            // icon: JourneySvg,
            hook: useGetJourneyQuery,
            hookMultiple: useGetJourneyQuery,
        },
        'journey-milestone': {
            name: 'Journey-milestone',
            url: '/journey-milestone/',
            // icon: MilestoneSvg,
        },
        'client-milestone-stop': {
            name: 'Client-milestone-stop',
            // icon: MilestoneStopSvg,
            hook: useGetClientMilestoneStopQuery,
            // Just links to the assigned journey for the client
            url: (doc) => `clients/${doc.client}/journeys/${doc.assignedJourney}`,
            getShortName: (doc) => clientMilestoneStopStop?.name ??
                (clientMilestoneStopStop
                    ? getStopTypeInfo(clientMilestoneStopStop.type)?.name
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
            hook: useGetAssignedJourneyQuery,
            hookMultiple: useGetAssignedJourneysQuery,
        },
        'assigned-resource': {
            name: 'Assigned resource',
            url: '/assigned-resource',
            // icon: JourneySvg,
            hook: useGetAssignedResourceQuery,
            hookMultiple: useGetAssignedResourcesQuery,
        },
        todo: {
            name: 'todo',
            url: (todo) => `/clients/${todo.client}/todos/${todo._id}`,
            icon: faCheckSquare,
            hook: useGetTodoQuery,
            hookMultiple: useGetTodosQuery,
        },
        content: {
            name: 'content',
            url: (_content) => `/content`,
            plural: 'content',
            icon: faPhotoVideo,
            hook: useGetContentQuery,
            hookMultiple: useGetContentsQuery,
        },
        worksheet: {
            name: 'worksheet',
            url: `/worksheets/edit`,
            canOpenInResourceManager: true,
            icon: RelayIcons.worksheet,
            hook: useGetWorksheetQuery,
            hookMultiple: useGetWorksheetsQuery,
        },
        'client-worksheet': {
            name: 'client-worksheet',
            getShortName: (doc) => clientWorksheetWorksheet?.name || '',
            url: (document) => `/clients/${document.client}/worksheets/${document._id}`,
            icon: faFileExcel,
            hook: useGetClientWorksheetQuery,
            hookMultiple: useGetClientWorksheetsQuery,
        },
        'questionnaire-result': {
            name: 'QuestionnaireResult',
            icon: faClipboard,
            getShortName: (doc) => questionnaireResultQuestionnaire?.name || '',
            url: (document) => `/clients/${document.client}/questionnaires/${document.questionnaire}/${document._id}`,
            hook: useGetQuestionnaireResultQuery,
            hookMultiple: useGetQuestionnaireResultsQuery,
        },
        appointment: {
            name: 'Appointment',
            icon: faCalendar,
            url: (document) => `/clients/${document.client}`,
            hook: useGetAppointmentQuery,
            hookMultiple: useGetAppointmentsQuery,
        },
    };
    const values = mapValues(info, (val) => {
        return {
            plural: val.name + 's',
            ...val,
        };
    });
    invariant(entity in values, `Unknown entity type: ${entity}`);
    return values[entity];
}
//# sourceMappingURL=useEntityInfo.js.map