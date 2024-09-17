import { ZodSchema, z } from 'zod';
import { Id } from './frontend/api/helpers/apiTypes';
import { User, WorksheetItem } from './RelayTypes';
type Schema = ZodSchema<any, any, any>;
type SchemaOrComputed = Schema | ((user: User) => Schema | Promise<Schema>);
export interface FieldAccessMap<C extends SchemaOrComputed, U extends SchemaOrComputed, R extends SchemaOrComputed> {
    create: C;
    update: U;
    read: R;
}
export declare const clientObjectId: z.ZodString;
/**
 * Have to allow "null" as string because axios won't automatically add null as
 * a query parameter
 */
export declare const clientNull: z.ZodUnion<[z.ZodEffects<z.ZodLiteral<"null">, null, "null">, z.ZodNull]>;
/**
 * A schema that always fails, for when updating or creating shouldn't be
 * possible from the client-side
 */
export declare const neverSchema: z.ZodEffects<z.ZodAny, any, any>;
export declare const jsonObjectOrObject: (actualSchema: any) => z.ZodUnion<[any, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, any, string>]>;
export declare const boolStringOrBoolean: z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, boolean, string>]>;
export declare const parsedIntOrNumber: z.ZodUnion<[z.ZodNumber, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, number, string>]>;
export declare const parsedIntOrNumberLiteral: (l: number) => z.ZodUnion<[z.ZodLiteral<number>, z.ZodEffects<z.ZodEffects<z.ZodLiteral<string>, string, string>, number, string>]>;
export declare const isoString: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>;
export declare const PractitionerSchemas: {
    read: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    create: z.ZodObject<{
        name: z.ZodString;
        role: z.ZodString;
        email: z.ZodString;
        practice: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        name: string;
        role: string;
        email: string;
        practice: string;
    }, {
        name: string;
        role: string;
        email: string;
        practice: string;
    }>;
    update: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        profilePicture: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
        role: z.ZodOptional<z.ZodString>;
        email: z.ZodOptional<z.ZodString>;
        lastViewedClient: z.ZodOptional<z.ZodString>;
        lastViewedPracticePage: z.ZodOptional<z.ZodString>;
        schedule: z.ZodOptional<z.ZodObject<{
            days: z.ZodArray<z.ZodObject<{
                enabled: z.ZodBoolean;
                start: z.ZodUnion<[z.ZodDate, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>]>;
                end: z.ZodUnion<[z.ZodDate, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>]>;
            }, "strip", z.ZodTypeAny, {
                enabled: boolean;
                start: Date;
                end: Date;
            }, {
                enabled: boolean;
                start: string | Date;
                end: string | Date;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            days: {
                enabled: boolean;
                start: Date;
                end: Date;
            }[];
        }, {
            days: {
                enabled: boolean;
                start: string | Date;
                end: string | Date;
            }[];
        }>>;
        chatCtrlEnterSends: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        role?: string | undefined;
        email?: string | undefined;
        profilePicture?: string | null | undefined;
        lastViewedClient?: string | undefined;
        lastViewedPracticePage?: string | undefined;
        schedule?: {
            days: {
                enabled: boolean;
                start: Date;
                end: Date;
            }[];
        } | undefined;
        chatCtrlEnterSends?: boolean | undefined;
    }, {
        name?: string | undefined;
        role?: string | undefined;
        email?: string | undefined;
        profilePicture?: string | null | undefined;
        lastViewedClient?: string | undefined;
        lastViewedPracticePage?: string | undefined;
        schedule?: {
            days: {
                enabled: boolean;
                start: string | Date;
                end: string | Date;
            }[];
        } | undefined;
        chatCtrlEnterSends?: boolean | undefined;
    }>;
};
export declare const AddressSchema: z.ZodObject<{
    addressLine: z.ZodArray<z.ZodString, "many">;
    city: z.ZodString;
    region: z.ZodString;
    postalCode: z.ZodString;
    country: z.ZodString;
}, "strip", z.ZodTypeAny, {
    addressLine: string[];
    city: string;
    region: string;
    postalCode: string;
    country: string;
}, {
    addressLine: string[];
    city: string;
    region: string;
    postalCode: string;
    country: string;
}>;
export declare const PracticeSchemas: {
    read: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    create: z.ZodObject<{
        email: z.ZodString;
        name: z.ZodString;
        stripeSource: z.ZodOptional<z.ZodString>;
        phone: z.ZodString;
        practitionerAdmin: z.ZodObject<{
            name: z.ZodString;
            phone: z.ZodString;
            email: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            email: string;
            phone: string;
        }, {
            name: string;
            email: string;
            phone: string;
        }>;
    }, "strip", z.ZodTypeAny, {
        stripeSource?: string | undefined;
        practitionerAdmin: {
            name: string;
            email: string;
            phone: string;
        };
        name: string;
        email: string;
        phone: string;
    }, {
        stripeSource?: string | undefined;
        practitionerAdmin: {
            name: string;
            email: string;
            phone: string;
        };
        name: string;
        email: string;
        phone: string;
    }>;
    update: z.ZodObject<{
        email: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        stripeSource: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        phone: z.ZodOptional<z.ZodString>;
        practitionerAdmin: z.ZodOptional<z.ZodObject<{
            name: z.ZodString;
            phone: z.ZodString;
            email: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            name: string;
            email: string;
            phone: string;
        }, {
            name: string;
            email: string;
            phone: string;
        }>>;
    }, "strip", z.ZodTypeAny, {
        practitionerAdmin?: {
            name: string;
            email: string;
            phone: string;
        } | undefined;
        name?: string | undefined;
        email?: string | undefined;
        stripeSource?: string | undefined;
        phone?: string | undefined;
    }, {
        practitionerAdmin?: {
            name: string;
            email: string;
            phone: string;
        } | undefined;
        name?: string | undefined;
        email?: string | undefined;
        stripeSource?: string | undefined;
        phone?: string | undefined;
    }>;
};
export declare const ClientSchemas: {
    read: z.ZodObject<{
        practitioner: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        practitioner?: string | undefined;
    }, {
        practitioner?: string | undefined;
    }>;
    create: z.ZodObject<{
        address: z.ZodObject<{
            addressLine: z.ZodArray<z.ZodString, "many">;
            city: z.ZodString;
            region: z.ZodString;
            postalCode: z.ZodString;
            country: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            addressLine: string[];
            city: string;
            region: string;
            postalCode: string;
            country: string;
        }, {
            addressLine: string[];
            city: string;
            region: string;
            postalCode: string;
            country: string;
        }>;
        email: z.ZodOptional<z.ZodString>;
        mobile: z.ZodOptional<z.ZodString>;
        username: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        practitioner: z.ZodString;
        onboardingResources: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        email?: string | undefined;
        mobile?: string | undefined;
        username?: string | undefined;
        onboardingResources?: string[] | undefined;
        practitioner: string;
        name: string;
        address: {
            addressLine: string[];
            city: string;
            region: string;
            postalCode: string;
            country: string;
        };
    }, {
        email?: string | undefined;
        mobile?: string | undefined;
        username?: string | undefined;
        onboardingResources?: string[] | undefined;
        practitioner: string;
        name: string;
        address: {
            addressLine: string[];
            city: string;
            region: string;
            postalCode: string;
            country: string;
        };
    }>;
    update: z.ZodObject<{
        expoPushToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        username: z.ZodOptional<z.ZodOptional<z.ZodString>>;
        address: z.ZodOptional<z.ZodObject<{
            addressLine: z.ZodArray<z.ZodString, "many">;
            city: z.ZodString;
            region: z.ZodString;
            postalCode: z.ZodString;
            country: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            addressLine: string[];
            city: string;
            region: string;
            postalCode: string;
            country: string;
        }, {
            addressLine: string[];
            city: string;
            region: string;
            postalCode: string;
            country: string;
        }>>;
        email: z.ZodOptional<z.ZodString>;
        mobile: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        onboardingComplete: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        practitioner: z.ZodOptional<z.ZodString>;
        checkInOptions: z.ZodOptional<z.ZodAny>;
        chatEnabled: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
        settings: z.ZodOptional<z.ZodObject<{
            altEnterSendsMessages: z.ZodOptional<z.ZodBoolean>;
            health: z.ZodOptional<z.ZodObject<{
                steps: z.ZodOptional<z.ZodBoolean>;
                distance: z.ZodOptional<z.ZodBoolean>;
                sleep: z.ZodOptional<z.ZodBoolean>;
            }, "strip", z.ZodTypeAny, {
                steps?: boolean | undefined;
                distance?: boolean | undefined;
                sleep?: boolean | undefined;
            }, {
                steps?: boolean | undefined;
                distance?: boolean | undefined;
                sleep?: boolean | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            health?: {
                steps?: boolean | undefined;
                distance?: boolean | undefined;
                sleep?: boolean | undefined;
            } | undefined;
            altEnterSendsMessages?: boolean | undefined;
        }, {
            health?: {
                steps?: boolean | undefined;
                distance?: boolean | undefined;
                sleep?: boolean | undefined;
            } | undefined;
            altEnterSendsMessages?: boolean | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        practitioner?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        address?: {
            addressLine: string[];
            city: string;
            region: string;
            postalCode: string;
            country: string;
        } | undefined;
        mobile?: string | undefined;
        username?: string | undefined;
        expoPushToken?: string | null | undefined;
        onboardingComplete?: boolean | undefined;
        checkInOptions?: any;
        chatEnabled?: boolean | undefined;
        settings?: {
            health?: {
                steps?: boolean | undefined;
                distance?: boolean | undefined;
                sleep?: boolean | undefined;
            } | undefined;
            altEnterSendsMessages?: boolean | undefined;
        } | undefined;
    }, {
        practitioner?: string | undefined;
        name?: string | undefined;
        email?: string | undefined;
        address?: {
            addressLine: string[];
            city: string;
            region: string;
            postalCode: string;
            country: string;
        } | undefined;
        mobile?: string | undefined;
        username?: string | undefined;
        expoPushToken?: string | null | undefined;
        onboardingComplete?: boolean | undefined;
        checkInOptions?: any;
        chatEnabled?: boolean | undefined;
        settings?: {
            health?: {
                steps?: boolean | undefined;
                distance?: boolean | undefined;
                sleep?: boolean | undefined;
            } | undefined;
            altEnterSendsMessages?: boolean | undefined;
        } | undefined;
    }>;
};
export declare const TodoSchemas: {
    read: z.ZodObject<{
        questionnaire: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUnion<[z.ZodEffects<z.ZodLiteral<"null">, null, "null">, z.ZodNull]>]>>;
        content: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUnion<[z.ZodEffects<z.ZodLiteral<"null">, null, "null">, z.ZodNull]>]>>;
        client: z.ZodString;
        appointmentId: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUnion<[z.ZodEffects<z.ZodLiteral<"null">, null, "null">, z.ZodNull]>]>>;
        assignedResource: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodUnion<[z.ZodEffects<z.ZodLiteral<"null">, null, "null">, z.ZodNull]>]>>;
        assigned: z.ZodOptional<z.ZodEffects<z.ZodUnion<[any, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, any, string>]>, {
            [x: string]: Date;
        }, any>>;
        complete: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        content?: string | null | undefined;
        questionnaire?: string | null | undefined;
        appointmentId?: string | null | undefined;
        assignedResource?: string | null | undefined;
        assigned?: {
            [x: string]: Date;
        } | undefined;
        complete?: boolean | undefined;
        client: string;
    }, {
        content?: string | null | undefined;
        questionnaire?: string | null | undefined;
        appointmentId?: string | null | undefined;
        assignedResource?: string | null | undefined;
        assigned?: any;
        complete?: boolean | undefined;
        client: string;
    }>;
    create: z.ZodObject<{
        name: z.ZodString;
        description: z.ZodDefault<z.ZodString>;
        client: z.ZodString;
        assigned: z.ZodUnion<[z.ZodDate, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>]>;
        reissue: z.ZodNullable<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        client: string;
        name: string;
        assigned: Date;
        description: string;
        reissue: string | null;
    }, {
        description?: string | undefined;
        client: string;
        name: string;
        assigned: string | Date;
        reissue: string | null;
    }>;
    update: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        assigned: z.ZodOptional<z.ZodUnion<[z.ZodDate, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>]>>;
        description: z.ZodOptional<z.ZodString>;
        reissue: z.ZodOptional<z.ZodNullable<z.ZodString>>;
        complete: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        assigned?: Date | undefined;
        complete?: boolean | undefined;
        description?: string | undefined;
        reissue?: string | null | undefined;
    }, {
        name?: string | undefined;
        assigned?: string | Date | undefined;
        complete?: boolean | undefined;
        description?: string | undefined;
        reissue?: string | null | undefined;
    }>;
};
export declare const ResultSchema: {
    read: z.ZodObject<{
        client: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        client: string;
    }, {
        client: string;
    }>;
    create: z.ZodObject<{
        type: z.ZodString;
        value: z.ZodOptional<z.ZodAny>;
    }, "strip", z.ZodTypeAny, {
        value?: any;
        type: string;
    }, {
        value?: any;
        type: string;
    }>;
    update: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
};
export declare const CheckInSchema: {
    read: z.ZodObject<{
        client: z.ZodString;
        createdAt: z.ZodOptional<z.ZodEffects<z.ZodUnion<[any, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, any, string>]>, {
            [x: string]: Date;
        }, any>>;
    }, "strip", z.ZodTypeAny, {
        createdAt?: {
            [x: string]: Date;
        } | undefined;
        client: string;
    }, {
        createdAt?: any;
        client: string;
    }>;
    create: z.ZodObject<{
        client: z.ZodString;
        feelings: z.ZodArray<z.ZodAny, "many">;
        reasons: z.ZodArray<z.ZodAny, "many">;
        journalEntry: z.ZodOptional<z.ZodAny>;
        tags: z.ZodOptional<z.ZodDefault<z.ZodArray<z.ZodString, "many">>>;
    }, "strip", z.ZodTypeAny, {
        journalEntry?: any;
        tags?: string[] | undefined;
        client: string;
        feelings: any[];
        reasons: any[];
    }, {
        journalEntry?: any;
        tags?: string[] | undefined;
        client: string;
        feelings: any[];
        reasons: any[];
    }>;
    update: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
};
export declare const JournalEntrySchema: {
    read: z.ZodObject<{
        client: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        client: string;
    }, {
        client: string;
    }>;
    create: z.ZodObject<{
        client: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        private: z.ZodOptional<z.ZodBoolean>;
        body: z.ZodString;
        checkIn: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title?: string | undefined;
        private?: boolean | undefined;
        checkIn?: string | undefined;
        client: string;
        body: string;
    }, {
        title?: string | undefined;
        private?: boolean | undefined;
        checkIn?: string | undefined;
        client: string;
        body: string;
    }>;
    update: z.ZodObject<{
        title: z.ZodString;
        private: z.ZodOptional<z.ZodBoolean>;
        body: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        private?: boolean | undefined;
        title: string;
        body: string;
    }, {
        private?: boolean | undefined;
        title: string;
        body: string;
    }>;
};
export declare const CaseNoteSchema: {
    read: z.ZodObject<{
        client: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        client: string;
    }, {
        client: string;
    }>;
    create: z.ZodObject<{
        client: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        body: z.ZodString;
        checkIn: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title?: string | undefined;
        checkIn?: string | undefined;
        client: string;
        body: string;
    }, {
        title?: string | undefined;
        checkIn?: string | undefined;
        client: string;
        body: string;
    }>;
    update: z.ZodObject<{
        title: z.ZodString;
        body: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        body: string;
    }, {
        title: string;
        body: string;
    }>;
};
export declare const GoalSchema: {
    read: z.ZodObject<{
        client: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        client: string;
    }, {
        client: string;
    }>;
    create: z.ZodObject<{
        client: z.ZodString;
        goal: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        client: string;
        goal: string;
    }, {
        client: string;
        goal: string;
    }>;
    update: z.ZodObject<{
        goal: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        goal: string;
    }, {
        goal: string;
    }>;
};
export declare const MessageSchemas: {
    read: z.ZodObject<{
        client: z.ZodString;
        practitioner: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        client: string;
        practitioner: string;
    }, {
        client: string;
        practitioner: string;
    }>;
    create: z.ZodObject<{
        content: z.ZodString;
        client: z.ZodString;
        practitioner: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        client: string;
        practitioner: string;
        content: string;
    }, {
        client: string;
        practitioner: string;
        content: string;
    }>;
    update: z.ZodEffects<z.ZodAny, any, any>;
};
export declare const QuestionnaireSchemas: {
    read: z.ZodObject<{
        category: z.ZodOptional<z.ZodString>;
        id: z.ZodOptional<z.ZodString>;
        archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, boolean, string>]>>;
    }, "strip", z.ZodTypeAny, {
        id?: string | undefined;
        category?: string | undefined;
        archived?: boolean | undefined;
    }, {
        id?: string | undefined;
        category?: string | undefined;
        archived?: string | boolean | undefined;
    }>;
    create: z.ZodAny;
    update: z.ZodAny;
};
export declare const QuestionnaireResultSchemas: {
    read: z.ZodAny;
    create: z.ZodObject<{
        questionnaire: z.ZodString;
        todo: z.ZodOptional<z.ZodString>;
        sections: z.ZodArray<z.ZodAny, "many">;
    }, "strip", z.ZodTypeAny, {
        todo?: string | undefined;
        questionnaire: string;
        sections: any[];
    }, {
        todo?: string | undefined;
        questionnaire: string;
        sections: any[];
    }>;
    update: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
};
export declare const ContentSchemas: {
    read: z.ZodObject<{
        category: z.ZodOptional<z.ZodString>;
        archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, boolean, string>]>>;
    }, "strip", z.ZodTypeAny, {
        category?: string | undefined;
        archived?: boolean | undefined;
    }, {
        category?: string | undefined;
        archived?: string | boolean | undefined;
    }>;
    create: z.ZodAny;
    update: z.ZodObject<{
        category: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodEnum<["file", "web"]>>;
        web: z.ZodOptional<z.ZodObject<{
            href: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            href: string;
        }, {
            href: string;
        }>>;
        file: z.ZodOptional<z.ZodObject<{
            file: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            file: string;
        }, {
            file: string;
        }>>;
        archived: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, boolean, string>]>>;
    }, "strip", z.ZodTypeAny, {
        file?: {
            file: string;
        } | undefined;
        web?: {
            href: string;
        } | undefined;
        type?: "file" | "web" | undefined;
        name?: string | undefined;
        description?: string | undefined;
        category?: string | undefined;
        archived?: boolean | undefined;
    }, {
        file?: {
            file: string;
        } | undefined;
        web?: {
            href: string;
        } | undefined;
        type?: "file" | "web" | undefined;
        name?: string | undefined;
        description?: string | undefined;
        category?: string | undefined;
        archived?: string | boolean | undefined;
    }>;
};
export declare const CategorySchemas: {
    read: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    create: z.ZodEffects<z.ZodAny, any, any>;
    update: z.ZodEffects<z.ZodAny, any, any>;
};
export declare const AssignedResourcesSchemas: {
    read: z.ZodAny;
    create: z.ZodObject<{
        type: z.ZodEnum<{
            [x: string]: any;
        }>;
        questionnaire: z.ZodOptional<z.ZodString>;
        content: z.ZodOptional<z.ZodString>;
        showBefore: z.ZodOptional<z.ZodString>;
        showAfter: z.ZodOptional<z.ZodString>;
        client: z.ZodString;
        clientMilestoneStop: z.ZodOptional<z.ZodString>;
        shuffle: z.ZodDefault<z.ZodBoolean>;
        initialTodo: z.ZodObject<{
            assigned: z.ZodUnion<[z.ZodDate, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>]>;
            assignedJourney: z.ZodOptional<z.ZodString>;
            reissue: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            reissue?: string | undefined;
            assignedJourney?: string | undefined;
            assigned: Date;
        }, {
            reissue?: string | undefined;
            assignedJourney?: string | undefined;
            assigned: string | Date;
        }>;
    }, "strip", z.ZodTypeAny, {
        content?: string | undefined;
        questionnaire?: string | undefined;
        type?: any;
        showBefore?: string | undefined;
        showAfter?: string | undefined;
        clientMilestoneStop?: string | undefined;
        client: string;
        shuffle: boolean;
        initialTodo: {
            reissue?: string | undefined;
            assignedJourney?: string | undefined;
            assigned: Date;
        };
    }, {
        content?: string | undefined;
        questionnaire?: string | undefined;
        type?: any;
        showBefore?: string | undefined;
        showAfter?: string | undefined;
        clientMilestoneStop?: string | undefined;
        shuffle?: boolean | undefined;
        client: string;
        initialTodo: {
            reissue?: string | undefined;
            assignedJourney?: string | undefined;
            assigned: string | Date;
        };
    }>;
    update: z.ZodObject<{
        shuffle: z.ZodDefault<z.ZodBoolean>;
        initialTodo: z.ZodObject<{
            assigned: z.ZodUnion<[z.ZodDate, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>]>;
            reissue: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            reissue?: string | undefined;
            assigned: Date;
        }, {
            reissue?: string | undefined;
            assigned: string | Date;
        }>;
    }, "strip", z.ZodTypeAny, {
        shuffle: boolean;
        initialTodo: {
            reissue?: string | undefined;
            assigned: Date;
        };
    }, {
        shuffle?: boolean | undefined;
        initialTodo: {
            reissue?: string | undefined;
            assigned: string | Date;
        };
    }>;
};
export declare const NotificationSchemas: {
    read: z.ZodObject<{
        'value.clientStop': z.ZodOptional<z.ZodString>;
        type: z.ZodOptional<z.ZodString>;
        aboutUser: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        type?: string | undefined;
        'value.clientStop'?: string | undefined;
        aboutUser?: string | undefined;
    }, {
        type?: string | undefined;
        'value.clientStop'?: string | undefined;
        aboutUser?: string | undefined;
    }>;
    create: z.ZodEffects<z.ZodAny, any, any>;
    update: z.ZodObject<{
        read: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        read: boolean;
    }, {
        read: boolean;
    }>;
};
export declare const JourneyQuestionnaireStopData: (objectId: any) => z.ZodObject<{
    questionnaire: any;
    outputMap: z.ZodObject<{
        outputIndex: z.ZodNumber;
        map: z.ZodArray<z.ZodEffects<z.ZodObject<{
            type: z.ZodEnum<["continue", "restart", "review", "jump"]>;
            data: z.ZodAny;
        }, "strip", z.ZodTypeAny, {
            data?: any;
            type: "review" | "continue" | "restart" | "jump";
        }, {
            data?: any;
            type: "review" | "continue" | "restart" | "jump";
        }>, {
            data?: any;
            type: "review" | "continue" | "restart" | "jump";
        }, {
            data?: any;
            type: "review" | "continue" | "restart" | "jump";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        map: {
            data?: any;
            type: "review" | "continue" | "restart" | "jump";
        }[];
        outputIndex: number;
    }, {
        map: {
            data?: any;
            type: "review" | "continue" | "restart" | "jump";
        }[];
        outputIndex: number;
    }>;
}, "strip", z.ZodTypeAny, {
    questionnaire?: any;
    outputMap: {
        map: {
            data?: any;
            type: "review" | "continue" | "restart" | "jump";
        }[];
        outputIndex: number;
    };
}, {
    questionnaire?: any;
    outputMap: {
        map: {
            data?: any;
            type: "review" | "continue" | "restart" | "jump";
        }[];
        outputIndex: number;
    };
}>;
export declare const JourneyStopTypes: readonly ["content", "questionnaire", "todo", "delay", "thinking-points", "review", "worksheet"];
export declare const JourneyStopDataSchemas: (objectId: any) => {
    questionnaire: z.ZodObject<any, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    content: z.ZodObject<any, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    todo: z.ZodObject<any, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    worksheet: z.ZodObject<any, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    delay: z.ZodObject<any, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    'thinking-points': z.ZodObject<any, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    review: z.ZodObject<any, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
};
export declare const JourneySchemas: {
    read: z.ZodObject<{
        category: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        category?: string | undefined;
    }, {
        category?: string | undefined;
    }>;
    create: z.ZodAny;
    update: z.ZodAny;
};
export declare const AssignedJourneySchemas: {
    read: z.ZodObject<{
        category: z.ZodOptional<z.ZodString>;
        client: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        category?: string | undefined;
        client: string;
    }, {
        category?: string | undefined;
        client: string;
    }>;
    create: z.ZodObject<{
        journey: z.ZodString;
        client: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        client: string;
        journey: string;
    }, {
        client: string;
        journey: string;
    }>;
    update: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
};
export declare const ClientMilestoneStopSchemas: {
    read: z.ZodObject<{
        assignedJourney: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        assignedJourney: string;
    }, {
        assignedJourney: string;
    }>;
    create: z.ZodEffects<z.ZodAny, any, any>;
    update: z.ZodEffects<z.ZodAny, any, any>;
};
export declare const ClientInsightsPresetSchemas: {
    read: z.ZodObject<{
        client: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        client?: string | undefined;
    }, {
        client?: string | undefined;
    }>;
    create: z.ZodAny;
    update: z.ZodAny;
};
export declare const ClientContentSchemas: {
    read: z.ZodObject<{
        client: z.ZodOptional<z.ZodString>;
        resource: z.ZodOptional<z.ZodString>;
        isFavourite: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, boolean, string>]>>;
        isAssigned: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, boolean, string>]>>;
    }, "strip", z.ZodTypeAny, {
        client?: string | undefined;
        resource?: string | undefined;
        isFavourite?: boolean | undefined;
        isAssigned?: boolean | undefined;
    }, {
        client?: string | undefined;
        resource?: string | undefined;
        isFavourite?: string | boolean | undefined;
        isAssigned?: string | boolean | undefined;
    }>;
    create: z.ZodObject<{
        client: z.ZodString;
        isFavourite: z.ZodBoolean;
        resource: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        client: string;
        resource: string;
        isFavourite: boolean;
    }, {
        client: string;
        resource: string;
        isFavourite: boolean;
    }>;
    update: z.ZodObject<{
        isFavourite: z.ZodOptional<z.ZodBoolean>;
        lastViewed: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>>;
    }, "strip", z.ZodTypeAny, {
        isFavourite?: boolean | undefined;
        lastViewed?: Date | undefined;
    }, {
        isFavourite?: boolean | undefined;
        lastViewed?: string | undefined;
    }>;
};
export declare const AppointmentSchemas: {
    read: z.ZodObject<{
        clientId: z.ZodString;
        date: z.ZodOptional<z.ZodEffects<z.ZodUnion<[any, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, any, string>]>, {
            [x: string]: Date;
        }, any>>;
    }, "strip", z.ZodTypeAny, {
        date?: {
            [x: string]: Date;
        } | undefined;
        clientId: string;
    }, {
        date?: any;
        clientId: string;
    }>;
    create: z.ZodObject<{
        clientId: z.ZodString;
        practitionerId: z.ZodString;
        date: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>;
    }, "strip", z.ZodTypeAny, {
        date: Date;
        clientId: string;
        practitionerId: string;
    }, {
        date: string;
        clientId: string;
        practitionerId: string;
    }>;
    update: z.ZodObject<{
        endedAt: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>>;
        date: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>>;
    }, "strip", z.ZodTypeAny, {
        date?: Date | undefined;
        endedAt?: Date | undefined;
    }, {
        date?: string | undefined;
        endedAt?: string | undefined;
    }>;
};
export declare const RecurringAppointmentSchemas: {
    read: z.ZodObject<{
        clientId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        clientId: string;
    }, {
        clientId: string;
    }>;
    create: z.ZodObject<{
        clientId: z.ZodString;
        practitionerId: z.ZodString;
        pattern: z.ZodString;
        time: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>;
        endingOn: z.ZodOptional<z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>>;
        startingOn: z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, Date, string>;
    }, "strip", z.ZodTypeAny, {
        endingOn?: Date | undefined;
        clientId: string;
        practitionerId: string;
        pattern: string;
        time: Date;
        startingOn: Date;
    }, {
        endingOn?: string | undefined;
        clientId: string;
        practitionerId: string;
        pattern: string;
        time: string;
        startingOn: string;
    }>;
    update: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
};
export declare const CaseNoteSchemas: {
    read: z.ZodObject<{
        client: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        client: string;
    }, {
        client: string;
    }>;
    create: z.ZodObject<{
        client: z.ZodString;
        title: z.ZodOptional<z.ZodString>;
        body: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title?: string | undefined;
        client: string;
        body: string;
    }, {
        title?: string | undefined;
        client: string;
        body: string;
    }>;
    update: z.ZodObject<{
        title: z.ZodString;
        body: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
        body: string;
    }, {
        title: string;
        body: string;
    }>;
};
export declare enum ClientInsightsWidgetTypes {
    HowImFeeling = "how-im-feeling",
    QuestionnaireResult = "questionnaire-result",
    CheckIn = "check-in",
    Todo = "todo",
    WordCloud = "word-cloud",
    Journey = "journey",
    Graph = "graph",
    Health = "health",
    Relay = "relay"
}
export declare const ClientInsightsWidgetTypesVal: ClientInsightsWidgetTypes[];
export type AllClientInsightsWidgetTypes = Record<ClientInsightsWidgetTypes, string>;
export type ClientInsightsWidgetTypeStr = keyof AllClientInsightsWidgetTypes;
declare const WidgetGraphSchema: z.ZodObject<{
    collections: z.ZodArray<z.ZodObject<{
        collectionId: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        collectionId: string;
    }, {
        collectionId: string;
    }>, "many">;
    zoomLevel: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    collections: {
        collectionId: string;
    }[];
    zoomLevel: number;
}, {
    zoomLevel?: number | undefined;
    collections: {
        collectionId: string;
    }[];
}>;
export type WidgetGraphData = z.infer<typeof WidgetGraphSchema>;
/**
 * @param {objectIdSchema} any - The schema for the objectId, so we can use on
 *   both client/server with proper checks
 */
export declare function ClientInsightsWidgetSchemas(objectIdSchema: any): {
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
    readonly 'how-im-feeling': z.ZodObject<{
        appearance: z.ZodEnum<["daily-week"]>;
    }, "strip", z.ZodTypeAny, {
        appearance: "daily-week";
    }, {
        appearance: "daily-week";
    }>;
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
    readonly 'questionnaire-result': z.ZodObject<{
        questionnaire: any;
        appearance: z.ZodEnum<["timeline", "latest"]>;
    }, "strip", z.ZodTypeAny, {
        questionnaire?: any;
        appearance: "timeline" | "latest";
    }, {
        questionnaire?: any;
        appearance: "timeline" | "latest";
    }>;
    /** `health` maps to different types of health stats */
    readonly health: z.ZodObject<{
        health: z.ZodString;
        appearance: z.ZodEnum<["latest", "weekly"]>;
    }, "strip", z.ZodTypeAny, {
        appearance: "latest" | "weekly";
        health: string;
    }, {
        appearance: "latest" | "weekly";
        health: string;
    }>;
    /**
     * Same as `"how-im-feeling"` but with check boxes instead, with the
     * addition of `"completion-rate"` which shows how often check-in is
     * completed when expected
     */
    readonly 'check-in': z.ZodObject<{
        appearance: z.ZodEnum<["individual-week", "individual-month", "completion-rate"]>;
    }, "strip", z.ZodTypeAny, {
        appearance: "individual-week" | "individual-month" | "completion-rate";
    }, {
        appearance: "individual-week" | "individual-month" | "completion-rate";
    }>;
    /**
     * Same as check-in, but as todos recur at their own schedule, we just show
     * an item for each recurrence. Not necessarily split up by day.
     */
    readonly todo: z.ZodObject<{
        todo: any;
        appearance: z.ZodEnum<["individual-small", "individual-large"]>;
    }, "strip", z.ZodTypeAny, {
        todo?: any;
        appearance: "individual-small" | "individual-large";
    }, {
        todo?: any;
        appearance: "individual-small" | "individual-large";
    }>;
    readonly 'word-cloud': z.ZodObject<{
        appearance: z.ZodEnum<["default"]>;
    }, "strip", z.ZodTypeAny, {
        appearance: "default";
    }, {
        appearance: "default";
    }>;
    /**
     * Track the progress of a single journey. In comparison mode, shows a
     * side-by-side comparison of progress at the end of selected time range
     */
    readonly journey: z.ZodObject<{
        journey: any;
        appearance: z.ZodEnum<["current-progress"]>;
    }, "strip", z.ZodTypeAny, {
        journey?: any;
        appearance: "current-progress";
    }, {
        journey?: any;
        appearance: "current-progress";
    }>;
    readonly relay: z.ZodObject<{
        appearance: z.ZodEnum<["default"]>;
    }, "strip", z.ZodTypeAny, {
        appearance: "default";
    }, {
        appearance: "default";
    }>;
    readonly graph: z.ZodObject<{
        collections: z.ZodArray<z.ZodObject<{
            collectionId: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            collectionId: string;
        }, {
            collectionId: string;
        }>, "many">;
        zoomLevel: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        collections: {
            collectionId: string;
        }[];
        zoomLevel: number;
    }, {
        zoomLevel?: number | undefined;
        collections: {
            collectionId: string;
        }[];
    }>;
};
export type ReportingStatDataTypesInner = object | boolean | number | string;
export type CollectionDataTypes = 'scalar' | 'percent' | 'set' | 'boolean' | 'object';
export type ForCollectionType<T extends CollectionDataTypes> = T extends 'scalar' ? number : T extends 'percent' ? number : T extends 'set' ? ReportingStatDataTypesInner[] : T extends 'boolean' ? boolean : object;
/** @todo Better named as ReportingStatValueType, represents "value" field */
export type ReportingStatDataTypes = ReportingStatDataTypesInner | ReportingStatDataTypesInner[];
export type NewReportingStatItem<T extends ReportingStatDataTypes = any> = {
    date: Date;
    collectionId: Id;
    _collectionId: Id;
    value: T;
};
export type ReportingStatItem<T extends ReportingStatDataTypes = any, DataType = any> = NewReportingStatItem<T> & {
    collection: string;
    data: DataType;
};
export declare const LoggedEventSchemas: {
    read: z.ZodObject<{
        client: z.ZodString;
        questionnaireResult: z.ZodOptional<z.ZodString>;
        exclude: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
        type: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodOptional<z.ZodEffects<z.ZodUnion<[any, z.ZodEffects<z.ZodEffects<z.ZodString, string, string>, any, string>]>, {
            [x: string]: Date;
        }, any>>;
    }, "strip", z.ZodTypeAny, {
        createdAt?: {
            [x: string]: Date;
        } | undefined;
        type?: string | undefined;
        questionnaireResult?: string | undefined;
        exclude?: string[] | undefined;
        client: string;
    }, {
        createdAt?: any;
        type?: string | undefined;
        questionnaireResult?: string | undefined;
        exclude?: string[] | undefined;
        client: string;
    }>;
    create: z.ZodEffects<z.ZodAny, any, any>;
    update: z.ZodEffects<z.ZodAny, any, any>;
};
export declare const WorksheetStopTypes: readonly ["message", "worksheet", "image", "response-text", "response-buttons", "section-start"];
export type WorksheetStopType = (typeof WorksheetStopTypes)[number];
export declare const WorksheetAnswerTypes: readonly ["text"];
export type WorksheetAnswerType = (typeof WorksheetAnswerTypes)[number];
declare const WorksheetItemSchema: {
    readonly message: z.ZodObject<{
        message: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        message: string;
    }, {
        message: string;
    }>;
    readonly image: z.ZodObject<{
        file: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        file?: string | undefined;
    }, {
        file?: string | undefined;
    }>;
    readonly "response-text": z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    readonly "response-buttons": z.ZodObject<{
        buttons: z.ZodArray<z.ZodObject<{
            _id: z.ZodString;
            label: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            _id: string;
            label: string;
        }, {
            _id: string;
            label: string;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        buttons: {
            _id: string;
            label: string;
        }[];
    }, {
        buttons: {
            _id: string;
            label: string;
        }[];
    }>;
    readonly "section-start": z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    readonly worksheet: z.ZodObject<{
        maxRowCount: z.ZodDefault<z.ZodNumber>;
        columns: z.ZodArray<z.ZodObject<{
            question: z.ZodString;
            placeholder: z.ZodDefault<z.ZodString>;
            _id: z.ZodString;
            answerType: z.ZodEnum<["text"]>;
        }, "strip", z.ZodTypeAny, {
            _id: string;
            question: string;
            placeholder: string;
            answerType: "text";
        }, {
            placeholder?: string | undefined;
            _id: string;
            question: string;
            answerType: "text";
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        maxRowCount: number;
        columns: {
            _id: string;
            question: string;
            placeholder: string;
            answerType: "text";
        }[];
    }, {
        maxRowCount?: number | undefined;
        columns: {
            placeholder?: string | undefined;
            _id: string;
            question: string;
            answerType: "text";
        }[];
    }>;
};
export type WorksheetItemType<T extends WorksheetStopType> = Omit<WorksheetItem, 'data'> & {
    data: z.infer<(typeof WorksheetItemSchema)[T]>;
};
export declare const WorksheetItemSchemas: (objectId?: any) => {
    readonly message: z.ZodObject<any, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    readonly image: z.ZodObject<any, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    readonly "response-text": z.ZodObject<any, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    readonly "response-buttons": z.ZodObject<any, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    readonly "section-start": z.ZodObject<any, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
    readonly worksheet: z.ZodObject<any, "strip", z.ZodTypeAny, {
        [x: string]: any;
    }, {
        [x: string]: any;
    }>;
};
export declare const WorksheetCreateUpdate: z.ZodObject<{
    sections: z.ZodArray<z.ZodAny, "many">;
    description: z.ZodString;
    name: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    category?: string | undefined;
    name: string;
    description: string;
    sections: any[];
}, {
    category?: string | undefined;
    name: string;
    description: string;
    sections: any[];
}>;
export declare const WorksheetSchemas: {
    read: z.ZodObject<{
        category: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        category?: string | undefined;
    }, {
        category?: string | undefined;
    }>;
    create: z.ZodObject<z.extendShape<{
        sections: z.ZodArray<z.ZodAny, "many">;
        description: z.ZodString;
        name: z.ZodString;
        category: z.ZodOptional<z.ZodString>;
    }, {
        revisedFrom: z.ZodOptional<z.ZodString>;
    }>, "strip", z.ZodTypeAny, {
        category?: string | undefined;
        revisedFrom?: string | undefined;
        name: string;
        description: string;
        sections: any[];
    }, {
        category?: string | undefined;
        revisedFrom?: string | undefined;
        name: string;
        description: string;
        sections: any[];
    }>;
    update: z.ZodObject<Omit<{
        sections: z.ZodArray<z.ZodAny, "many">;
        description: z.ZodString;
        name: z.ZodString;
        category: z.ZodOptional<z.ZodString>;
    }, never>, "strip", z.ZodTypeAny, {
        category?: string | undefined;
        name: string;
        description: string;
        sections: any[];
    }, {
        category?: string | undefined;
        name: string;
        description: string;
        sections: any[];
    }>;
};
export declare const ClientWorksheetSchemas: {
    read: z.ZodObject<{
        todo: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        todo: string;
    }, {
        todo: string;
    }>;
    create: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
    update: z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>;
};
export {};
//# sourceMappingURL=RelaySchema.d.ts.map