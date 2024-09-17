export interface JourneyMilestoneStopType {
    name: string;
    fullName: string;
    type: string;
    icon: any;
    incompleteText?: string | null;
    completeText?: string | null;
    description: string;
}
export declare const stopTypes: JourneyMilestoneStopType[];
export declare function stopTypeInfo(type: string): JourneyMilestoneStopType | undefined;
export default function getStopTypeInfo(stopType: string): JourneyMilestoneStopType;
//# sourceMappingURL=getStopTypeInfo.d.ts.map