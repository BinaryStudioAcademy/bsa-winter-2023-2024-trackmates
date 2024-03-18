import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import {
	type ChatGetAllItemResponseDto,
	type ChatItemResponseDto,
	type ReadChatMessagesResponseDto,
} from "../libs/types/types.js";
import {
	addMessageToCurrentChat,
	createChat,
	getAllChats,
	getChat,
	getUnreadMessagesCount,
	updateChats,
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

		builder.addCase(addMessageToCurrentChat.fulfilled, (state, action) => {
			state.currentChat = action.payload;
		});
		builder.addCase(updateChats.fulfilled, (state, action) => {
			state.chats = action.payload;
		});
	},
	initialState,
	name: "chats",
	reducers: {
		leaveChat: (state) => {
			state.currentChat = null;
		},
		updateReadChatMessages(
			state,
			action: PayloadAction<ReadChatMessagesResponseDto>,
		) {
			const { chatId, items, unreadMessageCount, unreadMessageCountTotal } =
				action.payload;

			state.unreadMessagesCount = unreadMessageCountTotal;
			state.chats = state.chats.map((chat) => {
				return chat.id === chatId ? { ...chat, unreadMessageCount } : chat;
			});

			if (state.currentChat) {
				state.currentChat.messages = state.currentChat.messages.map((value) => {
					const updatedMessage = items.find((message) => {
						return message.id === value.id;
					});

					return updatedMessage ?? value;
				});
			}
		},
	},
});

export { actions, name, reducer };
