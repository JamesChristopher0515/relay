import { faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import Flex from '@mtyk/frontend/core/components/Flex'
import Txt from '@mtyk/frontend/core/components/Txt'
import useUrlParams from '@mtyk/frontend/core/hooks/useUrlParams'
import SchemaForm from '@mtyk/frontend/forms/components/SchemaForm'
import LinkButton from 'core/components/LinkButton'
import LoginField from 'core/components/pages/login/LoginField'
import LoginSetupAccount from 'core/components/pages/login/LoginSetupAccount'
import React, { useState } from 'react'
import { Field } from 'react-final-form'
import { KeyboardAvoidingView } from 'react-native'
import useLogin from 'relay-shared/frontend/api/hooks/useLogin'
import { z } from 'zod'
import RelayLogo from './RelayLogo'
import useSendPasswordReset from 'relay-shared/users/hooks/useSendPasswordReset'
import Constants from 'expo-constants'

const version = `v${Constants.expoConfig?.extra?.version ?? `1.0.0`}`

function LoginPageInner() {
  const [step, setStep] = useState('email')
  const [resetSent, setResetSent] = useState(false)
  const [login, { error, isLoading }] = useLogin()
  const { params } = useUrlParams()
  const { verify } = params
  const pwResetMutation = useSendPasswordReset()
  const sendPwReset = async (emailOrUsername: string) => {
    setResetSent(false)
    try {
      await pwResetMutation(emailOrUsername)
    } catch (e) {
      console.error(e)
    }
    setResetSent(true)
  }

  if (verify) {
    return <LoginSetupAccount verify={verify} />
  }
  const incorrectlogin = String(error).indexOf('401') >= 0

  return (
    <Flex center style={{ flex: 1 }}>
      <RelayLogo />
      <Txt
        block
        style={{
          marginTop: 130,
          textAlign: 'center',
          fontSize: 15,
          maxWidth: 260,
        }}
      >
        {incorrectlogin
          ? `We couldn't find an account with those details. Please try again.`
          : `Please enter the login provided by your practitioner`}
      </Txt>
      {step !== 'email' ? (
        <LinkButton
          icon={faChevronLeft}
          onPress={() => setStep('email')}
          style={{
            fontSize: 19,
            position: 'absolute',
            top: 60,
            left: 20,
          }}
        >
          Back
        </LinkButton>
      ) : null}
      <SchemaForm
        onSubmit={(values) => {
          login(values)
        }}
        schema={z.object({
          email: z.string(),
          password: z.string(),
        })}
      >
        {({ handleSubmit, form }) => {
          return (
            <Flex>
              {step === 'email' ? (
                <Field name="email" key="email">
                  {({ input, meta }) => {
                    return (
                      <LoginField
                        disabled={false}
                        style={{ width: 240 }}
                        {...input}
                        label="Email or username"
                        onPress={() => {
                          if (meta.valid) {
                            setStep('password')
                            setResetSent(false)
                          }
                        }}
                      />
                    )
                  }}
                </Field>
              ) : null}
              {step === 'password' ? (
                <Field name="password" key="password">
                  {({ input, meta }) => {
                    return (
                      <Flex gap={10} center>
                        <LoginField
                          disabled={false}
                          {...input}
                          input={{
                            autoFocus: true,
                          }}
                          style={{ width: 240 }}
                          label="Your Password"
                          onPress={handleSubmit}
                          icon={faCheck}
                        />
                        {resetSent ? (
                          <Txt style={{ paddingTop: 20 }}>
                            We've sent you an email with instructions.
                          </Txt>
                        ) : (
                          <LinkButton
                            onPress={() =>
                              sendPwReset(form.getState().values.email)
                            }
                            style={{
                              paddingTop: 30,
                            }}
                            textProps={{ style: { fontSize: 16 } }}
                          >
                            Forgot Password
                          </LinkButton>
                        )}
                      </Flex>
                    )
                  }}
                </Field>
              ) : null}
            </Flex>
          )
        }}
      </SchemaForm>
      <Txt
        medium
        style={{
          position: 'absolute',
          bottom: 0,
          right: 1,
          padding: 30,
        }}
      >
        {'v1.1.0 - dc' ?? version}
      </Txt>
    </Flex>
  )
}

function LoginPage() {
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <LoginPageInner />
    </KeyboardAvoidingView>
  )
}

export default LoginPage
