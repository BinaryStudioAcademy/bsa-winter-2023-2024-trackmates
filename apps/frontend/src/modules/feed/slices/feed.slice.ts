import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type FeedActionDto } from "../libs/types/types.js";
import { loadFeed } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	friendsActions: FeedActionDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	friendsActions: [],
};

const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(loadFeed.fulfilled, (state, action) => {
			state.friendsActions = action.payload.actions;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadFeed.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadFeed.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "feed",
	reducers: {},
});

export { actions, name, reducer };
