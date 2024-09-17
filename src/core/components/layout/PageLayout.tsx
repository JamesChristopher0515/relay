import { faCog, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import { AnimatedFlexOnOff } from '@mtyk/frontend/native/animation/components/AnimatedComponents'
import { isIos } from '@mtyk/frontend/native/helpers/platform'
import MTYKSafeAreaView from '@mtyk/frontend/native/layout/components/MTYKSafeView'
import { DefaultNativeProps } from '@mtyk/frontend/native/MTYKNativeTypes'
import { unifyStyles } from '@mtyk/frontend/react/helpers/unifyStyle'
import { allCorners } from '@mtyk/frontend/styles/helpers/styleObjects'
import useDimensions from '@mtyk/frontend/styles/hooks/useDimensions'
import PlayingResourceControls from 'content/components/PlayingResourceControls'
import PageNavigation from 'core/components/layout/PageNavigation'
import React from 'react'
import { View } from 'react-native'
import SettingsModal from '../../../settings/components/SettingsModal'
import RelayAvoidingView from '../RelayAvoidingView'
import ScalingPressable from '../ScalingPressable'

function PageLayout({
  children,
  safeView,
  style,
  header,
  isSettings,
  hideNavigation,
  hideSettings,
  avoidKeyboard,
  pageInsets,
  noXPadding,
}: DefaultNativeProps & {
  hideNavigation?: boolean
  pageInsets?: number[]
  header?: any
  noXPadding?: boolean
  hideSettings?: boolean
  avoidKeyboard?: boolean
  isSettings?: boolean
  safeView?: any
}) {
  const { smaller } = useDimensions()
  const dec = useDecorationsContext()
  const xPad = 22 - smaller * 5

  function maybeAvoid(children) {
    if (avoidKeyboard) {
      return (
        <RelayAvoidingView
          keyboardVerticalOffset={isIos() ? 185 : 0}
          behavior="padding"
          style={{
            flex: 1,
          }}
        >
          {children}
        </RelayAvoidingView>
      )
    } else {
      return <>{children}</>
    }
  }

  return (
    <View style={[{ flex: 1 }, ...unifyStyles(style)]}>
      <MTYKSafeAreaView
        style={{ overflow: 'visible' }}
        vertical={10 + smaller * 7}
        // horizontal={noXPadding ? 0 : xPad}
        {...safeView}
      >
        {maybeAvoid(
          <Flex
            style={{ flex: 1, paddingHorizontal: xPad, overflow: 'visible' }}
            column
          >
            <Flex
              grow
              shrink
              style={{
                paddingTop: pageInsets?.[0],
                overflow: 'visible',
              }}
            >
              {children}
              <Flex
                rowCenter
                style={{ position: 'absolute', top: 50, right: 0 }}
              >
                {header}
              </Flex>
            </Flex>
            {hideNavigation ? null : <PageNavigation />}
          </Flex>
        )}
        {hideSettings ? null : (
          <MTYKSafeAreaView.spy>
            {({ paddingTop, paddingRight }) => {
              return (
                <Flex
                  rowCenter
                  as={ScalingPressable}
                  hitSlop={allCorners(15)}
                  onPress={() => {
                    if (!isSettings) {
                      dec.openModal(SettingsModal, { pageLayout: PageLayout })
                    } else {
                      dec.close()
                    }
                  }}
                  style={{
                    position: 'absolute',
                    paddingTop,
                    top: 5,
                    right: 15 + (noXPadding ? xPad : 0),
                    paddingRight,
                  }}
                >
                  <AnimatedFlexOnOff
                    offStyle={{ opacity: 0 }}
                    onStyle={{ opacity: 1 }}
                    value={isSettings ?? false}
                  >
                    <Txt
                      style={{ marginRight: 10, fontSize: 15, color: '#666' }}
                    >
                      Settings
                    </Txt>
                  </AnimatedFlexOnOff>
                  <FontAwesomeIcon
                    style={{
                      color: '#A59D99',
                    }}
                    size={18}
                    icon={isSettings ? faTimes : faCog}
                  />
                </Flex>
              )
            }}
          </MTYKSafeAreaView.spy>
        )}
      </MTYKSafeAreaView>
      <PlayingResourceControls />
    </View>
  )
}

export default PageLayout
