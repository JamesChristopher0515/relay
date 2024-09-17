import {
  useGetClientMilestoneStopQuery,
  useGetNotificationsQuery,
  useGetQuestionnaireResultQuery,
} from '../../frontend/api/hooks/useApi'
import getAllJourneyStops from '../../journeys/helpers/getAllJourneyStops'
import idEq, { findId } from '../../models/helpers/idEq'
import { Id } from '../../RelayTypes'
import { getAssignedJourneyActiveMilestoneIndex } from '../helpers/getAssignedJourneyActiveMilestoneIndex'
import useAssignedJourney from './useAssignedJourney'

export default function useAssignedJourneyWithInfo(
  assignedJourneyId?: Id,
  { includeActiveStopInfo } = { includeActiveStopInfo: false }
) {
  const qOptions = { refetchOnFocus: true, refetchOnReconnect: true }
  const assignedJourney = useAssignedJourney(assignedJourneyId)
  const { data: questionnaireReviewNotifData } = useGetNotificationsQuery(
    {
      'value%46clientStop': assignedJourney?.activeClientStop,
      type: 'assigned-journey-review',
    },
    { skip: !assignedJourney, ...qOptions }
  )

  const journey = assignedJourney?.journey
  const reviewNotif = questionnaireReviewNotifData?.data?.[0]
  const reviewQuestionnaireResultId = reviewNotif?.value.questionnaireResult
  const { data: questionnaireResult } = useGetQuestionnaireResultQuery(
    reviewQuestionnaireResultId,
    { skip: !reviewQuestionnaireResultId, ...qOptions }
  )

  const { data: lastActiveClientStop } = useGetClientMilestoneStopQuery(
    assignedJourney?.activeClientStop ?? assignedJourney?.lastClientStop,
    { skip: !assignedJourney }
  )

  // Find stop in journey milestones
  const [activeStop] =
    journey && lastActiveClientStop
      ? findId(getAllJourneyStops(journey), lastActiveClientStop.stop)
      : []

  const genericReviewPoint = activeStop?.type === 'review'
  const questionnaireReviewPoint =
    lastActiveClientStop &&
    idEq(reviewNotif?.value.clientStop, lastActiveClientStop._id) &&
    questionnaireResult

  const { milestoneIndex, progress } =
    lastActiveClientStop && journey && assignedJourney && includeActiveStopInfo
      ? getAssignedJourneyActiveMilestoneIndex({
          journey,
          assignedJourney,
          clientStop: lastActiveClientStop,
        })
      : { milestoneIndex: 0, progress: 0 }

  return {
    milestoneIndex,
    progress,
    assignedJourney,
    lastActiveClientStop,
    actionRequired: genericReviewPoint || questionnaireReviewPoint,
    questionnaireReviewPoint,
    genericReviewPoint,
    activeStop,
    questionnaireResult,
  }
}
