import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import {
	type AsyncThunkConfig,
	type PaginationRequestDto,
	type PaginationResponseDto,
} from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";

import {
	type FriendFollowRequestDto,
	type FriendUnfollowRequestDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./friends.slice.js";

const getPotentialFriends = createAsyncThunk<
	PaginationResponseDto<UserAuthResponseDto>,
	PaginationRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-potential-friends`, ({ count, page }, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.getAllPotentialFriends({ count, page });
});

const getFollowers = createAsyncThunk<
	PaginationResponseDto<UserAuthResponseDto>,
	PaginationRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-followers`, ({ count, page }, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.getFollowers({ count, page });
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
	PaginationRequestDto,
	AsyncThunkConfig
>(`${sliceName}/get-followings`, ({ count, page }, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.getFollowings({ count, page });
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
	getFollowers,
	getFollowings,
	getIsFollowing,
	getPotentialFriends,
	unfollow,
};
