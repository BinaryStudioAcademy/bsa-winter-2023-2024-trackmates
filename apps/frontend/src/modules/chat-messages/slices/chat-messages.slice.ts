import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type MessageItemResponseDto } from "../libs/types/types.js";
import { sendMessage } from "./actions.js";

type State = {
	currentMessages: MessageItemResponseDto[];
	dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
	currentMessages: [],
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
	},
	initialState,
	name: "messages",
	reducers: {
		updateMessages: (
			state,
			action: PayloadAction<MessageItemResponseDto[]>,
		) => {
			state.currentMessages = action.payload;
		},
	},
});

export { actions, name, reducer };
