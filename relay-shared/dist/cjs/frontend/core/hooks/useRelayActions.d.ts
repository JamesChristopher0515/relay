import { RelayActionCreator } from '../RelayFrontendTypes';
/**
 * Pass a bunch of functions tha require hooks. It then returns a function that
 * you can pass initial action fns to, and it will call them with their hook state
 *
 * See exapmles of usage in codebase to get more clarity
 */
export default function useRelayActionDispatch(...actionCreators: RelayActionCreator[]): (creatorAlreadyPassed: RelayActionCreator, ...args: any[]) => () => void;
//# sourceMappingURL=useRelayActions.d.ts.map