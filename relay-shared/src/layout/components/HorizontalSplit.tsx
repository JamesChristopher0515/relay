import { Flex } from '@mtyk/frontend/core/components'
import React from 'react'

export interface HorizontalSplitProps {
  children: any
}
export interface HorizontalSplitRefHandle {}

export default function HorizontalSplit(props: HorizontalSplitProps) {
  const { children, ...rest } = props
  const asArray = React.Children.toArray(children)
  return (
    <Flex {...rest} row>
      {asArray.map((child, index) => {
        const childIsElement = React.isValidElement(child)
        const props = childIsElement ? child.props : {}
        const key = props.key ?? index
        return <React.Fragment key={key}>{child}</React.Fragment>
      })}
    </Flex>
  )
}
