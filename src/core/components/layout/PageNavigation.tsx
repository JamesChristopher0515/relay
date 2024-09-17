import ScalingPressable from 'core/components/ScalingPressable'
import PageNavController from 'core/controllers/PageNavController'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import Icon from '@mtyk/frontend/core/components/Icon'
import { allCorners } from '@mtyk/frontend/styles/helpers/styles'
import useDimensions from '@mtyk/frontend/styles/hooks/useDimensions'
import React from 'react'

function PageNavigation() {
  const { navigation } = PageNavController.use({})

  const { width } = useDimensions()
  const expandNav = width > 330
  const activeColor = '#5C8870'
  const inactiveColor = '#B8D1C3'

  return (
    <Flex
      row
      justifyContent="space-between"
      shrink={0}
      style={{
        alignSelf: 'center',
        marginLeft: -10,
        width: width + 10,
        paddingHorizontal: 30,
        paddingTop: 10,
        backgroundColor: '#F8F4F4',
      }}
    >
      {navigation.map((item, i) => {
        return (
          <Flex
            column
            center
            key={item.href}
            as={ScalingPressable}
            hitSlop={allCorners(10)}
            onPress={item.toggle}
            style={{
              width: '25%',
              marginLeft: i === 1 || i === 2 ? -7 : 0,
            }}
          >
            <Icon
              icon={item.icon}
              size={20}
              color={item.isActive ? activeColor : inactiveColor}
            />
            {/* {item.label === 'Chat' ? <ChatUnreadIndicator /> : null} */}
            {expandNav ? (
              <Txt
                semibold
                size={16}
                style={[
                  {
                    marginTop: 5,
                    color: item.isActive ? activeColor : inactiveColor,
                  },
                ]}
              >
                {item.label}
              </Txt>
            ) : null}
          </Flex>
        )
      })}
    </Flex>
  )
}

export default PageNavigation
