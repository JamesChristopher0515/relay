import compose from '@mtyk/frontend/react/helpers/compose'
import React from 'react'
import { WorksheetItemType } from 'relay-shared/RelayTypes'
import ClientWorksheetButtons from './ClientWorksheetButtons'
import ClientWorksheetImage from './ClientWorksheetImage'
import { ClientWorksheetItemRendererProps } from './ClientWorksheetItemRendererProps'
import ClientWorksheetMessageRenderer from './ClientWorksheetMessage'
import ClientWorksheetTableRenderer from './ClientWorksheetTable/ClientWorksheetTableRenderer'
import ClientWorksheetText from './ClientWorksheetText'

export interface ClientWorksheetItemRendererRefHandle {}

export default compose()(function ClientWorksheetItemRenderer(
  props: ClientWorksheetItemRendererProps
) {
  const { item } = props
  const Component: { [K in WorksheetItemType]: any } = {
    message: ClientWorksheetMessageRenderer,
    worksheet: ClientWorksheetTableRenderer,
    'response-buttons': ClientWorksheetButtons,
    'response-text': ClientWorksheetText,
    image: ClientWorksheetImage,

    // We don't render this as part of the items but keep track of it and show in the header instead
    'section-start': () => null,
  }[item.type]
  return <Component {...props} />
})
