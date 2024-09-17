import { Id } from '../../RelayTypes';
interface CheckInCardProps {
    /** Defaults to 'card' */
    appearance?: 'card' | 'flat';
    checkIn?: Id;
    today?: boolean;
    style?: any;
    canGoFullscreen?: boolean;
}
export declare function CheckInCardText(props: CheckInCardProps): JSX.Element | null;
/** Displays a single check-in, logged emotion and the reason behind it */
export default function CheckInCard(props: CheckInCardProps): JSX.Element | null;
export {};
//# sourceMappingURL=CheckInCard.d.ts.map