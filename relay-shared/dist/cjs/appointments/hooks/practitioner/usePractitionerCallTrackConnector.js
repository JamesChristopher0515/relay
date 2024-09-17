"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePractitionerCallTrackConnector = void 0;
const react_1 = require("react");
const usePractitionerCallTrackConnector = (tracks, type) => {
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
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
exports.usePractitionerCallTrackConnector = usePractitionerCallTrackConnector;
//# sourceMappingURL=usePractitionerCallTrackConnector.js.map