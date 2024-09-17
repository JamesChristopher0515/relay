// import { globalDepContext } from '@bbuild/deps';
import { config as mtykConfig } from '@mtyk/frontend/core/helpers/config';
import { createApi } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { wrappedAxiosDep } from '../../../core/helpers/clientAppDeps';
import { AppointmentSchemas, AssignedJourneySchemas, AssignedResourcesSchemas, CaseNoteSchema, CategorySchemas, CheckInSchema, ClientContentSchemas, ClientInsightsPresetSchemas, ClientMilestoneStopSchemas, ClientSchemas, ClientWorksheetSchemas, ContentSchemas, GoalSchema, JournalEntrySchema, JourneySchemas, LoggedEventSchemas, MessageSchemas, PracticeSchemas, PractitionerSchemas, QuestionnaireResultSchemas, QuestionnaireSchemas, ResultSchema, TodoSchemas, WorksheetSchemas, } from '../../../RelaySchema';
import { fakeType as f, } from '../../../RelayTypes';
import { makeApiBaseQuery } from '../helpers/apiBaseQuery';
import { generateCRUD as _generateCRUD, _getMany } from '../helpers/apiCrud';
import tagTypes from '../helpers/tagTypes';
const dayjs = require('dayjs');
const methods = ['put', 'get', 'post', 'patch', 'delete'];
export const NO_LIMIT = 99999;
export const wrappedAxios = {};
for (const method of methods) {
    wrappedAxios[method] = (url, ...rest) => {
        return axios[method](mtykConfig.apiUrl + url, ...rest);
    };
}
// globalDepContext.add({
//     ...wrappedAxiosDep,
//     value: wrappedAxios,
// });
// eslint-disable-next-line prefer-const
let relayApi;
/**
 * Two separate declarations because we need to use relayApi internally, but we
 * don't have the type yet. If we don't save to var, we can't get the inferred type.
 *
 * @todo May be able to get away with just the one declaration - test this
 */
const relayApi2 = createApi({
    reducerPath: 'relay-api',
    baseQuery: makeApiBaseQuery(() => relayApi),
    tagTypes,
    endpoints: (builder) => {
        function crud(resource, resourceType, schema, options) {
            return _generateCRUD(() => relayApi, builder, resource, resourceType, schema, options);
        }
        return {
            // Util
            clearAll: builder.mutation({
                queryFn: () => {
                    return { data: null };
                },
                invalidatesTags: tagTypes,
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
            ...crud('Practice', f(), PracticeSchemas),
            // Clients
            ...crud('Client', f(), ClientSchemas, {
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
            ...crud('Todo', f(), TodoSchemas, {
                locallyUpdatable: ['complete'],
            }),
            getDueTodos: builder.query(_getMany({ resource: 'Todo', url: '/todos/due' })),
            getProjectedTodos: builder.query(_getMany({ resource: 'Todo', url: '/todos/projected' })),
            // Messages
            ...crud('Message', f(), MessageSchemas),
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
            ...crud('Notification', f(), MessageSchemas),
            // Results
            ...crud('Result', f(), ResultSchema),
            // Questionnaires
            ...crud('Questionnaire', f(), QuestionnaireSchemas),
            // Questionnaire Results
            ...crud('QuestionnaireResult', f(), QuestionnaireResultSchemas),
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
            ...crud('Content', f(), ContentSchemas),
            // Assigned Resources
            ...crud('AssignedResource', f(), AssignedResourcesSchemas),
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
            ...crud('Practitioner', f(), PractitionerSchemas, {
                locallyUpdatable: ['schedule'],
            }),
            // Journeys
            ...crud('Journey', f(), JourneySchemas, {
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
            ...crud('Category', f(), CategorySchemas),
            // Assigned Journeys
            ...crud('AssignedJourney', f(), AssignedJourneySchemas, {
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
            ...crud('ClientMilestoneStop', f(), ClientMilestoneStopSchemas),
            getStopForClientMilestoneStop: builder.query({
                query: ({ clientMilestoneStopId }) => {
                    return {
                        url: `/client-milestone-stops/${clientMilestoneStopId}/stop`,
                        method: 'GET',
                    };
                },
            }),
            // ClientInsightsPresets
            ...crud('ClientInsightsPreset', f(), ClientInsightsPresetSchemas),
            // LoggedEvents
            ...crud('LoggedEvent', f(), LoggedEventSchemas),
            // CheckIns
            ...crud('CheckIn', f(), CheckInSchema, {
                alsoInvalidates: ['JournalEntry'],
            }),
            // Journal Entries
            ...crud('JournalEntry', f(), JournalEntrySchema, {
                alsoInvalidates: ['CheckIn'],
            }),
            // Case Notes
            ...crud('CaseNote', f(), CaseNoteSchema),
            // Appointments
            ...crud('Appointment', f(), AppointmentSchemas, {
                alsoInvalidates: ['Todo'],
            }),
            // Worksheets
            ...crud('Worksheet', f(), WorksheetSchemas),
            // Client Worksheet
            ...crud('ClientWorksheet', f(), ClientWorksheetSchemas),
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
            ...crud('Goal', f(), GoalSchema),
            // Client resources
            ...crud('ClientContent', f(), ClientContentSchemas),
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
export const { useClearAllMutation, useMeQuery, useGetClientQuery, useGetClientsQuery, useCreateClientMutation, useUpdateClientMutation, useDeleteClientMutation, useGetTodoQuery, useGetTodosQuery, useCreateTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation, useGetProjectedTodosQuery, useGetDueTodosQuery, useResendInviteMutation, useGetPracticeQuery, useGetPracticesQuery, useUpdatePracticeMutation, useCreatePracticeMutation, useDeletePracticeMutation, useGetPractitionerQuery, useGetPractitionersQuery, useUpdatePractitionerMutation, useCreatePractitionerMutation, useDeletePractitionerMutation, useGetQuestionnaireQuery, useGetQuestionnairesQuery, useUpdateQuestionnaireMutation, useCreateQuestionnaireMutation, useDeleteQuestionnaireMutation, useGetQuestionnaireResultQuery, useGetQuestionnaireResultsQuery, useUpdateQuestionnaireResultMutation, useCreateQuestionnaireResultMutation, useDeleteQuestionnaireResultMutation, useCreateQuestionnaireAnswerMutation, useGetContentQuery, useGetContentsQuery, useUpdateContentMutation, useCreateContentMutation, useDeleteContentMutation, useGetMessageQuery, useGetMessagesQuery, useCreateMessageMutation, useMarkChatReadMutation, useGetResultQuery, useGetResultsQuery, useCreateResultMutation, useGetCategoryQuery, useGetCategorysQuery, useCreateAssignedResourceMutation, useUpdateAssignedResourceMutation, useDeleteAssignedResourceMutation, useGetAssignedResourcesQuery, useGetAssignedResourceQuery, useReassignResourceMutation, useGetJourneyQuery, useGetJourneysQuery, useCreateJourneyMutation, useUpdateJourneyMutation, useDeleteJourneyMutation, useGetJourneySuggestionsQuery, useGetWorksheetQuery, useGetWorksheetsQuery, useCreateWorksheetMutation, useUpdateWorksheetMutation, useDeleteWorksheetMutation, useGetClientWorksheetQuery, useGetClientWorksheetsQuery, useCreateClientWorksheetMutation, useUpdateClientWorksheetMutation, useDeleteClientWorksheetMutation, useGetAssignedJourneyQuery, useGetAssignedJourneysQuery, useCreateAssignedJourneyMutation, useDeleteAssignedJourneyMutation, useUpdateAssignedJourneyMutation, useProgressAssignedJourneyMutation, useGetClientMilestoneStopQuery, useGetClientMilestoneStopsQuery, useUpdateClientMilestoneStopMutation, useGetStopForClientMilestoneStopQuery, useGetClientInsightsPresetQuery, useGetClientInsightsPresetsQuery, useCreateClientInsightsPresetMutation, useUpdateClientInsightsPresetMutation, useDeleteClientInsightsPresetMutation, useGetLoggedEventsQuery, useGetLoggedEventQuery, useGetCheckInQuery, useGetCheckInsQuery, useCreateCheckInMutation, useDeleteCheckInMutation, useUpdateCheckInMutation, useGetJournalEntryQuery, useGetJournalEntrysQuery, useCreateJournalEntryMutation, useUpdateJournalEntryMutation, useDeleteJournalEntryMutation, useGetAppointmentQuery, useGetAppointmentsQuery, useCreateAppointmentMutation, useUpdateAppointmentMutation, useDeleteAppointmentMutation, useGetRecurringAppointmentQuery, useGetRecurringAppointmentsQuery, useCreateRecurringAppointmentMutation, useUpdateRecurringAppointmentMutation, useDeleteRecurringAppointmentMutation, useGetCaseNoteQuery, useGetCaseNotesQuery, useCreateCaseNoteMutation, useUpdateCaseNoteMutation, useDeleteCaseNoteMutation, useGetGoalsQuery, useGetGoalQuery, useCreateGoalMutation, useUpdateGoalMutation, useDeleteGoalMutation, useGetClientContentQuery, useGetClientContentsQuery, useCreateClientContentMutation, useUpdateClientContentMutation, useGetNotificationsQuery, useUpdateNotificationMutation, useGetResourcesQuery, useGetReportingStatsQuery,
    // dev
    useGetDevUsersQuery, reducer, reducerPath, middleware, util, } = relayApi2;
export const getRelayApi = () => relayApi;
export const useGetTodayTodos = ({ client, day }, args, noPoll) => {
    const today = dayjs(day).startOf('day');
    return useGetDueTodosQuery({
        client,
        day: today.toISOString(),
    }, noPoll ? args : { pollingInterval: 1000 * 5, ...args });
};
export const useClientJourneys = ({ client }, args) => {
    return useGetAssignedJourneysQuery({
        client,
    }, args);
};
//# sourceMappingURL=useApi.js.map