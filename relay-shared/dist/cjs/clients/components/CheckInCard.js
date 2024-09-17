"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckInCardText = void 0;
const components_1 = require("@mtyk/frontend/core/components");
const styles_1 = require("@mtyk/frontend/styles/helpers/styles");
const react_1 = __importDefault(require("react"));
const useTodayCheckIn_1 = __importDefault(require("../../check-in/hooks/useTodayCheckIn"));
const useCheckIn_1 = __importDefault(require("../../frontend/check-ins/hooks/useCheckIn"));
const FormattedDate_1 = __importDefault(require("../../frontend/core/components/FormattedDate"));
const CheckInFeeling_1 = require("./CheckInFeeling");
const CheckInReason_1 = require("./CheckInReason");
function CheckInCardText(props) {
    const { today, checkIn, appearance, canGoFullscreen, ...rest } = props;
    const [apiCheckInDoc] = (0, useCheckIn_1.default)(checkIn);
    // const newCheckInDoc = useNewCheckIn()
    const checkInToday = (0, useTodayCheckIn_1.default)();
    const theCheckIn = today ? checkInToday : apiCheckInDoc;
    // const dec = useDecorationsContext()
    if (!theCheckIn) {
        return null;
    }
    return (react_1.default.createElement(components_1.Txt, null,
        react_1.default.createElement(CheckInFeeling_1.CheckInFeeling, { checkInObj: theCheckIn }),
        ' ',
        react_1.default.createElement(CheckInReason_1.CheckInReason, { checkInObj: theCheckIn }),
        "."));
}
exports.CheckInCardText = CheckInCardText;
/** Displays a single check-in, logged emotion and the reason behind it */
function CheckInCard(props) {
    const { today, checkIn, appearance, canGoFullscreen, ...rest } = props;
    const [apiCheckInDoc] = (0, useCheckIn_1.default)(checkIn);
    // const newCheckInDoc = useNewCheckIn()
    const checkInToday = (0, useTodayCheckIn_1.default)();
    const theCheckIn = today ? checkInToday : apiCheckInDoc;
    // const dec = useDecorationsContext()
    if (!theCheckIn) {
        return null;
    }
    return (
    // TODO fix for practitioner/client shared
    // <TouchableOpacity
    //   onPress={() => {
    //     if (canGoFullscreen) {
    //       // Open check in fullscreen
    //       dec.openModal(NewCheckInSummary, {
    //         checkIn: theCheckIn._id,
    //         isModal: true,
    //       })
    //     }
    //   }}
    // >
    react_1.default.createElement(components_1.Flex, { column: true, gap: 10, padding: appearance === 'flat' ? [0, 0] : [20, 20], ...rest, style: {
            backgroundColor: 'white',
            borderRadius: 20,
            ...(appearance === 'flat' ? {} : (0, styles_1.shadow)(0, 2, 3, 0.2)),
            ...rest.style,
        } },
        react_1.default.createElement(components_1.Txt, { size: 18 },
            react_1.default.createElement(CheckInCardText, { ...props })),
        react_1.default.createElement(FormattedDate_1.default, { style: { color: '#A8A19C' } }, theCheckIn.createdAt))
    // </TouchableOpacity>
    );
}
exports.default = CheckInCard;
//# sourceMappingURL=CheckInCard.js.map