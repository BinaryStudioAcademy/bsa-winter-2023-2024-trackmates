import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { UserAuthResponseDto } from "~/modules/users/users.js";

import { type ChatGetAllItemResponseDto } from "../libs/types/types.js";
import { createChat, getAllChats, getChat } from "./actions.js";

type State = {
	chats: ChatGetAllItemResponseDto[];
	interlocutor: UserAuthResponseDto | null;
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	chats: [],
	interlocutor: null,
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(createChat.fulfilled, (state, action) => {
			state.interlocutor = action.payload.interlocutor;
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
			state.interlocutor = action.payload.interlocutor;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getChat.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getChat.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "chats",
	reducers: {
		leaveChat: (state) => {
			state.interlocutor = null;
		},
	},
});

export { actions, name, reducer };
