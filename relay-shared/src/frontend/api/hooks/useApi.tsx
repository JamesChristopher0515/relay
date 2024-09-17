import { globalDepContext } from '@bbuild/deps'
import { config as mtykConfig } from '@mtyk/frontend/core/helpers/config'
import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'
import { IRelayAppointment } from 'src/appointments/types/IRelayAppointment'
import { ZodTypeAny } from 'zod'
import { wrappedAxiosDep } from '../../../core/helpers/clientAppDeps'
import {
  AppointmentSchemas,
  AssignedJourneySchemas,
  AssignedResourcesSchemas,
  CaseNoteSchema,
  CategorySchemas,
  CheckInSchema,
  ClientContentSchemas,
  ClientInsightsPresetSchemas,
  ClientMilestoneStopSchemas,
  ClientSchemas,
  ClientWorksheetSchemas,
  ContentSchemas,
  GoalSchema,
  JournalEntrySchema,
  JourneySchemas,
  LoggedEventSchemas,
  MessageSchemas,
  PracticeSchemas,
  PractitionerSchemas,
  QuestionnaireResultSchemas,
  QuestionnaireSchemas,
  ReportingStatItem,
  ResultSchema,
  TodoSchemas,
  WorksheetSchemas,
} from '../../../RelaySchema'
import {
  AssignedJourney,
  AssignedResource,
  CaseNote,
  CheckIn,
  Client,
  ClientContent,
  ClientInsightsPreset,
  ClientMilestoneStop,
  ClientWorksheet,
  Content,
  fakeType as f,
  Goal,
  Id,
  JournalEntry,
  Journey,
  JourneyStop,
  LoggedEvent,
  Message,
  Practice,
  Practitioner,
  Questionnaire,
  Result,
  Todo,
  User,
  Worksheet,
} from '../../../RelayTypes'
import { makeApiBaseQuery } from '../helpers/apiBaseQuery'
import { generateCRUD as _generateCRUD, _getMany } from '../helpers/apiCrud'
import tagTypes, { ApiTags } from '../helpers/tagTypes'
const dayjs = require('dayjs')

const methods = ['put', 'get', 'post', 'patch', 'delete'] as const
export const NO_LIMIT = 99999
export const wrappedAxios: {
  [K in (typeof methods)[number]]: (typeof axios)[K]
} = {} as any
for (const method of methods) {
  wrappedAxios[method] = (url: string, ...rest) => {
    return axios[method](mtykConfig.apiUrl + url, ...rest)
  }
}

globalDepContext.add({
  ...wrappedAxiosDep,
  value: wrappedAxios,
})

// eslint-disable-next-line prefer-const
let relayApi: any
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
    function crud<
      T extends ApiTags,
      R,
      S extends {
        read: ZodTypeAny
        create: ZodTypeAny
        update: ZodTypeAny
      }
    >(resource: T, resourceType: R, schema: S, options?: any) {
      return _generateCRUD(
        () => relayApi,
        builder,
        resource,
        resourceType,
        schema,
        options
      )
    }
    return {
      // Util
      clearAll: builder.mutation<null, void>({
        queryFn: () => {
          return { data: null }
        },
        invalidatesTags: tagTypes,
      }),

      // Users
      me: builder.query<User, void>({
        queryFn: async (arg, api, extraOptions, baseQuery: any) => {
          const { data, error } = await baseQuery({
            url: `/users/me`,
            method: 'GET',
          })
          if (error) {
            // If there's an error, don't return it to RTK because clearing all cached
            // data will not clear errors. So we get stuck with a user that doesn't exist
            // because the query won't refresh. Has to be a way around this
            return { data: null }
          } else {
            return { data }
          }
        },
        providesTags: (result, error, id) => {
          if (error) {
            return ['UNAUTHORIZED']
          } else {
            return ['User']
          }
        },
      }),

      getDevUsers: builder.query<User[], void>({
        query: (id) => {
          return {
            url: `/users/all`,
            method: 'GET',
          }
        },
      }),

      // Practices
      ...crud('Practice', f<Practice>(), PracticeSchemas),

      // Clients
      ...crud('Client', f<Client>(), ClientSchemas, {
        locallyUpdatable: ['onboardingComplete'],
      }),

      resendInvite: builder.mutation<null, Id>({
        query: (id) => {
          return {
            url: `/users/${id}/resend-invite`,
            method: 'GET',
          }
        },
      }),

      // Todos
      ...crud('Todo', f<Todo>(), TodoSchemas, {
        locallyUpdatable: ['complete'],
      }),

      getDueTodos: builder.query<Todo[], { client: string; day: string }>(
        _getMany({ resource: 'Todo', url: '/todos/due' })
      ),
      getProjectedTodos: builder.query<Todo[], { client: string; day: string }>(
        _getMany({ resource: 'Todo', url: '/todos/projected' })
      ),

      // Messages
      ...crud('Message', f<Message>(), MessageSchemas),

      markChatRead: builder.mutation<void, { chat: string }>({
        query: ({ chat }) => {
          return {
            url: `/chat/${chat}/read`,
            method: 'GET',
          }
        },
        invalidatesTags: ['Notification'],
      }),

      // Notifications
      ...crud('Notification', f<Notification>(), MessageSchemas),

      // Results
      ...crud('Result', f<Result>(), ResultSchema),

      // Questionnaires
      ...crud('Questionnaire', f<Questionnaire>(), QuestionnaireSchemas),

      // Questionnaire Results
      ...crud('QuestionnaireResult', f<any>(), QuestionnaireResultSchemas),

      createQuestionnaireAnswer: builder.mutation<
        void,
        {
          todo: string
          question: Id
          value: number
        }
      >({
        query: (args) => {
          return {
            url: `/questionnaire-result/answers`,
            method: 'POST',
            data: args,
          }
        },
        invalidatesTags: ['Todo'],
      }),

      // Content
      ...crud('Content', f<Content>(), ContentSchemas),

      // Assigned Resources
      ...crud(
        'AssignedResource',
        f<AssignedResource>(),
        AssignedResourcesSchemas
      ),

      reassignResource: builder.mutation<void, { id: string }>({
        query: ({ id }) => {
          return {
            url: `/clients/resources/${id}/reassign`,
            method: 'POST',
          }
        },
        invalidatesTags: ['AssignedResource', 'Todo'],
      }),

      // Practitioners
      ...crud('Practitioner', f<Practitioner>(), PractitionerSchemas, {
        locallyUpdatable: ['schedule'],
      }),

      // Journeys
      ...crud('Journey', f<Journey>(), JourneySchemas, {
        locallyUpdatable: [''],
        alsoInvalidates: ['AssignedJourney', 'ClientMilestoneStop'],
      }),

      getJourneySuggestions: builder.query<{ journey: Id }[], { client: Id }>({
        query: ({ client }) => {
          return {
            url: `/clients/${client}/journeys/suggestions`,
            method: 'GET',
          }
        },
        providesTags: ['JourneySuggestion'],
      }),

      // Categories
      ...crud('Category', f<{ name: string }>(), CategorySchemas),

      // Assigned Journeys
      ...crud('AssignedJourney', f<AssignedJourney>(), AssignedJourneySchemas, {
        alsoInvalidates: ['JourneySuggestion'],
      }),

      progressAssignedJourney: builder.mutation<
        void,
        {
          assignedJourney: Id
          stopId?: Id
          milestoneId?: Id
        }
      >({
        query: ({ assignedJourney, ...rest }) => {
          return {
            url: `/clients/journeys/${assignedJourney}/progress`,
            method: 'POST',
            data: rest,
          }
        },
        invalidatesTags: ['AssignedJourney', 'ClientMilestoneStop'],
      }),

      viewAssignedResource: builder.mutation<void, { assignedResource: Id }>({
        query: ({ assignedResource }) => {
          return {
            url: `/clients/resources/${assignedResource}/view`,
            method: 'PATCH',
          }
        },
      }),

      // ClientMilestoneStops
      ...crud(
        'ClientMilestoneStop',
        f<ClientMilestoneStop>(),
        ClientMilestoneStopSchemas
      ),

      getStopForClientMilestoneStop: builder.query<
        JourneyStop,
        { clientMilestoneStopId?: Id }
      >({
        query: ({ clientMilestoneStopId }) => {
          return {
            url: `/client-milestone-stops/${clientMilestoneStopId}/stop`,
            method: 'GET',
          }
        },
      }),

      // ClientInsightsPresets
      ...crud(
        'ClientInsightsPreset',
        f<ClientInsightsPreset>(),
        ClientInsightsPresetSchemas
      ),

      // LoggedEvents
      ...crud('LoggedEvent', f<LoggedEvent>(), LoggedEventSchemas),

      // CheckIns
      ...crud('CheckIn', f<CheckIn>(), CheckInSchema, {
        alsoInvalidates: ['JournalEntry'],
      }),

      // Journal Entries
      ...crud('JournalEntry', f<JournalEntry>(), JournalEntrySchema, {
        alsoInvalidates: ['CheckIn'],
      }),

      // Case Notes
      ...crud('CaseNote', f<CaseNote>(), CaseNoteSchema),

      // Appointments
      ...crud('Appointment', f<IRelayAppointment>(), AppointmentSchemas, {
        alsoInvalidates: ['Todo'],
      }),

      // Worksheets
      ...crud('Worksheet', f<Worksheet>(), WorksheetSchemas),

      // Client Worksheet
      ...crud('ClientWorksheet', f<ClientWorksheet>(), ClientWorksheetSchemas),

      createWorksheetResponse: builder.mutation<
        void,
        {
          todo: string
          item: Id
          value: any
        }
      >({
        query: (args) => {
          return {
            url: `/worksheets/answers`,
            method: 'POST',
            data: args,
          }
        },
        invalidatesTags: ['ClientWorksheet'],
      }),

      // Goals
      ...crud('Goal', f<Goal>(), GoalSchema),

      // Client resources
      ...crud('ClientContent', f<ClientContent>(), ClientContentSchemas),

      getResources: builder.query<any[], { query: string }>({
        query: (data) => ({
          url: `/resources?query=${data.query}`,
          method: 'GET',
        }),
      }),

      // ReportingStats
      getReportingStats: builder.query<
        ReportingStatItem[],
        { collectionId: Id }
      >({
        query: (data) => {
          return {
            url: `/reporting-stats`,
            method: 'GET',
            params: data,
          }
        },
      }),
    }
  },
})
relayApi = relayApi2

export const {
  useClearAllMutation,
  useMeQuery,

  useGetClientQuery,
  useGetClientsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,

  useGetTodoQuery,
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useGetProjectedTodosQuery,
  useGetDueTodosQuery,

  useResendInviteMutation,

  useGetPracticeQuery,
  useGetPracticesQuery,
  useUpdatePracticeMutation,
  useCreatePracticeMutation,
  useDeletePracticeMutation,

  useGetPractitionerQuery,
  useGetPractitionersQuery,
  useUpdatePractitionerMutation,
  useCreatePractitionerMutation,
  useDeletePractitionerMutation,

  useGetQuestionnaireQuery,
  useGetQuestionnairesQuery,
  useUpdateQuestionnaireMutation,
  useCreateQuestionnaireMutation,
  useDeleteQuestionnaireMutation,

  useGetQuestionnaireResultQuery,
  useGetQuestionnaireResultsQuery,
  useUpdateQuestionnaireResultMutation,
  useCreateQuestionnaireResultMutation,
  useDeleteQuestionnaireResultMutation,
  useCreateQuestionnaireAnswerMutation,

  useGetContentQuery,
  useGetContentsQuery,
  useUpdateContentMutation,
  useCreateContentMutation,
  useDeleteContentMutation,

  useGetMessageQuery,
  useGetMessagesQuery,
  useCreateMessageMutation,
  useMarkChatReadMutation,

  useGetResultQuery,
  useGetResultsQuery,
  useCreateResultMutation,

  useGetCategoryQuery,
  useGetCategorysQuery,

  useCreateAssignedResourceMutation,
  useUpdateAssignedResourceMutation,
  useDeleteAssignedResourceMutation,
  useGetAssignedResourcesQuery,
  useGetAssignedResourceQuery,
  useReassignResourceMutation,

  useGetJourneyQuery,
  useGetJourneysQuery,
  useCreateJourneyMutation,
  useUpdateJourneyMutation,
  useDeleteJourneyMutation,
  useGetJourneySuggestionsQuery,

  useGetWorksheetQuery,
  useGetWorksheetsQuery,
  useCreateWorksheetMutation,
  useUpdateWorksheetMutation,
  useDeleteWorksheetMutation,

  useGetClientWorksheetQuery,
  useGetClientWorksheetsQuery,
  useCreateClientWorksheetMutation,
  useUpdateClientWorksheetMutation,
  useDeleteClientWorksheetMutation,

  useGetAssignedJourneyQuery,
  useGetAssignedJourneysQuery,
  useCreateAssignedJourneyMutation,
  useDeleteAssignedJourneyMutation,
  useUpdateAssignedJourneyMutation,
  useProgressAssignedJourneyMutation,

  useGetClientMilestoneStopQuery,
  useGetClientMilestoneStopsQuery,
  useUpdateClientMilestoneStopMutation,
  useGetStopForClientMilestoneStopQuery,

  useGetClientInsightsPresetQuery,
  useGetClientInsightsPresetsQuery,
  useCreateClientInsightsPresetMutation,
  useUpdateClientInsightsPresetMutation,
  useDeleteClientInsightsPresetMutation,

  useGetLoggedEventsQuery,
  useGetLoggedEventQuery,

  useGetCheckInQuery,
  useGetCheckInsQuery,
  useCreateCheckInMutation,
  useDeleteCheckInMutation,
  useUpdateCheckInMutation,

  useGetJournalEntryQuery,
  useGetJournalEntrysQuery,
  useCreateJournalEntryMutation,
  useUpdateJournalEntryMutation,
  useDeleteJournalEntryMutation,

  useGetAppointmentQuery,
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,

  useGetRecurringAppointmentQuery,
  useGetRecurringAppointmentsQuery,
  useCreateRecurringAppointmentMutation,
  useUpdateRecurringAppointmentMutation,
  useDeleteRecurringAppointmentMutation,

  useGetCaseNoteQuery,
  useGetCaseNotesQuery,
  useCreateCaseNoteMutation,
  useUpdateCaseNoteMutation,
  useDeleteCaseNoteMutation,

  useGetGoalsQuery,
  useGetGoalQuery,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useDeleteGoalMutation,

  useGetClientContentQuery,
  useGetClientContentsQuery,
  useCreateClientContentMutation,
  useUpdateClientContentMutation,

  useGetNotificationsQuery,
  useUpdateNotificationMutation,

  useGetResourcesQuery,
  useGetReportingStatsQuery,

  // dev
  useGetDevUsersQuery,

  reducer,
  reducerPath,
  middleware,
  util,
} = relayApi2

export const getRelayApi = () => relayApi

export const useGetTodayTodos = (
  { client, day }: { client: string; day?: Date },
  args?: any,
  noPoll?: boolean
) => {
  const today = dayjs(day).startOf('day')
  return useGetDueTodosQuery(
    {
      client,
      day: today.toISOString(),
    },
    noPoll ? args : { pollingInterval: 1000 * 5, ...args }
  )
}

export const useClientJourneys = ({ client }, args?) => {
  return useGetAssignedJourneysQuery(
    {
      client,
    },
    args
  )
}
