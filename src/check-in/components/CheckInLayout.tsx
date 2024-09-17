import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import { MTYKIcon } from '@mtyk/frontend/core/components/Icon'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import { AnimatedFlex } from '@mtyk/frontend/native/animation/components/AnimatedComponents'
import { borderBottom } from '@mtyk/frontend/styles/helpers/styles'
import RelayLogo from 'core/components/pages/login/RelayLogo'
import React, {
  ComponentProps,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react'
import ContextMenu, { ContextMenuAction } from 'react-native-context-menu-view'
import { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'
export interface CheckInHeaderProps {
  children?: React.ReactNode
  hideLogo?: boolean
  title?: string
  back?: string
  extra?: React.ReactNode
  height?: number
  titleIcon?: MTYKIcon
  menuOptions?: (ContextMenuAction & { action: () => void })[]
  titleIconProps?: Partial<ComponentProps<typeof Icon>>
  titleProps?: Partial<ComponentProps<typeof Txt>>
}

export default forwardRef(function CheckInHeader(
  props: CheckInHeaderProps,
  ref
) {
  const {
    children,
    hideLogo,
    menuOptions,
    extra,
    titleIcon,
    titleIconProps,
    height,
    title,
    back,
    titleProps,
  } = props
  const xPadding = 20

  const history = useHistory()
  const [hideHeader, setHideHeader] = useState(false)
  // const hideHeader = keyboard.keyboardShown

  useImperativeHandle(ref, () => {
    return {
      setHideHeader,
    }
  })

  // useEffect(() => {
  //   if (keyboard.keyboardShown) {
  //     setHideHEader(true)
  //   } else {
  //     setTimeout(() => {
  //       if (!keyboard.keyboardShown) {
  //         setHideHEader(false)
  //       }
  //     }, 2000)
  //   }
  // }, [keyboard.keyboardShown])

  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginTop: withTiming(hideHeader ? -(height ?? 100) : 0, {
        duration: 250,
      }),
      opacity: withTiming(hideHeader ? 0 : 1, { duration: 250 }),
    }
  }, [hideHeader])

  return (
    <Flex grow>
      <AnimatedFlex
        style={[
          {
            paddingBottom: 10,
            height,
            paddingTop: 55,
            ...borderBottom(1, '#DCDCDC'),
            paddingHorizontal: xPadding,
          },
          animatedStyle,
        ]}
      >
        <Flex grow rowCenter between style={{ marginBottom: hideLogo ? 0 : 8 }}>
          {hideLogo ? null : <RelayLogo style={{ width: 65 }} />}
          <Flex grow />
          {menuOptions ? (
            <ContextMenu
              actions={menuOptions}
              dropdownMenuMode
              onPress={(e) => {
                menuOptions[e.nativeEvent.index].action()
              }}
            >
              <Icon icon={RelayIcons.dotDotDot} color={'#A08282'} />
            </ContextMenu>
          ) : null}
        </Flex>
        {title ? (
          <>
            {/* <Flex style={{ height: 30 }} /> */}
            <Flex rowCenter gap={7}>
              <Icon
                color={`#DEABAB`}
                icon={titleIcon ?? RelayIcons.puzzlePiece}
                {...titleIconProps}
              />
              <Txt medium size={15} color={'#584546'} {...titleProps}>
                {title}
              </Txt>
            </Flex>
          </>
        ) : null}
        {extra}
      </AnimatedFlex>
      <Flex grow style={{ flex: 1 }}>
        {children}
      </Flex>
    </Flex>
  )
})
