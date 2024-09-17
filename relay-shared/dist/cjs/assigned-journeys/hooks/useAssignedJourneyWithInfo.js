"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const useApi_1 = require("../../frontend/api/hooks/useApi");
const getAllJourneyStops_1 = __importDefault(require("../../journeys/helpers/getAllJourneyStops"));
const idEq_1 = __importStar(require("../../models/helpers/idEq"));
const getAssignedJourneyActiveMilestoneIndex_1 = require("../helpers/getAssignedJourneyActiveMilestoneIndex");
const useAssignedJourney_1 = __importDefault(require("./useAssignedJourney"));
function useAssignedJourneyWithInfo(assignedJourneyId, { includeActiveStopInfo } = { includeActiveStopInfo: false }) {
    const qOptions = { refetchOnFocus: true, refetchOnReconnect: true };
    const assignedJourney = (0, useAssignedJourney_1.default)(assignedJourneyId);
    const { data: questionnaireReviewNotifData } = (0, useApi_1.useGetNotificationsQuery)({
        'value%46clientStop': assignedJourney?.activeClientStop,
        type: 'assigned-journey-review',
    }, { skip: !assignedJourney, ...qOptions });
    const journey = assignedJourney?.journey;
    const reviewNotif = questionnaireReviewNotifData?.data?.[0];
    const reviewQuestionnaireResultId = reviewNotif?.value.questionnaireResult;
    const { data: questionnaireResult } = (0, useApi_1.useGetQuestionnaireResultQuery)(reviewQuestionnaireResultId, { skip: !reviewQuestionnaireResultId, ...qOptions });
    const { data: lastActiveClientStop } = (0, useApi_1.useGetClientMilestoneStopQuery)(assignedJourney?.activeClientStop ?? assignedJourney?.lastClientStop, { skip: !assignedJourney });
    // Find stop in journey milestones
    const [activeStop] = journey && lastActiveClientStop
        ? (0, idEq_1.findId)((0, getAllJourneyStops_1.default)(journey), lastActiveClientStop.stop)
        : [];
    const genericReviewPoint = activeStop?.type === 'review';
    const questionnaireReviewPoint = lastActiveClientStop &&
        (0, idEq_1.default)(reviewNotif?.value.clientStop, lastActiveClientStop._id) &&
        questionnaireResult;
    const { milestoneIndex, progress } = lastActiveClientStop && journey && assignedJourney && includeActiveStopInfo
        ? (0, getAssignedJourneyActiveMilestoneIndex_1.getAssignedJourneyActiveMilestoneIndex)({
            journey,
            assignedJourney,
            clientStop: lastActiveClientStop,
        })
        : { milestoneIndex: 0, progress: 0 };
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
    };
}
exports.default = useAssignedJourneyWithInfo;
//# sourceMappingURL=useAssignedJourneyWithInfo.js.map