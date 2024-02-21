import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	NotificationMessage,
	notification,
} from "~/libs/modules/notification/notification.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";

import { type UserAuthResponseDto } from "../../auth/auth.js";
import {
	type FriendFollowRequestDto,
	type FriendUnfollowRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./friends.slice.js";

const getPotentialFriends = createAsyncThunk<
	UserAuthResponseDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-potential-friends`, (_, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.getAllPotentialFriends();
});

const getFollowers = createAsyncThunk<
	UserAuthResponseDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-followers`, (_, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.getFollowers();
});

const getFollowings = createAsyncThunk<
	UserAuthResponseDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-followings`, (_, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.getFollowings();
});

const follow = createAsyncThunk<
	FriendFollowRequestDto,
	FriendFollowRequestDto,
	AsyncThunkConfig
>(`${sliceName}/follow`, async (followPayload, { extra }) => {
	const { friendsApi } = extra;

	await friendsApi.follow(followPayload);

	notification.success(NotificationMessage.FRIEND_FOLLOW_SUCCESS);

	return followPayload;
});

const unfollow = createAsyncThunk<
	FriendUnfollowRequestDto,
	FriendUnfollowRequestDto,
	AsyncThunkConfig
>(`${sliceName}/unfollow`, async (unfollowPayload, { extra }) => {
	const { friendsApi } = extra;

	await friendsApi.unfollow(unfollowPayload);

	notification.success(NotificationMessage.FRIEND_UNFOLLOW_SUCCESS);

	return unfollowPayload;
});

export { follow, getFollowers, getFollowings, getPotentialFriends, unfollow };
