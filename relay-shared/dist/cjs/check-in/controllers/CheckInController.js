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
const useUser_1 = require("core/hooks/useUser");
const react_1 = require("react");
const makeController_1 = __importDefault(require("@mtyk/frontend/controllers/helpers/makeController"));
const useTimeOfDay_1 = __importDefault(require("../../core/hooks/useTimeOfDay"));
const getAllFeelings_1 = __importStar(require("../../feelings/helpers/getAllFeelings"));
const useApi_1 = require("../../frontend/api/hooks/useApi");
const newJournalEntry_1 = __importDefault(require("../../journal-entries/helpers/newJournalEntry"));
const getAllReasons_1 = __importDefault(require("../../reasons/helpers/getAllReasons"));
const newCheckIn_1 = __importDefault(require("../helpers/newCheckIn"));
const useNewCheckIn_1 = __importDefault(require("../hooks/useNewCheckIn"));
exports.default = (0, makeController_1.default)(() => {
    const timeOfDay = (0, useTimeOfDay_1.default)();
    const newCheckInProps = (0, useNewCheckIn_1.default)();
    const [user] = (0, useUser_1.useClient)();
    const { newJournalEntryDoc: journalEntry } = newCheckInProps;
    const [createCheckInMutation] = (0, useApi_1.useCreateCheckInMutation)();
    const [initialFeeling, setInitialFeeling] = (0, react_1.useState)((0, getAllFeelings_1.getSimpleFeelings)()[2]);
    function getSecondGreeting() {
        const feeling = initialFeeling;
        const { name } = feeling;
        if (name === 'great') {
            return `It's great to hear you are feeling good!`;
        }
        else if (name === 'good') {
            return `Glad to hear you are feeling good.`;
        }
        else if (name === 'ok') {
            return `Hopefully things will look better soon.`;
        }
        else if (name === 'not great') {
            return `Sorry to hear you aren't feeling great.`;
        }
        else if (name === 'bad') {
            return `Sorry to hear you are feeling bad.`;
        }
        else {
            return name;
        }
    }
    return {
        greeting: `How are you feeling this ${timeOfDay}?`,
        finish: `Here's your check-in for this ${timeOfDay}?`,
        secondGreeting: getSecondGreeting(),
        feelings: (0, getAllFeelings_1.default)(),
        initialFeeling,
        reset: () => {
            newCheckInProps.updateNewCheckIn((0, newCheckIn_1.default)());
            newCheckInProps.updateNewJournalEntry((0, newJournalEntry_1.default)());
        },
        setInitialFeeling,
        reasons: (0, getAllReasons_1.default)(),
        isFeelingSelected: (feeling) => {
            return newCheckInProps.newCheckInDoc.feelings.find(f => f.name === feeling.name);
        },
        isReasonSelected: (reason) => {
            return newCheckInProps.newCheckInDoc.reasons.find(r => r.name === reason.name);
        },
        getSelectedFeeling: () => {
            return newCheckInProps.newCheckInDoc.feelings[0];
        },
        getSelectedReason: () => {
            return newCheckInProps.newCheckInDoc.reasons[0];
        },
        setFeeling: (feeling) => {
            newCheckInProps.updateNewCheckIn(checkIn => {
                checkIn.feelings = [{ name: feeling.name }];
            });
        },
        setReason: (reason) => {
            newCheckInProps.updateNewCheckIn(checkIn => {
                if (reason === null) {
                    checkIn.reasons = [{ name: (0, getAllReasons_1.default)()[0].name }];
                }
                else {
                    checkIn.reasons = [{ name: reason.name }];
                }
            });
        },
        setCustomReason: (reason) => {
            newCheckInProps.updateNewCheckIn(checkIn => {
                checkIn.reasons = [{ name: 'custom', custom: reason }];
            });
        },
        ...newCheckInProps,
    };
});
//# sourceMappingURL=CheckInController.js.map