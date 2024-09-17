"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("@mtyk/frontend/core/components");
const link_1 = __importDefault(require("next/link"));
const react_1 = __importDefault(require("react"));
const useEntityInfo_1 = __importDefault(require("../helpers/useEntityInfo"));
function EntityLink({ type, colorize, id, noLink, children, style, name: _name, ...rest }) {
    const info = (0, useEntityInfo_1.default)(type, id);
    const { data } = info.hook?.(id) ?? { data: undefined };
    if (!info) {
        return react_1.default.createElement(components_1.Txt, null, "Unsupported entity");
    }
    const name = _name ?? (data ? info.getShortName?.(data) ?? data.name : '');
    if (info.url && !noLink) {
        const url = typeof info.url === 'string'
            ? `${info.url}/${id}`
            : data
                ? info.url(data)
                : '';
        return (react_1.default.createElement(link_1.default, { href: url },
            react_1.default.createElement("a", { ...rest, css: `
            color: ${colorize ? '#74b6f2' : 'inherit'};
            cursor: pointer;
            font-weight: 500;
            &:hover {
              text-decoration: underline;
            }
          `, style: { ...style } }, children ?? name)));
    }
    else {
        return (react_1.default.createElement(components_1.Txt, { css: `
          color: ${colorize ? '#74b6f2' : 'inherit'};
          cursor: pointer;
          font-weight: 500;
        `, style: { ...style } }, name));
    }
}
exports.default = EntityLink;
EntityLink.supportedEntities = [
    'questionnaire',
    'questionnaire-result',
    'todo',
    'content',
    'client',
    'journey',
];
//# sourceMappingURL=EntityLink.js.map