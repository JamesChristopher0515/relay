import { Id } from '../../../RelayTypes';
export default function useCheckInOrNew(id?: Id): readonly [any, {
    readonly create: any;
    readonly update: (update: any) => Promise<void>;
    readonly remove: () => Promise<any>;
}];
//# sourceMappingURL=useCheckIn.d.ts.map