import { Flex } from '@mtyk/frontend/core/components'

import Txt from '@mtyk/frontend/core/components/Txt'
import { useHistory } from '@mtyk/frontend/core/hooks/routerHooks'
import SchemaForm from '@mtyk/frontend/forms/components/SchemaForm'
import PasswordStrengthMeter from '@mtyk/frontend/native/auth/components/PasswordStrengthMeter'
import LinkButton from 'core/components/LinkButton'
import LoginField from 'core/components/pages/login/LoginField'
import _ from 'lodash'
import { useState } from 'react'
import Toast from 'react-native-root-toast'
import { wrappedAxios } from 'relay-shared/frontend/api/hooks/useApi'
import useLogin from 'relay-shared/frontend/api/hooks/useLogin'
import { z } from 'zod'
import RelayLogo from './RelayLogo'

const formSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
})

export default function SetupAccount({ verify }: { verify: string }) {
  const [step, setStep] = useState('password')
  const [login, { error }] = useLogin()
  const history = useHistory()
  const [passwordScore, setPasswordScore] = useState(0)

  return (
    <Flex style={{ flex: 1 }}>
      <Flex center style={{ flex: 1 }}>
        <RelayLogo />
        <Flex
          style={{ height: 175, flexShrink: 1 }}
          column
          justifyContent="flex-end"
        >
          <Txt
            style={{
              textAlign: 'center',
              width: 280,
              maxWidth: '75%',
              fontSize: 15,
            }}
          >
            {`Please choose a strong password to finish setting your account up`}
          </Txt>
        </Flex>

        <SchemaForm
          onSubmit={async (values) => {
            const { password } = values
            try {
              const {
                data: { email },
              } = await wrappedAxios.post(`/users/setup`, {
                token: verify,
                password,
              })
              await login({ email, password })
            } catch (e) {
              console.error(e)
              Toast.show(
                `It looks like your invite may have expired. Please request a new invite from your provider.`
              )
            }
          }}
          validate={(values) => {
            const errors: any = {}
            if (values.password !== values.confirmPassword) {
              errors.confirmPassword = `This doesn't match the password you entered`
            }
            if (passwordScore < 2) {
              errors.password = `error`
            }
            return errors
          }}
          schema={formSchema}
        >
          {(formProps) => {
            const onSubmit = () => {
              if (step === 'confirmPassword') {
                formProps.handleSubmit()
              } else {
                if (!formProps.errors.password) {
                  setStep('confirmPassword')
                }
              }
            }
            return (
              <Flex style={{ height: 140 }}>
                {/* Position this stuff absolutely because all content is centered 
              and its height changes causing the whole screen to jump */}

                <LoginField
                  name={step}
                  disabled={formProps.submitting}
                  hideError={step === 'password'}
                  input={{ autoFocus: true }}
                  label={_.startCase(step)}
                  key={step}
                  style={{ width: 240 }}
                  onPress={onSubmit}
                >
                  {step === 'password' ? (
                    <>
                      <PasswordStrengthMeter
                        onScoreChanged={setPasswordScore}
                        password={formProps.values.password}
                        meterStyle={{
                          width: '80%',
                          marginTop: 15,
                        }}
                      />
                      <LinkButton
                        style={{
                          marginTop: 30,
                          alignSelf: 'center',
                        }}
                        onPress={() => history.replace('/')}
                      >
                        Login to existing account
                      </LinkButton>
                    </>
                  ) : null}
                  {step === 'confirmPassword' ? (
                    <LinkButton
                      style={{
                        marginTop: 30,
                        alignSelf: 'center',
                      }}
                      onPress={() => setStep('password')}
                    >
                      Go back
                    </LinkButton>
                  ) : null}
                </LoginField>
              </Flex>
            )
          }}
        </SchemaForm>
      </Flex>
    </Flex>
  )
}
