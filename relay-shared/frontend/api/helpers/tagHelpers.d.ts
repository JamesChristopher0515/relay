import { PaginatedQueryOpts } from './apiTypes';
import tagTypes from './tagTypes';
export declare const tagsForMany: (type: (typeof tagTypes)[number], result: any, error: any, opts: PaginatedQueryOpts) => any[];
export declare const tagsForSingle: (type: (typeof tagTypes)[number], result: any, error: any, id: string) => {
    type: "QuestionnaireResult" | "CheckIn" | "Todo" | "Journey" | "User" | "UNAUTHORIZED" | "Client" | "Practitioner" | "Practice" | "Message" | "Category" | "Result" | "Questionnaire" | "AssignedResource" | "Content" | "Notification" | "AssignedJourney" | "ClientMilestoneStop" | "JourneySuggestion" | "ClientInsightsPreset" | "LoggedEvent" | "JournalEntry" | "Goal" | "ClientContent" | "Worksheet" | "ClientWorksheet" | "CaseNote" | "Appointment" | "RecurringAppointment";
    id: string;
}[];
//# sourceMappingURL=tagHelpers.d.ts.map