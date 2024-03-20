import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import {
	type AsyncThunkConfig,
	type PaginationResponseDto,
} from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";

import {
	type FriendFollowRequestDto,
	type FriendListRequestQueryDto,
	type FriendUnfollowRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./friends.slice.js";

const getAllFollowingsIds = createAsyncThunk<
	number[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-all-followings-ids`, (_, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.getAllFollowingsIds();
});

const getPotentialFriends = createAsyncThunk<
	PaginationResponseDto<UserAuthResponseDto>,
	FriendListRequestQueryDto,
	AsyncThunkConfig
>(`${sliceName}/get-potential-friends`, (requestPayload, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.getAllPotentialFriends(requestPayload);
});

const getFollowers = createAsyncThunk<
	PaginationResponseDto<UserAuthResponseDto>,
	FriendListRequestQueryDto,
	AsyncThunkConfig
>(`${sliceName}/get-followers`, (requestPayload, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.getFollowers(requestPayload);
});

const getIsFollowing = createAsyncThunk<boolean, number, AsyncThunkConfig>(
	`${sliceName}/get-is-following`,
	(userId, { extra }) => {
		const { friendsApi } = extra;

		return friendsApi.getIsFollowing(userId);
	},
);

const getFollowings = createAsyncThunk<
	PaginationResponseDto<UserAuthResponseDto>,
	FriendListRequestQueryDto,
	AsyncThunkConfig
>(`${sliceName}/get-followings`, (requestPayload, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.getFollowings(requestPayload);
});

const follow = createAsyncThunk<
	FriendFollowRequestDto,
	FriendFollowRequestDto,
	AsyncThunkConfig
>(`${sliceName}/follow`, async (followPayload, { extra }) => {
	const { friendsApi, notification } = extra;

	await friendsApi.follow(followPayload);

	notification.success(NotificationMessage.FRIEND_FOLLOW_SUCCESS);

	return followPayload;
});

const unfollow = createAsyncThunk<
	FriendUnfollowRequestDto,
	FriendUnfollowRequestDto,
	AsyncThunkConfig
>(`${sliceName}/unfollow`, async (unfollowPayload, { extra }) => {
	const { friendsApi, notification } = extra;

	await friendsApi.unfollow(unfollowPayload);

	notification.success(NotificationMessage.FRIEND_UNFOLLOW_SUCCESS);

	return unfollowPayload;
});

export {
	follow,
	getAllFollowingsIds,
	getFollowers,
	getFollowings,
	getIsFollowing,
	getPotentialFriends,
	unfollow,
};
