import { createSlice } from "@reduxjs/toolkit";

import { DataStatus, FriendStatus } from "~/libs/enums/enums.js";
import { type Friend, type ValueOf } from "~/libs/types/types.js";

import { transformFriend } from "../libs/helpers/helpers.js";
import { acceptRequest, denyRequest, loadAll, sendRequest } from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	friends: Friend[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	friends: [],
};
const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(acceptRequest.fulfilled, (state, action) => {
			const friend = state.friends.find(({ id }) => id === action.payload);
			if (!friend) {
				return state;
			}
			friend.status = FriendStatus.FRIEND;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(acceptRequest.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(acceptRequest.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(denyRequest.fulfilled, (state, action) => {
			state.friends = state.friends.filter(({ id }) => id !== action.payload);
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
			const { currentUserId, friends } = action.payload;

			if (!currentUserId) {
				return state;
			}

			state.friends = friends.map(transformFriend(currentUserId));

			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(loadAll.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(sendRequest.fulfilled, (state, action) => {
			const { currentUserId, friendRequest } = action.payload;

			if (!currentUserId) {
				return state;
			}

			state.friends = [
				...state.friends,
				transformFriend(currentUserId)(friendRequest),
			];
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
