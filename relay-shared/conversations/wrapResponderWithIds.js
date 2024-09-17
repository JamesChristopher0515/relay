import { v4 as uuidv4 } from 'uuid';
export function wrapResponderWithIds(responder, responderId = uuidv4()) {
    const func = async function wrappedResponder(response, opts) {
        const newResponseItem = await responder(response, opts);
        const id = uuidv4();
        return { ...newResponseItem, responderId, id };
    };
    func.responderId = responderId;
    return func;
}
//# sourceMappingURL=wrapResponderWithIds.js.map