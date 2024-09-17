import { Flex, Txt } from '@mtyk/frontend/core/components';
import { shadow } from '@mtyk/frontend/styles/helpers/styles';
import React from 'react';
import useTodayCheckIn from '../../check-in/hooks/useTodayCheckIn';
import useCheckInOrNew from '../../frontend/check-ins/hooks/useCheckIn';
import FormattedDate from '../../frontend/core/components/FormattedDate';
import { CheckInFeeling } from './CheckInFeeling';
import { CheckInReason } from './CheckInReason';
export function CheckInCardText(props) {
    const { today, checkIn, appearance, canGoFullscreen, ...rest } = props;
    const [apiCheckInDoc] = useCheckInOrNew(checkIn);
    // const newCheckInDoc = useNewCheckIn()
    const checkInToday = useTodayCheckIn();
    const theCheckIn = today ? checkInToday : apiCheckInDoc;
    // const dec = useDecorationsContext()
    if (!theCheckIn) {
        return null;
    }
    return (React.createElement(Txt, null,
        React.createElement(CheckInFeeling, { checkInObj: theCheckIn }),
        ' ',
        React.createElement(CheckInReason, { checkInObj: theCheckIn }),
        "."));
}
/** Displays a single check-in, logged emotion and the reason behind it */
export default function CheckInCard(props) {
    const { today, checkIn, appearance, canGoFullscreen, ...rest } = props;
    const [apiCheckInDoc] = useCheckInOrNew(checkIn);
    // const newCheckInDoc = useNewCheckIn()
    const checkInToday = useTodayCheckIn();
    const theCheckIn = today ? checkInToday : apiCheckInDoc;
    // const dec = useDecorationsContext()
    if (!theCheckIn) {
        return null;
    }
    return (
    // TODO fix for practitioner/client shared
    // <TouchableOpacity
    //   onPress={() => {
    //     if (canGoFullscreen) {
    //       // Open check in fullscreen
    //       dec.openModal(NewCheckInSummary, {
    //         checkIn: theCheckIn._id,
    //         isModal: true,
    //       })
    //     }
    //   }}
    // >
    React.createElement(Flex, { column: true, gap: 10, padding: appearance === 'flat' ? [0, 0] : [20, 20], ...rest, style: {
            backgroundColor: 'white',
            borderRadius: 20,
            ...(appearance === 'flat' ? {} : shadow(0, 2, 3, 0.2)),
            ...rest.style,
        } },
        React.createElement(Txt, { size: 18 },
            React.createElement(CheckInCardText, { ...props })),
        React.createElement(FormattedDate, { style: { color: '#A8A19C' } }, theCheckIn.createdAt))
    // </TouchableOpacity>
    );
}
//# sourceMappingURL=CheckInCard.js.map