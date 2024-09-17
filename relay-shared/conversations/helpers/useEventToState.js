import { useEffect, useState } from 'react';
export default function useEventToState(obj, event, listener, defaultValue) {
    const [state, setState] = useState(defaultValue);
    useEffect(() => {
        return obj.listen(event, (event, data) => {
            setState(listener?.(data) ?? data);
        });
    }, []);
    return [state];
}
//# sourceMappingURL=useEventToState.js.map