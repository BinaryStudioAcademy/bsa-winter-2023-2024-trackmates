import { createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";

import {
	type FriendAcceptResponseDto,
	type FriendAddNewRequestDto,
	type FriendAddNewResponseDto,
	type FriendDenyResponseDto,
	type FriendResponseDto,
} from "../libs/types/types.js";
import { name as sliceName } from "./friends.slice.js";

const loadAll = createAsyncThunk<
	{ currentUserId: number | undefined; friends: FriendResponseDto[] },
	undefined,
	AsyncThunkConfig
>(`${sliceName}/load-all`, async (_, { extra, getState, rejectWithValue }) => {
	const { friendsApi } = extra;
	const { auth } = getState();
	const userId = auth.user?.id;

	try {
		const friends = await friendsApi.getAll();
		return {
			currentUserId: userId,
			friends,
		};
	} catch {
		return rejectWithValue(null);
	}
});

const sendRequest = createAsyncThunk<
	{ currentUserId: number | undefined; friendRequest: FriendAddNewResponseDto },
	FriendAddNewRequestDto,
	AsyncThunkConfig
>(
	`${sliceName}/send-request`,
	async (sendRequestPayload, { extra, getState, rejectWithValue }) => {
		const { friendsApi, storage } = extra;
		const { auth } = getState();
		const userId = auth.user?.id;

		const token = await storage.get(StorageKey.TOKEN);
		const hasToken = Boolean(token);

		if (!hasToken) {
			return rejectWithValue(null);
		}

		try {
			const friendRequest = await friendsApi.sendRequest(sendRequestPayload);
			return {
				currentUserId: userId,
				friendRequest,
			};
		} catch {
			return rejectWithValue(null);
		}
	},
);

const acceptRequest = createAsyncThunk<number, number, AsyncThunkConfig>(
	`${sliceName}/accept-request`,
	async (acceptRequestPayload, { extra, rejectWithValue }) => {
		const { friendsApi, storage } = extra;

		const token = await storage.get(StorageKey.TOKEN);

		const hasToken = Boolean(token);

		if (!hasToken) {
			return rejectWithValue(null);
		}

		try {
			const acceptedResponse = (await friendsApi.replyToRequest({
				id: acceptRequestPayload,
				isAccepted: true,
			})) as FriendAcceptResponseDto;
			return acceptedResponse.id;
		} catch {
			return rejectWithValue(null);
		}
	},
);

const denyRequest = createAsyncThunk<number, number, AsyncThunkConfig>(
	`${sliceName}/deny-request`,
	async (denyRequestPayload, { extra, rejectWithValue }) => {
		const { friendsApi, storage } = extra;

		const token = await storage.get(StorageKey.TOKEN);
		const hasToken = Boolean(token);

		if (!hasToken) {
			return rejectWithValue(null);
		}

		try {
			return (await friendsApi.replyToRequest({
				id: denyRequestPayload,
				isAccepted: false,
			})) as FriendDenyResponseDto;
		} catch {
			return rejectWithValue(null);
		}
	},
);

export { acceptRequest, denyRequest, loadAll, sendRequest };
