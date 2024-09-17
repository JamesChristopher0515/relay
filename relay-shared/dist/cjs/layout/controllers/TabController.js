"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArraySelectionController_1 = __importDefault(require("@mtyk/frontend/controllers/controllers/ArraySelectionController"));
const lodash_1 = require("lodash");
const assertDefined_1 = __importDefault(require("@mtyk/frontend/core/helpers/assertDefined"));
const makeController_1 = __importDefault(require("@mtyk/frontend/controllers/helpers/makeController"));
exports.default = (0, makeController_1.default)(function TabController(props) {
    const { tabs } = props;
    (0, assertDefined_1.default)((0, lodash_1.uniqBy)(tabs, 'label').length === tabs.length, 'Tabs must have unique labels');
    const arraySelectionController = ArraySelectionController_1.default.use({
        items: tabs.map(tab => ({ ...tab, _id: tab.label })),
    });
    const api = {
        ...arraySelectionController,
        tabs: arraySelectionController.items.map(item => {
            return {
                ...item,
                isActive: arraySelectionController.isItemSelected(item),
                onPress: async () => {
                    await arraySelectionController.setSelectedItem(item);
                },
                onClick: async () => {
                    await arraySelectionController.setSelectedItem(item);
                },
            };
        }),
    };
    return api;
});
//# sourceMappingURL=TabController.js.map