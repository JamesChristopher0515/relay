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
exports.ChatController = void 0;
const dayjs = require('dayjs');
const useClassicReducer_1 = __importDefault(require("@mtyk/frontend/react/hooks/useClassicReducer"));
const react_1 = __importStar(require("react"));
const useApi_1 = require("../../api/hooks/useApi");
const _ = __importStar(require("lodash"));
const useApi_2 = require("../../api/hooks/useApi");
function ChatController({ practitioner, client, user, component: Component, unavailable, }) {
    const [allMessages, setAllMessages] = (0, react_1.useState)([]);
    const [page, setPage] = (0, react_1.useState)(0);
    const [markChatRead] = (0, useApi_1.useMarkChatReadMutation)();
    const messagesQuery = {
        client: client.id,
        practitioner: practitioner.id,
        page: 0,
        sort: { createdAt: -1 },
    };
    const { data: result, isLoading, isFetching, } = (0, useApi_2.useGetMessagesQuery)(messagesQuery, {
        // Poll for changes on the first page only . When it changes, we remove all the other pages anyway
        pollingInterval: 3 * 1000,
    });
    const { data: pageResult, isLoading: pageIsLoading, isFetching: pageIsFetching, } = (0, useApi_2.useGetMessagesQuery)({ ...messagesQuery, page }, {
        skip: page === 0,
    });
    const [createMessage, { isLoading: isCreating }] = (0, useApi_2.useCreateMessageMutation)();
    (0, react_1.useEffect)(() => {
        if (result?.data[0]) {
            markChatRead({ chat: result.data[0].chat })
                .unwrap()
                .catch((e) => console.error(e));
        }
    }, [isLoading]);
    // Reset all messages when first page changes
    (0, react_1.useEffect)(() => {
        let msgsLocal = [...allMessages];
        // First page
        if (result && !isFetching && result.data[0]?.id !== msgsLocal[0]?.id) {
            msgsLocal = result.data;
        }
        // Current 'next page'
        if (!pageIsFetching && pageResult && !isFetching) {
            const { data: newMessages, meta: { upTo }, } = pageResult;
            if (msgsLocal.length < upTo) {
                msgsLocal = [...msgsLocal, ...newMessages];
            }
        }
        if (msgsLocal.length) {
            // uniq because we end up with duplicate messages,
            // still yet to figure that out. something to do with pagination
            setAllMessages(_.uniqBy(msgsLocal, 'id'));
        }
    }, [isFetching, result, pageIsFetching]);
    let lastDay = dayjs(allMessages[0]?.createdAt ?? 0).startOf('day');
    const messages = allMessages.map((msg, i, arr) => {
        const nextMsg = arr[i + 1];
        const createdAt = dayjs(msg.createdAt);
        const lastInDay = !lastDay.isSame(createdAt.startOf('day'));
        if (lastInDay) {
            lastDay = createdAt.startOf('day');
        }
        return {
            ...msg,
            lastInDay: lastInDay || i === arr.length - 1 ? lastDay : null,
            lastInGroup: nextMsg?.from !== msg.from,
        };
    });
    const loadMore = () => {
        const nextPage = Math.floor((allMessages.length - 1) / 20) + 1;
        //
        setPage(nextPage);
    };
    const [newMessage, setNewMessage] = (0, react_1.useState)('');
    // We need this because we can't batch setState updates and
    // updates initiated by RTK Query (afaik), so for one render
    // we und up with `isCreating` flickering while we wait for
    // eventual consistency. This fn lets us keep track of state
    // changes over time
    const { canSend, ...rest } = (0, useClassicReducer_1.default)((prev) => {
        if (!prev) {
            prev = {};
        }
        if (prev.creating && !isCreating) {
            return {
                waiting: true,
                canSend: false,
            };
        }
        return { canSend: newMessage.trim().length > 0, creating: isCreating };
    }, [isCreating, newMessage]);
    const props = {
        practitioner,
        client,
        user,
        loadMore,
        messages,
        loading: isLoading,
        isCreating,
        newMessage,
        unavailable,
        setNewMessage,
        canSend,
        send: async () => {
            await createMessage({
                content: newMessage,
                client: client.id,
                practitioner: practitioner.id,
            });
            setNewMessage('');
        },
    };
    return react_1.default.createElement(Component, { ...props });
}
exports.ChatController = ChatController;
//# sourceMappingURL=ChatController.js.map