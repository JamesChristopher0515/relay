import React from 'react';
import { FlatList } from 'react-native';
export interface ConversationFlatListProps extends React.ComponentProps<typeof FlatList> {
    flatListRef: any;
}
declare class ConversationFlatList extends React.Component<ConversationFlatListProps> {
    rowScale: any;
    slide: any;
    state: {};
    componentDidMount(): void;
    render(): JSX.Element;
}
export default ConversationFlatList;
//# sourceMappingURL=ConversationFlatList.d.ts.map