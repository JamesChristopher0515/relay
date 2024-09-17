import { Txt } from '@mtyk/frontend/core/components';
import { ComponentProps, ReactNode } from 'react';
/** Day.js style format string */
type DayJSFormat = string;
export declare function safeFormat(formatStr: string, date?: Date, fallback?: string): string;
export interface FormattedDateProps extends ComponentProps<typeof Txt> {
    date?: Date;
    children?: Date;
    showToday?: boolean;
    keepCurrentYear?: boolean;
    /** Defaults to 'MMMM Do yyyy', omitting year for current year */
    format?: DayJSFormat;
    prefix?: ReactNode;
    suffix?: ReactNode;
    /** Overrides format and showToday */
    relative?: boolean;
}
export declare function getTimeTo(d: Date): string;
export default function FormattedDate({ date: _date, format, children, prefix, suffix, showToday, keepCurrentYear, relative, ...rest }: FormattedDateProps): JSX.Element;
export declare function omitYearForLast12Months(date: Date, format: string): string;
export declare function formatDate(date: Date, format: string, smartStuff?: boolean): string;
export {};
//# sourceMappingURL=FormattedDate.d.ts.map