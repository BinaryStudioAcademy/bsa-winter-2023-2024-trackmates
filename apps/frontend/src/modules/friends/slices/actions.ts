import { createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig, type FriendDto } from "~/libs/types/types.js";

import {
	type FriendAddNewRequestDto,
	type FriendAddNewResponseDto,
	type FriendReplyResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./friends.slice.js";

const loadAll = createAsyncThunk<FriendDto[], undefined, AsyncThunkConfig>(
	`${sliceName}/load-all`,
	(_, { extra }) => {
		const { friendsApi } = extra;

		return friendsApi.getAll();
	},
);

const sendRequest = createAsyncThunk<
	FriendAddNewResponseDto,
	FriendAddNewRequestDto,
	AsyncThunkConfig
>(`${sliceName}/send-request`, async (sendRequestPayload, { extra }) => {
	const { friendsApi, storage } = extra;

	const token = await storage.get(StorageKey.TOKEN);
	const hasToken = Boolean(token);

	if (!hasToken) {
		return null;
	}

	return await friendsApi.sendRequest(sendRequestPayload);
});

const acceptRequest = createAsyncThunk<
	FriendReplyResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/accept-request`, async (acceptRequestPayload, { extra }) => {
	const { friendsApi, storage } = extra;

	const token = await storage.get(StorageKey.TOKEN);
	const hasToken = Boolean(token);

	if (!hasToken) {
		return null;
	}

	return await friendsApi.replyToRequest({
		friendId: acceptRequestPayload,
		isAccepted: true,
	});
});

const denyRequest = createAsyncThunk<
	FriendReplyResponseDto,
	number,
	AsyncThunkConfig
>(`${sliceName}/deny-request`, async (denyRequestPayload, { extra }) => {
	const { friendsApi, storage } = extra;

	const token = await storage.get(StorageKey.TOKEN);
	const hasToken = Boolean(token);

	if (!hasToken) {
		return null;
	}

	return await friendsApi.replyToRequest({
		friendId: denyRequestPayload,
		isAccepted: false,
	});
});

export { acceptRequest, denyRequest, loadAll, sendRequest };
