"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mutationForwarder(mutation) {
    return async (...args) => {
        return mutation(...args).unwrap();
    };
}
exports.default = mutationForwarder;
//# sourceMappingURL=mutationForwarder.js.map