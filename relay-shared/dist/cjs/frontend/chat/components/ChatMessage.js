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
const components_1 = require("@mtyk/frontend/core/components");
const isNative_1 = __importDefault(require("@mtyk/frontend/core/helpers/isNative"));
const nativeProps_1 = __importStar(require("@mtyk/frontend/react/nativeProps"));
const react_1 = __importDefault(require("react"));
const dayjs = require('dayjs');
const calendar = require('dayjs/plugin/calendar');
dayjs.extend(calendar);
function ChatMessage({ message, user, messageBoxStyles, ...rest }) {
    const own = message.from === user._id;
    const createdAt = dayjs(message.createdAt);
    const colors = {
        oursText: '#41565B',
        theirsText: '#6C5656',
    };
    const ownColor = '#DAEAEE';
    const theirsColor = '#F1ECEC';
    return (react_1.default.createElement(components_1.Flex, { ...rest, style: {
            ...(0, nativeProps_1.webProps)({
                margin: `.35em 0`,
            }),
            ...(0, nativeProps_1.default)({
                marginVertical: 4,
                marginTop: message.lastInGroup ? 36 : 4,
            }),
            ...rest.style,
        } },
        message.lastInDay ? (react_1.default.createElement(components_1.Txt, { style: {
                fontSize: 12.5,
                color: 'rgba(0, 0, 0, 0.6)',
                marginBottom: 17,
                marginTop: 30,
                textAlign: own ? 'right' : 'left',
            } }, createdAt.calendar())) : null,
        react_1.default.createElement(components_1.Flex, { padding: [7, 20], rowCenter: true, style: {
                maxWidth: '75%',
                alignItems: 'center',
                wordBreak: 'break-word',
                alignSelf: own ? 'flex-end' : 'flex-start',
                borderRadius: 5,
                backgroundColor: own ? ownColor : theirsColor,
                ...messageBoxStyles,
            } }, typeof message.content === 'string' ? (react_1.default.createElement(components_1.Txt, { medium: true, size: isNative_1.default ? 14 : '.95em', color: own ? colors.oursText : colors.theirsText }, message.content)) : (message.content))));
}
exports.default = ChatMessage;
//# sourceMappingURL=ChatMessage.js.map