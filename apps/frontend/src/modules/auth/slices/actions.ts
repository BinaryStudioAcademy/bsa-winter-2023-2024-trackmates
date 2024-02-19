import { createAsyncThunk } from "@reduxjs/toolkit";

import { StorageKey } from "~/libs/modules/storage/storage.js";
import { type AsyncThunkConfig } from "~/libs/types/types.js";
import { type UserAuthResponseDto } from "~/modules/auth/auth.js";
import {
	UserProfileRequestDto,
	type UserSignInRequestDto,
	type UserSignUpRequestDto,
} from "~/modules/users/users.js";

import { name as sliceName } from "./auth.slice.js";

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

const updateProfile = createAsyncThunk<
	UserAuthResponseDto,
	UserProfileRequestDto,
	AsyncThunkConfig
>(`${sliceName}/profile`, async (profilePayload, { extra }) => {
	const { authApi, notification } = extra;

	const user = await authApi.update(profilePayload);

	notification.success("Your profile has been updated");

	return user;
});

const updateUserAvatar = createAsyncThunk<
	UserAuthResponseDto,
	FormData,
	AsyncThunkConfig
>(`${sliceName}/update-user-avatar`, async (payload, { extra }) => {
	const { authApi, notification } = extra;

	const user = await authApi.updateAvatar(payload);

	notification.success("Your avatar has been successfully changed");

	return user;
});

export {
	getAuthenticatedUser,
	signIn,
	signUp,
	updateProfile,
	updateUserAvatar,
};
