import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { AxiosRequestConfig } from 'axios';
import { z, ZodTypeAny } from 'zod';
import { Id, PaginatedQueryOpts } from './apiTypes';
import type { ApiTags } from './tagTypes';
interface GenerateCrudOpts<R> {
    locallyUpdatable?: any[];
    alsoInvalidates?: any[];
}
export declare const creator: (resource: ApiTags, opts: GenerateCrudOpts<any>) => any;
export declare const updater: (resource: ApiTags, opts: GenerateCrudOpts<any>, relayApiGetter: () => any) => any;
export declare const getOne: (resource: ApiTags) => any;
export declare const _getMany: ({ resource, url, }: {
    resource: ApiTags;
    url: string;
}) => any;
export declare const getMany: (resource: ApiTags) => any;
export declare const generateCRUD: <T extends "QuestionnaireResult" | "CheckIn" | "Todo" | "Journey" | "User" | "UNAUTHORIZED" | "Client" | "Practitioner" | "Practice" | "Message" | "Category" | "Result" | "Questionnaire" | "AssignedResource" | "Content" | "Notification" | "AssignedJourney" | "ClientMilestoneStop" | "JourneySuggestion" | "ClientInsightsPreset" | "LoggedEvent" | "JournalEntry" | "Goal" | "ClientContent" | "Worksheet" | "ClientWorksheet" | "CaseNote" | "Appointment" | "RecurringAppointment", R, S extends {
    read: ZodTypeAny;
    create: ZodTypeAny;
    update: ZodTypeAny;
}>(relayApiGetter: any, builder: EndpointBuilder<BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
}, unknown, unknown, any, any>, ApiTags, 'relay-api'>, resource: T, resourceType: R, schemas: S, opts?: GenerateCrudOpts<any>) => { [key in `create${T}`]: import("@reduxjs/toolkit/dist/query/endpointDefinitions").MutationDefinition<z.TypeOf<S["create"]>, BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
}, unknown, unknown, any, any>, "QuestionnaireResult" | "CheckIn" | "Todo" | "Journey" | "User" | "UNAUTHORIZED" | "Client" | "Practitioner" | "Practice" | "Message" | "Category" | "Result" | "Questionnaire" | "AssignedResource" | "Content" | "Notification" | "AssignedJourney" | "ClientMilestoneStop" | "JourneySuggestion" | "ClientInsightsPreset" | "LoggedEvent" | "JournalEntry" | "Goal" | "ClientContent" | "Worksheet" | "ClientWorksheet" | "CaseNote" | "Appointment" | "RecurringAppointment", void, "relay-api">; } & { [key_1 in `update${T}`]: import("@reduxjs/toolkit/dist/query/endpointDefinitions").MutationDefinition<{
    id: Id;
    update: z.TypeOf<S["update"]>;
}, BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
}, unknown, unknown, any, any>, "QuestionnaireResult" | "CheckIn" | "Todo" | "Journey" | "User" | "UNAUTHORIZED" | "Client" | "Practitioner" | "Practice" | "Message" | "Category" | "Result" | "Questionnaire" | "AssignedResource" | "Content" | "Notification" | "AssignedJourney" | "ClientMilestoneStop" | "JourneySuggestion" | "ClientInsightsPreset" | "LoggedEvent" | "JournalEntry" | "Goal" | "ClientContent" | "Worksheet" | "ClientWorksheet" | "CaseNote" | "Appointment" | "RecurringAppointment", void, "relay-api">; } & { [key_2 in `get${T}`]: import("@reduxjs/toolkit/dist/query/endpointDefinitions").QueryDefinition<string, BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
}, unknown, unknown, any, any>, "QuestionnaireResult" | "CheckIn" | "Todo" | "Journey" | "User" | "UNAUTHORIZED" | "Client" | "Practitioner" | "Practice" | "Message" | "Category" | "Result" | "Questionnaire" | "AssignedResource" | "Content" | "Notification" | "AssignedJourney" | "ClientMilestoneStop" | "JourneySuggestion" | "ClientInsightsPreset" | "LoggedEvent" | "JournalEntry" | "Goal" | "ClientContent" | "Worksheet" | "ClientWorksheet" | "CaseNote" | "Appointment" | "RecurringAppointment", R | undefined, "relay-api">; } & { [key_3 in `get${T}s`]: import("@reduxjs/toolkit/dist/query/endpointDefinitions").QueryDefinition<PaginatedQueryOpts & z.TypeOf<S["read"]>, BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
}, unknown, unknown, any, any>, "QuestionnaireResult" | "CheckIn" | "Todo" | "Journey" | "User" | "UNAUTHORIZED" | "Client" | "Practitioner" | "Practice" | "Message" | "Category" | "Result" | "Questionnaire" | "AssignedResource" | "Content" | "Notification" | "AssignedJourney" | "ClientMilestoneStop" | "JourneySuggestion" | "ClientInsightsPreset" | "LoggedEvent" | "JournalEntry" | "Goal" | "ClientContent" | "Worksheet" | "ClientWorksheet" | "CaseNote" | "Appointment" | "RecurringAppointment", {
    data: R[];
    meta: any;
}, "relay-api">; } & { [key_4 in `delete${T}`]: import("@reduxjs/toolkit/dist/query/endpointDefinitions").MutationDefinition<string, BaseQueryFn<{
    url: string;
    method: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
}, unknown, unknown, any, any>, "QuestionnaireResult" | "CheckIn" | "Todo" | "Journey" | "User" | "UNAUTHORIZED" | "Client" | "Practitioner" | "Practice" | "Message" | "Category" | "Result" | "Questionnaire" | "AssignedResource" | "Content" | "Notification" | "AssignedJourney" | "ClientMilestoneStop" | "JourneySuggestion" | "ClientInsightsPreset" | "LoggedEvent" | "JournalEntry" | "Goal" | "ClientContent" | "Worksheet" | "ClientWorksheet" | "CaseNote" | "Appointment" | "RecurringAppointment", void, "relay-api">; };
export {};
//# sourceMappingURL=apiCrud.d.ts.map