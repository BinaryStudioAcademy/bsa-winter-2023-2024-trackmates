import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";
import { type ChatGetAllItemResponseDto } from "~/modules/chats/libs/types/types.js";

import { sendMessage, setReadChatMessages } from "./actions.js";

type State = {
	chats: ChatGetAllItemResponseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	chats: [],
	dataStatus: DataStatus.IDLE,
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(sendMessage.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(sendMessage.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(sendMessage.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
		builder.addCase(setReadChatMessages.fulfilled, (state) => {
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(setReadChatMessages.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "messages",
	reducers: {},
});

export { actions, name, reducer };
