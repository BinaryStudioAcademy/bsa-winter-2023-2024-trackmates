import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

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
} from "./actions.js";

type State = {
	chats: ChatGetAllItemResponseDto[];
	currentChat: ChatItemResponseDto | null;
	dataStatus: ValueOf<typeof DataStatus>;
	unreadMessageCount: number;
};

const initialState: State = {
	chats: [],
	currentChat: null,
	dataStatus: DataStatus.IDLE,
	unreadMessageCount: 0,
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
			state.unreadMessageCount = action.payload;
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
	},
});

export { actions, name, reducer };
