import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { sendMessage } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	errorMessage: string;
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	errorMessage: "",
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
	reducers: {},
});

export { actions, name, reducer };
