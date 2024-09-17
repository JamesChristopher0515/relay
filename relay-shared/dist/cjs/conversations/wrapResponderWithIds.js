"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapResponderWithIds = void 0;
const uuid_1 = require("uuid");
function wrapResponderWithIds(responder, responderId = (0, uuid_1.v4)()) {
    const func = async function wrappedResponder(response, opts) {
        const newResponseItem = await responder(response, opts);
        const id = (0, uuid_1.v4)();
        return { ...newResponseItem, responderId, id };
    };
    func.responderId = responderId;
    return func;
}
exports.wrapResponderWithIds = wrapResponderWithIds;
//# sourceMappingURL=wrapResponderWithIds.js.map