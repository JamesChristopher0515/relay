import { BehaviorSubject, Observable, Subject } from "rxjs";
import { assert } from '@bbuild/errors';
import { concatMap, scan, takeUntil } from "rxjs/operators";
export function createStateMachine(transitions, opts) {
    let transitionCounter = 0;
    const { priorities = {} } = opts;
    let state = {
        current: opts.initialState ?? "Idle",
        context: opts.initialContext ?? {},
        disposables: new Set(),
    };
    let transitionStatus = "IDLE";
    let lastError = null;
    if (opts.initialStateDisposable)
        state.disposables.add(opts.initialStateDisposable);
    const stateMachine = {
        get currentState() {
            return state.current;
        },
        get isTransitioning() {
            return transitionStatus === "IN_PROGRESS";
        },
        get currentContext() {
            return state.context;
        },
        get lastError() {
            return lastError;
        },
        transitions,
        globalState: opts.globalState,
        transitionTo,
        stateChanges$: undefined,
        _stateChanges$: new BehaviorSubject({
            state: state.current,
            context: state.context,
            transitionStatus,
            lastError,
        }),
    };
    stateMachine.stateChanges$ = stateMachine._stateChanges$
        .asObservable()
        .pipe(scan((acc, curr) => ({ ...acc, ...curr })));
    const cleanupSubject = new Subject();
    async function transitionTo(newState, args, opts) {
        if (!transitions[newState]) {
            throw new Error(`Tried to transition to non-existent state: ${newState}`);
        }
        let currentPriority = priorities?.[state.current] ?? 0;
        let newPriority = priorities?.[newState] ?? 0;
        if (transitionStatus === "IN_PROGRESS" && !opts?.transitionChain?.length) {
            if (newPriority <= currentPriority) {
                throw new Error("A transition is already in progress");
            }
        }
        let currentTransitionCount = ++transitionCounter;
        let didInnerTransition = false;
        try {
            transitionStatus = "IN_PROGRESS";
            stateMachine._stateChanges$.next({
                transitionStatus,
            });
            state.previous = state.current;
            if (state.cleanupFn) {
                await state.cleanupFn();
            }
            state.disposables.forEach((disposable) => disposable.dispose());
            state.disposables.clear();
            let result = await transitions[newState](args, {
                current: state.context,
                registerDisposable: (disposable) => {
                    state.disposables.add(disposable);
                },
                transition: async (newState, args) => {
                    didInnerTransition = true;
                    return await transitionTo(newState, args, {
                        transitionChain: [...(opts?.transitionChain ?? []), newState],
                    });
                },
                state: stateMachine.globalState,
            });
            if (didInnerTransition) {
                // The post-transition logic will be handled by the inner transition
                return;
            }
            if (!Array.isArray(result)) {
                result = [result];
            }
            assert(typeof result[0] !== "undefined", `Transition ${newState} returned undefined. Transition functions must return a value`);
            if (result[0] instanceof Observable) {
                state.cleanupFn = result[1];
                result[0]
                    .pipe(concatMap(async (newContext) => {
                    if (currentTransitionCount !== transitionCounter) {
                        // A new transition has started, so we should not update the state
                        return;
                    }
                    state.context = newContext;
                    state.current = newState;
                    stateMachine._stateChanges$.next({
                        state: state.current,
                        context: state.context,
                    });
                }), takeUntil(cleanupSubject))
                    .subscribe({
                    complete: () => {
                        if (state.cleanupFn) {
                            state.cleanupFn();
                        }
                        cleanupSubject.next();
                        cleanupSubject.complete();
                    },
                });
            }
            else {
                const [newContext, cleanupFn] = result;
                if (currentTransitionCount === transitionCounter) {
                    state.context = newContext;
                    state.cleanupFn = cleanupFn;
                    state.current = newState;
                    stateMachine._stateChanges$.next({
                        state: state.current,
                        context: state.context,
                    });
                }
            }
        }
        catch (e) {
            lastError = {
                stateName: newState,
                args: args,
                previousState: state.previous,
                previousContext: state.context,
                error: e,
            };
            stateMachine._stateChanges$.next({
                lastError,
            });
            console.error(e);
            throw e;
        }
        finally {
            if (currentTransitionCount === transitionCounter) {
                transitionStatus = "IDLE";
                stateMachine._stateChanges$.next({
                    transitionStatus,
                });
            }
        }
        return state.context;
    }
    return stateMachine;
}
//# sourceMappingURL=createStateMachine.js.map