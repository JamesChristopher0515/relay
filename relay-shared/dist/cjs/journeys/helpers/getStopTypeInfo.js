"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopTypeInfo = exports.stopTypes = void 0;
const free_solid_svg_icons_1 = require("@fortawesome/free-solid-svg-icons");
const RelayIcons_1 = __importDefault(require("../../frontend/icons/RelayIcons"));
exports.stopTypes = [
    {
        name: 'Content',
        fullName: 'Assign Content',
        type: 'content',
        icon: free_solid_svg_icons_1.faPhotoVideo,
        incompleteText: 'Not yet viewed',
        completeText: 'Viewed',
        description: 'Adds content of your choice to your clients resources',
    },
    {
        name: 'Questionnaire',
        fullName: 'Assign Questionnaire',
        type: 'questionnaire',
        incompleteText: 'Not yet started',
        icon: free_solid_svg_icons_1.faBook,
        description: 'Add a questionnaire for your client to complete',
    },
    {
        name: 'Worksheet',
        fullName: 'Assign Worksheet',
        type: 'worksheet',
        incompleteText: 'Not yet started',
        icon: RelayIcons_1.default.worksheet,
        description: `Add a worksheet for your client to complete`,
    },
    {
        name: 'Assign Todo',
        type: 'todo',
        icon: free_solid_svg_icons_1.faCheckSquare,
        description: `Adds a todo to your client's list, required or mandatory`,
    },
    {
        name: 'Time delay',
        type: 'delay',
        icon: free_solid_svg_icons_1.faClock,
        incompleteText: 'Waiting',
        completeText: null,
        description: 'Wait a minimum amount of time before progressing',
    },
    {
        name: 'Thinking points',
        type: 'thinking-points',
        incompleteText: 'Not yet viewed',
        completeText: 'Viewed',
        icon: free_solid_svg_icons_1.faLightbulb,
        description: 'Add prompts to help your client understand their situation better',
    },
    {
        name: 'Review point',
        incompleteText: 'Awaiting review',
        type: 'review',
        icon: free_solid_svg_icons_1.faSpinner,
        description: 'Notifies you to take action once a client reaches a set point',
    },
].map((stop) => ({ ...stop, fullName: stop.fullName ?? stop.name }));
function stopTypeInfo(type) {
    return exports.stopTypes.find((stopType) => stopType.type === type);
}
exports.stopTypeInfo = stopTypeInfo;
function getStopTypeInfo(stopType) {
    const info = stopTypeInfo(stopType);
    if (!info) {
        throw new Error('Invalid stop type (no info): ' + stopType);
    }
    return info;
}
exports.default = getStopTypeInfo;
//# sourceMappingURL=getStopTypeInfo.js.map