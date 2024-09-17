import React, { ComponentProps } from 'react'
import { Animated, FlatList, StyleSheet, Text, View } from 'react-native'

export interface ConversationFlatListProps
  extends React.ComponentProps<typeof FlatList> {
  flatListRef: any
}

class ConversationFlatList extends React.Component<ConversationFlatListProps> {
  rowScale = new Animated.Value(0)
  slide = new Animated.Value(0)
  state = {}

  componentDidMount() {
    Animated.spring(this.slide, {
      toValue: 1,
      tension: 1,
      useNativeDriver: true,
    }).start()
  }

  render() {
    const { renderItem } = this.props
    const slide = 'left'

    return (
      <FlatList
        ref={this.props.flatListRef}
        scrollEventThrottle={16}
        {...this.props}
        renderItem={({ item, index, separators }) => {
          const translateX = this.slide.interpolate({
            inputRange: [0, 1],
            outputRange: [(slide == 'right' ? 1 : -1) * ((index + 1) * -50), 0],
          })
          return (
            <Animated.View style={{ transform: [{ translateY: translateX }] }}>
              {renderItem!({ item, index, separators })}
            </Animated.View>
          )
        }}
        style={styles.flatList}
      />
    )
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
})

export default ConversationFlatList
