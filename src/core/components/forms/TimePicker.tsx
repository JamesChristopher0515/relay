import dayjs from 'dayjs'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import TransitionManager, {
  Transitions,
} from '@mtyk/frontend/native/animation/components/TransitionManager'
import { absoluteFill } from '@mtyk/frontend/styles/helpers/styleObjects'
import { border, shadow } from '@mtyk/frontend/styles/helpers/styles'
import React from 'react'
import { TimePicker as NativeTimePicker } from 'react-native-simple-time-picker'
import RelayButton from '../RelayButton'
import ScalingPressable from '../ScalingPressable'

function TimePickerModal({ value, onChange, close }) {
  const [hours, setHours] = React.useState(dayjs(value).hour())
  const [minutes, setMinutes] = React.useState(dayjs(value).minute())
  const handleChange = (value: { hours: number; minutes: number }) => {
    setHours(value.hours)
    setMinutes(value.minutes)
  }
  return (
    <TransitionManager
      {...Transitions.slideUpSubtle}
      style={{ ...absoluteFill() }}
    >
      <Flex
        center
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,.88)',
        }}
      >
        <Txt center medium size={20} style={{ marginBottom: 50 }}>
          Pick a time
        </Txt>
        <Flex center style={{ maxWidth: '70%' }}>
          <NativeTimePicker
            zeroPadding
            value={{ hours, minutes }}
            onChange={handleChange}
          />
        </Flex>
        <Flex rowCenter gap={10} context={{ scale: 1.15 }}>
          <RelayButton
            secondary
            style={{ marginTop: 50 }}
            onPress={() => {
              close()
            }}
          >
            Cancel
          </RelayButton>
          <RelayButton
            style={{ marginTop: 50 }}
            onPress={() => {
              onChange(dayjs().hour(hours).minute(minutes).toDate())
              close()
            }}
          >
            Choose
          </RelayButton>
        </Flex>
      </Flex>
    </TransitionManager>
  )
}

export default function TimePicker({ value, onChange, style }) {
  const dec = useDecorationsContext()

  return (
    <Flex
      center
      as={ScalingPressable}
      onPress={() => {
        dec.openModal(TimePickerModal, { onChange, value })
      }}
      padding={[5, 4]}
      style={{
        ...border(1, '#A38888'),
        borderRadius: 7,
        ...style,
      }}
    >
      <Txt bold style={{ fontSize: 13, letterSpacing: 2, color: '#A38888' }}>
        {dayjs(value).format('HH:mm')}
      </Txt>
    </Flex>
  )
}
