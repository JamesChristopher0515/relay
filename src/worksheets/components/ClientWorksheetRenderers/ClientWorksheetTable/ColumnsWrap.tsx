import React, { Children } from 'react'
import { Flex } from '@mtyk/frontend/core/components'
import { borderRight } from '@mtyk/frontend/styles/helpers/styleObjects'

export function ColumnsWrap({ children, ...rest }) {
  return (
    <Flex
      row
      style={{
        backgroundColor: 'white',
      }}
      {...rest}
    >
      {Children.map(children, (child, index) => {
        const isLast = index === Children.count(children) - 1
        return (
          <Flex
            key={index}
            // padding={[15, 20]}
            style={{
              ...(isLast ? {} : { ...borderRight(1, '#888') }),
            }}
          >
            {child}
          </Flex>
        )
      })}
    </Flex>
  )
}
