export interface TabControllerProps {
    tabs: (Record<string, any> & {
        label: string;
    })[];
}
declare const _default: {
    (props: {
        Renderer: import("react").ComponentType<{}>;
    }): JSX.Element;
    use: (props: TabControllerProps) => {
        readonly tabs: {
            isActive: boolean;
            onPress: () => Promise<void>;
            onClick: () => Promise<void>;
            _id: string;
            label: string;
        }[];
        readonly selectedItem: {
            _id: string;
            label: string;
        };
        readonly selectedIndex: number;
        readonly setSelectedItem: (item: {
            _id: string;
            label: string;
        }, bypass?: boolean | undefined) => Promise<void>;
        readonly isItemSelected: (item: any) => boolean;
        readonly items: {
            _id: string;
            label: string;
        }[];
        readonly selectNext: () => Promise<void>;
        readonly selectPrevious: () => Promise<void>;
        readonly canSelectNext: () => boolean;
        readonly canSelectPrevious: () => boolean;
    };
};
export default _default;
//# sourceMappingURL=TabController.d.ts.map