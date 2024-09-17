import RelayConversation from './RelayConversation';
export default class BasicConversation extends RelayConversation {
    defaultResponder;
    get defaultState() {
        return {};
    }
    constructor(opts) {
        super(opts);
    }
}
//# sourceMappingURL=BasicConversation.js.map