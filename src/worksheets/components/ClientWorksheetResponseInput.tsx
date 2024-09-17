import { Flex, TextArea } from '@mtyk/frontend/core/components'
import { MTYKIcon } from '@mtyk/frontend/core/components/Icon'
import { isIos } from '@mtyk/frontend/native/helpers/platform'
import compose from '@mtyk/frontend/react/helpers/compose'
import { border } from '@mtyk/frontend/styles/helpers/styleObjects'
import { shadow } from '@mtyk/frontend/styles/helpers/styles'
import RelayAvoidingView from 'core/components/RelayAvoidingView'
import RelayButton from 'core/components/RelayButton'
import React from 'react'
import RelayIcons from 'relay-shared/frontend/icons/RelayIcons'

export interface ClientWorksheetResponseInputProps {
  value: string
  buttonIcon?: MTYKIcon
  onChangeText: (text: string, submit?: boolean) => void
  live?: boolean
  inputProps?: any
}
export interface ClientWorksheetResponseInputRefHandle {}

export default compose()(function ClientWorksheetResponseInput(
  props: ClientWorksheetResponseInputProps
) {
  const { live, value, buttonIcon, onChangeText, inputProps } = props
  const [localValue, setLocalValue] = React.useState(value)
  return (
    <>
      <Flex
        rowCenter
        style={{
          width: '100%',
          maxWidth: '100%',
          flexGrow: 0,
          marginTop: 30,
          marginBottom: 50,
        }}
      >
        <TextArea
          autoFocus
          placeholder="Type your response here..."
          autoSize
          value={localValue}
          onChangeText={(text) => {
            setLocalValue(text)
            if (live) {
              onChangeText(text)
            }
          }}
          {...inputProps}
          style={{
            flexGrow: 1,
            flexShrink: 1,
            backgroundColor: 'white',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 10,
            ...shadow(0, 1, 1, 0.2),
            ...border(1, '#ddd'),
            ...inputProps?.style,
          }}
        />
        <RelayButton
          style={{ flexShrink: 0, marginLeft: 20, flexGrow: 0 }}
          icon={buttonIcon ?? RelayIcons.check}
          action={() => {
            onChangeText(localValue, true)
            setLocalValue('')
          }}
        />
      </Flex>
      {isIos() ? (
        <RelayAvoidingView keyboardVerticalOffset={-30} behavior="height" />
      ) : null}
    </>
  )
})
