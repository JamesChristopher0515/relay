import React, { ReactNode } from 'react'
import { isIos, isAndroid } from '@mtyk/frontend/native/helpers/platform'
import {
  EventSubscription,
  Keyboard,
  StyleSheet,
  LayoutAnimation,
  Platform,
  View,
  Dimensions,
} from 'react-native'

type Props = {
  /** Specify how to react to the presence of the keyboard. */
  behavior?: 'height' | 'position' | 'padding'

  /** Style of the content container when `behavior` is 'position'. */
  contentContainerStyle?: any

  /**
   * Controls whether this `KeyboardAvoidingView` instance should take effect.
   * This is useful when more than one is on the screen. Defaults to true.
   */
  enabled?: boolean

  /**
   * Distance between the top of the user screen and the React Native view. This
   * may be non-zero in some cases. Defaults to 0.
   */
  keyboardVerticalOffset?: number
}

interface ViewLayoutEvent {}

type State = {
  bottom: number
}

type KeyboardEventCoordinates = {}

/**
 * View that moves out of the way when the keyboard appears by automatically
 * adjusting its height, position, or bottom padding.
 */
class RelayAvoidingView extends React.Component<Props, State> {
  _frame: any = null
  _keyboardEvent: KeyboardEvent | null = null
  _subscriptions: Array<EventSubscription> = []
  viewRef: { current: React.ElementRef<typeof View> | null }
  _initialFrameHeight: number = 0

  constructor(props: Props) {
    super(props)
    this.state = { bottom: 0 }
    this.viewRef = React.createRef()
  }

  _onKeyboardChange = (event: KeyboardEvent) => {
    this._keyboardEvent = event
    this._updateBottomIfNecessary()
  }

  _onLayout = (event: ViewLayoutEvent) => {
    const wasFrameNull = this._frame == null
    this._frame = event.nativeEvent.layout
    if (!this._initialFrameHeight) {
      // save the initial frame height, before the keyboard is visible
      this._initialFrameHeight = this._frame.height
    }

    if (wasFrameNull) {
      this._updateBottomIfNecessary()
    }

    if (this.props.onLayout) {
      this.props.onLayout(event)
    }
  }

  _updateBottomIfNecessary = () => {
    const screenDimensions = Dimensions.get('window')

    if (this._keyboardEvent == null) {
      this.setState({ bottom: 0 })
      return
    }
    // Start coordinates doesn't exist on Android
    const { duration, easing, endCoordinates } = this._keyboardEvent

    let height = 0
    if (isIos()) {
      const { startCoordinates } = this._keyboardEvent
      if (endCoordinates.screenY > startCoordinates.screenY) {
        this.setState({ bottom: 0 })
        return
      }

      height = startCoordinates.screenY - endCoordinates.screenY

      if (this.state.bottom === height) {
        return
      }
    } else {
      const isOnscreen = endCoordinates.screenY < screenDimensions.height
      height = isOnscreen ? screenDimensions.height - endCoordinates.screenY : 0
      console.log({ height, isOnscreen, screenDimensions, endCoordinates })
    }

    if (duration && easing) {
      LayoutAnimation.configureNext({
        // We have to pass the duration equal to minimal accepted duration defined here: RCTLayoutAnimation.m
        duration: duration > 10 ? duration : 10,
        update: {
          duration: duration > 10 ? duration : 10,
          type: LayoutAnimation.Types[easing] || 'keyboard',
        },
      })
    }

    this.setState({ bottom: height })
  }

  componentDidMount(): void {
    if (Platform.OS === 'ios') {
      this._subscriptions = [
        Keyboard.addListener('keyboardWillChangeFrame', this._onKeyboardChange),
      ]
    } else {
      this._subscriptions = [
        Keyboard.addListener('keyboardDidHide', this._onKeyboardChange),
        Keyboard.addListener('keyboardDidShow', this._onKeyboardChange),
      ]
    }
  }

  componentWillUnmount(): void {
    this._subscriptions.forEach((subscription) => {
      subscription.remove()
    })
  }

  render() {
    const {
      behavior,
      children,
      contentContainerStyle,
      enabled = true,
      // eslint-disable-next-line no-unused-vars
      keyboardVerticalOffset = 0,
      style,
      onLayout,
      ...props
    } = this.props
    const bottomHeight = enabled === true ? this.state.bottom : 0
    switch (behavior) {
      case 'height':
        const heightStyle = {
          ...style,
          height: bottomHeight + keyboardVerticalOffset,
          flexGrow: 0,
          flexShrink: 0,
          backgroundColor: 'red',
          flex: 0,
        }
        console.log({ heightStyle })
        return (
          <View
            ref={this.viewRef}
            style={heightStyle}
            onLayout={this._onLayout}
            {...props}
          >
            {children}
          </View>
        )

      case 'position':
        return (
          <View
            ref={this.viewRef}
            style={style}
            onLayout={this._onLayout}
            {...props}
          >
            <View
              style={StyleSheet.compose(contentContainerStyle, {
                bottom: bottomHeight,
              })}
            >
              {children}
            </View>
          </View>
        )

      case 'padding':
        return (
          <View
            ref={this.viewRef}
            style={StyleSheet.compose(style, {
              paddingBottom:
                bottomHeight > 0 ? bottomHeight + keyboardVerticalOffset : 0,
            })}
            onLayout={this._onLayout}
            {...props}
          >
            {children}
          </View>
        )

      default:
        return (
          <View
            ref={this.viewRef}
            onLayout={this._onLayout}
            style={style}
            {...props}
          >
            {children}
          </View>
        )
    }
  }
}

export default RelayAvoidingView
