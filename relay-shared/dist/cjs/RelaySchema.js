"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientWorksheetSchemas = exports.WorksheetSchemas = exports.WorksheetCreateUpdate = exports.WorksheetItemSchemas = exports.WorksheetAnswerTypes = exports.WorksheetStopTypes = exports.LoggedEventSchemas = exports.ClientInsightsWidgetSchemas = exports.ClientInsightsWidgetTypesVal = exports.ClientInsightsWidgetTypes = exports.CaseNoteSchemas = exports.RecurringAppointmentSchemas = exports.AppointmentSchemas = exports.ClientContentSchemas = exports.ClientInsightsPresetSchemas = exports.ClientMilestoneStopSchemas = exports.AssignedJourneySchemas = exports.JourneySchemas = exports.JourneyStopDataSchemas = exports.JourneyStopTypes = exports.JourneyQuestionnaireStopData = exports.NotificationSchemas = exports.AssignedResourcesSchemas = exports.CategorySchemas = exports.ContentSchemas = exports.QuestionnaireResultSchemas = exports.QuestionnaireSchemas = exports.MessageSchemas = exports.GoalSchema = exports.CaseNoteSchema = exports.JournalEntrySchema = exports.CheckInSchema = exports.ResultSchema = exports.TodoSchemas = exports.ClientSchemas = exports.PracticeSchemas = exports.AddressSchema = exports.PractitionerSchemas = exports.isoString = exports.parsedIntOrNumberLiteral = exports.parsedIntOrNumber = exports.boolStringOrBoolean = exports.jsonObjectOrObject = exports.neverSchema = exports.clientNull = exports.clientObjectId = void 0;
const lodash_1 = require("lodash");
const zod_1 = require("zod");
const getAllResourceTypes_1 = __importDefault(require("./resources/helpers/getAllResourceTypes"));
// TODO be more strict?
exports.clientObjectId = zod_1.z.string().regex(/^[a-f\d]{24}$/i);
/**
 * Have to allow "null" as string because axios won't automatically add null as
 * a query parameter
 */
exports.clientNull = zod_1.z
    .literal('null')
    .transform((val) => null)
    .or(zod_1.z.null());
/**
 * A schema that always fails, for when updating or creating shouldn't be
 * possible from the client-side
 */
exports.neverSchema = zod_1.z.any().refine((_obj) => {
    throw new Error('Failing');
});
const sharedFields = {
    category: exports.clientObjectId.optional(),
};
const jsonObjectOrObject = (actualSchema) => zod_1.z.union([
    actualSchema,
    zod_1.z
        .string()
        .refine((val) => {
        try {
            const asObj = JSON.parse(val);
            return (typeof asObj === 'object' && !actualSchema.safeParse(asObj).error);
            // eslint-disable-next-line no-empty
        }
        catch (e) { }
        return false;
    })
        .transform((val) => JSON.parse(val)),
]);
exports.jsonObjectOrObject = jsonObjectOrObject;
exports.boolStringOrBoolean = zod_1.z.union([
    zod_1.z.boolean(),
    zod_1.z
        .string()
        .refine((val) => {
        return val === 'true' || val === 'false';
    })
        .transform((val) => val === 'true'),
]);
exports.parsedIntOrNumber = zod_1.z.union([
    zod_1.z.number(),
    zod_1.z
        .string()
        .refine((val) => {
        try {
            const asNum = parseInt(val, 10);
            return !isNaN(asNum);
            // eslint-disable-next-line no-empty
        }
        catch (e) { }
        return false;
    })
        .transform((val) => parseInt(val, 10)),
]);
const parsedIntOrNumberLiteral = (l) => zod_1.z.union([
    zod_1.z.literal(l),
    zod_1.z
        .literal(String(l))
        .refine((val) => {
        try {
            const asNum = parseInt(val, 10);
            return !isNaN(asNum);
            // eslint-disable-next-line no-empty
        }
        catch (e) { }
        return false;
    })
        .transform((val) => parseInt(val, 10)),
]);
exports.parsedIntOrNumberLiteral = parsedIntOrNumberLiteral;
exports.isoString = zod_1.z
    .string()
    .refine((val) => {
    const asDate = new Date(val);
    return !isNaN(asDate.getTime());
})
    .transform((val) => new Date(val));
const dateOrString = zod_1.z.union([zod_1.z.date(), exports.isoString]);
const dateRange = (0, exports.jsonObjectOrObject)(zod_1.z.object({
    $gte: dateOrString.optional(),
    $lt: dateOrString.optional(),
})).transform((val) => {
    // Fixes an assumed bug with zod where nested transforms don't bubble up to higher levels
    return (0, lodash_1.mapValues)(val, (v) => new Date(v));
});
const ScheduleSchema = zod_1.z.object({
    days: zod_1.z.array(zod_1.z.object({
        enabled: zod_1.z.boolean(),
        start: dateOrString,
        end: dateOrString,
    })),
});
exports.PractitionerSchemas = {
    read: zod_1.z.object({}),
    create: zod_1.z.object({
        name: zod_1.z.string(),
        role: zod_1.z.string(),
        email: zod_1.z.string(),
        practice: exports.clientObjectId,
    }),
    update: zod_1.z
        .object({
        name: zod_1.z.string(),
        profilePicture: exports.clientObjectId.nullable().optional(),
        role: zod_1.z.string(),
        email: zod_1.z.string(),
        lastViewedClient: exports.clientObjectId,
        lastViewedPracticePage: zod_1.z.string(),
        schedule: ScheduleSchema,
        chatCtrlEnterSends: zod_1.z.boolean(),
    })
        .partial(),
};
exports.AddressSchema = zod_1.z.object({
    addressLine: zod_1.z.array(zod_1.z.string()),
    city: zod_1.z.string(),
    region: zod_1.z.string(),
    postalCode: zod_1.z.string(),
    country: zod_1.z.string(),
});
const practiceSchemaCU = zod_1.z.object({
    email: zod_1.z.string().email(),
    name: zod_1.z.string(),
    stripeSource: zod_1.z.string().optional(),
    phone: zod_1.z.string(),
    practitionerAdmin: zod_1.z.object({
        name: zod_1.z.string(),
        phone: zod_1.z.string(),
        email: zod_1.z.string().email(),
    }),
});
exports.PracticeSchemas = {
    read: zod_1.z.object({}),
    create: practiceSchemaCU,
    update: practiceSchemaCU.partial(),
};
exports.ClientSchemas = {
    read: zod_1.z.object({
        practitioner: zod_1.z.string().optional(),
    }),
    create: zod_1.z.object({
        address: exports.AddressSchema,
        email: zod_1.z.string().optional(),
        mobile: zod_1.z.string().optional(),
        username: zod_1.z.string().optional(),
        name: zod_1.z.string(),
        practitioner: exports.clientObjectId,
        onboardingResources: zod_1.z.array(zod_1.z.string()).optional(),
    }),
    update: zod_1.z
        .object({
        expoPushToken: zod_1.z.string().nullable(),
        username: zod_1.z.string().optional(),
        address: exports.AddressSchema,
        email: zod_1.z.string().email(),
        mobile: zod_1.z.string(),
        name: zod_1.z.string(),
        onboardingComplete: zod_1.z.boolean().optional(),
        practitioner: exports.clientObjectId,
        checkInOptions: zod_1.z.any(),
        chatEnabled: zod_1.z.boolean().optional(),
        settings: zod_1.z
            .object({
            altEnterSendsMessages: zod_1.z.boolean(),
            health: zod_1.z
                .object({
                steps: zod_1.z.boolean(),
                distance: zod_1.z.boolean(),
                sleep: zod_1.z.boolean(),
            })
                .partial(),
        })
            .partial(),
    })
        .partial(),
};
exports.TodoSchemas = {
    read: zod_1.z.object({
        questionnaire: exports.clientObjectId.or(exports.clientNull).optional(),
        content: exports.clientObjectId.or(exports.clientNull).optional(),
        client: exports.clientObjectId,
        appointmentId: exports.clientObjectId.or(exports.clientNull).optional(),
        assignedResource: exports.clientObjectId.or(exports.clientNull).optional(),
        assigned: dateRange.optional(),
        complete: zod_1.z.boolean().optional(),
    }),
    create: zod_1.z.object({
        name: zod_1.z.string(),
        description: zod_1.z.string().default(''),
        client: exports.clientObjectId,
        assigned: dateOrString,
        reissue: zod_1.z.string().nullable(),
    }),
    update: zod_1.z
        .object({
        name: zod_1.z.string(),
        assigned: dateOrString,
        description: zod_1.z.string(),
        reissue: zod_1.z.string().nullable(),
        complete: zod_1.z.boolean(),
    })
        .partial(),
};
exports.ResultSchema = {
    read: zod_1.z.object({
        client: exports.clientObjectId,
    }),
    create: zod_1.z.object({
        type: zod_1.z.string(),
        value: zod_1.z.any().optional(),
    }),
    update: zod_1.z.object({}),
};
exports.CheckInSchema = {
    read: zod_1.z.object({
        client: exports.clientObjectId,
        createdAt: dateRange.optional(),
    }),
    create: zod_1.z.object({
        client: exports.clientObjectId,
        feelings: zod_1.z.array(zod_1.z.any()).min(1),
        reasons: zod_1.z.array(zod_1.z.any()),
        journalEntry: zod_1.z.any().optional(),
        tags: zod_1.z.array(zod_1.z.string()).default([]).optional(),
    }),
    update: zod_1.z.object({}),
};
exports.JournalEntrySchema = {
    read: zod_1.z.object({
        client: exports.clientObjectId,
    }),
    create: zod_1.z.object({
        client: exports.clientObjectId,
        title: zod_1.z.string().optional(),
        private: zod_1.z.boolean().optional(),
        body: zod_1.z.string(),
        checkIn: exports.clientObjectId.optional(),
    }),
    update: zod_1.z.object({
        title: zod_1.z.string(),
        private: zod_1.z.boolean().optional(),
        body: zod_1.z.string(),
    }),
};
exports.CaseNoteSchema = {
    read: zod_1.z.object({
        client: exports.clientObjectId,
    }),
    create: zod_1.z.object({
        client: exports.clientObjectId,
        title: zod_1.z.string().optional(),
        body: zod_1.z.string(),
        checkIn: exports.clientObjectId.optional(),
    }),
    update: zod_1.z.object({
        title: zod_1.z.string(),
        body: zod_1.z.string(),
    }),
};
exports.GoalSchema = {
    read: zod_1.z.object({
        client: exports.clientObjectId,
    }),
    create: zod_1.z.object({
        client: exports.clientObjectId,
        goal: zod_1.z.string(),
    }),
    update: zod_1.z.object({
        goal: zod_1.z.string(),
    }),
};
exports.MessageSchemas = {
    read: zod_1.z.object({
        client: exports.clientObjectId,
        practitioner: exports.clientObjectId,
    }),
    create: zod_1.z.object({
        content: zod_1.z.string(),
        client: exports.clientObjectId,
        practitioner: exports.clientObjectId, // backend figures out who its from from the request, just need to identify the conversation
    }),
    update: exports.neverSchema,
};
exports.QuestionnaireSchemas = {
    read: zod_1.z.object({
        category: sharedFields.category,
        id: zod_1.z.string().optional(),
        archived: exports.boolStringOrBoolean.optional(),
    }),
    create: zod_1.z.any(),
    update: zod_1.z.any(),
};
exports.QuestionnaireResultSchemas = {
    read: zod_1.z.any(),
    create: zod_1.z.object({
        questionnaire: exports.clientObjectId,
        todo: zod_1.z.string().optional(),
        sections: zod_1.z.array(zod_1.z.any()),
    }),
    update: zod_1.z.object({}),
};
exports.ContentSchemas = {
    read: zod_1.z.object({
        category: sharedFields.category,
        archived: exports.boolStringOrBoolean.optional(),
    }),
    create: zod_1.z.any(),
    update: zod_1.z.object({
        category: exports.clientObjectId.optional(),
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        type: zod_1.z.enum(['file', 'web']).optional(),
        web: zod_1.z.object({ href: zod_1.z.string() }).optional(),
        file: zod_1.z.object({ file: exports.clientObjectId }).optional(),
        archived: exports.boolStringOrBoolean.optional(),
    }),
};
exports.CategorySchemas = {
    read: zod_1.z.object({}),
    create: exports.neverSchema,
    update: exports.neverSchema,
};
exports.AssignedResourcesSchemas = {
    read: zod_1.z.any(),
    create: zod_1.z.object({
        type: zod_1.z.enum((0, getAllResourceTypes_1.default)()),
        questionnaire: exports.clientObjectId.optional(),
        content: exports.clientObjectId.optional(),
        showBefore: zod_1.z.string().optional(),
        showAfter: zod_1.z.string().optional(),
        client: exports.clientObjectId,
        clientMilestoneStop: exports.clientObjectId.optional(),
        shuffle: zod_1.z.boolean().default(false),
        initialTodo: zod_1.z.object({
            assigned: dateOrString,
            assignedJourney: exports.clientObjectId.optional(),
            reissue: zod_1.z.string().optional(),
        }),
    }),
    update: zod_1.z.object({
        shuffle: zod_1.z.boolean().default(false),
        initialTodo: zod_1.z.object({
            assigned: dateOrString,
            reissue: zod_1.z.string().optional(),
        }),
    }),
};
exports.NotificationSchemas = {
    read: zod_1.z.object({
        'value.clientStop': exports.clientObjectId.optional(),
        type: zod_1.z.string().optional(),
        aboutUser: exports.clientObjectId.optional(),
    }),
    create: exports.neverSchema,
    update: zod_1.z.object({
        read: zod_1.z.boolean(),
    }),
};
const JourneyQuestionnaireStopData = (objectId) => zod_1.z.object({
    questionnaire: objectId,
    outputMap: zod_1.z.object({
        outputIndex: zod_1.z.number(),
        map: zod_1.z.array(zod_1.z
            .object({
            type: zod_1.z.enum(['continue', 'restart', 'review', 'jump']),
            data: zod_1.z.any(),
        })
            .refine((obj) => {
            const dataSchemas = {
                jump: zod_1.z.object({
                    jumpTo: zod_1.z.object({
                        milestone: objectId,
                        stop: objectId,
                    }),
                }),
            };
            const dataSchema = dataSchemas[obj.type] ?? zod_1.z.object({});
            const { success, ...rest } = dataSchema.safeParse(obj.data);
            if (rest.error) {
                console.error(rest.error.message);
            }
            return success;
        })),
    }),
});
exports.JourneyQuestionnaireStopData = JourneyQuestionnaireStopData;
exports.JourneyStopTypes = [
    'content',
    'questionnaire',
    'todo',
    'delay',
    'thinking-points',
    'review',
    'worksheet',
];
const JourneyStopDataSchemas = (objectId) => {
    const specific = {
        questionnaire: (0, exports.JourneyQuestionnaireStopData)(objectId),
        content: zod_1.z.object({
            content: objectId,
        }),
        todo: zod_1.z.object({
            name: zod_1.z.string(),
            description: zod_1.z.string(),
            mandatory: zod_1.z.boolean(),
        }),
        worksheet: zod_1.z.object({
            worksheet: objectId,
        }),
        delay: zod_1.z.object({
            schedule: zod_1.z.string(),
        }),
        'thinking-points': zod_1.z.object({
            title: zod_1.z.string(),
            points: zod_1.z.array(zod_1.z.string()),
        }),
        review: zod_1.z.object({}),
    };
    return (0, lodash_1.mapValues)(specific, (schema) => zod_1.z.object({}).extend(schema.shape));
};
exports.JourneyStopDataSchemas = JourneyStopDataSchemas;
exports.JourneySchemas = {
    read: zod_1.z.object({
        category: sharedFields.category,
    }),
    create: zod_1.z.any(),
    update: zod_1.z.any(),
};
exports.AssignedJourneySchemas = {
    read: zod_1.z.object({
        category: sharedFields.category,
        client: exports.clientObjectId,
        // nids: z.array(z.string()),
    }),
    create: zod_1.z.object({
        journey: exports.clientObjectId,
        client: exports.clientObjectId,
    }),
    update: zod_1.z.object({}),
};
exports.ClientMilestoneStopSchemas = {
    read: zod_1.z.object({ assignedJourney: exports.clientObjectId }),
    create: exports.neverSchema,
    update: exports.neverSchema,
};
exports.ClientInsightsPresetSchemas = {
    read: zod_1.z.object({ client: exports.clientObjectId.optional() }),
    create: zod_1.z.any(),
    update: zod_1.z.any(),
};
exports.ClientContentSchemas = {
    read: zod_1.z.object({
        client: exports.clientObjectId.optional(),
        resource: exports.clientObjectId.optional(),
        isFavourite: exports.boolStringOrBoolean.optional(),
        isAssigned: exports.boolStringOrBoolean.optional(),
    }),
    create: zod_1.z.object({
        client: exports.clientObjectId,
        isFavourite: zod_1.z.boolean(),
        resource: exports.clientObjectId,
    }),
    update: zod_1.z.object({
        isFavourite: zod_1.z.boolean().optional(),
        lastViewed: exports.isoString.optional(),
    }),
};
exports.AppointmentSchemas = {
    read: zod_1.z.object({
        clientId: exports.clientObjectId,
        date: dateRange.optional(),
    }),
    create: zod_1.z.object({
        clientId: exports.clientObjectId,
        practitionerId: exports.clientObjectId,
        date: exports.isoString,
    }),
    update: zod_1.z.object({
        endedAt: exports.isoString.optional(),
        date: exports.isoString.optional(),
    }),
};
exports.RecurringAppointmentSchemas = {
    read: zod_1.z.object({
        clientId: exports.clientObjectId,
    }),
    create: zod_1.z.object({
        clientId: exports.clientObjectId,
        practitionerId: exports.clientObjectId,
        pattern: zod_1.z.string(),
        time: exports.isoString,
        endingOn: exports.isoString.optional(),
        startingOn: exports.isoString,
    }),
    update: zod_1.z.object({}),
};
exports.CaseNoteSchemas = {
    read: zod_1.z.object({
        client: exports.clientObjectId,
    }),
    create: zod_1.z.object({
        client: exports.clientObjectId,
        title: zod_1.z.string().optional(),
        body: zod_1.z.string(),
    }),
    update: zod_1.z.object({
        title: zod_1.z.string(),
        body: zod_1.z.string(),
    }),
};
var ClientInsightsWidgetTypes;
(function (ClientInsightsWidgetTypes) {
    ClientInsightsWidgetTypes["HowImFeeling"] = "how-im-feeling";
    ClientInsightsWidgetTypes["QuestionnaireResult"] = "questionnaire-result";
    ClientInsightsWidgetTypes["CheckIn"] = "check-in";
    ClientInsightsWidgetTypes["Todo"] = "todo";
    ClientInsightsWidgetTypes["WordCloud"] = "word-cloud";
    ClientInsightsWidgetTypes["Journey"] = "journey";
    ClientInsightsWidgetTypes["Graph"] = "graph";
    ClientInsightsWidgetTypes["Health"] = "health";
    ClientInsightsWidgetTypes["Relay"] = "relay";
})(ClientInsightsWidgetTypes = exports.ClientInsightsWidgetTypes || (exports.ClientInsightsWidgetTypes = {}));
exports.ClientInsightsWidgetTypesVal = Object.values(ClientInsightsWidgetTypes);
const WidgetGraphSchema = zod_1.z.object({
    collections: zod_1.z.array(zod_1.z.object({
        collectionId: zod_1.z.string(),
    })),
    zoomLevel: zod_1.z.number().default(1),
});
/**
 * @param {objectIdSchema} any - The schema for the objectId, so we can use on
 *   both client/server with proper checks
 */
function ClientInsightsWidgetSchemas(objectIdSchema) {
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
        'how-im-feeling': zod_1.z.object({
            appearance: zod_1.z.enum([
                'daily-week',
                // 'daily-month',
                // 'grouped',
            ]),
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
        'questionnaire-result': zod_1.z.object({
            questionnaire: objectIdSchema,
            appearance: zod_1.z.enum(['timeline', 'latest']),
        }),
        /** `health` maps to different types of health stats */
        health: zod_1.z.object({
            health: zod_1.z.string(),
            appearance: zod_1.z.enum(['latest', 'weekly']),
        }),
        /**
         * Same as `"how-im-feeling"` but with check boxes instead, with the
         * addition of `"completion-rate"` which shows how often check-in is
         * completed when expected
         */
        'check-in': zod_1.z.object({
            appearance: zod_1.z.enum([
                'individual-week',
                'individual-month',
                'completion-rate',
            ]),
        }),
        /**
         * Same as check-in, but as todos recur at their own schedule, we just show
         * an item for each recurrence. Not necessarily split up by day.
         */
        todo: zod_1.z.object({
            todo: objectIdSchema,
            appearance: zod_1.z.enum([
                'individual-small',
                'individual-large',
                // 'completion-rate',
            ]),
        }),
        'word-cloud': zod_1.z.object({
            appearance: zod_1.z.enum(['default']),
        }),
        /**
         * Track the progress of a single journey. In comparison mode, shows a
         * side-by-side comparison of progress at the end of selected time range
         */
        journey: zod_1.z.object({
            journey: objectIdSchema,
            appearance: zod_1.z.enum(['current-progress']),
        }),
        relay: zod_1.z.object({ appearance: zod_1.z.enum(['default']) }),
        graph: WidgetGraphSchema,
    };
    return specific;
}
exports.ClientInsightsWidgetSchemas = ClientInsightsWidgetSchemas;
exports.LoggedEventSchemas = {
    read: zod_1.z.object({
        client: exports.clientObjectId,
        questionnaireResult: exports.clientObjectId.optional(),
        exclude: zod_1.z.array(zod_1.z.string()).optional(),
        type: zod_1.z.string().optional(),
        createdAt: dateRange.optional(),
    }),
    create: exports.neverSchema,
    update: exports.neverSchema,
};
exports.WorksheetStopTypes = [
    'message',
    'worksheet',
    'image',
    'response-text',
    'response-buttons',
    'section-start',
];
exports.WorksheetAnswerTypes = ['text'];
const WorksheetItemSchema = {
    message: zod_1.z.object({ message: zod_1.z.string().trim() }),
    image: zod_1.z.object({ file: zod_1.z.string().optional() }),
    ['response-text']: zod_1.z.object({}),
    ['response-buttons']: zod_1.z.object({
        buttons: zod_1.z.array(zod_1.z.object({
            _id: exports.clientObjectId,
            label: zod_1.z.string().trim(),
        })),
    }),
    ['section-start']: zod_1.z.object({}),
    worksheet: zod_1.z.object({
        maxRowCount: zod_1.z.number().default(0),
        columns: zod_1.z.array(zod_1.z.object({
            question: zod_1.z.string().trim(),
            placeholder: zod_1.z.string().trim().default(''),
            _id: exports.clientObjectId,
            answerType: zod_1.z.enum(exports.WorksheetAnswerTypes),
        })),
    }),
};
const WorksheetItemSchemas = (objectId) => {
    return (0, lodash_1.mapValues)(WorksheetItemSchema, (schema) => zod_1.z.object({}).extend(schema.shape));
};
exports.WorksheetItemSchemas = WorksheetItemSchemas;
exports.WorksheetCreateUpdate = zod_1.z.object({
    sections: zod_1.z.array(zod_1.z.any()),
    description: zod_1.z.string().trim(),
    name: zod_1.z.string().trim(),
    category: sharedFields.category,
});
exports.WorksheetSchemas = {
    read: zod_1.z.object({
        category: sharedFields.category,
    }),
    create: exports.WorksheetCreateUpdate.extend({
        revisedFrom: exports.clientObjectId.optional(),
    }),
    update: exports.WorksheetCreateUpdate.extend({}),
};
exports.ClientWorksheetSchemas = {
    read: zod_1.z.object({
        todo: exports.clientObjectId,
    }),
    create: zod_1.z.object({}),
    update: zod_1.z.object({}),
};
//# sourceMappingURL=RelaySchema.js.map