import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import {
	type ChatItemResponseDto,
	type MessageResponseDto,
} from "../libs/types/types.js";
import {
	createChat,
	getAllChats,
	getAllMessages,
	sendMessage,
} from "./actions.js";

type State = {
	chats: ChatItemResponseDto[];
	currentMessages: MessageResponseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	chats: [],
	currentMessages: [],
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(createChat.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(createChat.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(createChat.rejected, (state) => {
			state.chats = [];
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
			state.chats = [];
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getAllMessages.fulfilled, (state, action) => {
			state.currentMessages = action.payload.items;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAllMessages.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllMessages.rejected, (state) => {
			state.currentMessages = [];
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(sendMessage.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(sendMessage.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(sendMessage.rejected, (state) => {
			state.currentMessages = [];
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "chat",
	reducers: {},
});

export { actions, name, reducer };
