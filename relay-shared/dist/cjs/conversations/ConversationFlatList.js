"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
class ConversationFlatList extends react_1.default.Component {
    rowScale = new react_native_1.Animated.Value(0);
    slide = new react_native_1.Animated.Value(0);
    state = {};
    componentDidMount() {
        react_native_1.Animated.spring(this.slide, {
            toValue: 1,
            tension: 1,
            useNativeDriver: true,
        }).start();
    }
    render() {
        const { renderItem } = this.props;
        const slide = 'left';
        return (react_1.default.createElement(react_native_1.FlatList, { ref: this.props.flatListRef, scrollEventThrottle: 16, ...this.props, renderItem: ({ item, index, separators }) => {
                const translateX = this.slide.interpolate({
                    inputRange: [0, 1],
                    outputRange: [(slide == 'right' ? 1 : -1) * ((index + 1) * -50), 0],
                });
                return (react_1.default.createElement(react_native_1.Animated.View, { style: { transform: [{ translateY: translateX }] } }, renderItem({ item, index, separators })));
            }, style: styles.flatList }));
    }
}
const styles = react_native_1.StyleSheet.create({
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
exports.default = ConversationFlatList;
//# sourceMappingURL=ConversationFlatList.js.map