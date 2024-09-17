import { ResponderFunction } from './RelayConversationTypes';
export declare function wrapResponderWithIds(responder: Omit<ResponderFunction<any, any>, 'responderId'>, responderId?: string): {
    (response: any, opts: any): Promise<any>;
    responderId: string;
};
//# sourceMappingURL=wrapResponderWithIds.d.ts.map