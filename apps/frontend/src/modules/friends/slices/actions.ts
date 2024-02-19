import { createAsyncThunk } from "@reduxjs/toolkit";

import {
	type AsyncThunkConfig,
	type FriendResponseDto,
} from "~/libs/types/types.js";

import {
	type FriendAddNewRequestDto,
	type FriendAddNewResponseDto,
	type FriendReplyResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./friends.slice.js";

const loadAll = createAsyncThunk<
	FriendResponseDto[],
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, (_, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.getAll();
});

const sendRequest = createAsyncThunk<
	FriendAddNewResponseDto,
	FriendAddNewRequestDto,
	AsyncThunkConfig
>(`${sliceName}/send-request`, (sendRequestPayload, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.sendRequest(sendRequestPayload);
});

const acceptRequest = createAsyncThunk<
	FriendReplyResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/accept-request`, (acceptRequestPayload, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.replyToRequest({
		id: acceptRequestPayload,
		isAccepted: true,
	});
});

const denyRequest = createAsyncThunk<
	FriendReplyResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/deny-request`, (denyRequestPayload, { extra }) => {
	const { friendsApi } = extra;

	return friendsApi.replyToRequest({
		id: denyRequestPayload,
		isAccepted: false,
	});
});

export { acceptRequest, denyRequest, loadAll, sendRequest };
