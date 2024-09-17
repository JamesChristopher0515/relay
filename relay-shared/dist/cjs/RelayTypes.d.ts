/**
 * These mostly represent front-end types sent down from the backend, not
 * necessarily representative of raw types in db because of certain foreign
 * fields being populated before sending to clients.
 */
import { z } from 'zod';
import { IRelayAppointment } from './appointments/types/IRelayAppointment';
import { ClientInsightsWidgetSchemas, ClientInsightsWidgetTypes, ClientInsightsWidgetTypeStr, JourneyStopTypes, WorksheetStopTypes } from './RelaySchema';
import { Role } from './users/helpers/roles';
export declare function fakeType<T = any>(): T;
export type Id = string;
export interface MongoDocument {
    _id: Id;
}
type CreatedAt = {
    createdAt: Date;
};
type UpdatedAt = {
    updatedAt: Date;
};
type Timestamps = CreatedAt & UpdatedAt;
export type NewDocument<T> = {
    _id?: Id;
} & Omit<T, '_id' | 'id' | 'createdAt' | 'updatedAt' | 'creator'>;
export type NewOrExisting<T> = NewDocument<T> | T;
export interface User extends MongoDocument {
    role: Role;
    name: string;
    profilePicture?: string;
    username: string;
    email: string;
    onboardingComplete: boolean;
    practice: Id;
    type: 'client' | 'practitioner';
    inviteStatus?: 'unsent' | 'sent' | 'accepted';
}
export interface RelayFile extends MongoDocument, Timestamps {
}
export interface Categorisable extends MongoDocument {
    category?: Id;
}
export interface Practice extends MongoDocument, Timestamps {
    name: string;
    phone: string;
    email: string;
    stripeLast4?: string;
    stripeCustomPlanId?: string;
    subscriptionActive?: boolean;
}
export interface Practitioner extends User {
    practice: Id;
    lastViewedClient?: Id;
    lastViewedPracticePage?: 'team' | 'clients' | 'resource-manager' | 'billing';
    schedule: {
        days: {
            start: Date;
            end: Date;
            enabled: boolean;
        }[];
    };
    chatCtrlEnterSends?: boolean;
}
export interface Client extends User {
    mobile: string;
    practitioner: Id;
    onboardingComplete: boolean;
    checkInOptions: {
        dailyCount: number;
        notifyAt: Date[];
    };
    chatEnabled?: boolean;
    address: {
        addressLine: string[];
        city: string;
        region: string;
        postalCode: string;
        country: string;
    };
    nextAppointmentDate?: Date;
    lastAppointmentDate?: Date;
}
export interface AssignedResource extends MongoDocument, Timestamps {
    shuffle: boolean;
    type: 'content' | 'questionnaire' | 'thinking-points';
    showBefore?: string;
    showAfter?: string;
    clientMilestoneStop?: Id;
    content?: Content;
    questionnaire?: Questionnaire;
}
export interface QResultAnswer {
    question: Id;
    value: number;
}
export interface Goal extends MongoDocument, Timestamps {
    client: Id;
    goal: string;
}
export interface Todo extends MongoDocument {
    name: string;
    worksheet?: Id;
    assigned: Date;
    complete: boolean;
    assignedJourney?: Id;
    client: Id;
    answers?: QResultAnswer[];
    questionnaire?: Questionnaire;
    assignedResource?: AssignedResource;
    content?: Content;
    appointmentId?: Id;
    description: string;
}
export interface ClientTodo extends Todo {
    appointment: IRelayAppointment;
}
export type Message = MongoDocument & Timestamps & {
    from: Id;
    content: string;
};
export type Result = MongoDocument & Timestamps & {
    type: string;
    value?: number;
};
/** @deprecated Prefer using `RelayNotification` because `Notification` already exists */
export type Notification = MongoDocument & Timestamps & {
    type: string;
    value?: any;
    read: boolean;
    aboutUser: User;
    user: Id;
};
/** Because notification is a built-in type */
export type RelayNotification = Notification;
export interface QuestionnaireQuestion extends MongoDocument {
    _id: string;
    id?: string;
    type: string;
    question: string;
    scale: number;
    help: string;
    answers: string[];
}
export interface QuestionnaireScale extends MongoDocument {
    name: string;
    elements: {
        name: string;
        value: number;
    }[];
}
export interface Questionnaire extends Categorisable, Timestamps {
    name: string;
    scales: QuestionnaireScale[];
    description: string;
    hasResult: boolean;
    id: string;
    sections: {
        name: string;
        questions: QuestionnaireQuestion[];
    }[];
    outputs: {
        name: string;
        ranges: {
            name: string;
            min: number;
            max: number;
            relay: number;
            notify: boolean;
        }[];
        calculation: string;
    }[];
    practice: Id;
    assignmentConditions: {
        questionnaire: Id;
        output: number;
        ranges: number[];
        min?: number;
        max?: number;
    }[];
    creator: Id;
    revisedFrom: Id;
}
export type QuestionnaireResult = MongoDocument & Timestamps & {
    questionnaire: Id;
    client: Id;
    todo: Id;
    completedAt?: Date;
    complete: boolean;
    outputs: {
        range: number;
        value: number;
    }[];
    answers: QuestionnaireResultAnswer[];
};
export type QuestionnaireResultAnswer = {
    question: Id;
    value: number;
};
export interface Content extends Categorisable, Timestamps {
    name: string;
    type: 'file' | 'web';
    creator: Id;
    web?: {
        href: string;
    };
    file?: {
        file: {
            name: string;
            storage: 'aws' | 'disk';
            encoding: string;
            size: number;
            mimetype: string;
            disk: {
                path: string;
            };
            aws: {
                key: string;
            };
        };
    };
}
export interface JourneyMilestone extends MongoDocument {
    type: string;
    stops: JourneyStop[];
    name: string;
}
export type JourneyStopType = typeof JourneyStopTypes[number];
export interface JourneyStop extends MongoDocument {
    type: JourneyStopType;
    editorUICollapsed: boolean;
    data: any;
    /** Generated on backend */
    name: string;
}
export interface ClientMilestoneStop extends MongoDocument, Timestamps {
    client: Id;
    assignedJourney: Id;
    milestone: Id;
    stop: Id;
    completedAt?: Date;
}
export interface Journey extends Categorisable, Timestamps {
    name: string;
    description: string;
    creator: Id;
    milestones: JourneyMilestone[];
}
export interface AssignedJourney extends MongoDocument, Timestamps {
    client: Id;
    journey: Journey;
    activeClientStop?: ClientMilestoneStop;
    lastClientStop?: ClientMilestoneStop;
    completedAt?: Date;
}
export interface Category extends MongoDocument, Timestamps {
    name: string;
}
export interface LoggedEvent extends MongoDocument, Timestamps {
    type: 'questionnaire-completed' | 'todo-completed' | 'content-viewed' | 'journal-entry-shared' | 'check-in-completed' | 'journey-started' | 'journey-stop-reached' | 'journey-completed';
    client: Id;
    data: {
        questionnaireResult: Id;
    } | {
        todo: Id;
    } | {
        assignedResource: Id;
    } | {
        journalEntry: Id;
    } | {
        checkIn: Id;
    } | {
        assignedJourney: Id;
    } | {
        clientMilestoneStop: Id;
    } | {
        assignedJourney: Id;
    };
}
export interface ClientInsightsPresetWidgetBase<Type extends ClientInsightsWidgetTypeStr, DataType = z.infer<ReturnType<typeof ClientInsightsWidgetSchemas>[Type]>> extends MongoDocument {
    data: DataType;
    type: Type;
    location: 'main' | 'sidebar' | 'timeline';
}
export interface HowImFeelingWidget extends ClientInsightsPresetWidgetBase<ClientInsightsWidgetTypes.HowImFeeling> {
}
export interface QuestionnaireResultWidget extends ClientInsightsPresetWidgetBase<ClientInsightsWidgetTypes.QuestionnaireResult> {
}
export interface CheckInWidget extends ClientInsightsPresetWidgetBase<ClientInsightsWidgetTypes.CheckIn> {
}
export interface TodoWidget extends ClientInsightsPresetWidgetBase<ClientInsightsWidgetTypes.Todo> {
}
export interface HealthWidget extends ClientInsightsPresetWidgetBase<ClientInsightsWidgetTypes.Health> {
}
export interface WordCloudWidget extends ClientInsightsPresetWidgetBase<ClientInsightsWidgetTypes.WordCloud> {
}
export interface JourneyWidget extends ClientInsightsPresetWidgetBase<ClientInsightsWidgetTypes.Journey> {
}
export interface RelayWidget extends ClientInsightsPresetWidgetBase<ClientInsightsWidgetTypes.Relay> {
}
export interface GraphWidget extends ClientInsightsPresetWidgetBase<ClientInsightsWidgetTypes.Graph> {
}
export type ClientInsightsPresetWidget<T extends ClientInsightsWidgetTypeStr | unknown = unknown> = T extends ClientInsightsWidgetTypeStr ? ClientInsightsPresetWidgetBase<T> : HowImFeelingWidget | QuestionnaireResultWidget | CheckInWidget | TodoWidget | WordCloudWidget | JourneyWidget | GraphWidget | RelayWidget;
export interface ClientInsightsPreset extends MongoDocument, Timestamps {
    isActive: boolean;
    name: string;
    client: Id;
    selectedTimeRange: DateRange;
    timeRangeMode: 'absolute' | 'relative';
    widgets: ClientInsightsPresetWidget[];
}
export interface DateRange {
    start: Date;
    end: Date;
}
export interface CheckIn extends MongoDocument, Timestamps {
    feelings: {
        name: string;
    }[];
    reasons: {
        name: string;
    }[];
    tags: string[];
    journalEntry: Id;
    client: Id;
}
export interface JournalEntry extends MongoDocument {
    title: string;
    client: Id;
    private?: boolean;
    sentiment: 'Negative' | 'Neutral' | 'Positive';
    body: string;
    createdAt: Date;
}
export interface CaseNote extends MongoDocument, Timestamps {
    client: Id;
    title: string;
    body: string;
    createdBy: Id;
}
export interface WorksheetSection extends MongoDocument {
    items: WorksheetItem[];
    name: string;
}
export type WorksheetItemType = typeof WorksheetStopTypes[number];
export interface WorksheetItem extends MongoDocument {
    type: WorksheetItemType;
    editorState: Record<string, unknown>;
    data: any;
    /** Generated on backend */
    name: string;
}
export interface Worksheet extends MongoDocument, Timestamps {
    name: string;
    description: string;
    creator: Id;
    sections: WorksheetSection[];
}
export interface Resource {
    _id: string;
    name: string;
    description?: string;
    category: string;
    url: string;
    type: 'web';
}
export interface ClientContent extends MongoDocument {
    lastViewed: Date;
    isFavourite: boolean;
    content: any;
}
export interface ClientWorksheetResponse {
    complete?: boolean;
    data: any;
}
export interface ClientWorksheet extends MongoDocument, Timestamps {
    client: string;
    todo: string;
    worksheet: string;
    complete: boolean;
    completedAt?: Date;
    responses: {
        [item: string]: ClientWorksheetResponse;
    };
}
export type TableItem = {
    type: 'worksheet';
    data: {
        columns: {
            question: string;
            _id: string;
            answerType: string;
        }[];
    };
};
export type TableResponse = string[][];
export type EntityTypeMap = {
    practitioner: Practitioner;
    client: Client;
    category: Category;
    questionnaire: Questionnaire;
    'questionnaire-result': QuestionnaireResult;
    content: Content;
    todo: Todo;
    journey: Journey;
    worksheet: Worksheet;
    'journey-milestone': JourneyMilestone;
    'journey-stop': JourneyStop;
    'assigned-resource': AssignedResource;
    'assigned-journey': AssignedJourney;
    'client-worksheet': ClientWorksheet;
    ['client-milestone-stop']: ClientMilestoneStop;
    appointment: IRelayAppointment;
};
export type EntityKey = keyof EntityTypeMap;
export {};
//# sourceMappingURL=RelayTypes.d.ts.map