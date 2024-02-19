import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	NotificationMessage,
	notification,
} from "~/libs/modules/notification/notification.js";
import {
	type AsyncThunkConfig,
	type FriendResponseDto,
} from "~/libs/types/types.js";

import { type UserAuthResponseDto } from "../../auth/auth.js";
import {
	type FriendAddNewRequestDto,
	type FriendAddNewResponseDto,
	type FriendReplyResponseDto,
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

const loadAll = createAsyncThunk<
	FriendResponseDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, (_, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.getAllFriends();
});

const sendRequest = createAsyncThunk<
	FriendAddNewResponseDto,
	FriendAddNewRequestDto,
	AsyncThunkConfig
>(`${sliceName}/send-request`, async (sendRequestPayload, { extra }) => {
	const { friendsApi } = extra;

	const response = await friendsApi.sendRequest(sendRequestPayload);

	notification.success(NotificationMessage.FRIEND_REQUEST_SEND_SUCCESS);

	return response;
});

const acceptRequest = createAsyncThunk<
	FriendReplyResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/accept-request`, async (acceptRequestPayload, { extra }) => {
	const { friendsApi } = extra;

	const response = await friendsApi.replyToRequest({
		id: acceptRequestPayload,
		isAccepted: true,
	});

	notification.success(NotificationMessage.FRIEND_INVITE_ACCEPT_SUCCESS);

	return response;
});

const denyRequest = createAsyncThunk<
	FriendReplyResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/deny-request`, async (denyRequestPayload, { extra }) => {
	const { friendsApi } = extra;

	const response = await friendsApi.replyToRequest({
		id: denyRequestPayload,
		isAccepted: false,
	});

	notification.success(NotificationMessage.FRIEND_INVITE_DENY_SUCCESS);

	return response;
});

export {
	acceptRequest,
	denyRequest,
	getPotentialFriends,
	loadAll,
	sendRequest,
};
