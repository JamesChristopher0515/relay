import React from 'react';
import { Animated, FlatList, StyleSheet } from 'react-native';
class ConversationFlatList extends React.Component {
    rowScale = new Animated.Value(0);
    slide = new Animated.Value(0);
    state = {};
    componentDidMount() {
        Animated.spring(this.slide, {
            toValue: 1,
            tension: 1,
            useNativeDriver: true,
        }).start();
    }
    render() {
        const { renderItem } = this.props;
        const slide = 'left';
        return (React.createElement(FlatList, { ref: this.props.flatListRef, scrollEventThrottle: 16, ...this.props, renderItem: ({ item, index, separators }) => {
                const translateX = this.slide.interpolate({
                    inputRange: [0, 1],
                    outputRange: [(slide == 'right' ? 1 : -1) * ((index + 1) * -50), 0],
                });
                return (React.createElement(Animated.View, { style: { transform: [{ translateY: translateX }] } }, renderItem({ item, index, separators })));
            }, style: styles.flatList }));
    }
}
const styles = StyleSheet.create({
    noData: { alignSelf: 'center', textAlign: 'center', marginTop: 20 },
    searchBarContainer: {
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#f2f2f2',
        width: '100%',
    },
    searchBar: {
        borderRadius: 5,
        backgroundColor: 'white',
        height: 38,
        fontSize: 15,
        width: '100%',
        paddingHorizontal: 10,
    },
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '100%',
    },
    defaultSeparator: {
        height: 1,
        width: '80%',
        alignSelf: 'center',
        backgroundColor: '#f2f2f2',
    },
    flatList: { height: '100%', width: '100%', backgroundColor: 'transparent' },
});
export default ConversationFlatList;
//# sourceMappingURL=ConversationFlatList.js.map