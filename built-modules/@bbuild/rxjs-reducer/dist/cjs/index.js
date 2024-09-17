"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reducer = void 0;
const operators_1 = require("rxjs/operators");
function reducer(initialState, reducer) {
    return function (source) {
        return source.pipe((0, operators_1.scan)((state, action) => reducer(state, action), initialState));
    };
}
exports.reducer = reducer;
// // Define the initial state
// const initialState = { count: 0 }
// // Define the reducer function
// function reducer(state: any, action: any) {
//   switch (action.type) {
//     case 'increment':
//       return { count: state.count + 1 }
//     case 'decrement':
//       return { count: state.count - 1 }
//     default:
//       return state
//   }
// }
// // Create an observable of actions
// const actions$ = from([
//   { type: 'increment' },
//   { type: 'increment' },
//   { type: 'decrement' },
//   { type: 'unknown' },
//   { type: 'increment' },
// ])
// // Apply the reduxReducer operator
// const state$ = actions$.pipe(reduxReducer(initialState, reducer))
// // Subscribe to the state changes
// state$.subscribe(state => console.log(state))
// // Output:
// // { count: 1 }
// // { count: 2 }
// // { count: 1 }
// // { count: 1 }
// // { count: 2 }
// --- BEGIN INJECTED CODE ---
// Inject some code to check if we've imported two different versions of any module. This is a common cause of bugs.
const globalObject = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
const globalStore = globalObject?.__bbuild ?? {};
if (globalStore["rxjs-reducer"]) {
    console.warn(`Duplicate module rxjs-reducer imported. This can lead to bugs.`);
}
globalStore["rxjs-reducer"] = true;
// --- END INJECTED CODE ---
//# sourceMappingURL=index.js.map