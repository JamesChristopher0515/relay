import { useContext } from 'react';
import RContext from '../../core/contexts/RContext';
export default function useClientShared() {
    const sharedRContext = useContext(RContext);
    const { platformHooks } = sharedRContext;
    return platformHooks.useClient();
}
//# sourceMappingURL=useClientShared.js.map