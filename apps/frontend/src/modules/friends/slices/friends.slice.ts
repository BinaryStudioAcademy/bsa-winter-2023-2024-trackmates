import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import {
	NotificationMessage,
	notification,
} from "~/libs/modules/notification/notification.js";
import { type FriendResponseDto, type ValueOf } from "~/libs/types/types.js";

import { type UserAuthResponseDto } from "../../auth/auth.js";
import {
	acceptRequest,
	denyRequest,
	getPotentialFriends,
	loadAll,
	sendRequest,
} from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	friends: FriendResponseDto[];
	potentialFriends: UserAuthResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	friends: [],
	potentialFriends: [],
};
const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(acceptRequest.fulfilled, (state, action) => {
			notification.success(NotificationMessage.FRIEND_INVITE_ACCEPT_SUCCESS);
			state.friends = state.friends.map((friend) => {
				if (friend.id === action.payload.id) {
					friend.isInvitationAccepted = true;
				}
				return friend;
			});
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(acceptRequest.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(acceptRequest.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(denyRequest.fulfilled, (state, action) => {
			notification.success(NotificationMessage.FRIEND_INVITE_DENY_SUCCESS);
			state.friends = state.friends.filter(
				({ id }) => id !== action.payload.id,
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
			state.friends = [...state.friends, action.payload];
			state.potentialFriends = state.potentialFriends.filter((friend) => {
				return friend.id === action.payload.recipientUserId;
			});
			notification.success(NotificationMessage.FRIEND_REQUEST_SEND_SUCCESS);
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(sendRequest.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(sendRequest.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getPotentialFriends.fulfilled, (state, action) => {
			state.potentialFriends = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getPotentialFriends.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getPotentialFriends.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "friends",
	reducers: {},
});

export { actions, name, reducer };
