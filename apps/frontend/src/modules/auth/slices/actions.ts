import { createAsyncThunk } from "@reduxjs/toolkit";

import { NotificationMessage } from "~/libs/modules/notification/notification.js";
import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import {
	type AuthSendUpdatePasswordLinkRequestDto,
	type AuthUpdatePasswordRequestDto,
	type UserAuthResponseDto,
} from "~/modules/auth/auth.js";
import {
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./auth.slice.js";

const sendUpdatePasswordLink = createAsyncThunk<
	boolean,
	AuthSendUpdatePasswordLinkRequestDto,
	AsyncThunkConfig
>(`${sliceName}/send-update-password-link`, async (payload, { extra }) => {
	const { authApi } = extra;

	return await authApi.sendUpdatePasswordLink(payload);
});

const getAuthenticatedUser = createAsyncThunk<
	UserAuthResponseDto | null,
	undefined,
	AsyncThunkConfig
>(`${sliceName}/get-authenticated-user`, async (_payload, { extra }) => {
	const { authApi, storage } = extra;

	const token = await storage.get(StorageKey.TOKEN);
	const hasToken = Boolean(token);

	if (!hasToken) {
		return null;
	}

	return await authApi.getAuthenticatedUser();
});

const updatePassword = createAsyncThunk<
	UserAuthResponseDto,
	AuthUpdatePasswordRequestDto,
	AsyncThunkConfig
>(`${sliceName}/update-password`, async (payload, { extra }) => {
	const { authApi, notification, storage } = extra;

	const { token, user } = await authApi.updatePassword(payload);

	notification.success(NotificationMessage.PASSWORD_WAS_UPDATED);

	await storage.set(StorageKey.TOKEN, token);

	return user;
});

const signIn = createAsyncThunk<
	UserAuthResponseDto,
	UserSignInRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-in`, async (loginPayload, { extra }) => {
	const { authApi, storage } = extra;

	const { token, user } = await authApi.signIn(loginPayload);

	await storage.set(StorageKey.TOKEN, token);

	return user;
});

const signUp = createAsyncThunk<
	UserAuthResponseDto,
	UserSignUpRequestDto,
	AsyncThunkConfig
>(`${sliceName}/sign-up`, async (registerPayload, { extra }) => {
	const { authApi, storage } = extra;

	const { token, user } = await authApi.signUp(registerPayload);

	await storage.set(StorageKey.TOKEN, token);

	return user;
});

const logOut = createAsyncThunk<null, undefined, AsyncThunkConfig>(
	`${sliceName}/log-out`,
	async (_, { extra }) => {
		const { storage } = extra;

		await storage.drop(StorageKey.TOKEN);

		return null;
	},
);

export {
	getAuthenticatedUser,
	logOut,
	sendUpdatePasswordLink,
	signIn,
	signUp,
	updatePassword,
};
