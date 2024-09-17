"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCreateResultMutation = exports.useGetResultsQuery = exports.useGetResultQuery = exports.useMarkChatReadMutation = exports.useCreateMessageMutation = exports.useGetMessagesQuery = exports.useGetMessageQuery = exports.useDeleteContentMutation = exports.useCreateContentMutation = exports.useUpdateContentMutation = exports.useGetContentsQuery = exports.useGetContentQuery = exports.useCreateQuestionnaireAnswerMutation = exports.useDeleteQuestionnaireResultMutation = exports.useCreateQuestionnaireResultMutation = exports.useUpdateQuestionnaireResultMutation = exports.useGetQuestionnaireResultsQuery = exports.useGetQuestionnaireResultQuery = exports.useDeleteQuestionnaireMutation = exports.useCreateQuestionnaireMutation = exports.useUpdateQuestionnaireMutation = exports.useGetQuestionnairesQuery = exports.useGetQuestionnaireQuery = exports.useDeletePractitionerMutation = exports.useCreatePractitionerMutation = exports.useUpdatePractitionerMutation = exports.useGetPractitionersQuery = exports.useGetPractitionerQuery = exports.useDeletePracticeMutation = exports.useCreatePracticeMutation = exports.useUpdatePracticeMutation = exports.useGetPracticesQuery = exports.useGetPracticeQuery = exports.useResendInviteMutation = exports.useGetDueTodosQuery = exports.useGetProjectedTodosQuery = exports.useDeleteTodoMutation = exports.useUpdateTodoMutation = exports.useCreateTodoMutation = exports.useGetTodosQuery = exports.useGetTodoQuery = exports.useDeleteClientMutation = exports.useUpdateClientMutation = exports.useCreateClientMutation = exports.useGetClientsQuery = exports.useGetClientQuery = exports.useMeQuery = exports.useClearAllMutation = exports.wrappedAxios = exports.NO_LIMIT = void 0;
exports.useUpdateJournalEntryMutation = exports.useCreateJournalEntryMutation = exports.useGetJournalEntrysQuery = exports.useGetJournalEntryQuery = exports.useUpdateCheckInMutation = exports.useDeleteCheckInMutation = exports.useCreateCheckInMutation = exports.useGetCheckInsQuery = exports.useGetCheckInQuery = exports.useGetLoggedEventQuery = exports.useGetLoggedEventsQuery = exports.useDeleteClientInsightsPresetMutation = exports.useUpdateClientInsightsPresetMutation = exports.useCreateClientInsightsPresetMutation = exports.useGetClientInsightsPresetsQuery = exports.useGetClientInsightsPresetQuery = exports.useGetStopForClientMilestoneStopQuery = exports.useUpdateClientMilestoneStopMutation = exports.useGetClientMilestoneStopsQuery = exports.useGetClientMilestoneStopQuery = exports.useProgressAssignedJourneyMutation = exports.useUpdateAssignedJourneyMutation = exports.useDeleteAssignedJourneyMutation = exports.useCreateAssignedJourneyMutation = exports.useGetAssignedJourneysQuery = exports.useGetAssignedJourneyQuery = exports.useDeleteClientWorksheetMutation = exports.useUpdateClientWorksheetMutation = exports.useCreateClientWorksheetMutation = exports.useGetClientWorksheetsQuery = exports.useGetClientWorksheetQuery = exports.useDeleteWorksheetMutation = exports.useUpdateWorksheetMutation = exports.useCreateWorksheetMutation = exports.useGetWorksheetsQuery = exports.useGetWorksheetQuery = exports.useGetJourneySuggestionsQuery = exports.useDeleteJourneyMutation = exports.useUpdateJourneyMutation = exports.useCreateJourneyMutation = exports.useGetJourneysQuery = exports.useGetJourneyQuery = exports.useReassignResourceMutation = exports.useGetAssignedResourceQuery = exports.useGetAssignedResourcesQuery = exports.useDeleteAssignedResourceMutation = exports.useUpdateAssignedResourceMutation = exports.useCreateAssignedResourceMutation = exports.useGetCategorysQuery = exports.useGetCategoryQuery = void 0;
exports.useClientJourneys = exports.useGetTodayTodos = exports.getRelayApi = exports.util = exports.middleware = exports.reducerPath = exports.reducer = exports.useGetDevUsersQuery = exports.useGetReportingStatsQuery = exports.useGetResourcesQuery = exports.useUpdateNotificationMutation = exports.useGetNotificationsQuery = exports.useUpdateClientContentMutation = exports.useCreateClientContentMutation = exports.useGetClientContentsQuery = exports.useGetClientContentQuery = exports.useDeleteGoalMutation = exports.useUpdateGoalMutation = exports.useCreateGoalMutation = exports.useGetGoalQuery = exports.useGetGoalsQuery = exports.useDeleteCaseNoteMutation = exports.useUpdateCaseNoteMutation = exports.useCreateCaseNoteMutation = exports.useGetCaseNotesQuery = exports.useGetCaseNoteQuery = exports.useDeleteRecurringAppointmentMutation = exports.useUpdateRecurringAppointmentMutation = exports.useCreateRecurringAppointmentMutation = exports.useGetRecurringAppointmentsQuery = exports.useGetRecurringAppointmentQuery = exports.useDeleteAppointmentMutation = exports.useUpdateAppointmentMutation = exports.useCreateAppointmentMutation = exports.useGetAppointmentsQuery = exports.useGetAppointmentQuery = exports.useDeleteJournalEntryMutation = void 0;
const deps_1 = require("@bbuild/deps");
const config_1 = require("@mtyk/frontend/core/helpers/config");
const react_1 = require("@reduxjs/toolkit/query/react");
const axios_1 = __importDefault(require("axios"));
const clientAppDeps_1 = require("../../../core/helpers/clientAppDeps");
const RelaySchema_1 = require("../../../RelaySchema");
const RelayTypes_1 = require("../../../RelayTypes");
const apiBaseQuery_1 = require("../helpers/apiBaseQuery");
const apiCrud_1 = require("../helpers/apiCrud");
const tagTypes_1 = __importDefault(require("../helpers/tagTypes"));
const dayjs = require('dayjs');
const methods = ['put', 'get', 'post', 'patch', 'delete'];
exports.NO_LIMIT = 99999;
exports.wrappedAxios = {};
for (const method of methods) {
    exports.wrappedAxios[method] = (url, ...rest) => {
        return axios_1.default[method](config_1.config.apiUrl + url, ...rest);
    };
}
deps_1.globalDepContext.add({
    ...clientAppDeps_1.wrappedAxiosDep,
    value: exports.wrappedAxios,
});
// eslint-disable-next-line prefer-const
let relayApi;
/**
 * Two separate declarations because we need to use relayApi internally, but we
 * don't have the type yet. If we don't save to var, we can't get the inferred type.
 *
 * @todo May be able to get away with just the one declaration - test this
 */
const relayApi2 = (0, react_1.createApi)({
    reducerPath: 'relay-api',
    baseQuery: (0, apiBaseQuery_1.makeApiBaseQuery)(() => relayApi),
    tagTypes: tagTypes_1.default,
    endpoints: (builder) => {
        function crud(resource, resourceType, schema, options) {
            return (0, apiCrud_1.generateCRUD)(() => relayApi, builder, resource, resourceType, schema, options);
        }
        return {
            // Util
            clearAll: builder.mutation({
                queryFn: () => {
                    return { data: null };
                },
                invalidatesTags: tagTypes_1.default,
            }),
            // Users
            me: builder.query({
                queryFn: async (arg, api, extraOptions, baseQuery) => {
                    const { data, error } = await baseQuery({
                        url: `/users/me`,
                        method: 'GET',
                    });
                    if (error) {
                        // If there's an error, don't return it to RTK because clearing all cached
                        // data will not clear errors. So we get stuck with a user that doesn't exist
                        // because the query won't refresh. Has to be a way around this
                        return { data: null };
                    }
                    else {
                        return { data };
                    }
                },
                providesTags: (result, error, id) => {
                    if (error) {
                        return ['UNAUTHORIZED'];
                    }
                    else {
                        return ['User'];
                    }
                },
            }),
            getDevUsers: builder.query({
                query: (id) => {
                    return {
                        url: `/users/all`,
                        method: 'GET',
                    };
                },
            }),
            // Practices
            ...crud('Practice', (0, RelayTypes_1.fakeType)(), RelaySchema_1.PracticeSchemas),
            // Clients
            ...crud('Client', (0, RelayTypes_1.fakeType)(), RelaySchema_1.ClientSchemas, {
                locallyUpdatable: ['onboardingComplete'],
            }),
            resendInvite: builder.mutation({
                query: (id) => {
                    return {
                        url: `/users/${id}/resend-invite`,
                        method: 'GET',
                    };
                },
            }),
            // Todos
            ...crud('Todo', (0, RelayTypes_1.fakeType)(), RelaySchema_1.TodoSchemas, {
                locallyUpdatable: ['complete'],
            }),
            getDueTodos: builder.query((0, apiCrud_1._getMany)({ resource: 'Todo', url: '/todos/due' })),
            getProjectedTodos: builder.query((0, apiCrud_1._getMany)({ resource: 'Todo', url: '/todos/projected' })),
            // Messages
            ...crud('Message', (0, RelayTypes_1.fakeType)(), RelaySchema_1.MessageSchemas),
            markChatRead: builder.mutation({
                query: ({ chat }) => {
                    return {
                        url: `/chat/${chat}/read`,
                        method: 'GET',
                    };
                },
                invalidatesTags: ['Notification'],
            }),
            // Notifications
            ...crud('Notification', (0, RelayTypes_1.fakeType)(), RelaySchema_1.MessageSchemas),
            // Results
            ...crud('Result', (0, RelayTypes_1.fakeType)(), RelaySchema_1.ResultSchema),
            // Questionnaires
            ...crud('Questionnaire', (0, RelayTypes_1.fakeType)(), RelaySchema_1.QuestionnaireSchemas),
            // Questionnaire Results
            ...crud('QuestionnaireResult', (0, RelayTypes_1.fakeType)(), RelaySchema_1.QuestionnaireResultSchemas),
            createQuestionnaireAnswer: builder.mutation({
                query: (args) => {
                    return {
                        url: `/questionnaire-result/answers`,
                        method: 'POST',
                        data: args,
                    };
                },
                invalidatesTags: ['Todo'],
            }),
            // Content
            ...crud('Content', (0, RelayTypes_1.fakeType)(), RelaySchema_1.ContentSchemas),
            // Assigned Resources
            ...crud('AssignedResource', (0, RelayTypes_1.fakeType)(), RelaySchema_1.AssignedResourcesSchemas),
            reassignResource: builder.mutation({
                query: ({ id }) => {
                    return {
                        url: `/clients/resources/${id}/reassign`,
                        method: 'POST',
                    };
                },
                invalidatesTags: ['AssignedResource', 'Todo'],
            }),
            // Practitioners
            ...crud('Practitioner', (0, RelayTypes_1.fakeType)(), RelaySchema_1.PractitionerSchemas, {
                locallyUpdatable: ['schedule'],
            }),
            // Journeys
            ...crud('Journey', (0, RelayTypes_1.fakeType)(), RelaySchema_1.JourneySchemas, {
                locallyUpdatable: [''],
                alsoInvalidates: ['AssignedJourney', 'ClientMilestoneStop'],
            }),
            getJourneySuggestions: builder.query({
                query: ({ client }) => {
                    return {
                        url: `/clients/${client}/journeys/suggestions`,
                        method: 'GET',
                    };
                },
                providesTags: ['JourneySuggestion'],
            }),
            // Categories
            ...crud('Category', (0, RelayTypes_1.fakeType)(), RelaySchema_1.CategorySchemas),
            // Assigned Journeys
            ...crud('AssignedJourney', (0, RelayTypes_1.fakeType)(), RelaySchema_1.AssignedJourneySchemas, {
                alsoInvalidates: ['JourneySuggestion'],
            }),
            progressAssignedJourney: builder.mutation({
                query: ({ assignedJourney, ...rest }) => {
                    return {
                        url: `/clients/journeys/${assignedJourney}/progress`,
                        method: 'POST',
                        data: rest,
                    };
                },
                invalidatesTags: ['AssignedJourney', 'ClientMilestoneStop'],
            }),
            viewAssignedResource: builder.mutation({
                query: ({ assignedResource }) => {
                    return {
                        url: `/clients/resources/${assignedResource}/view`,
                        method: 'PATCH',
                    };
                },
            }),
            // ClientMilestoneStops
            ...crud('ClientMilestoneStop', (0, RelayTypes_1.fakeType)(), RelaySchema_1.ClientMilestoneStopSchemas),
            getStopForClientMilestoneStop: builder.query({
                query: ({ clientMilestoneStopId }) => {
                    return {
                        url: `/client-milestone-stops/${clientMilestoneStopId}/stop`,
                        method: 'GET',
                    };
                },
            }),
            // ClientInsightsPresets
            ...crud('ClientInsightsPreset', (0, RelayTypes_1.fakeType)(), RelaySchema_1.ClientInsightsPresetSchemas),
            // LoggedEvents
            ...crud('LoggedEvent', (0, RelayTypes_1.fakeType)(), RelaySchema_1.LoggedEventSchemas),
            // CheckIns
            ...crud('CheckIn', (0, RelayTypes_1.fakeType)(), RelaySchema_1.CheckInSchema, {
                alsoInvalidates: ['JournalEntry'],
            }),
            // Journal Entries
            ...crud('JournalEntry', (0, RelayTypes_1.fakeType)(), RelaySchema_1.JournalEntrySchema, {
                alsoInvalidates: ['CheckIn'],
            }),
            // Case Notes
            ...crud('CaseNote', (0, RelayTypes_1.fakeType)(), RelaySchema_1.CaseNoteSchema),
            // Appointments
            ...crud('Appointment', (0, RelayTypes_1.fakeType)(), RelaySchema_1.AppointmentSchemas, {
                alsoInvalidates: ['Todo'],
            }),
            // Worksheets
            ...crud('Worksheet', (0, RelayTypes_1.fakeType)(), RelaySchema_1.WorksheetSchemas),
            // Client Worksheet
            ...crud('ClientWorksheet', (0, RelayTypes_1.fakeType)(), RelaySchema_1.ClientWorksheetSchemas),
            createWorksheetResponse: builder.mutation({
                query: (args) => {
                    return {
                        url: `/worksheets/answers`,
                        method: 'POST',
                        data: args,
                    };
                },
                invalidatesTags: ['ClientWorksheet'],
            }),
            // Goals
            ...crud('Goal', (0, RelayTypes_1.fakeType)(), RelaySchema_1.GoalSchema),
            // Client resources
            ...crud('ClientContent', (0, RelayTypes_1.fakeType)(), RelaySchema_1.ClientContentSchemas),
            getResources: builder.query({
                query: (data) => ({
                    url: `/resources?query=${data.query}`,
                    method: 'GET',
                }),
            }),
            // ReportingStats
            getReportingStats: builder.query({
                query: (data) => {
                    return {
                        url: `/reporting-stats`,
                        method: 'GET',
                        params: data,
                    };
                },
            }),
        };
    },
});
relayApi = relayApi2;
exports.useClearAllMutation = relayApi2.useClearAllMutation, exports.useMeQuery = relayApi2.useMeQuery, exports.useGetClientQuery = relayApi2.useGetClientQuery, exports.useGetClientsQuery = relayApi2.useGetClientsQuery, exports.useCreateClientMutation = relayApi2.useCreateClientMutation, exports.useUpdateClientMutation = relayApi2.useUpdateClientMutation, exports.useDeleteClientMutation = relayApi2.useDeleteClientMutation, exports.useGetTodoQuery = relayApi2.useGetTodoQuery, exports.useGetTodosQuery = relayApi2.useGetTodosQuery, exports.useCreateTodoMutation = relayApi2.useCreateTodoMutation, exports.useUpdateTodoMutation = relayApi2.useUpdateTodoMutation, exports.useDeleteTodoMutation = relayApi2.useDeleteTodoMutation, exports.useGetProjectedTodosQuery = relayApi2.useGetProjectedTodosQuery, exports.useGetDueTodosQuery = relayApi2.useGetDueTodosQuery, exports.useResendInviteMutation = relayApi2.useResendInviteMutation, exports.useGetPracticeQuery = relayApi2.useGetPracticeQuery, exports.useGetPracticesQuery = relayApi2.useGetPracticesQuery, exports.useUpdatePracticeMutation = relayApi2.useUpdatePracticeMutation, exports.useCreatePracticeMutation = relayApi2.useCreatePracticeMutation, exports.useDeletePracticeMutation = relayApi2.useDeletePracticeMutation, exports.useGetPractitionerQuery = relayApi2.useGetPractitionerQuery, exports.useGetPractitionersQuery = relayApi2.useGetPractitionersQuery, exports.useUpdatePractitionerMutation = relayApi2.useUpdatePractitionerMutation, exports.useCreatePractitionerMutation = relayApi2.useCreatePractitionerMutation, exports.useDeletePractitionerMutation = relayApi2.useDeletePractitionerMutation, exports.useGetQuestionnaireQuery = relayApi2.useGetQuestionnaireQuery, exports.useGetQuestionnairesQuery = relayApi2.useGetQuestionnairesQuery, exports.useUpdateQuestionnaireMutation = relayApi2.useUpdateQuestionnaireMutation, exports.useCreateQuestionnaireMutation = relayApi2.useCreateQuestionnaireMutation, exports.useDeleteQuestionnaireMutation = relayApi2.useDeleteQuestionnaireMutation, exports.useGetQuestionnaireResultQuery = relayApi2.useGetQuestionnaireResultQuery, exports.useGetQuestionnaireResultsQuery = relayApi2.useGetQuestionnaireResultsQuery, exports.useUpdateQuestionnaireResultMutation = relayApi2.useUpdateQuestionnaireResultMutation, exports.useCreateQuestionnaireResultMutation = relayApi2.useCreateQuestionnaireResultMutation, exports.useDeleteQuestionnaireResultMutation = relayApi2.useDeleteQuestionnaireResultMutation, exports.useCreateQuestionnaireAnswerMutation = relayApi2.useCreateQuestionnaireAnswerMutation, exports.useGetContentQuery = relayApi2.useGetContentQuery, exports.useGetContentsQuery = relayApi2.useGetContentsQuery, exports.useUpdateContentMutation = relayApi2.useUpdateContentMutation, exports.useCreateContentMutation = relayApi2.useCreateContentMutation, exports.useDeleteContentMutation = relayApi2.useDeleteContentMutation, exports.useGetMessageQuery = relayApi2.useGetMessageQuery, exports.useGetMessagesQuery = relayApi2.useGetMessagesQuery, exports.useCreateMessageMutation = relayApi2.useCreateMessageMutation, exports.useMarkChatReadMutation = relayApi2.useMarkChatReadMutation, exports.useGetResultQuery = relayApi2.useGetResultQuery, exports.useGetResultsQuery = relayApi2.useGetResultsQuery, exports.useCreateResultMutation = relayApi2.useCreateResultMutation, exports.useGetCategoryQuery = relayApi2.useGetCategoryQuery, exports.useGetCategorysQuery = relayApi2.useGetCategorysQuery, exports.useCreateAssignedResourceMutation = relayApi2.useCreateAssignedResourceMutation, exports.useUpdateAssignedResourceMutation = relayApi2.useUpdateAssignedResourceMutation, exports.useDeleteAssignedResourceMutation = relayApi2.useDeleteAssignedResourceMutation, exports.useGetAssignedResourcesQuery = relayApi2.useGetAssignedResourcesQuery, exports.useGetAssignedResourceQuery = relayApi2.useGetAssignedResourceQuery, exports.useReassignResourceMutation = relayApi2.useReassignResourceMutation, exports.useGetJourneyQuery = relayApi2.useGetJourneyQuery, exports.useGetJourneysQuery = relayApi2.useGetJourneysQuery, exports.useCreateJourneyMutation = relayApi2.useCreateJourneyMutation, exports.useUpdateJourneyMutation = relayApi2.useUpdateJourneyMutation, exports.useDeleteJourneyMutation = relayApi2.useDeleteJourneyMutation, exports.useGetJourneySuggestionsQuery = relayApi2.useGetJourneySuggestionsQuery, exports.useGetWorksheetQuery = relayApi2.useGetWorksheetQuery, exports.useGetWorksheetsQuery = relayApi2.useGetWorksheetsQuery, exports.useCreateWorksheetMutation = relayApi2.useCreateWorksheetMutation, exports.useUpdateWorksheetMutation = relayApi2.useUpdateWorksheetMutation, exports.useDeleteWorksheetMutation = relayApi2.useDeleteWorksheetMutation, exports.useGetClientWorksheetQuery = relayApi2.useGetClientWorksheetQuery, exports.useGetClientWorksheetsQuery = relayApi2.useGetClientWorksheetsQuery, exports.useCreateClientWorksheetMutation = relayApi2.useCreateClientWorksheetMutation, exports.useUpdateClientWorksheetMutation = relayApi2.useUpdateClientWorksheetMutation, exports.useDeleteClientWorksheetMutation = relayApi2.useDeleteClientWorksheetMutation, exports.useGetAssignedJourneyQuery = relayApi2.useGetAssignedJourneyQuery, exports.useGetAssignedJourneysQuery = relayApi2.useGetAssignedJourneysQuery, exports.useCreateAssignedJourneyMutation = relayApi2.useCreateAssignedJourneyMutation, exports.useDeleteAssignedJourneyMutation = relayApi2.useDeleteAssignedJourneyMutation, exports.useUpdateAssignedJourneyMutation = relayApi2.useUpdateAssignedJourneyMutation, exports.useProgressAssignedJourneyMutation = relayApi2.useProgressAssignedJourneyMutation, exports.useGetClientMilestoneStopQuery = relayApi2.useGetClientMilestoneStopQuery, exports.useGetClientMilestoneStopsQuery = relayApi2.useGetClientMilestoneStopsQuery, exports.useUpdateClientMilestoneStopMutation = relayApi2.useUpdateClientMilestoneStopMutation, exports.useGetStopForClientMilestoneStopQuery = relayApi2.useGetStopForClientMilestoneStopQuery, exports.useGetClientInsightsPresetQuery = relayApi2.useGetClientInsightsPresetQuery, exports.useGetClientInsightsPresetsQuery = relayApi2.useGetClientInsightsPresetsQuery, exports.useCreateClientInsightsPresetMutation = relayApi2.useCreateClientInsightsPresetMutation, exports.useUpdateClientInsightsPresetMutation = relayApi2.useUpdateClientInsightsPresetMutation, exports.useDeleteClientInsightsPresetMutation = relayApi2.useDeleteClientInsightsPresetMutation, exports.useGetLoggedEventsQuery = relayApi2.useGetLoggedEventsQuery, exports.useGetLoggedEventQuery = relayApi2.useGetLoggedEventQuery, exports.useGetCheckInQuery = relayApi2.useGetCheckInQuery, exports.useGetCheckInsQuery = relayApi2.useGetCheckInsQuery, exports.useCreateCheckInMutation = relayApi2.useCreateCheckInMutation, exports.useDeleteCheckInMutation = relayApi2.useDeleteCheckInMutation, exports.useUpdateCheckInMutation = relayApi2.useUpdateCheckInMutation, exports.useGetJournalEntryQuery = relayApi2.useGetJournalEntryQuery, exports.useGetJournalEntrysQuery = relayApi2.useGetJournalEntrysQuery, exports.useCreateJournalEntryMutation = relayApi2.useCreateJournalEntryMutation, exports.useUpdateJournalEntryMutation = relayApi2.useUpdateJournalEntryMutation, exports.useDeleteJournalEntryMutation = relayApi2.useDeleteJournalEntryMutation, exports.useGetAppointmentQuery = relayApi2.useGetAppointmentQuery, exports.useGetAppointmentsQuery = relayApi2.useGetAppointmentsQuery, exports.useCreateAppointmentMutation = relayApi2.useCreateAppointmentMutation, exports.useUpdateAppointmentMutation = relayApi2.useUpdateAppointmentMutation, exports.useDeleteAppointmentMutation = relayApi2.useDeleteAppointmentMutation, exports.useGetRecurringAppointmentQuery = relayApi2.useGetRecurringAppointmentQuery, exports.useGetRecurringAppointmentsQuery = relayApi2.useGetRecurringAppointmentsQuery, exports.useCreateRecurringAppointmentMutation = relayApi2.useCreateRecurringAppointmentMutation, exports.useUpdateRecurringAppointmentMutation = relayApi2.useUpdateRecurringAppointmentMutation, exports.useDeleteRecurringAppointmentMutation = relayApi2.useDeleteRecurringAppointmentMutation, exports.useGetCaseNoteQuery = relayApi2.useGetCaseNoteQuery, exports.useGetCaseNotesQuery = relayApi2.useGetCaseNotesQuery, exports.useCreateCaseNoteMutation = relayApi2.useCreateCaseNoteMutation, exports.useUpdateCaseNoteMutation = relayApi2.useUpdateCaseNoteMutation, exports.useDeleteCaseNoteMutation = relayApi2.useDeleteCaseNoteMutation, exports.useGetGoalsQuery = relayApi2.useGetGoalsQuery, exports.useGetGoalQuery = relayApi2.useGetGoalQuery, exports.useCreateGoalMutation = relayApi2.useCreateGoalMutation, exports.useUpdateGoalMutation = relayApi2.useUpdateGoalMutation, exports.useDeleteGoalMutation = relayApi2.useDeleteGoalMutation, exports.useGetClientContentQuery = relayApi2.useGetClientContentQuery, exports.useGetClientContentsQuery = relayApi2.useGetClientContentsQuery, exports.useCreateClientContentMutation = relayApi2.useCreateClientContentMutation, exports.useUpdateClientContentMutation = relayApi2.useUpdateClientContentMutation, exports.useGetNotificationsQuery = relayApi2.useGetNotificationsQuery, exports.useUpdateNotificationMutation = relayApi2.useUpdateNotificationMutation, exports.useGetResourcesQuery = relayApi2.useGetResourcesQuery, exports.useGetReportingStatsQuery = relayApi2.useGetReportingStatsQuery, 
// dev
exports.useGetDevUsersQuery = relayApi2.useGetDevUsersQuery, exports.reducer = relayApi2.reducer, exports.reducerPath = relayApi2.reducerPath, exports.middleware = relayApi2.middleware, exports.util = relayApi2.util;
const getRelayApi = () => relayApi;
exports.getRelayApi = getRelayApi;
const useGetTodayTodos = ({ client, day }, args, noPoll) => {
    const today = dayjs(day).startOf('day');
    return (0, exports.useGetDueTodosQuery)({
        client,
        day: today.toISOString(),
    }, noPoll ? args : { pollingInterval: 1000 * 5, ...args });
};
exports.useGetTodayTodos = useGetTodayTodos;
const useClientJourneys = ({ client }, args) => {
    return (0, exports.useGetAssignedJourneysQuery)({
        client,
    }, args);
};
exports.useClientJourneys = useClientJourneys;
//# sourceMappingURL=useApi.js.map