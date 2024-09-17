import { mapValues } from 'lodash'
import { ZodSchema, z } from 'zod'
import { Id } from './frontend/api/helpers/apiTypes'
import { User, WorksheetItem } from './RelayTypes'
import getAllResourceTypes from './resources/helpers/getAllResourceTypes'
type Schema = ZodSchema<any, any, any>

type SchemaOrComputed = Schema | ((user: User) => Schema | Promise<Schema>)

export interface FieldAccessMap<
  C extends SchemaOrComputed,
  U extends SchemaOrComputed,
  R extends SchemaOrComputed
> {
  create: C
  update: U
  read: R
}

// TODO be more strict?
export const clientObjectId = z.string().regex(/^[a-f\d]{24}$/i)

/**
 * Have to allow "null" as string because axios won't automatically add null as
 * a query parameter
 */
export const clientNull = z
  .literal('null')
  .transform((val) => null)
  .or(z.null())

/**
 * A schema that always fails, for when updating or creating shouldn't be
 * possible from the client-side
 */
export const neverSchema = z.any().refine((_obj) => {
  throw new Error('Failing')
})

const sharedFields = {
  category: clientObjectId.optional(),
}

export const jsonObjectOrObject = (actualSchema) =>
  z.union([
    actualSchema,
    z
      .string()
      .refine((val) => {
        try {
          const asObj = JSON.parse(val)
          return (
            typeof asObj === 'object' && !actualSchema.safeParse(asObj).error
          )
          // eslint-disable-next-line no-empty
        } catch (e) { }
        return false
      })
      .transform((val) => JSON.parse(val)),
  ])

export const boolStringOrBoolean = z.union([
  z.boolean(),
  z
    .string()
    .refine((val) => {
      return val === 'true' || val === 'false'
    })
    .transform((val) => val === 'true'),
])

export const parsedIntOrNumber = z.union([
  z.number(),
  z
    .string()
    .refine((val) => {
      try {
        const asNum = parseInt(val, 10)
        return !isNaN(asNum)
        // eslint-disable-next-line no-empty
      } catch (e) { }
      return false
    })
    .transform((val) => parseInt(val, 10)),
])
export const parsedIntOrNumberLiteral = (l: number) =>
  z.union([
    z.literal(l),
    z
      .literal(String(l))
      .refine((val) => {
        try {
          const asNum = parseInt(val, 10)
          return !isNaN(asNum)
          // eslint-disable-next-line no-empty
        } catch (e) { }
        return false
      })
      .transform((val) => parseInt(val, 10)),
  ])

export const isoString = z
  .string()
  .refine((val) => {
    const asDate = new Date(val)
    return !isNaN(asDate.getTime())
  })
  .transform((val) => new Date(val))
const dateOrString = z.union([z.date(), isoString])
const dateRange = jsonObjectOrObject(
  z.object({
    $gte: dateOrString.optional(),
    $lt: dateOrString.optional(),
  })
).transform((val) => {
  // Fixes an assumed bug with zod where nested transforms don't bubble up to higher levels
  return mapValues(val, (v) => new Date(v))
})

const ScheduleSchema = z.object({
  days: z.array(
    z.object({
      enabled: z.boolean(),
      start: dateOrString,
      end: dateOrString,
    })
  ),
})
export const PractitionerSchemas = {
  read: z.object({}),
  create: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string(),
    practice: clientObjectId,
  }),
  update: z
    .object({
      name: z.string(),
      profilePicture: clientObjectId.nullable().optional(),
      role: z.string(),
      email: z.string(),
      lastViewedClient: clientObjectId,
      lastViewedPracticePage: z.string(),
      schedule: ScheduleSchema,
      chatCtrlEnterSends: z.boolean(),
    })
    .partial(),
}
export const AddressSchema = z.object({
  addressLine: z.array(z.string()),
  city: z.string(),
  region: z.string(),
  postalCode: z.string(),
  country: z.string(),
})

const practiceSchemaCU = z.object({
  email: z.string().email(),
  name: z.string(),
  stripeSource: z.string().optional(),
  phone: z.string(),
  practitionerAdmin: z.object({
    name: z.string(),
    phone: z.string(),
    email: z.string().email(),
  }),
})
export const PracticeSchemas = {
  read: z.object({}),
  create: practiceSchemaCU,
  update: practiceSchemaCU.partial(),
}
export const ClientSchemas = {
  read: z.object({
    practitioner: z.string().optional(),
  }),
  create: z.object({
    address: AddressSchema,
    email: z.string().optional(),
    mobile: z.string().optional(),
    username: z.string().optional(),
    name: z.string(),
    practitioner: clientObjectId,
    onboardingResources: z.array(z.string()).optional(),
  }),
  update: z
    .object({
      expoPushToken: z.string().nullable(),
      username: z.string().optional(),
      address: AddressSchema,
      email: z.string().email(),
      mobile: z.string(),
      name: z.string(),
      onboardingComplete: z.boolean().optional(),
      practitioner: clientObjectId,
      checkInOptions: z.any(), // TODO
      chatEnabled: z.boolean().optional(),
      settings: z
        .object({
          altEnterSendsMessages: z.boolean(),
          health: z
            .object({
              steps: z.boolean(),
              distance: z.boolean(),
              sleep: z.boolean(),
            })
            .partial(),
        })
        .partial(),
    })
    .partial(),
}

export const TodoSchemas = {
  read: z.object({
    questionnaire: clientObjectId.or(clientNull).optional(),
    content: clientObjectId.or(clientNull).optional(),
    client: clientObjectId,
    appointmentId: clientObjectId.or(clientNull).optional(),
    assignedResource: clientObjectId.or(clientNull).optional(),
    assigned: dateRange.optional(),
    complete: z.boolean().optional(),
  }),
  create: z.object({
    name: z.string(),
    description: z.string().default(''),
    client: clientObjectId,
    assigned: dateOrString,
    reissue: z.string().nullable(),
  }),
  update: z
    .object({
      name: z.string(),
      assigned: dateOrString,
      description: z.string(),
      reissue: z.string().nullable(),
      complete: z.boolean(),
    })
    .partial(),
}

export const ResultSchema = {
  read: z.object({
    client: clientObjectId,
  }),
  create: z.object({
    type: z.string(),
    value: z.any().optional(),
  }),
  update: z.object({}),
}
export const CheckInSchema = {
  read: z.object({
    client: clientObjectId,
    createdAt: dateRange.optional(),
  }),
  create: z.object({
    client: clientObjectId,
    feelings: z.array(z.any()).min(1),
    reasons: z.array(z.any()),
    journalEntry: z.any().optional(), // TODO fix
    tags: z.array(z.string()).default([]).optional(),
  }),
  update: z.object({}),
}
export const JournalEntrySchema = {
  read: z.object({
    client: clientObjectId,
  }),
  create: z.object({
    client: clientObjectId,
    title: z.string().optional(),
    private: z.boolean().optional(),
    body: z.string(),
    checkIn: clientObjectId.optional(),
  }),
  update: z.object({
    title: z.string(),
    private: z.boolean().optional(),
    body: z.string(),
  }),
}
export const CaseNoteSchema = {
  read: z.object({
    client: clientObjectId,
  }),
  create: z.object({
    client: clientObjectId,
    title: z.string().optional(),
    body: z.string(),
    checkIn: clientObjectId.optional(),
  }),
  update: z.object({
    title: z.string(),
    body: z.string(),
  }),
}
export const GoalSchema = {
  read: z.object({
    client: clientObjectId,
  }),
  create: z.object({
    client: clientObjectId,
    goal: z.string(),
  }),
  update: z.object({
    goal: z.string(),
  }),
}

export const MessageSchemas = {
  read: z.object({
    client: clientObjectId,
    practitioner: clientObjectId,
  }),
  create: z.object({
    content: z.string(),
    client: clientObjectId,
    practitioner: clientObjectId, // backend figures out who its from from the request, just need to identify the conversation
  }),
  update: neverSchema,
}

export const QuestionnaireSchemas = {
  read: z.object({
    category: sharedFields.category,
    id: z.string().optional(),
    archived: boolStringOrBoolean.optional(),
  }),
  create: z.any(),
  update: z.any(),
}
export const QuestionnaireResultSchemas = {
  read: z.any(),
  create: z.object({
    questionnaire: clientObjectId,
    todo: z.string().optional(),
    sections: z.array(z.any()),
  }),
  update: z.object({}),
}
export const ContentSchemas = {
  read: z.object({
    category: sharedFields.category,
    archived: boolStringOrBoolean.optional(),
  }),
  create: z.any(),
  update: z.object({
    category: clientObjectId.optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(['file', 'web']).optional(),
    web: z.object({ href: z.string() }).optional(),
    file: z.object({ file: clientObjectId }).optional(),
    archived: boolStringOrBoolean.optional(),
  }),
}
export const CategorySchemas = {
  read: z.object({}),
  create: neverSchema,
  update: neverSchema,
}
export const AssignedResourcesSchemas = {
  read: z.any(),
  create: z.object({
    type: z.enum(getAllResourceTypes() as any),
    questionnaire: clientObjectId.optional(),
    content: clientObjectId.optional(),
    showBefore: z.string().optional(),
    showAfter: z.string().optional(),
    client: clientObjectId,
    clientMilestoneStop: clientObjectId.optional(),
    shuffle: z.boolean().default(false),
    initialTodo: z.object({
      assigned: dateOrString,
      assignedJourney: clientObjectId.optional(),
      reissue: z.string().optional(),
    }),
  }),
  update: z.object({
    shuffle: z.boolean().default(false),
    initialTodo: z.object({
      assigned: dateOrString,
      reissue: z.string().optional(),
    }),
  }),
}

export const NotificationSchemas = {
  read: z.object({
    'value.clientStop': clientObjectId.optional(),
    type: z.string().optional(),
    aboutUser: clientObjectId.optional(),
  }),
  create: neverSchema,
  update: z.object({
    read: z.boolean(),
  }),
}

export const JourneyQuestionnaireStopData = (objectId) =>
  z.object({
    questionnaire: objectId,
    outputMap: z.object({
      outputIndex: z.number(),
      map: z.array(
        z
          .object({
            type: z.enum(['continue', 'restart', 'review', 'jump']),
            data: z.any(),
          })
          .refine((obj) => {
            const dataSchemas = {
              jump: z.object({
                jumpTo: z.object({
                  milestone: objectId,
                  stop: objectId,
                }),
              }),
            }
            const dataSchema = dataSchemas[obj.type] ?? z.object({})
            const { success, ...rest } = dataSchema.safeParse(obj.data)
            if (rest.error) {
              console.error(rest.error.message)
            }
            return success
          })
      ),
    }),
  })

export const JourneyStopTypes = [
  'content',
  'questionnaire',
  'todo',
  'delay',
  'thinking-points',
  'review',
  'worksheet',
] as const
export const JourneyStopDataSchemas = (objectId) => {
  const specific = {
    questionnaire: JourneyQuestionnaireStopData(objectId),
    content: z.object({
      content: objectId,
    }),
    todo: z.object({
      name: z.string(),
      description: z.string(),
      mandatory: z.boolean(),
    }),
    worksheet: z.object({
      worksheet: objectId,
    }),
    delay: z.object({
      schedule: z.string(),
    }),
    'thinking-points': z.object({
      title: z.string(),
      points: z.array(z.string()),
    }),
    review: z.object({}),
  }
  return mapValues(specific, (schema: any) => z.object({}).extend(schema.shape))
}

export const JourneySchemas = {
  read: z.object({
    category: sharedFields.category,
  }),
  create: z.any(),
  update: z.any(),
}
export const AssignedJourneySchemas = {
  read: z.object({
    category: sharedFields.category,
    client: clientObjectId,
    // nids: z.array(z.string()),
  }),
  create: z.object({
    journey: clientObjectId,
    client: clientObjectId,
  }),
  update: z.object({}),
}
export const ClientMilestoneStopSchemas = {
  read: z.object({ assignedJourney: clientObjectId }),
  create: neverSchema,
  update: neverSchema,
}

export const ClientInsightsPresetSchemas = {
  read: z.object({ client: clientObjectId.optional() }),
  create: z.any(),
  update: z.any(),
}

export const ClientContentSchemas = {
  read: z.object({
    client: clientObjectId.optional(),
    resource: clientObjectId.optional(),
    isFavourite: boolStringOrBoolean.optional(),
    isAssigned: boolStringOrBoolean.optional(),
  }),
  create: z.object({
    client: clientObjectId,
    isFavourite: z.boolean(),
    resource: clientObjectId,
  }),
  update: z.object({
    isFavourite: z.boolean().optional(),
    lastViewed: isoString.optional(),
  }),
}

export const AppointmentSchemas = {
  read: z.object({
    clientId: clientObjectId,
    date: dateRange.optional(),
  }),
  create: z.object({
    clientId: clientObjectId,
    practitionerId: clientObjectId,
    date: isoString,
  }),
  update: z.object({
    endedAt: isoString.optional(),
    date: isoString.optional(),
  }),
}
export const RecurringAppointmentSchemas = {
  read: z.object({
    clientId: clientObjectId,
  }),
  create: z.object({
    clientId: clientObjectId,
    practitionerId: clientObjectId,
    pattern: z.string(),
    time: isoString,
    endingOn: isoString.optional(),
    startingOn: isoString,
  }),
  update: z.object({}),
}

export const CaseNoteSchemas = {
  read: z.object({
    client: clientObjectId,
  }),
  create: z.object({
    client: clientObjectId,
    title: z.string().optional(),
    body: z.string(),
  }),
  update: z.object({
    title: z.string(),
    body: z.string(),
  }),
}
export enum ClientInsightsWidgetTypes {
  HowImFeeling = 'how-im-feeling',
  QuestionnaireResult = 'questionnaire-result',
  CheckIn = 'check-in',
  Todo = 'todo',
  WordCloud = 'word-cloud',
  Journey = 'journey',
  Graph = 'graph',
  Health = 'health',
  Relay = 'relay',
}

export const ClientInsightsWidgetTypesVal = Object.values(
  ClientInsightsWidgetTypes
) as ClientInsightsWidgetTypeStr[]
export type AllClientInsightsWidgetTypes = Record<
  ClientInsightsWidgetTypes,
  string
>
export type ClientInsightsWidgetTypeStr = keyof AllClientInsightsWidgetTypes

const WidgetGraphSchema = z.object({
  collections: z.array(
    z.object({
      collectionId: z.string(),
    })
  ),
  zoomLevel: z.number().default(1),
})
export type WidgetGraphData = z.infer<typeof WidgetGraphSchema>

/**
 * @param {objectIdSchema} any - The schema for the objectId, so we can use on
 *   both client/server with proper checks
 */
export function ClientInsightsWidgetSchemas(objectIdSchema: any) {
  const specific = {
    /**
     * ### Normal view appearance
     *
     * - `"daily-week"` - shows day-by-day moods for 7 days. If multiple moods,
     *   shows stacked in a single circle (can mouse over to see individual)
     * - `"daily-month"` - shows day-by-day moods for 28 days (4 rows of 7)
     * - `"grouped"` - shows as a pie chart, split up by emotion group, great, ok etc...
     *
     * ### Comparison view appearance
     *
     * - `"daily-week"` - same as above, row for before and after. if not enough
     *   days in time range, just greys out those days
     * - `"daily-month"` - same as above, but can only show half the time (latest
     *   2 weeks for both). if not enough days in time range, just greys out those days
     * - `"grouped"` - shows as a pie chart, split up by emotion group, great, ok etc...
     */
    'how-im-feeling': z.object({
      appearance: z.enum([
        'daily-week',
        // 'daily-month',
        // 'grouped',
      ] as const),
    }),

    /**
     * ### Normal view appearance
     *
     * - `"latest"` just shows the latest result
     * - `"timeline"` shows the latest result and as many previous results, up to
     *   a limit defined by the UI
     *
     * ### Comparison view appearance
     *
     * - `"latest"` shows the latest result, and average result from selected time
     *   range (if available) to the left
     * - `"timeline"` shows the latest result, results from the selected time
     *   range, and the graph equivalent of an ellipsis in between (an expanded
     *   view can be shown on the individual questionnaire result page @see
     *   QuestionnaireResultPage)
     */
    'questionnaire-result': z.object({
      questionnaire: objectIdSchema,
      appearance: z.enum(['timeline', 'latest'] as const),
    }),

    /** `health` maps to different types of health stats */
    health: z.object({
      health: z.string(),
      appearance: z.enum(['latest', 'weekly']),
    }),

    /**
     * Same as `"how-im-feeling"` but with check boxes instead, with the
     * addition of `"completion-rate"` which shows how often check-in is
     * completed when expected
     */
    'check-in': z.object({
      appearance: z.enum([
        'individual-week',
        'individual-month',
        'completion-rate',
      ] as const),
    }),

    /**
     * Same as check-in, but as todos recur at their own schedule, we just show
     * an item for each recurrence. Not necessarily split up by day.
     */
    todo: z.object({
      todo: objectIdSchema,
      appearance: z.enum([
        'individual-small',
        'individual-large',
        // 'completion-rate',
      ] as const),
    }),

    'word-cloud': z.object({
      appearance: z.enum(['default'] as const),
    }),

    /**
     * Track the progress of a single journey. In comparison mode, shows a
     * side-by-side comparison of progress at the end of selected time range
     */
    journey: z.object({
      journey: objectIdSchema,
      appearance: z.enum(['current-progress']),
    }),

    relay: z.object({ appearance: z.enum(['default'] as const) }),

    graph: WidgetGraphSchema,
  } as const
  return specific
}

export type ReportingStatDataTypesInner = object | boolean | number | string
export type CollectionDataTypes =
  | 'scalar'
  | 'percent'
  | 'set'
  | 'boolean'
  | 'object'
export type ForCollectionType<T extends CollectionDataTypes> =
  T extends 'scalar'
  ? number
  : T extends 'percent'
  ? number
  : T extends 'set'
  ? ReportingStatDataTypesInner[]
  : T extends 'boolean'
  ? boolean
  : object

/** @todo Better named as ReportingStatValueType, represents "value" field */
export type ReportingStatDataTypes =
  | ReportingStatDataTypesInner
  | ReportingStatDataTypesInner[]

export type NewReportingStatItem<T extends ReportingStatDataTypes = any> = {
  date: Date
  collectionId: Id
  _collectionId: Id
  value: T
}

export type ReportingStatItem<
  T extends ReportingStatDataTypes = any,
  DataType = any
> = NewReportingStatItem<T> & { collection: string; data: DataType }

export const LoggedEventSchemas = {
  read: z.object({
    client: clientObjectId,
    questionnaireResult: clientObjectId.optional(),
    exclude: z.array(z.string()).optional(),
    type: z.string().optional(),
    createdAt: dateRange.optional(),
  }),
  create: neverSchema,
  update: neverSchema,
}

export const WorksheetStopTypes = [
  'message',
  'worksheet',
  'image',
  'response-text',
  'response-buttons',
  'section-start',
] as const
export type WorksheetStopType = (typeof WorksheetStopTypes)[number]

export const WorksheetAnswerTypes = ['text'] as const
export type WorksheetAnswerType = (typeof WorksheetAnswerTypes)[number]

const WorksheetItemSchema = {
  message: z.object({ message: z.string().trim() }),
  image: z.object({ file: z.string().optional() }),
  ['response-text']: z.object({}),
  ['response-buttons']: z.object({
    buttons: z.array(
      z.object({
        _id: clientObjectId,
        label: z.string().trim(),
      })
    ),
  }),
  ['section-start']: z.object({}),
  worksheet: z.object({
    maxRowCount: z.number().default(0),
    columns: z.array(
      z.object({
        question: z.string().trim(),
        placeholder: z.string().trim().default(''),
        _id: clientObjectId,
        answerType: z.enum(WorksheetAnswerTypes),
      })
    ),
  }),
} as const

export type WorksheetItemType<T extends WorksheetStopType> = Omit<
  WorksheetItem,
  'data'
> & {
  data: z.infer<(typeof WorksheetItemSchema)[T]>
}

export const WorksheetItemSchemas = (objectId?: any) => {
  return mapValues(WorksheetItemSchema, (schema: any) =>
    z.object({}).extend(schema.shape)
  )
}

export const WorksheetCreateUpdate = z.object({
  sections: z.array(z.any()),
  description: z.string().trim(),
  name: z.string().trim(),
  category: sharedFields.category,
})

export const WorksheetSchemas = {
  read: z.object({
    category: sharedFields.category,
  }),
  create: WorksheetCreateUpdate.extend({
    revisedFrom: clientObjectId.optional(),
  }),
  update: WorksheetCreateUpdate.extend({}),
}

export const ClientWorksheetSchemas = {
  read: z.object({
    todo: clientObjectId,
  }),
  create: z.object({}),
  update: z.object({}),
}
