import { useEffect, useRef } from 'react';
export const usePractitionerCallTrackConnector = (tracks, type) => {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            const element = ref.current;
            tracks.forEach((track) => {
                if (track.kind === type) {
                    element.srcObject = new MediaStream([track.mediaStreamTrack ?? track]);
                }
            });
        }
    }, [tracks?.length]);
    return {
        ref,
    };
};
//# sourceMappingURL=usePractitionerCallTrackConnector.js.map