import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons'
import { Flex, Icon, Txt } from '@mtyk/frontend/core/components'
import RelayButton from 'core/components/RelayButton'

export interface JournalEntryPrivacyStatusProps {
  onChange(newPrivate: boolean): any
  value?: boolean
}
export interface JournalEntryPrivacyStatusRefHandle {}

export default function JournalEntryPrivacyStatus(
  props: JournalEntryPrivacyStatusProps
) {
  const { value: isPrivate, onChange } = props
  const text = isPrivate
    ? `This entry is private and won’t be shared with your practitioner`
    : `This entry is shared and can be viewed by your practitioner`

  const icon = isPrivate ? faLock : faLockOpen

  return (
    <Flex
      rc
      gap={15}
      padding={[10, 25]}
      style={{
        width: '100%',
        backgroundColor: '#F9FBF9',
      }}
    >
      <Icon icon={icon} color={'#455645'} />
      <Txt
        medium
        color="#2D2F2D"
        shrink={1}
        grow={0}
        style={{
          width: '70%',
        }}
      >
        {text}
      </Txt>
      <RelayButton
        style={{
          flexGrow: 0,
          flexShrink: 0,
          fontSize: 14,
        }}
        label={'Change'}
        action={() => {
          onChange(!isPrivate)
        }}
      />
    </Flex>
  )
}
