import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type UserAuthResponseDto } from "../../auth/auth.js";
import {
	follow,
	getFollowers,
	getFollowings,
	getIsFollowing,
	getPotentialFriends,
	unfollow,
} from "./actions.js";

type State = {
	dataStatus: ValueOf<typeof DataStatus>;
	followers: UserAuthResponseDto[];
	followings: UserAuthResponseDto[];
	isFollowing: boolean;
	potentialFriends: UserAuthResponseDto[];
};

const initialState: State = {
	dataStatus: DataStatus.IDLE,
	followers: [],
	followings: [],
	isFollowing: false,
	potentialFriends: [],
};
const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
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

		builder.addCase(getFollowers.fulfilled, (state, action) => {
			state.followers = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getFollowers.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getFollowers.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getFollowings.fulfilled, (state, action) => {
			state.followings = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getFollowings.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getFollowings.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(follow.fulfilled, (state, action) => {
			state.followings = [
				...state.followings,
				state.potentialFriends.find(
					(friend) => friend.id === action.payload.id,
				) as UserAuthResponseDto,
			];
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(follow.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(follow.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(unfollow.fulfilled, (state, action) => {
			if (
				!state.potentialFriends.some((user) => user.id === action.payload.id)
			) {
				state.potentialFriends = [
					...state.potentialFriends,
					state.followings.find(
						(user) => user.id === action.payload.id,
					) as UserAuthResponseDto,
				];
			}

			state.followings = state.followings.filter(
				(user) => user.id !== action.payload.id,
			);
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(unfollow.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(unfollow.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getIsFollowing.fulfilled, (state, action) => {
			state.isFollowing = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getIsFollowing.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getIsFollowing.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "friends",
	reducers: {
		setIsFollowing(state, action: PayloadAction<boolean>) {
			state.isFollowing = action.payload;
		},
	},
});

export { actions, name, reducer };
