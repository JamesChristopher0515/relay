"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isCreator(user, document) {
    console.log(user._id, document?.creator);
    return user._id.toString() === document?.creator;
}
exports.default = isCreator;
//# sourceMappingURL=isCreator.js.map