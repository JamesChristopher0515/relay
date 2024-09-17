import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import RelayButton from 'core/components/RelayButton'
import { CompletableComponent } from 'core/CoreTypes'
import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import { absoluteFill } from '@mtyk/frontend/styles/helpers/styleObjects'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

export default function ThinkingPoints({
  points,
  title,
  onComplete,
}: CompletableComponent & {
  points: string[]
  title: string
  onComplete?: () => void
}) {
  const dec = useDecorationsContext()
  return (
    <Flex
      columnCenter
      style={{
        flex: 1,
        paddingVertical: 80,
        backgroundColor: 'white',
        ...absoluteFill(),
      }}
    >
      <Txt medium color={'#7bc4ad'} style={{ marginBottom: 17 }} size={16}>
        Thinking points
      </Txt>
      <Txt semibold color={'#1d1d1d'} size={18}>
        {title}
      </Txt>

      <ScrollView
        style={{
          flex: 1,
          flexGrow: 1,
          marginVertical: 50,
          width: 280,
          marginLeft: -24,
          maxWidth: '80%',
        }}
        contentContainerStyle={{
          paddingVertical: 15,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Flex column justifyContent="center" gap={45} grow>
          {points.map((p) => {
            return (
              <Flex row gap={24}>
                <Icon icon={faLightbulb} color={'#7bc4ad'} size={10.5} />
                <Txt size={15.8} style={{ marginTop: -10 }}>
                  {p}
                </Txt>
              </Flex>
            )
          })}
        </Flex>
      </ScrollView>

      <RelayButton
        onPress={async () => {
          if (onComplete) {
            onComplete()
          } else {
            dec.close()
          }
        }}
      >
        {onComplete ? 'Continue' : 'Back'}
      </RelayButton>
      {onComplete && (
        <Txt
          style={{ maxWidth: 240, marginTop: 25, lineHeight: 20 }}
          size={13}
          center
        >
          You can always find these thinking points in your{' '}
          <Txt medium>Content</Txt> library
        </Txt>
      )}
    </Flex>
  )
}
