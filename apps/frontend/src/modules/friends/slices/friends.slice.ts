import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { FriendDto, type ValueOf } from "~/libs/types/types.js";

import { acceptRequest, denyRequest, loadAll, sendRequest } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	friends: FriendDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	friends: [],
};
const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(acceptRequest.fulfilled, (state, action) => {
			if (!action.payload) {
				return state;
			}

			const friend = state.friends.find(
				({ userId }) => userId === action.payload?.userId,
			);
			if (!friend) {
				return state;
			}
			friend.status = "friend";
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(acceptRequest.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(acceptRequest.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(denyRequest.fulfilled, (state, action) => {
			if (!action.payload) {
				return state;
			}

			state.friends = state.friends.filter(
				({ userId }) => userId !== action.payload?.userId,
			);
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(denyRequest.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(denyRequest.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(loadAll.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(loadAll.fulfilled, (state, action) => {
			state.friends = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(sendRequest.fulfilled, (state, action) => {
			if (!action.payload) {
				return state;
			}

			state.friends = state.friends.filter(
				({ userId }) => userId !== action.payload?.userId,
			);
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(sendRequest.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(sendRequest.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "friends",
	reducers: {},
});

export { actions, name, reducer };
