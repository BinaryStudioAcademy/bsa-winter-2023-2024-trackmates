import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "~/libs/enums/enums.js";
import { type ValueOf } from "~/libs/types/types.js";

import { type UserAuthResponseDto } from "../../auth/auth.js";
import {
	follow,
	getAllFollowingsIds,
	getFollowers,
	getFollowings,
	getIsFollowing,
	getPotentialFriends,
	unfollow,
} from "./actions.js";

type State = {
	allFollowingsIds: number[];
	dataStatus: ValueOf<typeof DataStatus>;
	followDataStatus: ValueOf<typeof DataStatus>;
	followers: UserAuthResponseDto[];
	followersTotalCount: number;
	followings: UserAuthResponseDto[];
	followingsTotalCount: number;
	isFollowing: boolean;
	potentialFriends: UserAuthResponseDto[];
	potentialFriendsTotalCount: number;
};

const initialState: State = {
	allFollowingsIds: [],
	dataStatus: DataStatus.IDLE,
	followDataStatus: DataStatus.IDLE,
	followers: [],
	followersTotalCount: 0,
	followings: [],
	followingsTotalCount: 0,
	isFollowing: false,
	potentialFriends: [],
	potentialFriendsTotalCount: 0,
};
const { actions, name, reducer } = createSlice({
	extraReducers(builder) {
		builder.addCase(getPotentialFriends.fulfilled, (state, action) => {
			state.potentialFriends = action.payload.items;
			state.potentialFriendsTotalCount = action.payload.total;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getPotentialFriends.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getPotentialFriends.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getFollowers.fulfilled, (state, action) => {
			state.followers = action.payload.items;
			state.followersTotalCount = action.payload.total;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getFollowers.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getFollowers.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(getFollowings.fulfilled, (state, action) => {
			state.followings = action.payload.items;
			state.followingsTotalCount = action.payload.total;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getFollowings.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getFollowings.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});

		builder.addCase(follow.fulfilled, (state) => {
			state.followDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(follow.pending, (state) => {
			state.followDataStatus = DataStatus.PENDING;
		});
		builder.addCase(follow.rejected, (state) => {
			state.followDataStatus = DataStatus.REJECTED;
		});

		builder.addCase(unfollow.fulfilled, (state) => {
			state.followDataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(unfollow.pending, (state) => {
			state.followDataStatus = DataStatus.PENDING;
		});
		builder.addCase(unfollow.rejected, (state) => {
			state.followDataStatus = DataStatus.REJECTED;
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

		builder.addCase(getAllFollowingsIds.fulfilled, (state, action) => {
			state.allFollowingsIds = action.payload;
			state.dataStatus = DataStatus.FULFILLED;
		});
		builder.addCase(getAllFollowingsIds.pending, (state) => {
			state.dataStatus = DataStatus.PENDING;
		});
		builder.addCase(getAllFollowingsIds.rejected, (state) => {
			state.dataStatus = DataStatus.REJECTED;
		});
	},
	initialState,
	name: "friends",
	reducers: {
		addFollowedFriendId(state, action: PayloadAction<number>) {
			const hasId = state.allFollowingsIds.includes(action.payload);

			if (hasId) {
				return;
			}

			state.allFollowingsIds.push(action.payload);
		},
		clearFollowings(state) {
			state.followings = state.followings.filter((following) => {
				return !state.allFollowingsIds.includes(following.id);
			});
		},
		removeUnfollowedFriendId(state, action: PayloadAction<number>) {
			state.allFollowingsIds = state.allFollowingsIds.filter(
				(id) => id !== action.payload,
			);
		},
		resetIsFollowing(state) {
			state.isFollowing = false;
		},
		setIsFollowing(state, action: PayloadAction<boolean>) {
			state.isFollowing = action.payload;
		},
	},
});

export { actions, name, reducer };
