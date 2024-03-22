import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { NEW_MESSAGE_COUNT } from "../libs/constants/constants.js";
import {
	type ChatGetAllItemResponseDto,
	type ChatItemResponseDto,
} from "../libs/types/types.js";
import {
	addMessageToCurrentChat,
	createChat,
	getAllChats,
	getChat,
	getUnreadMessagesCount,
	updateChats,
	updateMessagesStatus,
} from "./actions.js";

type State = {
	chats: ChatGetAllItemResponseDto[];
	currentChat: ChatItemResponseDto | null;
	dataStatus: ValueOf<typeof DataStatus>;
	unreadMessagesCount: number;
};

const initialState: State = {
	chats: [],
	currentChat: null,
	dataStatus: DataStatus.IDLE,
	unreadMessagesCount: 0,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(createChat.fulfilled, (state, action) => {
			state.currentChat = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(createChat.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(createChat.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getAllChats.fulfilled, (state, action) => {
			state.chats = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAllChats.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllChats.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getChat.fulfilled, (state, action) => {
			state.currentChat = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getChat.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getChat.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getUnreadMessagesCount.fulfilled, (state, action) => {
			state.unreadMessagesCount = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getUnreadMessagesCount.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(
			addMessageToCurrentChat.fulfilled,
			(state, { payload: { isMessageInCurrentChat, newMessage } }) => {
				if (isMessageInCurrentChat && state.currentChat) {
					state.currentChat = {
						...state.currentChat,
						messages: [newMessage, ...state.currentChat.messages],
					};
				}
			},
		);

		builder.addCase(updateChats.fulfilled, (state, { payload: newMessage }) => {
			state.chats = state.chats
				.map((chat) => {
					if (chat.id !== newMessage.chatId) {
						return chat;
					}

					return {
						...chat,
						lastMessage: newMessage,
						unreadMessageCount:
							chat.interlocutor.id === newMessage.senderUser.id
								? Number(chat.unreadMessageCount) + NEW_MESSAGE_COUNT
								: chat.unreadMessageCount,
					};
				})
				.sort((a, b) => {
					return (
						new Date(b.lastMessage.createdAt).getTime() -
						new Date(a.lastMessage.createdAt).getTime()
					);
				});
		});

		builder.addCase(updateMessagesStatus.fulfilled, (state, action) => {
			const { chatId, isUpdateUnreadCounts, items } = action.payload;

			if (isUpdateUnreadCounts) {
				state.chats = state.chats.map((chat) => {
					return chat.id === chatId
						? {
								...chat,
								unreadMessageCount: chat.unreadMessageCount - items.length,
							}
						: chat;
				});
				state.unreadMessagesCount -= items.length;
			}

			if (state.currentChat) {
				state.currentChat.messages = state.currentChat.messages.map((value) => {
					const updatedMessage = items.find((message) => {
						return message.id === value.id;
					});

					return updatedMessage ?? value;
				});
			}
		});
	},
	initialState,
	name: "chats",
	reducers: {
		increaseUnreadMessageCount(state) {
			state.unreadMessagesCount += NEW_MESSAGE_COUNT;
		},
		leaveChat: (state) => {
			state.currentChat = null;
		},
	},
});

export { actions, name, reducer };
