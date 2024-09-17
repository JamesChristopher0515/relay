import { faCheck, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import addJournalEntryToCheckIn from 'check-in/actions/addJournalEntryToCheckIn'
import finishFeelingsCheckIn from 'check-in/actions/finishFeelingsCheckIn'
import { CheckInViewController } from 'check-in/controllers/CheckInViewController'
import ButtonRow from 'core/components/buttons/ButtonRow'
import RelayButton from 'core/components/RelayButton'
import { clientTheme } from 'core/helpers/client-theme'
import isJournalEntryNonEmpty from 'journal-entries/helpers/isJournalEntryNonEmpty'
import { Flex, Txt } from '@mtyk/frontend/core/components'
import useDecorationsContext from '@mtyk/frontend/decorations/contexts/DecorationsContext'
import MTYKSafeView from '@mtyk/frontend/native/layout/components/MTYKSafeView'
import React from 'react'
import { ViewControllerProps } from '@mtyk/frontend/controllers/helpers/makeController'
import useCheckInOrNew from 'relay-shared/frontend/check-ins/hooks/useCheckIn'
import getTimeOfDay from 'relay-shared/frontend/core/helpers/getTimeOfDay'
import useRelayActionDispatch from 'relay-shared/frontend/core/hooks/useRelayActions'
import useJournalEntryOrNew from 'relay-shared/frontend/journal-entries/hooks/useJournalEntry'
import { CheckInCard } from '../CheckInCard'
import { PromptForJournalEntry } from './PromptForJournalEntry'

export interface NewCheckInSummaryProps
  extends ViewControllerProps<typeof CheckInViewController> {
  /** Defaults to 'new' */
  checkIn?: string
  isModal?: boolean
}

const NewCheckInSummary: React.FC<NewCheckInSummaryProps> = (props) => {
  const { checkIn: _checkIn, isModal } = props
  const dec = useDecorationsContext()
  const checkIn = _checkIn ?? 'new'

  const patch = useRelayActionDispatch(
    addJournalEntryToCheckIn,
    finishFeelingsCheckIn
  )

  const [checkInDoc] = useCheckInOrNew(checkIn)
  function getAttachedJournalEntryId() {
    if (checkIn === 'new') {
      return 'new'
    } else {
      return checkInDoc?.journalEntry
    }
  }
  const [journalEntry] = useJournalEntryOrNew(getAttachedJournalEntryId())
  const isNew = checkIn === 'new'
  return (
    <MTYKSafeView disabled={isModal}>
      <Flex
        column
        justifyContent="center"
        gap={10}
        padding={[20, 20]}
        grow={1}
        fw
        style={{
          flex: 1,
          backgroundColor: isModal ? clientTheme.background : 'transparent',
        }}
      >
        {checkIn === 'new' ? (
          <Txt
            size={17}
            color={'#60534B'}
            style={{ maxWidth: 180, marginBottom: 50 }}
            semibold
          >
            Here's your check-in for this {getTimeOfDay()}:
          </Txt>
        ) : null}
        <CheckInCard
          canGoFullscreen={checkIn !== 'new'}
          checkIn={checkIn}
          style={{ marginTop: 50, marginBottom: 20 }}
        />
        <PromptForJournalEntry journalEntry={journalEntry} />
        <ButtonRow style={{ marginTop: 80 }}>
          <RelayButton
            secondary
            icon={faPencilAlt}
            iconStyle={{ color: 'white' }}
            action={patch(addJournalEntryToCheckIn, {
              checkIn: checkIn,
              journalEntry: getAttachedJournalEntryId(),
            })}
          >
            {isJournalEntryNonEmpty(journalEntry) ? 'Edit' : 'Add'} journal
            entry
          </RelayButton>
          <RelayButton
            icon={faCheck}
            iconStyle={{ color: 'white' }}
            action={
              isNew
                ? async () => {
                    await patch(finishFeelingsCheckIn)()
                    props.goToNextStep()
                  }
                : dec.close
            }
          >
            {isJournalEntryNonEmpty(journalEntry)
              ? 'Finish'
              : isNew
              ? 'Save'
              : `No, I'm done!`}
          </RelayButton>
        </ButtonRow>
      </Flex>
    </MTYKSafeView>
  )
}

export default NewCheckInSummary
