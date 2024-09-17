import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import CircularButton from 'core/components/CircularButton'
import LabelledField from 'core/components/forms/LabelledField'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import React from 'react'
import { Field } from 'react-final-form'
import { unifyStyles } from '@mtyk/frontend/react/helpers/unifyStyle'
import { DefaultNativeProps } from '@mtyk/frontend/native/MTYKNativeTypes'

function LoginField({
  name,
  icon,
  label,
  onPress,
  hideError,
  children,
  style,
  disabled,
  input: propsInput,
}: {
  icon?: any
  name: string
  hideError?: boolean
  input?: any
  label: string
  onPress: any
  disabled: boolean
} & DefaultNativeProps) {
  return (
    <Field name={name}>
      {({ input, meta }) => {
        return (
          <Flex style={[{}, ...unifyStyles(style)]}>
            <Flex
              row
              center
              style={[
                {
                  marginTop: 65,
                },
              ]}
            >
              <LabelledField
                label={label}
                style={{ flexGrow: 1, flex: 1 }}
                onSubmitEditing={() => {
                  onPress?.()
                }}
                {...input}
                {...propsInput}
              />
              <CircularButton
                disabled={disabled || meta.error}
                icon={icon ?? faArrowRight}
                onPress={onPress}
                style={{ marginLeft: 10 }}
              />
            </Flex>
            {!hideError &&
            meta.error &&
            String(input.value).length &&
            meta.touched ? (
              <Txt style={{ textAlign: 'center', marginTop: 10 }}>
                {meta.error}
              </Txt>
            ) : null}
            {children}
          </Flex>
        )
      }}
    </Field>
  )
}

export default LoginField
