import { Flex, Txt } from '@mtyk/frontend/core/components';
import { isNative } from '@mtyk/frontend/core/helpers';
import nativeProps from '@mtyk/frontend/react/nativeProps';
import { makeSize } from '@mtyk/frontend/styles/helpers/styleObjects';
import React from 'react';
import { RC } from '../../core/components/RC';
import { getFeelingColor, getFeelingName, } from '../../feelings/helpers/getAllFeelings';
function WrapForPlatform({ children }) {
    if (isNative) {
        return (React.createElement(Flex, { rowCenter: true, padding: [0, 6] }, children));
    }
    else {
        return (React.createElement("div", { style: {
                display: 'inline-flex',
                alignItems: 'center',
                margin: '0 .3em',
                position: 'relative',
                top: '2px',
            } }, children));
    }
}
export function CheckInFeeling({ checkInObj }) {
    if (checkInObj?.feelings[0]) {
        const theFeeling = checkInObj.feelings[0];
        return (React.createElement(Txt, null,
            "Feeling",
            React.createElement(WrapForPlatform, null,
                React.createElement(RC, { name: "FeelingIcon", feeling: theFeeling.name, style: { ...nativeProps({ ...makeSize(18) }), marginRight: 5 } }),
                React.createElement(Txt, { ...nativeProps({ size: 18 }), bold: true, color: getFeelingColor(theFeeling) }, getFeelingName(theFeeling)))));
    }
    return null;
}
//# sourceMappingURL=CheckInFeeling.js.map