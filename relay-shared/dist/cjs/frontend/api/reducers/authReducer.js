"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = exports.setUser = exports.setTokens = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    ready: false,
};
const slice = (0, toolkit_1.createSlice)({
    name: 'auth',
    initialState,
    reducers: {
        setTokens(state, action) {
            state.tokens = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    },
});
_a = slice.actions, exports.setTokens = _a.setTokens, exports.setUser = _a.setUser, exports.reducer = slice.reducer;
//# sourceMappingURL=authReducer.js.map