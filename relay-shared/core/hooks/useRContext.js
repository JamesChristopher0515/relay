import { useContext } from 'react';
import RContext from '../contexts/RContext';
export default function useRContext() {
    return useContext(RContext);
}
export function useSharedActions() {
    return useRContext().sharedActions;
}
//# sourceMappingURL=useRContext.js.map