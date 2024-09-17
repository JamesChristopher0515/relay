import { CSSProperties } from 'react';
export default function makeSharedSVG(svg: any, { useStroke, useBoth, autoHeight, autoWidth, }?: {
    useBoth?: boolean;
    useStroke?: boolean;
    autoHeight?: boolean;
    autoWidth?: boolean;
}): ({ color, size: _size, style, ...rest }: {
    color?: string | undefined;
    size?: CSSProperties['width'];
    style?: any;
}) => JSX.Element;
//# sourceMappingURL=makeSharedSVG.d.ts.map