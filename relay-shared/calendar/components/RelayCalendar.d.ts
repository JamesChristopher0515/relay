import { DefaultProps } from '@mtyk/frontend/native/MTYKNativeTypes';
import { Dayjs } from 'dayjs';
import React from 'react';
interface RelayCalendarProps extends DefaultProps.Input<Dayjs> {
    style?: React.CSSProperties;
    selectedTimeRange: {
        start: Date;
        end: Date;
    };
    hideMonth?: boolean;
    dayProps?: any;
    disableFuture?: boolean;
    disablePast?: boolean;
    dayStyles?: {
        [key: string]: React.CSSProperties;
    };
}
export default function RelayCalendar(props: RelayCalendarProps): JSX.Element;
export {};
//# sourceMappingURL=RelayCalendar.d.ts.map