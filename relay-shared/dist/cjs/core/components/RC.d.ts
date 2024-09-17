import React, { ComponentProps } from 'react';
import { RContextType } from '../contexts/RContext';
export type WHPlatformComponentProps<T extends keyof RContextType['platformComponents']> = {
    name: T;
    disabled?: boolean;
    native?: ComponentProps<RContextType['platformComponents'][T]>;
    web?: ComponentProps<RContextType['platformComponents'][T]>;
} & ComponentProps<RContextType['platformComponents'][T]>;
export declare function PassDown({ children, ...rest }: {
    [x: string]: any;
    children: any;
}): JSX.Element;
export declare const RC: React.ForwardRefExoticComponent<Pick<any, string | number | symbol> & React.RefAttributes<unknown>>;
//# sourceMappingURL=RC.d.ts.map