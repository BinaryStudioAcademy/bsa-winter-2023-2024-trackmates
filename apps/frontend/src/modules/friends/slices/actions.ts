import { createAsyncThunk } from "@reduxjs/toolkit";

import { ExceptionMessage } from "~/libs/enums/enums.js";
import { AuthError } from "~/libs/exceptions/exceptions.js";
import { HTTPCode } from "~/libs/modules/http/http.js";
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
>(`${sliceName}/load-all`, async (_, { extra, getState }) => {
	const { friendsApi } = extra;
	const { auth } = getState();
	const userId = auth.user?.id;

	const friends = await friendsApi.getAll();
	return {
		currentUserId: userId,
		friends,
	};
});

const sendRequest = createAsyncThunk<
	{ currentUserId: number | undefined; friendRequest: FriendAddNewResponseDto },
	FriendAddNewRequestDto,
	AsyncThunkConfig
>(
	`${sliceName}/send-request`,
	async (sendRequestPayload, { extra, getState }) => {
		const { friendsApi, storage } = extra;
		const { auth } = getState();
		const userId = auth.user?.id;

		const token = await storage.get(StorageKey.TOKEN);
		const hasToken = Boolean(token);

		if (!hasToken) {
			throw new AuthError(ExceptionMessage.UNAUTHORIZED, HTTPCode.UNAUTHORIZED);
		}

		const friendRequest = await friendsApi.sendRequest(sendRequestPayload);
		return {
			currentUserId: userId,
			friendRequest,
		};
	},
);

const acceptRequest = createAsyncThunk<number, number, AsyncThunkConfig>(
	`${sliceName}/accept-request`,
	async (acceptRequestPayload, { extra }) => {
		const { friendsApi, storage } = extra;

		const token = await storage.get(StorageKey.TOKEN);

		const hasToken = Boolean(token);

		if (!hasToken) {
			throw new AuthError(ExceptionMessage.UNAUTHORIZED, HTTPCode.UNAUTHORIZED);
		}

		const acceptedResponse = (await friendsApi.replyToRequest({
			id: acceptRequestPayload,
			isAccepted: true,
		})) as FriendAcceptResponseDto;
		return acceptedResponse.id;
	},
);

const denyRequest = createAsyncThunk<number, number, AsyncThunkConfig>(
	`${sliceName}/deny-request`,
	async (denyRequestPayload, { extra }) => {
		const { friendsApi, storage } = extra;

		const token = await storage.get(StorageKey.TOKEN);
		const hasToken = Boolean(token);

		if (!hasToken) {
			throw new AuthError(ExceptionMessage.UNAUTHORIZED, HTTPCode.UNAUTHORIZED);
		}

		return (await friendsApi.replyToRequest({
			id: denyRequestPayload,
			isAccepted: false,
		})) as FriendDenyResponseDto;
	},
);

export { acceptRequest, denyRequest, loadAll, sendRequest };
