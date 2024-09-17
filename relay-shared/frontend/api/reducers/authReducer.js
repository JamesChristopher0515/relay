import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    ready: false,
};
const slice = createSlice({
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
export const { actions: { setTokens, setUser }, reducer, } = slice;
//# sourceMappingURL=authReducer.js.map