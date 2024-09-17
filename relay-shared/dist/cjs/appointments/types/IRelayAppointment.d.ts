import { Id } from 'src/RelayTypes';
export interface IRelayAppointment {
    date: Date;
    _id: Id;
    endedAt?: Date;
    clientId: string;
    practitionerId: string;
    recurringId?: string;
}
//# sourceMappingURL=IRelayAppointment.d.ts.map