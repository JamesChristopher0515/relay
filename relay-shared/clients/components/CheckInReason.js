import { Txt } from '@mtyk/frontend/core/components';
import React from 'react';
import getReasonName from '../../reasons/helpers/getReasonName';
export function CheckInReason({ checkInObj }) {
    if (checkInObj?.reasons?.[0]) {
        const theReason = checkInObj.reasons[0];
        return (React.createElement(React.Fragment, null,
            React.createElement(Txt, null,
                "because ",
                checkInObj.reasons[0]?.name === 'custom' ? '' : 'of ',
                React.createElement(Txt, { bold: true, color: '#C0A789' }, getReasonName(theReason).replace(/\.$/, '')))));
    }
    return null;
}
//# sourceMappingURL=CheckInReason.js.map